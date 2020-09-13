const Note=require('../models/Note');
const Item = require('../models/Item');

const pug = require('pug');
const functions = require('../controllers/functions');

exports.getAdd = (req, res) => {

    const templateCompiller = pug.compileFile('./views/NoteForm.pug');
    let currentDate = functions.creationDate();

    Note.count().then(num => {
        Item.findAll({ attributes: ['code'] }).then(items => {
            res.send(templateCompiller({
                number: num + 1,
                date: currentDate,
                items: items,
                mode: 'Agregar'
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
    const { date, code, type, quantity, reason } = req.body;
    const newNote = {
        date,
        code,
        type,
        quantity,
        reason
    };
    Note.create(newNote).then(note => {
        res.send(response(
            'success',
            'La nota de inventario No. ' + note.number+ ' ha sido registrada con éxito.',
            '/notes'
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
    const templateCompiller = pug.compileFile('./views/NotesTable.pug');
    Note.findAll().then(notes => {
        res.send(templateCompiller(
            {
                notes: notes
            }));
    }
    ).catch(error => {
        console.error(error);
    });
}

exports.getEdit = (req, res) => {
    const templateCompiller = pug.compileFile('./views/NoteForm.pug');
    console.log(req.params.number);
    Note.findAll({ where: { 'number': req.params.number } }).then(notes => {
        Item.findAll({ attributes: ['code'] }).then(items => {
            res.send(templateCompiller(
                {
                    mode: 'Editar',
                    items: items,
                    number: notes[0].number,
                    date: notes[0].date,
                    code: notes[0].code,
                    type:notes[0].type,
                    quantity: notes[0].quantity,
                    reason: notes[0].obs
                }));
        }
        ).catch(error => {
            console.log('No se pudo obtener la lista de items: ' + error);
        });
    }
    ).catch(error => {
        console.log('No se pudo obtener el listado de notas: '+error);
    });
}

exports.postEdit = (req, res) => {
    console.log(req.body);
    const { date, code, type, quantity, reason } = req.body;
    const updateNote = {
        date,
        code,
        type,
        quantity,
        reason
    };
    Note.update(updateNote, { where: { number: req.params.number } }).then(referral => {
        res.send(response(
            'success',
            'Nota de inventario actualizada con éxito.',
            '/notes/search')
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
