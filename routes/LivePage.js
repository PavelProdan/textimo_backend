const express = require("express");
var path = require('path');
const router = express.Router();
const app = express();

//use EJS as template engine for pages/LivePage.html
app.set('view engine', 'ejs');

router.get("/", (req, res) => {
    res.render(path.join(__dirname, '../pages/livepage.ejs'),{ title: "test title" });     
});


module.exports = router;