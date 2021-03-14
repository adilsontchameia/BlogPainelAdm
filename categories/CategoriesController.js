//Loading Libraries
const express = require("express");
const { default: slugify } = require("slugify");
const router = express.Router();
const Category = require("./Category")

//We use router as good practice.
router.get("/admin/categories/new", (req,res) => {

    res.render("admin/categories/new")

});

//form - method post
router.post("/categories/save", (req,res) => {
    //save data
    var title = req.body.title;
    if(title != undefined) {

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories")
        })

    } else {
    res.redirect("admin/categories/new")
    }
})

router.get("/admin/categories", (req,res) => {

    //taking categories from database
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories})
    })

});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/admin/categories");
        }
    }else{ // NULL
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)) {
        res.redirect("/admin/categories")
    }

    Category.findByPk(id).then(category => {
        if(category != undefined){

            res.render("admin/categories/edit",{category: category});

        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
            res.redirect("/admin/categories");
    })
})

//post because the update comes from form
router.post("/categories/update", (req,res) => {
    var id = req.body.id;
    var title = req.body.title;
    
    Category.update({title: title, slug: slugify(title)},{
        where:{
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories")
    })
});
//Export
module.exports = router;