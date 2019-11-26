const mongoose = require('mongoose');
const config = require("config");
const db = config.get('mongoURI');

const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true           
        });

        console.log("Connected to database");
    } catch {
        console.log("ERROR - connecting to database");
        process.exit(1);
    }
}

module.exports = connectDB;