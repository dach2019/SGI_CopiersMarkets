const General=require('../models/General');
const pug = require('pug');

exports.getAdd = (req, res) => {
    const templateCompiller = pug.compileFile('./views/GeneralForm.pug');
    res.send(templateCompiller({
        mode: 'Agregar'
    }));
};

exports.postAdd = (req, res) => {
    console.log(req.body);
    const {id,name,position,phone,email,password}=req.body;
    const newGeneral={
        id,
        name,
        position,
        phone,
        email,
        password
    };
    General.create(newGeneral).then(general => {
        res.send(response(
            'success',
            'El usuario ' + general.name + ' ha sido registrado con éxito.',
            '/general'
        )
        );
    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.code;
        switch (error.parent.errno) {
            case 1062:
                message = 'no se pudo registrar el usuario, debido a que ya existe uno con la misma identificación.';
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
    const templateCompiller = pug.compileFile('./views/GeneralTable.pug');
    General.findAll().then(generals => {
        res.send(templateCompiller(
            {
                generals: generals
            }));
    }
    ).catch(error => {
        console.error(error);
    });
};

exports.getEdit = (req, res) => {
    const templateCompiller = pug.compileFile('./views/GeneralForm.pug');
    console.log(req.params.id);
    General.findAll({ where: { 'id': req.params.id } }).then(general => {
        res.send(templateCompiller(
            {
                mode: 'Editar',
                id: general[0].id,
                name: general[0].name,
                position: general[0].position,
                phone: general[0].phone,
                email: general[0].email,
                password: general[0].password
            }));
    }
    ).catch(error => {
        console.error(error);
    });
};

exports.postEdit = (req, res) => {
    console.log(req.body);
    const {id,name,postion,phone,email,password}=req.body;
    const updateGeneral={
        id,
        name,
        postion,
        phone,
        email,
        password
    };
    General.update(updateGeneral, { where: { id: req.params.id } }).then(general=> {
        res.send(response(
            'success',
            'Usuario general actualizado con éxito.',
            '/general/search')
        );

    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.id;
        switch (error.parent.errno) {
            case 1062:
                message = 'no se pudo actualizar el usuario general, debido a que ya existe uno con la misma identificación.';
                break;
        }
        res.send(response(
            'error',
            message
        )
        );
    });

};

function response(status, message, redirect) {
    return {
        status: status,
        message: message,
        redirect: redirect
    }
}



