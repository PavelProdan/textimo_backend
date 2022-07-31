// Textimo Backend
// This NodeJS app is the main server and should be hosted on a RaspberryPi device
// Software developed by Pavel Prodan in 2022

const express = require("express");
const app = express();

// Modules
const { port } = require('./config/config.js');
const CheckForConnectionRoute = require("./routes/CheckForConnection.js");
const test_module = require("./test_module.js");

app.use("/CheckForConnection", [
    CheckForConnectionRoute,
    test_module.test
]);

app.listen(port, () => console.log("Server is listening on port " + port));