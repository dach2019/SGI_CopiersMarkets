const Admin=require('../models/Admin');
const pug = require('pug');

exports.getAdd = (req, res) => {
    const templateCompiller = pug.compileFile('./views/AdminForm.pug');
    res.send(templateCompiller({
        mode: 'Agregar'
    }));
};

exports.postAdd = (req, res) => {
    console.log(req.body);
    const {id,name,position,phone,email,password}=req.body;
    const newAdmin={
        id,
        name,
        position,
        phone,
        email,
        password
    };
    Admin.create(newAdmin).then(admin => {
        res.send(response(
            'success',
            'El administrador ' + admin.name + ' ha sido registrado con éxito.',
            '/admins'
        )
        );
    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.code;
        switch (error.parent.errno) {
            case 1062:
                message = 'no se pudo registrar el administrador, debido a que ya existe uno con la misma identificación.';
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
    const templateCompiller = pug.compileFile('./views/AdminsTable.pug');
    Admin.findAll().then(admins => {
        res.send(templateCompiller(
            {
                admins: admins
            }));
    }
    ).catch(error => {
        console.error(error);
    });
};

exports.getEdit = (req, res) => {
    const templateCompiller = pug.compileFile('./views/AdminForm.pug');
    console.log(req.params.id);
    Admin.findAll({ where: { 'id': req.params.id } }).then(admin => {
        res.send(templateCompiller(
            {
                mode: 'Editar',
                id: admin[0].id,
                name: admin[0].name,
                position: admin[0].position,
                phone: admin[0].phone,
                email: admin[0].email,
                password: admin[0].password
            }));
    }
    ).catch(error => {
        console.error(error);
    });
};

exports.postEdit = (req, res) => {
    console.log(req.body);
    const {id,name,postion,phone,email,password}=req.body;
    const updateAdmin={
        id,
        name,
        postion,
        phone,
        email,
        password
    };
    Admin.update(updateAdmin, { where: { id: req.params.id } }).then(admin=> {
        res.send(response(
            'success',
            'Administrador actualizado con éxito.',
            '/admins/search')
        );

    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.id;
        switch (error.parent.errno) {
            case 1062:
                message = 'no se pudo actualizar el administrador, debido a que ya existe uno con la misma identificación.';
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



