// Textimo Backend
// This NodeJS app is the main server and should be hosted on a RaspberryPi device
// Software developed by Pavel Prodan in 2022

// Dependencies
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const { port } = require('./config/config.js');
const db = require("./services/db_loader.js");


// Load Databases


var doc = { hello: 'world'
               , n: 5
               , today: new Date()
               , nedbIsAwesome: true
               , notthere: null
               , notToBeSaved: undefined  // Will not be saved
               , fruits: [ 'apple', 'orange', 'pear' ]
               , infos: { name: 'nedb' }
               };

db.songs_db.insert(doc, function (err, newDoc) {   
    if(err){
        console.log(err);
    }
    console.log(newDoc);
});


// Routes requirements
const CheckForConnectionRoute = require("./routes/CheckForConnection.js");

app.use("/CheckForConnection", CheckForConnectionRoute);

app.listen(port, () => console.log("Server is listening on port " + port));