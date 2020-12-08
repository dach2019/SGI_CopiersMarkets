const Order = require('../models/Order');
const Item = require('../models/Item');

const pug = require('pug');
const functions = require('../controllers/functions');


exports.getAdd = (req, res) => {

    const templateCompiller = pug.compileFile('./views/OrderForm.pug');
    let currentDate = functions.creationDate();

    Order.count().then(num => {
        Item.findAll({ attributes: ['code'] }).then(items => {
            res.send(templateCompiller({
                number: num + 1,
                creationDate: currentDate,
                items: items,
                mode: 'Agregar',
                status: 'CREADA'
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
    const { creationDate, code, quantity, closeDate, status, obs } = req.body;
    const newOrder = {
        creationDate,
        code,
        quantity,
        closeDate,
        status,
        obs
    };
    Order.create(newOrder).then(order => {
        res.send(response(
            'success',
            'La orden de pedido No. ' + order.number + ' ha sido registrada con éxito.',
            '/orders'
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
    const templateCompiller = pug.compileFile('./views/OrdersTable.pug');
    Order.findAll({order: [['number','DESC']]}).then(orders => {
        res.send(templateCompiller(
            {
                orders: orders
            }));
    }
    ).catch(error => {
        console.error(error);
    });
}

exports.getEdit = (req, res) => {
    const templateCompiller = pug.compileFile('./views/OrderForm.pug');
    console.log(req.params.number);
    Order.findAll({ where: { 'number': req.params.number } }).then(orders => {
        Item.findAll({ attributes: ['code'] }).then(items => {
            res.send(templateCompiller(
                {
                    mode: 'Editar',
                    items: items,
                    number: orders[0].number,
                    creationDate: orders[0].creationDate,
                    code: orders[0].code,
                    quantity: orders[0].quantity,
                    closeDate: orders[0].closeDate,
                    status: orders[0].status,
                    obs: orders[0].obs
                }));
        }
        ).catch(error => {
            console.log('No se pudo obtener la lista de items: ' + error);
        });
    }
    ).catch(error => {
        console.log('No se pudo obtener el listado de ordenes: ' + error);
    });
}

exports.postEdit = (req, res) => {
    console.log(req.body);
    const { creationDate, code, quantity, closeDate, status, obs } = req.body;
    const updateOrder = {
        creationDate,
        code,
        quantity,
        closeDate,
        status,
        obs
    };
    Order.update(updateOrder, { where: { number: req.params.number } }).then(order => {
        res.send(response(
            'success',
            'Orden de pedido actualizada con éxito.',
            '/orders/search')
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

exports.getClose = (req, res) => {
    console.log(req.params.number);
    Order.findByPk(req.params.number).then(order => {
        Item.findByPk(order.code).then(item => {
            let currentDate = functions.creationDate();
            Order.update({ status: 'CERRADA', closeDate: currentDate }, { where: { number: order.number } });
            Item.update({ stock: item.stock + order.quantity }, { where: { code: item.code } });
            res.send(
                response(
                    'success',
                    'Las unidades se han cargado al inventario exitosamente.',
                    'search'
                )
            );
        });
    });
}

function response(status, message, redirect) {
    return {
        status: status,
        message: message,
        redirect: redirect
    }
}
