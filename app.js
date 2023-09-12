const express = require('express');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const session = require("express-session");

const store = new session.MemoryStore();

const app = express();
const port = process.env.port || 4000; 

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.static('public'))

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 3600000, secure: false },
    saveUninitialized: true,
    resave: true,
    store,
  })
);

//Ejs View Engine
app.set('view engine', 'ejs')

//User Router
const userRouter = require('./Routes/userRouter')
app.use('/',userRouter)

const blogRouter = require('./Routes/blogRouter')
app.use('/blogs',blogRouter)





app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});