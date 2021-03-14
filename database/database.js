//Connection With Sequelize
const Sequelize = require('sequelize');

//Builing Connection
const connection = new Sequelize('blogadm','root','123456',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "+01:00"
});

//Export the connection to use in another files, such as index.js
module.exports = connection;