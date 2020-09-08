const Note=require('../models/Note');
const Item = require('../models/Item');

const pug = require('pug');
const functions = require('../controllers/functions');

exports.getAdd = (req, res) => {

    const templateCompiller = pug.compileFile('./views/AddNote.pug');
    let currentDate = functions.creationDate();

    Note.count().then(num => {
        Item.findAll({ attributes: ['code'] }).then(listado=> {
            console.log("All users:", JSON.stringify(listado));
            res.send(templateCompiller({
                number: num + 1,
                creationDate: currentDate,
                items: listado
            }));
        }
        ).catch(error => {
            console.log("No se pudo obtener el listado de items: " + error);
        });
        
    }).catch(error => {
        console.log("No se pudo obtener el numero de remisiones: " + error);
    });

};

exports.postAdd = (req, res) => {
    console.log(req.body);
    const { date, code, type, quantity, jobOrder, closeDate, status, reason } = req.body;
    const newNote = {
        date,
        code,
        type,
        quantity,
        jobOrder,
        closeDate,
        status,
        reason
    };
    Note.create(newNote).then(note => {

        res.redirect('/notes');
    }).catch(error => {
        res.send(error);
    });

};