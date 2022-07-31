//this is the main app
const express = require("express");
const { port } = require('./config/config.js');

const app = express();

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => console.log("Server is listening on port " + port));