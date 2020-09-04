const express = require('express');
const routes=require('./routes');
const morgan=require('morgan');
const path=require('path');

//Init app
const app = express();

//Settings
app.set('port',process.env.PORT||3000);
app.set('view engine','pug');

//Views
app.set('views',path.join(__dirname,'./views'));

//Routes
app.use('/',routes());

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Global variables
app.use((req,res,next)=>{
  next();
});

//Public
app.use(express.static('public'));

//Start app
app.listen(app.get('port'), function() {
  console.log('Servidor web escuchando en el puerto:'+app.get('port'));
});