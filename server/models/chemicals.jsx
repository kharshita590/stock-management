const mongoose = require('mongoose');

const ChemicalsSchema = new mongoose.Schema({
    customId: { type: String, unique: true },
    dateOfEntry:Date,
    chemicalName:String,
    nonConsumable:String,
    quantity:Number,
    dateOfIssue:Date,
    amount:Number,
    quantityLeft:Number
});




const ChemicalsModel = mongoose.model("chemicals",ChemicalsSchema)

module.exports = ChemicalsModel;