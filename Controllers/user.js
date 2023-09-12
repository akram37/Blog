const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const secretKey = 'Fino Alla Fine'; 
const { addUser } = require('../Api/userApi');

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('register', { errors: errors.array() });
  } else {
    const { username, password } = req.body;
    const imagePath = req.file ? `${req.file.filename}` : 'default-image.jpg';
    const newUser = {
      username: username,
      password: await bcrypt.hash(password, 10),
      profileImage: imagePath,
    };
    addUser(newUser);
    const token = jwt.sign({ username: newUser.username, profileImage: newUser.profileImage }, secretKey, { expiresIn: '1h' });
    res.cookie('jwt', token);
    req.session.isAuth=true
    req.session.token=token
    console.log(req.session)
    res.redirect('/dashboard');
  }
};
