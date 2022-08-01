// Textimo Backend
// This NodeJS app is the main server and should be hosted on a RaspberryPi device
// Software developed by Pavel Prodan in 2022

// Dependencies
const express = require("express");
const cors = require("cors");
const app = express();
app.use(helmet());
app.use(cors());
const { port } = require('./config/config.js');
const db = require("./services/db_loader.js");

// _id: 'id1', song_title, total_num_lyrics               

var doc2 = {
    song_title: 'Example song number 1',
    total_num_lyrics: 8
};

// db.songs_db.insert(doc2, function (err, newDoc) {   
//     if(err){
//         console.log(err);
//     }
//     console.log(newDoc);
//     new_doc_json = JSON.parse(JSON.stringify(newDoc));
//     console.log(new_doc_json._id);
// });


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