const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Referral extends Model { }
Referral.init({
    number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNUll: false,
        autoIncrement:true
    },
    creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    jobOrder: {
        type: DataTypes.STRING,
        allowNull: false
    },
    closeDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    obs: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "referral"
})

module.exports = Referral;