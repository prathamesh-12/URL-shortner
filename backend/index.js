const express = require('express');
const connectDB = require('./config/database');

const app = express();

connectDB();
// Add middleware to accept json 
app.use(express.json({ extended: false }));

app.use("/", require('./routes/route'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on PORT - ${PORT}`);
});