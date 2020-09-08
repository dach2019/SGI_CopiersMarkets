const express = require('express');
const bodyParser=require('body-parser');
const routes=require('./routes');
const morgan=require('morgan');
const path=require('path');
const sequelize=require('./database/db');
const urlencodedParser=bodyParser.urlencoded({extended:false})
require('./models/Associations');

//Init app
const app = express();

//Settings
app.set('port',process.env.PORT||3000);
app.set('view engine','pug');


//Views
app.set('views',path.join(__dirname,"./views"));

//Routes
app.use('/',urlencodedParser,routes());


//Middlewares
app.use(morgan('dev'));
/*app.use(express.urlencoded({extended:false}));
app.use(express.json());
*/

//Global variables
app.use((req,res,next)=>{
  next();
});

//Public
app.use(express.static('public'));

//Start app
app.listen(app.get('port'), function() {
  console.log('Servidor web escuchando en el puerto:'+app.get('port'));
  
  sequelize.authenticate().then(()=>{
    console.log("Se ha conectado a la base de datos");
  }).catch(error =>{
    console.log('Se ha producido un error al conectarse a la base de datos',error);
  })

  sequelize.sync({force: false}).then(()=>{
    console.log("Se ha sincronizado la base de datos");
  }).catch(error=>{
    console.log("Ha ocurrido un error en la sincronización de la base de datos",error);
  });
});