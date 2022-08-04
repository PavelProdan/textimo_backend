const express = require("express");
var path = require('path');
const router = express.Router();
const app = express();
const io = require("../services/socketio_start_service.js");

//use EJS as template engine for pages/LivePage.html
app.set('view engine', 'ejs');


router.get("/", (req, res) => {
    res.setHeader(
        'Content-Security-Policy-Report-Only',
        "script-src 'self' https://unpkg.com/vue@3.0.2/dist/ 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'"
        
        );
    //send the pages/LivePage.html file to the client using EJS template engine and send a variable ass wel
    res.render(path.join(__dirname, '../pages/LivePage.ejs'), { title: 'LivePage Title' });       
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

module.exports = router;