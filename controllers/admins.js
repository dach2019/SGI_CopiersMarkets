const Admin=require('../models/Admin');

exports.getAdd=(req,res)=>{

    res.render('AddAdmin')
};

exports.postAdd=(req,res)=>{
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
    Admin.create(newAdmin).then(admin=>{
        console.log("Administrador creado exitosamente");
        res.redirect('/admins');
    }).catch(error=>{
        Console.log(error);
    });

};