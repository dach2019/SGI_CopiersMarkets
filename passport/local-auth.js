const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const User=require('../models/User');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    const user= await User.findByPk(id);
    done(null,user);
});

passport.use('local-login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async (req,username,password,done)=>{
    console.log("Buscando usuario: "+username);
    const user=await User.findByPk(username);
    if (!user){
        console.log("El usuario no está registrado");
        return done(null,false);
    }
    if (!user.comparePassword(password)){
        console.log("Contraseña incorrecta");
        return done(null,false);
    }
    done(null,user)
}));
