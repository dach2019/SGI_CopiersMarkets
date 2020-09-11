
const Item = require('../models/Item');
const pug = require('pug');

exports.getAdd = (req, res) => {

    res.render('AddItem')
};

exports.postAdd = (req, res) => {
    console.log(req.body);
    const { code, type, name, secstock, stock, specs } = req.body;
    const newItem = {
        code,
        type,
        name,
        secstock,
        stock,
        specs
    };
    Item.create(newItem).then(item => {

        res.send('registrado');

    }).catch(error => {
        console.error(error);
        res.send("error").status(500);
    });

};

exports.getLookup = (req, res) => {
    Item.findAll({ attributes: ['name'], where: { 'code': req.params.code } }).then(item => {
        res.send(JSON.stringify(item));
    }
    ).catch(error => {
        console.error(error);
    });
};

exports.getSearch = (req, res) => {
    const templateCompiller = pug.compileFile('./views/SearchItem.pug');
    Item.findAll().then(items => {
        res.send(templateCompiller(
            {
                items: items
            }));
    }
    ).catch(error => {
        console.error(error);
    });
}