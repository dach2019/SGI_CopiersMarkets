const Order=require('../models/Order');
const Item = require('../models/Item');

const pug = require('pug');
const functions = require('../controllers/functions');
const { validationResult } = require('express-validator');

exports.getAdd = (req, res) => {

    const templateCompiller = pug.compileFile('./views/AddOrder.pug');
    let currentDate = functions.creationDate();

    Order.count().then(num => {
        Item.findAll({ attributes: ['code'] }).then(items => {
            console.log("Resultado la lista de items:", JSON.stringify(items));
            res.send(templateCompiller({
                number: num + 1,
                creationDate: currentDate,
                items: items
            }));
        }
        ).catch(error => {
            console.log("No se pudo obtener la lista de items: " + error);
        });
    }).catch(error => {
        console.log("No se pudo obtener el numero de ordenes: " + error);
    });
};

exports.postAdd = (req, res) => {
    console.log(req.body);
    const { creationDate, code, quantity, jobOrder, closeDate, status, obs } = req.body;
    const newOrder = {
        creationDate,
        code,
        quantity,
        jobOrder,
        closeDate,
        status,
        obs
    };
    Order.create(newOrder).then(order => {
        res.redirect('/orders');
    }).catch(error => {
        res.send(error);
    });
};