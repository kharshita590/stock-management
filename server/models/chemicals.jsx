const mongoose = require('mongoose');
const EmployeeModel = require('./Employee.jsx');

const ChemicalsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"EmployeeSchema",
    },
    dateOfEntry:{ type: String},
    chemicalName:String,
    nonConsumable:String,
    quantity:Number,
    dateOfIssue:{ type: String},
    amount:Number,
    quantityLeft:{
        type:Number,
        default:0
    },

});




const ChemicalsModel = mongoose.model("chemicals",ChemicalsSchema)

module.exports = ChemicalsModel;