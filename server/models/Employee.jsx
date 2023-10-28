const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    Chemicals: [{ type: mongoose.Schema.Types.Object, ref: "EmployeeSchema" }],
})



const EmployeeModel = mongoose.model("employees",EmployeeSchema)

module.exports = EmployeeModel;