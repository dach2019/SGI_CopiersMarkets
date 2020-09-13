const Referral = require('../models/Referral');
const Item = require('../models/Item');

const pug = require('pug');
const functions = require('../controllers/functions');

exports.getAdd = (req, res) => {

    const templateCompiller = pug.compileFile('./views/ReferralForm.pug');
    let currentDate = functions.creationDate();

    Referral.count().then(num => {
        Item.findAll({ attributes: ['code'] }).then(items => {
            res.send(templateCompiller({
                number: num + 1,
                creationDate: currentDate,
                items: items,
                mode: 'Agregar',
                status:'CREADA'
            }));
        }
        ).catch(error => {
            console.log('No se pudo obtener la lista de items: ' + error);
        });
    }).catch(error => {
        console.log('No se pudo obtener el numero de remisiones: ' + error);
    });
};

exports.postAdd = (req, res) => {
    console.log(req.body);
    const { creationDate, code, quantity, jobOrder, closeDate, status, obs } = req.body;
    const newReferral = {
        creationDate,
        code,
        quantity,
        jobOrder,
        closeDate,
        status,
        obs
    };
    Referral.create(newReferral).then(referral => {
        res.send(response(
            'success',
            'La remisión No. ' + referral.number+ ' ha sido registrada con éxito.',
            '/referrals'
        )
        );
    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.code;
        switch (error.parent.errno) {
            case 1062:
                message = '';
                break;
        }
        res.send(response(
                'error',
                message
            )
            
        );
    });
};

exports.getSearch = (req, res) => {
    const templateCompiller = pug.compileFile('./views/ReferralsTable.pug');
    Referral.findAll().then(referrals => {
        res.send(templateCompiller(
            {
                referrals: referrals
            }));
    }
    ).catch(error => {
        console.error(error);
    });
}

exports.getEdit = (req, res) => {
    const templateCompiller = pug.compileFile('./views/ReferralForm.pug');
    console.log(req.params.number);
    Referral.findAll({ where: { 'number': req.params.number } }).then(referrals => {
        Item.findAll({ attributes: ['code'] }).then(items => {
            res.send(templateCompiller(
                {
                    mode: 'Editar',
                    items: items,
                    number: referrals[0].number,
                    creationDate: referrals[0].creationDate,
                    code: referrals[0].code,
                    quantity: referrals[0].quantity,
                    jobOrder: referrals[0].jobOrder,
                    closeDate: referrals[0].closeDate,
                    status: referrals[0].status,
                    obs: referrals[0].obs
                }));
        }
        ).catch(error => {
            console.log('No se pudo obtener la lista de items: ' + error);
        });
    }
    ).catch(error => {
        console.log('No se pudo obtener el listado de remisiones: '+error);
    });
}

exports.postEdit = (req, res) => {
    console.log(req.body);
    const { creationDate, code, quantity, jobOrder, closeDate, status, obs } = req.body;
    const updateReferral = {
        creationDate,
        code,
        quantity,
        jobOrder,
        closeDate,
        status,
        obs
    };
    Referral.update(updateReferral, { where: { number: req.params.number } }).then(referral => {
        res.send(response(
            'success',
            'Remisión actualizada con éxito.',
            '/referrals/search')
        );

    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.code;
        res.send(response(
            'error',
            message
        )
        );
    });

}


function response(status, message, redirect) {
    return {
        status: status,
        message: message,
        redirect: redirect
    }
}