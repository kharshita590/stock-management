const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser');
//const EmployeeModel = require('./models/Employee.jsx');
const ChemicalsModel = require('./models/chemicals.jsx');
const app=express();
app.use(express.json())
const auth=require('./routes/authRoutes');
app.use(cors())
app.use(auth)
app.use(bodyParser.urlencoded({
    extended: false
 }));
 app.use(bodyParser.json());
//app.set(EmployeeModel)
mongoose.connect("mongodb://localhost:27017").then(()=>console.log("Connected"))

app.post('/chemicals',(req,res)=>{
    const newChemical = new ChemicalsModel(req.body);
     newChemical.save()
    .then(chemicals=>res.json(chemicals))
    .catch(err=>res.json(err))
})



app.get('/chemicals', async (req, res) => {
    try {
      const chemicals = await ChemicalsModel.find();
      res.json(chemicals);
    } catch (error) {
      res.status(500).json({ message: error.message });

        console.error('Error saving data to MongoDB:', err);

    }
  });

  app.post('/chemicals/remove/:name', (req, res) => {
      const chemicalName=req.params.name;
      const{quantityRemoved}=req.body;



      ChemicalsModel.findOne({chemicalName:chemicalName})
      .then((chemicals) => {
          if(!chemicals){
              return res.status(400).json({message:"not found"});
          }

            if(quantityRemoved < 0 || quantityRemoved>chemicals.quantity){
                return res.status(404).json({message:"invalid quantity to remove"});

          }
          chemicals.quantityLeft-=quantityRemoved;

          return chemicals.save();

      })
      .then((updatedChemical)=>{
          res.json({ message: 'Chemical quantity removed successfully', updatedChemical })
      })
      .catch((err)=>{
        res.status(500).json({ message: 'Internal server error' });
      })
  });




app.listen(4000,()=>{
    console.log("server is running ")
})

