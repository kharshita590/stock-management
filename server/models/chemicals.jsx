const mongoose = require('mongoose');
const EmployeeModel = require('./Employee.jsx');

const ChemicalsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"EmployeeSchema",
    },
    dateOfEntry:Date,
    chemicalName:String,
    nonConsumable:String,
    quantity:Number,
    dateOfIssue:Date,
    amount:Number,
    quantityLeft:Number,

});




const ChemicalsModel = mongoose.model("chemicals",ChemicalsSchema)

module.exports = ChemicalsModel;