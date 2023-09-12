const jwt = require('jsonwebtoken');
const secretKey = 'Fino Alla Fine';

  
exports.verifyJwt = (req, res, next) => {
      const token=req.cookies.jwt;
          jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
              req.user=null
            } else {
              req.user = decoded;
            }
            next()
          });
    }
    

    const {getUser}=require('../Services/user')
    const bcrypt = require('bcrypt');

exports.loginUserHandler = (req, res, next) => {
        const { username, password } = req.body;
        getUser(username)
          .then(async (user) => {
            if (user) {
              const passwordMatch = await bcrypt.compare(password, user.password);
              if (passwordMatch) {
                const token = jwt.sign(
                  {userid:username.id, username: user.username, profileImage: user.profileImage },
                  secretKey,
                  { expiresIn: '1h' }
                );
                res.cookie('jwt', token);
                res.redirect('/dashboard');
              } else {
                res.render('login', { error: 'Username Or Password Incorrect' });
              }
            } else {
              res.render('login', { error: 'Username Or Password Incorrect' });
            }
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
          });
      };
      