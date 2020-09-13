const passport=require('passport');

exports.ping=(req,res)=>{
    res.send("pong");
};

exports.getLogin=(req,res)=>{
    res.render("login");
};

exports.getLogout=(req,res)=>{
    req.logout();
    res.redirect("/login");
};

exports.main=(req,res)=>{
    res.render("main");
};

exports.items=(req,res)=>{
    res.render("items");
};

exports.referrals=(req,res)=>{
    res.render("referrals");
};

exports.notes=(req,res)=>{
    res.render("notes");
};

exports.orders=(req,res)=>{
    res.render("orders");
};

exports.suppliers=(req,res)=>{
    res.render("suppliers");
};

exports.users=(req,res)=>{
    res.render("users");
};
