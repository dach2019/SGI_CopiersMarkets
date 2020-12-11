const express = require('express');
const router=express.Router();
const passport=require('passport');
const User = require('../models/User');

const main=require('../controllers/main');
const items=require('../controllers/items');
const referrals=require('../controllers/referrals');
const notes=require('../controllers/notes');
const orders=require('../controllers/orders');
const suppliers=require('../controllers/suppliers');
const users=require('../controllers/users');

module.exports=function(){

    //Test
    router.get('/ping',main.ping);

    //Login
    router.get('/login',main.getLogin);
    router.post('/login',passport.authenticate('local-login',{
        successRedirect:'/main',
        failureRedirect:'/login',
        passReqToCallback:true
    }));
    
    //Logout
    router.get('/logout',main.getLogout);

    //Main
    router.get('/',isAuthenticated,main.main);
    router.get('/main',isAuthenticated,main.main);
    router.get('/items',isAuthenticated,main.items);
    router.get('/referrals',isAuthenticated,main.referrals);
    router.get('/notes',isAuthenticated,main.notes);
    router.get('/orders',isAuthenticated,main.orders);
    router.get('/suppliers',isAuthenticated,main.suppliers);
    router.get('/users',isAuthenticated,isAllowed,main.users);

    //Items
        //GET
    router.get('/items/add',isAuthenticated,items.getAdd);
    router.get('/items/search',isAuthenticated,items.getSearch);
    router.get('/items/edit/:code',isAuthenticated,items.getEdit);
        //POST
    router.post('/items/add',isAuthenticated,items.postAdd);
    router.post('/items/edit/:code',isAuthenticated,items.postEdit);

    //Referrals
        //GET
    router.get('/referrals/add',isAuthenticated,referrals.getAdd);
    router.get('/referrals/search',isAuthenticated,referrals.getSearch);
    router.get('/referrals/edit/:number',isAuthenticated,referrals.getEdit);
    router.get('/referrals/close/:number',isAuthenticated,referrals.getClose);
        //POST
    router.post('/referrals/add',isAuthenticated,referrals.postAdd);
    router.post('/referrals/edit/:number',isAuthenticated,referrals.postEdit);

    //Notes
        //GET
    router.get('/notes/add',isAuthenticated,notes.getAdd);
    router.get('/notes/search',isAuthenticated,notes.getSearch);
    //router.get('/notes/edit/:number',isAuthenticated,notes.getEdit);
        //POST
    router.post('/notes/add',isAuthenticated,notes.postAdd);
    //router.post('/notes/edit/:number',isAuthenticated,notes.postEdit);

    //Orders
        //GET
    router.get('/orders/add',isAuthenticated,orders.getAdd);
    router.get('/orders/search',isAuthenticated,orders.getSearch);
    router.get('/orders/edit/:number',isAuthenticated,orders.getEdit);
    router.get('/orders/close/:number',isAuthenticated,orders.getClose);
        //POST
    router.post('/orders/add',isAuthenticated,orders.postAdd);
    router.post('/orders/edit/:number',isAuthenticated,orders.postEdit);

    //Suppliers
        //GET
    router.get('/suppliers/add',isAuthenticated,suppliers.getAdd);
    router.get('/suppliers/search',isAuthenticated,suppliers.getSearch);
    router.get('/suppliers/edit/:id',isAuthenticated,suppliers.getEdit);
        //POST
    router.post('/suppliers/add',isAuthenticated,suppliers.postAdd);
    router.post('/suppliers/edit/:id',isAuthenticated,suppliers.postEdit);
    
    //Users
        //GET
    router.get('/users/add',isAuthenticated,isAllowed,users.getAdd);
    router.get('/users/search',isAuthenticated,isAllowed,users.getSearch);
    router.get('/users/edit/:id',isAuthenticated,isAllowed,users.getEdit);
        //POST
    router.post('/users/add',isAuthenticated,isAllowed,users.postAdd);
    router.post('/users/edit/:id',isAuthenticated,isAllowed,users.postEdit);

    //Lookup
    router.get('/lookup/:code',isAuthenticated,items.getLookup);
    

    async function isAuthenticated(req,res,next){ 
        const nusers=await User.count();
        if(req.user || nusers==0){
            return next();
        }
        res.redirect('/login');
	return next();
    };

    async function isAllowed(req,res,next){
        const nusers=await User.count();
        if(nusers==0){
            return next();
        }else{
            if(req.user['dataValues']['type']=='Administrador'){
                return next();
            }
        }
        res.redirect('/main')
	return next();
    };

    return router;
}