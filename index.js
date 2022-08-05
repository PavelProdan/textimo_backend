// Textimo Backend
// This NodeJS app is the main server and should be hosted on a RaspberryPi device
// Software developed by Pavel Prodan in 2022

// Dependencies
const express = require("express");
const cors = require("cors");
const http = require('http');
const helmet =  require("helmet");
const app = express();
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server);

//app.use(helmet());
app.use(cors());
app.use(express.json()); 
const { port } = require('./config/config.js');
app.set('view engine', 'ejs');

// Swagger
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger/swagger.json");
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);


// Routes requirements
const CheckForConnectionRoute = require("./routes/CheckForConnection.js");
const songsRoute =  require("./routes/songs.js");
const add_songRoute =  require("./routes/add_song.js");
const add_lyricsRoute =  require("./routes/add_lyrics.js");
const songRoute =  require("./routes/song.js");
const previewRoute =  require("./routes/preview.js");
//const projectorRoute =  require("./routes/projector.js");
//const now_playingRoute =  require("./routes/now_playing.js");
//const stop_playingRoute =  require("./routes/stop_playing.js");
const add_reportRoute =  require("./routes/add_report.js");
const reportsRoute =  require("./routes/reports.js");
const LivePageRoute =  require("./routes/LivePage.js");

// Routes def
app.use("/CheckForConnection", CheckForConnectionRoute);
app.use("/songs", songsRoute);
app.use("/add_song", add_songRoute);
app.use("/add_lyrics", add_lyricsRoute);
app.use("/song", songRoute);
app.use("/preview", previewRoute);
//app.use("/projector", projectorRoute);
//app.use("/now_playing", now_playingRoute);
//app.use("/stop_playing", stop_playingRoute);
app.use("/add_report", add_reportRoute);
app.use("/reports", reportsRoute);
app.use("/LivePage", LivePageRoute);


// The following routes need socket io, so they doesn't use external modules

// declare a new post route for /project page that contains in body the following parameters: live_data, song_id, verse_number. Inside the route function we have to make sure that these variables are not empty. If they are empty, we have to return an error message.
app.post("/projector", (req, res) => {
  //check if live_data, song_id, verse_number are sent in the body of the request
  if(!req.body.live_data || !req.body.song_id || !req.body.verse_number){
    res.sendStatus(500);
  }else{
    //emit data to socket io
    io.emit('livecontent', req.body.live_data);
    res.sendStatus(200);
  }
} );

// Starting the server
server.listen(port, () => {
    console.log("Server is listening on port " + port);
});