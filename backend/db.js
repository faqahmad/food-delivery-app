const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:iahPGZUGmRiY6xlf@cluster0.di95dll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//  OLD WAY TO CONNECT TO MONGODB
// const mongoDB = async () => {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
//         if(err) console.log("---",err)
//         else {
//             console.log('connected');

//         }
//     });
// }

// NEW WAY TO CONNECT MONGODB
const mongoDB = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
};

// mongoDB();

module.exports = mongoDB;