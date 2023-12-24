const {DataTypes} = require('sequelize');
const dbConnection = require('../config/dbConnection');

const Product=dbConnection.define('Product',{
    product_name:{
        type:DataTypes.STRING,
    },
    price:{
        type:DataTypes.STRING,
    },
    stock:{
        type:DataTypes.STRING,
    }
});

module.exports=Product;