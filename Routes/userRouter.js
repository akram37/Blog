const express = require('express');
const multer=require('multer')
const {body} = require('express-validator');

const userRouter = express.Router();
module.exports = userRouter;

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Public/uploads/users');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const imageUpload = multer({ storage: userStorage });


const {getUser}=require('../Services/user')
const {createUser}=require('../Controllers/user')
const {verifyJwt,loginUserHandler}=require('../Middlewares/userMiddlewares')

userRouter.get('/',(req,res,next)=>{
         res.redirect('/blogs');
})

userRouter.get('/login',verifyJwt,(req,res,next)=>{
  const user=req.user
       if(user){
         res.redirect('/dashboard');
       }
       else{
        res.render('login')
       }
})


userRouter.post('/login',loginUserHandler);


userRouter.get('/register',verifyJwt,(req,res,next)=>{
  if(req.user){
    console.log('userid:'+req.user.id)
    res.redirect('/dashboard');
  }
  else{
   res.render('register')
  }
})


userRouter.post('/register',
  imageUpload.single('profileImage'),
  [
    body('username').notEmpty().trim().escape(),
    body('username').custom(async (value, { req }) => {
      const user = await getUser(value);
      if (user) {
        throw new Error('Username already exist');
      }
      return true;
    }),
    body('password').isLength({ min: 8 }).withMessage('Password must have at least 8 characters'),
    body('confirmpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords must match');
        }
        return true;
      }),
  ],
  createUser
)

const {fetchUserBlogs}=require('../Controllers/blog');


userRouter.get('/dashboard',verifyJwt,async(req,res,next)=>{
  const user=req.user
       if(user){
        console.log(user)
        const blogs=await fetchUserBlogs(req.user.id)
         res.render('dashboard', { username: user.username,profileImage:user.profileImage,blogs:blogs});
       }
       else{
        res.redirect('/login');
       }
})

userRouter.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
});

// userRouter.get('*',(req,res,next)=>{
//   return res.send('404')
// })



