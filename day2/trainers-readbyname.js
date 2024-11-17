const mongoose = require('mongoose');
const mongo_URL = "mongodb+srv://harshinid0601:harshini@cluster0.ecr83.mongodb.net/"

const connectToMongo = async() =>{
    mongoose.Promise = global.Promise;
    try{
        await mongoose.connect(mongo_URL);
        console.log("connected to database")
    }catch(error){
        console.error("Failed to connect",error);
        process.exit(1)

    }
}
const collection_name='Trainer';
    const collection_fields={
        name:String,
        location:String,
        technology: String,
        phone_number:String
};
const collection_config={
    timestamps: false
}

const schema= mongoose.Schema(collection_fields,collection_config);
const TrainerModel = mongoose.model(collection_name,schema);

const readByName=async()=>{
    await connectToMongo();
    try{
        const trainer=await TrainerModel.findOne({name:'ane'});
        console.log('trainer by name: ', trainer);
    }catch(err){
        console.log(err);
    }finally{
        await mongoose.disconnect();
        console.log('Conneciton to mongodb closed');
    }
}

readByName();