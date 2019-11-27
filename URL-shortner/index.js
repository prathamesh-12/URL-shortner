const express = require('express');
const connectDB = require('./backend/config/database');

const app = express();

connectDB();
// Add middleware to accept json 
app.use(express.json({ extended: false }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    next();
});

app.use("/", require('./backend/routes/route'));



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on PORT - ${PORT}`);
});