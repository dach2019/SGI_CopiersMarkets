const General=require('../models/General');

exports.getAdd=(req,res)=>{

    res.render('AddGeneral')
};

exports.postAdd=(req,res)=>{
    console.log(req.body);
    const {id,name,position,phone,email,password}=req.body;
    const newGeneral={
        id,
        name,
        position,
        phone,
        email,
        password
    };
    General.create(newGeneral).then(General=>{
        console.log("Usuario general creado exitosamente");
        res.redirect('/general');
    }).catch(error=>{
       Console.log(error); 
    });

};