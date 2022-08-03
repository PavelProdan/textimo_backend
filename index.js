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

app.use(helmet());
app.use(cors());
app.use(express.json()); 
const { port } = require('./config/config.js');

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


// Starting the server
server.listen(port, () => {
    console.log("Server is listening on port " + port);
});