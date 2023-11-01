const mongoose = require('mongoose');
const EmployeeModel = require('./Employee.jsx');

const ChemicalsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"EmployeeSchema",
    },
    dateOfEntry:{ type: Date, default: Date.now },
    chemicalName:String,
    nonConsumable:String,
    quantity:Number,
    dateOfIssue:{ type: Date, default: Date.now },
    amount:Number,
    quantityLeft:Number,

});




const ChemicalsModel = mongoose.model("chemicals",ChemicalsSchema)

module.exports = ChemicalsModel;