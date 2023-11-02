const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const databaseUrl = process.env.DATABASE_URL;
var setCookie = require('set-cookie-parser');


const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);

const AuthenticateUser = (req, res, next) => {
    // const token = req.header('Authorization');
    let token = req.cookies.token;
    console.log(token)

    if (!token) {
        res.status(401).json({ message: 'unauthorized hi' })
    }

    // jwt.verify(token, jwtSecret, { expiresIn: '24hr' }, (err, user) => {
    //     console.log(token)
    //     console.log(user)
    //     if (err) {
    //         console.log(err);
    //         return res.status(401).json({ message: 'Failed to authenticate token' });

    //     }
    //     req.user = user;


    //     return next();



    // });
    try {
        const decoded = jwt.verify(token, jwtSecret);

        if (decoded) {

          if (decoded.exp - Date.now() / 1000 < 1800) {

            const newToken = jwt.sign({ user: decoded.user }, jwtSecret, { expiresIn: '1d' });
            res.cookie('token', newToken, { maxAge: 24 * 60 * 60 * 1000 });
          }
        }
      } catch (err) {
          return res.status(500).send({message:"hui"})
      }

      next();

 }


//   req.user=decoded.user;

//  req.isAuthenticated = true;

//   next();

module.exports = AuthenticateUser;