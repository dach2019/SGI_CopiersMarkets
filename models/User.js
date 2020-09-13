const {Model, Datatypes, DataTypes} = require('sequelize');
const sequelize = require('../database/db');
const bcrypt=require('bcryptjs');

class User extends Model {
    comparePassword (password){
        return bcrypt.compareSync(password,this.password);
    };
}
User.init({
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
    type: {
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
    modelName: "user"
})

User.encryptPassword=function (password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};


module.exports= User;