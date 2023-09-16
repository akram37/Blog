const express = require('express');
const multer=require('multer')
const {body} = require('express-validator');

const blogRouter = express.Router();
module.exports = blogRouter;

const blogStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Public/uploads/blogs');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const imageUpload = multer({ storage: blogStorage });

const {fetchAllBlogs,fetchUserBlogs,createBlog,fetchBlog, editBlog}=require('../Controllers/blog');
const { verifyJwt } = require('../Middlewares/userMiddlewares');
const { getUser, getUserById } = require('../Services/user');


//get all blogs
blogRouter.get('/',async(req,res,next)=>{
    const blogs=await fetchAllBlogs()
    res.render('allBlogs.ejs',{blogs:blogs,isAuthorPosts:false,authorName:''})
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


blogRouter.post('/addblog',
  imageUpload.single('blogImage'),
  verifyJwt,
  createBlog
)





// Get user Blogs by id
blogRouter.get('/:id',async(req,res,next)=>{
  try{
    const id=req.params.id
    const blogs=await fetchUserBlogs(id)
    if(blogs.length>0){
      const author= await getUserById(id)
      res.render('allBlogs.ejs',{blogs:blogs,isAuthorPosts:true,authorName:author.username})
    }
    else throw new Error ("not found")
  }
  catch(err){
    res.status(500).send(err.message);
  }
})  

//Edit blog
blogRouter.get('/edit/:id',verifyJwt,async(req,res,next)=>{
        try{
          const user=req.user
          if(user) {
            const blog=await fetchBlog(req.params.id)
            console.log("blog id"+blog.authorId)
            console.log("user"+user.id)
            if(blog && blog.authorId===user.id){
            console.log("this is true")
            res.render('editBlog.ejs',{blog:blog})
            }
            else throw new Error ("your not autorised")
          }
          else{
            res.redirect('/login')
          }
        }
        catch(err){
          res.status(500).send(err.message);
        }
}) 

//edit blog
blogRouter.post('/edit/:id',
    imageUpload.single('blogImage'),
    verifyJwt,
    editBlog
  )




blogRouter.get('/blog/:id',async(req,res,next)=>{
  try{
      const blog=await fetchBlog(req.params.id)
      if(blog){
        const author= await getUserById(blog.authorId)
        res.render('blog.ejs',{blog:blog,authorName:author.username})
      } 
      else throw new Error ("not found")
    }
  catch(err){
    res.status(500).send(err.message);
  }
}) 

