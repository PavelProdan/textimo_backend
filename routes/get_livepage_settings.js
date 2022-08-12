// this route is used to read the livepage_config.json file and return the content of the file as a json object
// this route use a GET request at /get_livepage_settings

const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../services/db_loader.js");

router.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname, '../config/livepage_config.json'));
    db.livepage_config.findOne({ _id: "9kbWRY9acnSoazA5" }, (err, livepage_config) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(livepage_config);
        }
    });
});

module.exports = router;