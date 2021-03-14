//Loading Libraries
const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Artigo = require("./Article");
const slugify = require("slugify");
const Article = require("./Article");

//We use router as good practice.
router.get("/admin/articles", (req,res) => {
    Article.findAll({
        include: [{model: Category}] //Incluir na busca model category (JOIN/pelo relacionamento)
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles})
    })
});

router.get("/admin/articles/new", (req,res) => {
    Category.findAll().then(categories => {  //Passar lista de categorias para view
        res.render("admin/articles/new", {categories: categories})
    })
 
});

router.post("/articles/save",(req,res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category  = req.body.category;

    //Salvar o artigo
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category //Chave estrangeira
    }).then(() => {
        res.redirect("/admin/articles")        
    })
});

//apagar
router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/admin/articles");
        }
    }else{ // NULL
        res.redirect("/admin/categories");
    }
});

//Export
module.exports = router;