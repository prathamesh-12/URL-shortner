const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    urlCode: {
        type: String
    },
    longUrl: {
        type: String
    },
    shortUrl: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('url', urlSchema);