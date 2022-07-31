//this is the main app
const express = require("express");
const app = express();

const { port } = require('./config/config.js');
const CheckForConnectionRoute = require("./routes/CheckForConnection.js");

app.use("/CheckForConnection", CheckForConnectionRoute);

app.listen(port, () => console.log("Server is listening on port " + port));