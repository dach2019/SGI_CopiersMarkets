const Item = require('../models/Item');
const Referral = require('../models/Referral');
const Note = require('../models/Note');
const Order = require('../models/Order');
/*
Referral.hasOne(Item,{
    foreignKey: 'code'
});
Item.belongsTo(Referral);

Note.hasOne(Item,{
    foreignKey: 'code'
});
Item.belongsTo(Note);

Order.hasOne(Item,{
    foreignKey: 'code'
});
Item.belongsTo(Order);
*/