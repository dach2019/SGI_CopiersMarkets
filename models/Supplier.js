const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Supplier extends Model { }
Supplier.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNUll: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNUll: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    obs: {
        type: DataTypes.TEXT,
        allowNull: true
    }

}, {
    sequelize,
    modelName: "supplier"
})

module.exports = Supplier;