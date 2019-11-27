const express = require('express');
const validUrl = require('valid-url');
const shortID = require('shortid');
const config = require('config');

const router = express.Router();

const URL = require('../models/url');



router.get('/:urlCode', async (req, res) => {
    try {
        const foundUrl = await URL.findOne({ urlCode : req.params.urlCode });

        if(foundUrl) {
            return res.redirect(foundUrl.longUrl);
        } else {
            return res.status(400).json({ message: "No URL found" });
        }

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.post('/api/shorten', async (req, res) => {
    console.log(req.body);
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');
   
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json({
            message: "Invalid Base Url"
        });
    } 

    const urlCode = shortID.generate();

    if(validUrl.isUri(longUrl)) {
        try {
            let lUrl = await URL.findOne({ longUrl });

            if (lUrl) {
                res.status(200).json(lUrl);
            } else {
                const shortUrl = baseUrl + "/" + urlCode;
                lUrl = new URL({ urlCode, longUrl, shortUrl, date: new Date()});

                await lUrl.save();

                res.json(lUrl);
               
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Server Error"
            });
        }
    } else {
        res.status(401).json({
            message: "Invalid Actual Url"
        })
    }
});

module.exports = router;