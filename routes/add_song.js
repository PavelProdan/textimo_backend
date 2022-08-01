// /add_songs route module

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("add_songs");
});

module.exports = router;
