//Import Libraries
const Sequelize = require("sequelize");
const connection = require("../database/database");
//Export Category
const Category = require("../categories/Category");

//Model - Creating the table categories.
const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false 
    }, 
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT, //Big texts.
        allowNull: false
    }
})

Category.hasMany(Article); //A category has many articles
Article.belongsTo(Category); //An article belongs to a category

//Use first time just to try to creat the table, then, when it creates, delete
//Article.sync({force: true})

//Export
module.exports = Article; 