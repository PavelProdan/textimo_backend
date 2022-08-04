const express = require("express");
var path = require('path');
const router = express.Router();
const app = express();
const io = require("../services/socketio_start_service.js");

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('messageGHGHHGGH: ' + msg);
  });
});

//use EJS as template engine for pages/LivePage.html
app.set('view engine', 'ejs');

router.get("/", (req, res) => {
    res.render(path.join(__dirname, '../pages/livepage.ejs'),{ title: "test title" });     
});


module.exports = router;