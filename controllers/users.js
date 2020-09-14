const User=require('../models/User');
const pug = require('pug');

exports.getAdd = (req, res) => {
    const templateCompiller = pug.compileFile('./views/UserForm.pug');
    res.send(templateCompiller({
        mode: 'Agregar'
    }));
};

exports.postAdd = (req, res) => {
    console.log(req.body);
    let {id,name,position,type,phone,email,password}=req.body;
    password=User.encryptPassword(password);
    const newUser={
        id,
        name,
        position,
        type,
        phone,
        email,
        password
    };
    User.create(newUser).then(user => {
        res.send(response(
            'success',
            'El usuario ' + user.name + ' ha sido registrado con éxito.',
            '/users'
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
    const templateCompiller = pug.compileFile('./views/UsersTable.pug');
    User.findAll().then(users => {
        res.send(templateCompiller(
            {
                users: users
            }));
    }
    ).catch(error => {
        console.error(error);
    });
};

exports.getEdit = (req, res) => {
    const templateCompiller = pug.compileFile('./views/UserForm.pug');
    console.log(req.params.id);
    User.findAll({ where: { 'id': req.params.id } }).then(user => {
        res.send(templateCompiller(
            {
                mode: 'Editar',
                id: user[0].id,
                name: user[0].name,
                position: user[0].position,
                type: user[0].type,
                phone: user[0].phone,
                email: user[0].email,
                password: user[0].password
            }));
    }
    ).catch(error => {
        console.error(error);
    });
};

exports.postEdit = (req, res) => {
    console.log(req.body);
    let {id,name,postion,type,phone,email,password}=req.body;
    const updateUser={
        id,
        name,
        postion,
        type,
        phone,
        email,
        password
    };
    password=User.encryptPassword(password);
    User.update(updateUser, { where: { id: req.params.id } }).then(user=> {
        res.send(response(
            'success',
            'Usuario actualizado con éxito.',
            '/users/search')
        );

    }).catch(error => {
        console.log(error);
        let message = 'error: ' + error.parent.id;
        switch (error.parent.errno) {
            case 1062:
                message = 'no se pudo actualizar el usuario, debido a que ya existe uno con la misma identificación.';
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



