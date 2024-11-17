//installing express, mongoose and cors
//using express creating a simple server 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();  //all the functionalities are used using app var, using all the methods of express from app
const port = 3003; // address for all requests and responses


const FoodModel = require('./Models/Food'); //path for importing
//const FoodModel = require('C:\learning\mern_stack\mern_nov24\day-3\Models\Food.js');


app.use(express.json());//parsing the data: for a server to understand tht we got in the form of json format it will convert so tht server is able to read
app.use(cors());
//cors - cross origin resource sharing

mongoose.connect('mongodb+srv://harshinid0601:harshini@cluster0.triyk.mongodb.net/');
//mongodb+srv://harshinid0601:<db_password>@cluster0.triyk.mongodb.net/
//use of insert: insert is a route
//controller the function part --remaining code
//to insert data into db
app.post('/insert', async(req,res)=>{
    const foodName = req.body.foodName;
    const days = req.body.days;
    // to take values foodname and days

    const food = new FoodModel({foodName: foodName, daysSinceiAte: days})// inserting into db another method is using insertOne
    try{

        await food.save();//only after saving to the db nxt code is executed or msg is displayed
        res.send("inserted data");
        //async await is used to show a asynchronous op as synchronous

    }catch(err){

        console.log(err);
    }

})
//to retrive the values
app.get('/read',async(req,res)=>{
    try{
        const result = await FoodModel.find({});
        res.send(result);//to send to the front end part

    }catch(err){
        console.log(err);
    }

})
// to update something
app.put('/update',async(req,res)=>{
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try{
        const updatedFood = await FoodModel.findById(id);
        updatedFood.foodName = newFoodName;
        await updatedFood.save();
        res.send('updated successfully');
        
    }catch(err){
        console.log(err);
    }
})
//for delete
app.delete('/delete/:id',async(req,res)=>{
    try{

        const id = req.params.id;
        await FoodModel.findByIdAndDelete(id);
        res.send("deleted");

    }catch(err){
        console.log(err)

        
    }
})


//info cmg from frontend will be in json format

// app.get('/',(req,res)=>{
//     res.send('Hello world!');
// })

// app.post('/',(res,res)=>{
//     res.send('post request received');
// })

// app.put('/users',(req,res)=>{
//     res.send('put request received')
// })

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);

})

