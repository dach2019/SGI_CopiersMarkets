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

    //Items
        //GET
    router.get('/items/add',items.getAdd);
    router.get('/items/search',items.getSearch);
    router.get('/items/edit/:code',items.getEdit);
        //POST
    router.post('/items/add',items.postAdd);
    router.post('/items/edit/:code',items.postEdit);

    //Referrals
        //GET
    router.get('/referrals/add',referrals.getAdd);
    router.get('/referrals/search',referrals.getSearch);
    router.get('/referrals/edit/:number',referrals.getEdit);
        //POST
    router.post('/referrals/add',referrals.postAdd);
    router.post('/referrals/edit/:number',referrals.postEdit);

    //Notes
        //GET
    router.get('/notes/add',notes.getAdd);
    router.get('/notes/search',notes.getSearch);
    router.get('/notes/edit/:number',notes.getEdit);
        //POST
    router.post('/notes/add',notes.postAdd);
    router.post('/notes/edit/:number',notes.postEdit);

    //Orders
        //GET
    router.get('/orders/add',orders.getAdd);
    router.get('/orders/search',orders.getSearch);
    router.get('/orders/edit/:number',orders.getEdit);
        //POST
    router.post('/orders/add',orders.postAdd);
    router.post('/orders/edit/:number',orders.postEdit);

    //Suppliers
        //GET
    router.get('/suppliers/add',suppliers.getAdd);
    router.get('/suppliers/search',suppliers.getSearch);
    router.get('/suppliers/edit/:id',suppliers.getEdit);
        //POST
    router.post('/suppliers/add',suppliers.postAdd);
    router.post('/suppliers/edit/:id',suppliers.postEdit);
    
    //General
        //GET
    router.get('/general/add',general.getAdd);
    router.get('/general/search',general.getSearch);
    router.get('/general/edit/:id',general.getEdit);
        //POST
    router.post('/general/add',general.postAdd);
    router.post('/general/edit/:id',general.postEdit);
    
    //Admin
        //GET
    router.get('/admins/add',admins.getAdd);
    router.get('/admins/search',admins.getSearch);
    router.get('/admins/edit/:id',admins.getEdit);
        //POST
    router.post('/admins/add',admins.postAdd);
    router.post('/admins/edit/:id',admins.postEdit);

    //Lookup
    router.get('/lookup/:code',items.getLookup);
    
    return router;
}