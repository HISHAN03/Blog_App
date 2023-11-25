import express from "express";
const router = express.Router();
import {Article} from "../mongoose/article";

import {Request,Response,NextFunction} from 'express'

//home..........................................
router.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("../article/index", { articles: articles });
});
interface YourArticleType {
  save(): YourArticleType | PromiseLike<YourArticleType>;
  title?: string;
  description?: string;
  markdown?: string;
}
interface CustomRequest extends Request
{
  article:YourArticleType;
}


///new page................................... 
router.get("/article/new", (req, res) => {
  const article= new Article();
  res.render("../article/new",{article:article});
});

router.post("/article/new",  (req , res , next) => {
  (req as CustomRequest).article = new Article();
  console.log(res)
  next()
},saveandredirect)

//readmore........................................
router.get("/article/show/:id", async (req:Request, res:Response) => {
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

router.put("/article/edit/:id", async (req: Request,res:Response, next:NextFunction) =>
 {
  
   let article1 = await  Article.findById(req.params.id)
if(article1)
{
  
  (req as CustomRequest).article=article1
}
  next()
},saveandredirect)



//delete..............................................
router.delete('/article/:id/delete',async (req,res)=>{
  let n= await Article.findByIdAndRemove(req.params.id);
  res.redirect('/')
})


interface article1
{
  title:string,
  description:string,
  markdown:string
}



function saveandredirect() {
  return async (req:CustomRequest , res:Response) => {
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




export default module.exports = router;
