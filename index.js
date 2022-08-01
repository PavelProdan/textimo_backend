// Textimo Backend
// This NodeJS app is the main server and should be hosted on a RaspberryPi device
// Software developed by Pavel Prodan in 2022

// Dependencies
const express = require("express");
const cors = require("cors");
const helmet =  require("helmet");
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json()); 
const { port } = require('./config/config.js');


// Routes requirements
const CheckForConnectionRoute = require("./routes/CheckForConnection.js");
const songsRoute =  require("./routes/songs.js");
const add_songRoute =  require("./routes/add_song.js");


// Routes def
app.use("/CheckForConnection", CheckForConnectionRoute);
app.use("/songs", songsRoute);
app.use("/add_song", add_songRoute);


// Starting the server
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});