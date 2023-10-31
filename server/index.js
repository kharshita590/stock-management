const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const EmployeeModel = require('./models/Employee.jsx');
const ChemicalsModel = require('./models/chemicals.jsx');
app.use(express.json())

const auth = require('./routes/authRoutes');
app.use(cors());
// app.use(cors({
//   Access-Control-Allow-Origin: '*',
//   origin : ["https://stock-store-fr.vercel.app"],
//   credentials:true

// }));
app.use(auth);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const databaseUrl = process.env.DATABASE_URL;

var nodemailer = require('nodemailer');

const AuthenticateUser = require('./routes/newRoutes');
//app.set(EmployeeModel)
mongoose.connect(databaseUrl).then(() => console.log("Connected"))

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);

});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// app.post('/chemicals', AuthenticateUser, async (req, res) => {
//   try {
//     console.log('inside post api')
//     const { data } = req.body;
//     const body = req.body;
//     console.log(req.body)
//     //console.log(data);
//     const userId = req.user.id;
//     console.log(userId);


//     const newChemical = new ChemicalsModel({ ...body, user: userId });
//     const resp = await newChemical.save();
//     return res.json(resp)
//   }
//   catch (err) {
//     return res.status(500).json({ message: err.message });
//   }

// })


app.post('/chemicals', AuthenticateUser, async (req, res) => {
  try {
    const body = req.body;

    const userId = req.user.id;

    // 1. Save the chemical data to the Chemicals collection.
    const newChemical = new ChemicalsModel(body);

    const savedChemical = await newChemical.save();
    console.log(savedChemical)

    // 2. Get the _id of the newly created chemical document.
    var chemicalId = savedChemical._id;
    await ChemicalsModel.findByIdAndUpdate(chemicalId, {
      $push: { userId: userId }
    });

    // 3. Update the user document with the _id of the chemical.
    // Assuming you have a UserModel and the user has a chemicals array.
    await EmployeeModel.findByIdAndUpdate(userId, {
      $push: { Chemicals: chemicalId }

    });

    return res.json(savedChemical);
  }
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/chemicals',AuthenticateUser, async (req, res) => {

  try {
    const body = req.body;

    const userId = req.user.id;
    //console.log(userId);
    const chemicals = await ChemicalsModel.find({ userId: userId });
    //const chemicals = await ChemicalsModel.findById(chemicalId);
    //console.log(userId);
    return res.json(chemicals);
  } catch (error) {
    res.status(500).json({ message: error.message, user: req.user });

    console.error('Error saving data to MongoDB:', error);

  }
});

app.post('/chemicals/remove/:name', async (req, res) => {
  const chemicalName = req.params.name;
  const { quantityRemoved } = req.body;



  const y = await ChemicalsModel.findOne({ chemicalName: chemicalName })
    .then((chemicals) => {
      if (!chemicals) {
        return res.status(400).json({ message: "not found" });
      }

      if (quantityRemoved < 0 || quantityRemoved > chemicals.quantity) {
        return res.status(404).json({ message: "invalid quantity to remove" });

      }
      chemicals.quantityLeft -= quantityRemoved;

      return chemicals.save();

    })
    .then((updatedChemical) => {
      return res.json({ message: 'Chemical quantity removed successfully', updatedChemical })
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    })
});




app.post('/forget-password', async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await EmployeeModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1d"
    });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    var mailOptions = {
      from: process.env.EMAIL, // Make sure process.env.EMAIL is set correctly
      to: email,
      subject: 'Reset your password! How Fool! Forgot Your Password!',
      text: `https://stock-store-fr.vercel.app/reset-password/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        return res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/reset-password/:id/:token",(req, res)=> {
  const { id, token } = req.params
  const { password } = req.body

   jwt.verify(token, jwtSecret, (err, user) => {

    if (err) {

      res.status(401).json({ message: 'Invalid token' });
    } else {
      bcrypt.hash(password, 10)
        .then(hash => {
          EmployeeModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then(u => res.send({ Status: err }))
            .catch(err => res.send({ Status: err }))
        })
        .catch(err => res.send({ Status: err }))

    }
    // pass = show@12345




  });
})
// if (process.env.NODE_ENV === 'production') {
//   //app.use(express.static(__dirname + '/../public/'))
//   app.use(express.static(__dirname + '/../public'))



//   app.get('/.*/', (req, res) => {
//       res.sendFile(__dirname + '/../public/index.html');
//   });
// }


app.listen(4000, () => {
  console.log("server is running ")
})
