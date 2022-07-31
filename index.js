//this is the main app
const express = require("express");
const PORT = 3000;

const app = express();

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log("Server is listening on port " + PORT));