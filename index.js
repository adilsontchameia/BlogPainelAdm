//------------------------------Inicio da Base do App------------------------------
//Starting the o Server
const express = require("express");
const app = express();
const slugfy = require("slugify")
//The End

//Import Libraries
const bodyParser = require("body-parser");
const connection = require("./database/database");
//The End

// View engine (EJS)
app.set('view engine','ejs');

// Static - Pictures, Sounds
app.use(express.static('public'));

//Body-Parser(Form)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Database Connection, Was Succesfull.");
    }).catch((error) => {
        console.log("There Was An Error To Connect Database.");
    })
//The End - MYSQL Connection
//------------------------------ Fim da Base do App------------------------------

//------------------------------Import Routers------------------------------
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
//Using Routers
app.use("/",categoriesController)
app.use("/",articlesController)
//------------------------------End Of Routers------------------------------

//------------------------------Exporting Tables------------------------------
const Article = require("./articles/Article")
const Category = require("./categories/Category")

//------------------------------The End Of Tables------------------------------



// Home - Page
app.get("/",(req,res) => {

    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(articles => {
        res.render("index", {articles: articles});
    });
   
});

app.get("/:slug",(req,res) => {
    var slug = req.params.slug;
    //Busca pelo slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(articles => {
        if(articles != undefined) {
        res.render("article",{articles: articles})
        } else {
        res.render("/")
        }
    }).catch(err => {
        res.render("/")
    })
});


//Starting Application => Server.
app.listen(8081, () => {
    console.log("The Server Is Running.")
})

