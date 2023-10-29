const express = require('express')
const jwt = require('jsonwebtoken')
const app=express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const databaseUrl = process.env.DATABASE_URL;


const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);

const AuthenticateUser = async (req,res,next) =>{
   // const token = req.header('Authorization');
    let token = req.cookies.token;



    if(!token){
    res.status(401).json({message: 'unauthorized'})
    }
    try {
        const user = await jwt.verify(token, jwtSecret);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'unauthorized' });
    }

};
module.exports = AuthenticateUser;