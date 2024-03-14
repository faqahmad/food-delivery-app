const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:iahPGZUGmRiY6xlf@cluster0.di95dll.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("...", err)
        else {
            console.log("Connected to MongoDB");
            const fetched_data = await mongoose.connect.db.collection("food_items");
            fetched_data.find({}).toArray(function(err, data){
                if(err) console.log(err);
                else console.log(data);
            })
        }
    });
}

module.exports = mongoDB();