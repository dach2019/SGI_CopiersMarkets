
const Item=require('../models/Item');

exports.getAdd=(req,res)=>{

    res.render('AddItem')
};

exports.postAdd=(req,res)=>{
    console.log(req.body);
    const {code,type,name,secstock,stock,specs}=req.body;
    const newItem={
        code,
        type,
        name,
        secstock,
        stock,
        specs
    };
    Item.create(newItem).then(item=>{
        
        res.redirect('/items');
    }).catch(error=>{
        console.error(error);
    });

};

exports.getLookup=(req,res)=>{
    Item.findAll({ attributes: ['name'], where: {'code': req.params.code} }).then(item => {
        res.send(JSON.stringify(item));
    }
    ).catch(error=>{
        console.error(error);
    });
};