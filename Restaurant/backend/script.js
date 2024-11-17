// const mongoose = require('mongoose');
// const mongo_URL = "mongodb+srv://harshinid0601:harshini@cluster0.ht56c.mongodb.net/";

// const connectToMongo = async () => {
//     mongoose.Promise = global.Promise;
//     try {
//         await mongoose.connect(mongo_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("Connected to database");
//     } catch (error) {
//         console.error("Failed to connect", error);
//         process.exit(1);
//     }
// };

// const collection_name = 'restaurant';
// const collection_fields = {
//     name: String,
//     type: String,
//     location: String,
//     rating: String,
//     top_food: String
// };
// const collection_config = {
//     timestamps: false
// };

// const schema = new mongoose.Schema(collection_fields, collection_config);
// const RestaurantModel = mongoose.model(collection_name, schema);