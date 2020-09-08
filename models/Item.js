const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Item extends Model { }
Item.init({
    code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNUll: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    secstock: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    specs: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "item"
})

module.exports = Item;