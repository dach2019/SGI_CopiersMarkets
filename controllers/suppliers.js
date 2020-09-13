const Supplier=require('../models/Supplier');
const pug = require('pug');

exports.getAdd = (req, res) => {
    const templateCompiller = pug.compileFile('./views/SupplierForm.pug');
    res.send(templateCompiller({
        mode: 'Agregar'
    }));
};

exports.postAdd = (req, res) => {
    console.log(req.body);
    const {id,name,contact,phone,email,address,obs}=req.body;
    const newSupplier={
        id,
        name,
        contact,
        phone,
        email,
        address,
        obs
    };
    Supplier.create(newSupplier).then(supplier => {
        res.send(response(
            'success',
            'El proveedor ' + supplier.name + ' ha sido registrado con éxito.',
            '/suppliers'
        )
        );
    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.code;
        switch (error.parent.errno) {
            case 1062:
                message = 'no se pudo registrar el proveedor, debido a que ya existe uno con la misma identificación.';
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
    const templateCompiller = pug.compileFile('./views/SuppliersTable.pug');
    Supplier.findAll().then(suppliers => {
        res.send(templateCompiller(
            {
                suppliers: suppliers
            }));
    }
    ).catch(error => {
        console.error(error);
    });
};

exports.getEdit = (req, res) => {
    const templateCompiller = pug.compileFile('./views/SupplierForm.pug');
    console.log(req.params.id);
    Supplier.findAll({ where: { 'id': req.params.id } }).then(suppliers => {
        res.send(templateCompiller(
            {
                mode: 'Editar',
                id: suppliers[0].id,
                name: suppliers[0].name,
                contact: suppliers[0].contact,
                phone: suppliers[0].phone,
                email: suppliers[0].email,
                address: suppliers[0].address,
                obs: suppliers[0].obs
            }));
    }
    ).catch(error => {
        console.error(error);
    });
};

exports.postEdit = (req, res) => {
    console.log(req.body);
    const {id,name,contact,phone,email,address,obs}=req.body;
    const updateSupplier={
        id,
        name,
        contact,
        phone,
        email,
        address,
        obs
    };
    Supplier.update(updateSupplier, { where: { id: req.params.id } }).then(supplier => {
        res.send(response(
            'success',
            'Proveedor actualizado con éxito.',
            '/suppliers/search')
        );

    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.id;
        switch (error.parent.errno) {
            case 1062:
                message = 'no se pudo actualizar el proveedor, debido a que ya existe uno con la misma identificación.';
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

