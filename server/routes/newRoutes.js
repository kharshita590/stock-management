const express = require('express')
const jwt = require('jsonwebtoken')
const app=express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const databaseUrl = process.env.DATABASE_URL;


const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);

const AuthenticateUser = (req,res,next) =>{
   // const token = req.header('Authorization');
    let token = req.cookies.token;



    if(!token){
    res.status(401).json({message: 'unauthorized'})
    }
jwt.verify(token,jwtSecret,(err,user)=>{
    console.log(token)
    console.log(user)
    if(err){
        console.log('HI');
        console.log(err)
        //res.status(401).json({ message: 'Invalid token' });
    }
    req.user=user;
    console.log(req.user,"hii")
    //req.isAuthenticated = true;
    next();



});


}

    //   req.user=decoded.user;

    //  req.isAuthenticated = true;

    //   next();

module.exports = AuthenticateUser;