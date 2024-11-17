const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const userSchema =  new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    lastEatenDate:{
        type: Date,
        required: true,
    },
    user:{
        //used to connect another schema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Food = mongoose.model('Food', foodSchema);

const verifyToken = (req, res, next)=>{
    let token = req.headers['authorization'];
    token = token.replace('Bearer ',"");
    if(!token) return res.status(403).json({message: 'Token not provided'});
    jwt.verify(token,"your_secret_key",(err, decoded)=>{
        if(err) return res.status(401).json({message: 'failed to authenticate'})
        req.user = decoded.userId;
        next();

    })
}// beared jgjhjhjhdkjfgjdfj

app.post('/api/register', async(req,res)=>{
    try{
        //object destructuring
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({username, password: hashedPassword});
        await user.save();
        res.status(201).json({message: 'user registered successully'});

        //const user = req.body.username;    another method for destructuring
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'failed to register usert'});
    }
});

app.post('/api/login',async (req,res)=>{
    try{
        const {username, password}=req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({error: 'Invalid credentials'});
        }
//bcrypt.compare is used to see if pw matches or not
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({error: 'Invalid credentials'});
        }
        const token = jwt.sign({userId: user._id},'your_secret_key', {expiresIn: '1h'});

        res.json({token, userId: user._id});
    }catch(err){
        console.error(err);
        res.status(500).json({error: ' Failed to login user'})
    }
});
    
//Connect to MongoDB
//bcrpypt is used for password hashing
//jsonwebtoken 
app.post('/api/foods', verifyToken, async(req, res)=>{
    try{
        const {name, lastEatenDate}= req.body;
        const food = new Food({name, lastEatenDate:new Date(lastEatenDate), user: req.userId});
        await food.save();
        res.status(201).json({message: 'food added successfully'})
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'failed to add food'});

    }
})
app.get('/api/foods',verifyToken, async(req,res)=>{
    try{
        const foods = await foods.find({user: req.userId});
        res.json(foods);
    }catch(err){
        res.status(500).json({error: 'failed to fetch food'});

    }
});

app.put('/api/foods/:id',verifyToken,async(req,res)=>{
    try{
        const {lastEatenDate}= req.body;
        const food = await Food.findOneAndUpdate(
            {_id: req.params.id, user: req.userId},
            {lastEatenDate: new Date(lastEatenDate)},
            {new: true}
        );
        if(!food){
            return res.status(404).json({error:'food not found'});
        }
        res.json(food);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'failed to update food'});
    }
});

// app.delete('/api/foods/:id',verifyToken,async(req,res)=>{
//     try{
//         const id = req.params.id;
//         await FoodModel.findByIdAndDelete(id);
//         res.send("deleted");

//     }catch(err){
        
//     }
// })
const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});

