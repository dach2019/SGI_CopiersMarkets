const Referral = require('../models/Referral');
const Item = require('../models/Item');

const pug = require('pug');
const functions = require('../controllers/functions');
const { validationResult } = require('express-validator');

exports.getAdd = (req, res) => {

    const templateCompiller = pug.compileFile('./views/AddReferral.pug');
    let currentDate = functions.creationDate();

    Referral.count().then(num => {
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
        console.log("No se pudo obtener el numero de remisiones: " + error);
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
        res.redirect('/referrals');
    }).catch(error => {
        res.send(error);
    });
};