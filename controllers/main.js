
exports.ping=(req,res)=>{
    res.send("pong");
};

exports.index=(req,res)=>{
    res.render("index");
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

exports.general=(req,res)=>{
    res.render("general");
};

exports.admins=(req,res)=>{
    res.render("admins");
};