const mongoose = require('mongoose');

const ObjectSchema = new mongoose.Schema({
    key:{
        type:String,
        unique:true
    },
    data:{
        type:Object
    }
});

const ObjectModel = new mongoose.model('object',ObjectSchema);

module.exports = ObjectModel;