const {Model, Datatypes, DataTypes} = require('sequelize');
const sequelize = require('../database/db');

class General extends Model {}
General.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNUll: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    sequelize,
    modelName: "general"
})

module.exports= General;