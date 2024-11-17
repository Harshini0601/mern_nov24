const mongoose=require('mongoose');
//for this model we are creating a schema
const FoodSchema =  new mongoose.Schema({
    foodName:{
        type:String,
        required:true,
    },
    daysSinceiAte:{
        type:Number,
        required:true
    }
})

const Food =  mongoose.model('food',FoodSchema);

module.exports = Food;
//for exporting and using it in another file