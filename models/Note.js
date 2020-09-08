const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Note extends Model { }
Note.init({
    number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNUll: false,
        autoIncrement:true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "note"
})

module.exports = Note;