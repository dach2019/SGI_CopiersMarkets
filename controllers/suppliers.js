const Supplier=require('../models/Supplier');

exports.getAdd=(req,res)=>{

    res.render('AddSupplier')
};

exports.postAdd=(req,res)=>{
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
    Supplier.create(newSupplier).then(supplier=>{
        console.log("Proveedor registrado exitosamente");
        res.redirect('/suppliers');
    }).catch(error=>{
        console.log(error);
    });

};