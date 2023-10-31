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


    try {
        const decoded = jwt.verify(token, jwtSecret);

        if (decoded) {
          // Check if the token is about to expire (e.g., within 30 minutes)
          if (decoded.exp - Date.now() / 1000 < 1800) {
            // Token is about to expire
            const newToken = jwt.sign({ user: decoded.user }, jwtSecret, { expiresIn: '1d' });
            res.cookie('token', newToken, { maxAge: 24 * 60 * 60 * 1000 }); // Set the new token in the response cookies
          }
        }
      } catch (err) {
        // Handle the error (e.g., token verification failure)
      }

      next();
    

}


//   req.user=decoded.user;

//  req.isAuthenticated = true;

//   next();

module.exports = AuthenticateUser;