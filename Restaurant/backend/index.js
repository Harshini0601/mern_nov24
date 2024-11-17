const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();  
const port = 3005;

const restModel = require('./schema');
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://harshinid0601:harshini@cluster0.icn8j.mongodb.net/');
//mongodb+srv://harshinid0601:<db_password>@cluster0.icn8j.mongodb.net/


app.post('/insert', async(req,res)=>{
    const name = req.body.name;
    const type = req.body.type;
    const location = req.body.location;
    const rating = req.body.rating;
    const top_food = req.body.top_food;
   
    

    const rest = new restModel({name:name,type:type,location:location,rating:rating,top_food:top_food})// inserting into db another method is using insertOne
    try{

        await rest.save();//only after saving to the db nxt code is executed or msg is displayed
        res.send("inserted data");
        //async await is used to show a asynchronous op as synchronous

    }catch(err){

        console.log(err);
    }

})

app.get('/read',async(req,res)=>{
    try{
        const result = await restModel.find({});
        res.send(result);//to send to the front end part

    }catch(err){
        console.log(err);
    }

})

// app.put('/update', async (req, res) => {
//     const { id, newTopFood, newRating } = req.body;

//     try {
//         // Find the document by ID
//         const updatedFood = await restModel.findById(id);
        
//         // Update only the fields that are provided in the request body
//         if (newTopFood) {
//             updatedFood.top_food = newTopFood;
//         }
        
//         if (newRating) {
//             updatedFood.rating = newRating;
//         }

//         // Save the changes
//         await updatedFood.save();
//         res.send('Updated successfully');
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Failed to update');
//     }
// });
app.put('/update', async (req, res) => {
    const { id, newTopFood, newRating } = req.body;
  
    if (!id) {
      return res.status(400).send('ID is required for update');
    }
  
    try {
      // Find the document by ID
      const updatedFood = await restModel.findById(id);
      if (!updatedFood) {
        return res.status(404).send('Restaurant not found');
      }
  
      // Update only the provided fields
      if (newTopFood) updatedFood.top_food = newTopFood;
      if (newRating) updatedFood.rating = newRating;
  
      // Save changes to the database
      await updatedFood.save();
  
      // Fetch and return the updated document
      const updatedDocument = await restModel.findById(id);
      res.status(200).json({ message: 'Updated successfully', updatedDocument });
    } catch (err) {
      console.error("Update error:", err);  // Logs the exact error to the console
      res.status(500).send('Failed to update');
    }
  });
  
app.delete('/delete/:id',async(req,res)=>{
    try{

        const id = req.params.id;
        await restModel.findByIdAndDelete(id);
        res.send("deleted");

    }catch(err){
        console.log(err)

        
    }
})

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);

})
