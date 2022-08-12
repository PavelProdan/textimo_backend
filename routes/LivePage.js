const express = require("express");
var path = require('path');
const router = express.Router();
const app = express();
const fs = require("fs");
const ejs = require('ejs');
const db = require("../services/db_loader.js");

//use EJS as template engine for pages/LivePage.html
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

router.get("/", (req, res) => {
    db.livepage_config.findOne({ _id: "9kbWRY9acnSoazA5" }, (err, livepage_config) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            //render the page with the css_content field from the livepage_config database
            res.render(path.join(__dirname, '../pages/livepage.ejs'), { styles: livepage_config.css_content });
        }
    });
});


module.exports = router;