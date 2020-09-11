const express = require('express');
const router=express.Router();

const main=require('../controllers/main');
const items=require('../controllers/items');
const referrals=require('../controllers/referrals');
const notes=require('../controllers/notes');
const orders=require('../controllers/orders');
const suppliers=require('../controllers/suppliers');
const general=require('../controllers/general');
const admins=require('../controllers/admins');


module.exports=function(){
    router.get('/ping',main.ping);
    router.get('/',main.index);
    router.get('/main',main.main);
    router.get('/items',main.items);
    router.get('/referrals',main.referrals);
    router.get('/notes',main.notes);
    router.get('/orders',main.orders);
    router.get('/suppliers',main.suppliers);
    router.get('/general',main.general);
    router.get('/admins',main.admins);

    router.get('/items/add',items.getAdd);
    router.get('/items/search',items.getSearch);
    router.post('/items/add',items.postAdd);

    router.get('/referrals/add',referrals.getAdd);
    router.post('/referrals/add',referrals.postAdd);

    router.get('/notes/add',notes.getAdd);
    router.post('/notes/add',notes.postAdd);

    router.get('/orders/add',orders.getAdd);
    router.post('/orders/add',orders.postAdd);

    router.get('/suppliers/add',suppliers.getAdd);
    router.post('/suppliers/add',suppliers.postAdd);

    router.get('/general/add',general.getAdd);
    router.post('/general/add',general.postAdd);

    router.get('/admins/add',admins.getAdd);
    router.post('/admins/add',admins.postAdd);

    router.get('/lookup/:code',items.getLookup);
    
    return router;
}