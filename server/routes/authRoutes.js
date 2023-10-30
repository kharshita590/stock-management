//require("./database/database").connect()
const User = require('../models/Employee.jsx')
const EmployeeModel = require('../models/Employee.jsx')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = express()
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const databaseUrl = process.env.DATABASE_URL;



app.post("/register", async (req, res) => {
    try {
        const { username, name, email, password } = req.body


        if (!(username && name && password && email)) {
            return res.status(400).send("All fields are compulsory")
        }

    //  const existingUser = await User.findOne({ email })
    //    if (existingUser) {
    //          return res.status(401).json({message: "already exists" })
    //     }


        const myEncPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            name,
            email: email,
            password: myEncPassword
        });
        await user.save();




        const token = jwt.sign(
            { id: user._id, email },
            jwtSecret,
            {
                expiresIn: "24hr"
            }

        );
        user.token = token
       // user.password = undefined



        return res.status(201).json(user)

    } catch (error) {
        console.log(error)

    }
})

app.post("/login", async (req, res) => {
    try {
        // Get all data from the frontend
        const { email, password } = req.body

        if (!(email && password)) {
            return res.status(400).send('Send all the data')
        }



        // Find the user in the database
        const user = await User.findOne({ email: email })

        if (user && (await bcrypt.compare(password, user.password))) {
            token = jwt.sign(
                { id: user._id },
                jwtSecret,
                {
                    expiresIn: "24hr"
                },

            );

            user.token = token;
            // user.password = undefined;


            // Send a token
            // Cookie section
            const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                //httpOnly: true,
                 secure:true,
            };

            return res.status(200)
                .cookie("token", token, option)
                .json({
                    success: true,
                    token,
                    user
                });
        } else {
            return res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
})

module.exports = app;






