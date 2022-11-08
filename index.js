// Textimo Backend
// This NodeJS app is the main server and should be hosted on a RaspberryPi device
// Software developed by Pavel Prodan in 2022

// Dependencies
const express = require("express");
const cors = require("cors");
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const restore_live_content_service = require("./services/restore_live_content_service.js");
const get_title_by_songID_service = require("./services/get_title_by_songID_service.js");
const live_manager_service = require("./services/live_manager_service.js");
const init_livemanager_service = require("./services/init_livemanager_service.js");
const init_livesettings_service = require("./services/init_livesettings_service.js");


app.use(cors());
app.use(express.json()); 
const { port } = require('./config/config.js');
app.set('view engine', 'ejs');
init_livemanager_service();
init_livesettings_service();

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
const add_reportRoute =  require("./routes/add_report.js");
const reportsRoute =  require("./routes/reports.js");
const LivePageRoute =  require("./routes/LivePage.js");
const get_livepage_settingsRoute =  require("./routes/get_livepage_settings.js");
const save_livepage_settingsRoute =  require("./routes/save_livepage_settings.js");
const editVerseRoute = require("./routes/editVerse.js");

// Routes def
app.use("/CheckForConnection", CheckForConnectionRoute);
app.use("/songs", songsRoute);
app.use("/add_song", add_songRoute);
app.use("/add_lyrics", add_lyricsRoute);
app.use("/song", songRoute);
app.use("/preview", previewRoute);
app.use("/add_report", add_reportRoute);
app.use("/reports", reportsRoute);
app.use("/LivePage", LivePageRoute);
app.use("/get_livepage_settings", get_livepage_settingsRoute);
app.use("/save_livepage_settings", save_livepage_settingsRoute);
app.use("/editVerse", editVerseRoute);


// The following routes need socket io and LivePlayingManager, so they doesn't use external modules

// declare a new post route for /project page that contains in body the following parameters: live_data, song_id, verse_number. Inside the route function we have to make sure that these variables are not empty. If they are empty, we have to return an error message.
app.post("/projector", (req, res) => {
  //check if live_data, song_id, verse_number are sent in the body of the request
  if(!req.body.live_data || !req.body.song_id || !req.body.verse_number){
    res.sendStatus(500);
  }else{
    //update the live_manager_service
    live_manager_service.update(req.body.song_id, req.body.verse_number);

    let title = get_title_by_songID_service(req.body.song_id);
    title.then(title => {
      io.emit('livetitle_verseNumber', {title: title.title, verse_number: req.body.verse_number, total_num_lyrics: title.total_num_lyrics});
      io.emit('livecontent', req.body.live_data);
    }).catch(error => {
      console.log(error);
    }
    );
    res.sendStatus(200);
  }
});


//declare a new GET route for /now_playing. This route returns the current song_id and verse_number of the livePlayingManager object in JSON format
app.get("/now_playing", (req, res) => {
  doc = live_manager_service.now_playing();
  doc.then(doc => {
    res.json(doc);
  }).catch(error => {
    console.log(error);
  }
  );
});


//declare a new GET route for /stop_playing. This route stops the live playing and sets the song_id and verse_number of the livePlayingManager object to 0
app.get("/stop_playing", (req, res) => {
  io.emit('livecontent', "");
  io.emit('livetitle', "");
  live_manager_service.update("0", "0");
  res.sendStatus(200);
});

//declare a new GET route for /refresh_livepage. This route sends a refresh signal to the live page
app.get("/refresh_livepage", (req, res) => {
  io.emit('refresh_livepage', "begin refresh");
  // wait for page to refresh
  io.on('connection', (socket) => {
    restore_live_content_service();
  });
  res.sendStatus(200);
});


// Starting the server
server.listen(port, () => {
    console.log(`
    \r\n ________                      __      __                         \r\n|        \\                    |  \\    |  \\                        \r\n \\$$$$$$$$______   __    __  _| $$_    \\$$ ______ ____    ______  \r\n   | $$  \/      \\ |  \\  \/  \\|   $$ \\  |  \\|      \\    \\  \/      \\ \r\n   | $$ |  $$$$$$\\ \\$$\\\/  $$ \\$$$$$$  | $$| $$$$$$\\$$$$\\|  $$$$$$\\\r\n   | $$ | $$    $$  >$$  $$   | $$ __ | $$| $$ | $$ | $$| $$  | $$\r\n   | $$ | $$$$$$$$ \/  $$$$\\   | $$|  \\| $$| $$ | $$ | $$| $$__\/ $$\r\n   | $$  \\$$     \\|  $$ \\$$\\   \\$$  $$| $$| $$ | $$ | $$ \\$$    $$\r\n    \\$$   \\$$$$$$$ \\$$   \\$$    \\$$$$  \\$$ \\$$  \\$$  \\$$  \\$$$$$$                                                     
    `);
    console.log("Server is listening on port " + port);
});