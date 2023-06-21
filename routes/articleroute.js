const express = require("express");
const router = express.Router();
const Article = require("../mongoose/article");


//home..........................................
router.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("../article/index", { articles: articles });
});


///new page................................... 
router.get("/article/new", (req, res) => {
  const article= new Article();
  res.render("../article/new",{article:article});
});

router.post("/article/new", async (req, res, next) => {
  req.article = new Article()
  next()
},saveandredirect('new'))

//readmore........................................
router.get("/article/show/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  try {
    res.render("../article/show", { article: article });
  } catch {
    res.send("error finfing the id");
  }
});
//edit...........................................
router.get("/article/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("../article/edit", { article: article });
});

router.put("/article/edit/:id", async (req, res, next) => {
  req.article = await  Article.findById(req.params.id)
  next()
},saveandredirect('edit'))



//delete..............................................
router.delete('/article/:id/delete',async (req,res)=>{
  let n= await Article.findByIdAndRemove(req.params.id);
  res.redirect('/')
})



  function saveandredirect(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      try {
        article = await article.save()
        res.redirect('/')
      } catch (e) {
        res.send('error saving the message')
        
      }
    }
  }




module.exports = router;
