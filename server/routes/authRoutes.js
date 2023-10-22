require('dotenv').config()
//require("./database/database").connect()
const EmployeeModel = require('../models/Employee.jsx')
const User = require('../models/Employee.jsx')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookieparser')
const app= express()


app.get("/",(req,res)=>{
    res.send("<h1>Server is working </h1>")
})

app.post("/register",async(req,res) => {
    try{
        const {username,name,password,email}=req.body

        EmployeeModel.create(req.body)
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err))

        if(!(username && name && password && email)){
               res.status(400).send("All fields are compulsory")
        }

        const existingUser=await User.findOne({email})
        if(existingUser){
            res.status(401).send("User already exists")
        }


        const myEncPassword=await bcrypt.hash(password,10)

        const user = await User.create({
            username,
            name,
            email,
            password:myEncPassword
        })

        jwt.sign(
            {if:user._id,email},
            'sshh', //process.env.jwtsecret
            {
                expiresIn:"2h"
            }

        );
        user.token = token
        user.password=undefined



    res.status(201).json(user)

    }catch(error){
        console.log(error)

    }
})

app.post("/login",async(req,res)=>{
    try{
        //get all data from frontend
        const {email,password}=req.body

        if(!(email && password)){
            res.status(400).send('send all the data ')

        }
        // find user in DB
        const user = await User.findOne({email})
        // match the password
        if(user &&( await bcrypt.compare(password,user.password))){
            const token = jwt.sign(
                {id:user._id},
                'sshh',
                {
                    expiresIn:"2h"
                }

            );
            user.token=token
            user.password=undefined
        }


        // send a token
          //cookie section
          const option ={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly: true
        };
        res.status(200).cookie("token",token,options).json({
            success:true,
            token,
            user
        })

    }catch(error){
        console.log(error)
    }
})

module.exports = app;