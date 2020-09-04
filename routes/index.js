const express = require('express');
const router=express.Router();
const mainController=require('../controllers/main');

module.exports=function(){
    router.get('/ping',mainController.ping);
    router.get('/',mainController.index);
    router.get('/main',mainController.main);
    router.get('/items',mainController.items);
    router.get('/remisiones',mainController.referrals);
    router.get('/notas',mainController.notes);
    router.get('/ordenes',mainController.orders);
    router.get('/proveedores',mainController.suppliers);
    router.get('/general',mainController.general);
    router.get('/admins',mainController.admins);

    return router;
}