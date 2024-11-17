const mongoose=require('mongoose');
//for this model we are creating a schema
const RestSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    top_food:{
        type:String,
        required:true
    }
})

const rest =  mongoose.model('food',RestSchema);

module.exports = rest;