const express = require("express");
var path = require('path');
const router = express.Router();
const app = express();
const fs = require("fs");

// load the livepage_config.json file
const livepage_config = JSON.parse(fs.readFileSync(path.join(__dirname, "../config/livepage_config.json"), "utf8"));

//use EJS as template engine for pages/LivePage.html
app.set('view engine', 'ejs');

router.get("/", (req, res) => {
    res.render(path.join(__dirname, '../pages/livepage.ejs'),{ styles: livepage_config["css_content"] });     
});


module.exports = router;