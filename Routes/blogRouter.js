const express = require('express');
const multer=require('multer')
const {body} = require('express-validator');

const blogRouter = express.Router();
module.exports = blogRouter;

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const imageUpload = multer({ storage: imageStorage });

const {fetchBlogs,fetchBlog,createBlog}=require('../Controllers/blog');
const { verifyJwt } = require('../Middlewares/userMiddlewares');

blogRouter.get('/',async(req,res,next)=>{
    const blogs=await fetchBlogs()
    res.send(blogs)
  })
  
  blogRouter.get('/addBlog',verifyJwt,(req,res,next)=>{
    const user=req.user
       if(user){
         res.render('addBlog');
       }
       else{
        res.redirect('/login')
       }
  })

  blogRouter.post('/addBlog',
    imageUpload.single('blogImage'),
    verifyJwt,
    createBlog
)

  blogRouter.get('/:id',async(req,res,next)=>{
    const blogs=await fetchBlog(req.params.id)
    res.send(blogs)
  })  
