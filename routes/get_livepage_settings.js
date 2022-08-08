// this route is used to read the livepage_config.json file and return the content of the file as a json object
// this route use a GET request at /get_livepage_settings

const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../config/livepage_config.json'));
});

module.exports = router;