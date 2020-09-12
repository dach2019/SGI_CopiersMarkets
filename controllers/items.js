const Item = require('../models/Item');
const pug = require('pug');


exports.getAdd = (req, res) => {
    const templateCompiller = pug.compileFile('./views/ItemForm.pug');
    res.send(templateCompiller({
        mode: 'Agregar'
    }));
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
        res.send(response(
            'success',
            'El item ' + item.code + ' ha sido registrado con éxito.',
            '/items'
        )
        );

    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.code;
        switch (error.parent.errno) {
            case 1062:
                message = 'no se pudo registrar el item, debido a que ya existe uno con el mismo código.';
                break;
        }
        res.send(response(
            'error',
            message
            )
        );
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
    const templateCompiller = pug.compileFile('./views/ItemsTable.pug');
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

exports.getEdit = (req, res) => {
    const templateCompiller = pug.compileFile('./views/ItemForm.pug');
    console.log(req.params.code);
    Item.findAll({ where: { 'code': req.params.code } }).then(items => {
        res.send(templateCompiller(
            {
                mode: 'Editar',
                code: items[0].code,
                type: items[0].type,
                name: items[0].name,
                secstock: items[0].secstock,
                stock: items[0].stock,
                specs: items[0].specs
            }));
    }
    ).catch(error => {
        console.error(error);
    });
}

exports.postEdit = (req, res) => {
    console.log(req.body);
    const { code, type, name, secstock, stock, specs } = req.body;
    const updateItem = {
        code,
        type,
        name,
        secstock,
        stock,
        specs
    };
    Item.update(updateItem, { where: { code: req.params.code } }).then(item => {
        res.send(response(
            'success',
            'Ítem actualizado con éxito.',
            '/items/search')
        );

    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.code;
        switch (error.parent.errno) {
            case 1062:
                message = 'no se pudo actualizar el ítem, debido a que ya existe uno con el mismo código.';
                break;
        }
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