//include socket io
const http = require('http');
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//export socket io
module.exports = io;
