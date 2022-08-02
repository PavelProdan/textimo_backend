// /add_songs route module

const express = require("express");
const add_song_service = require("../services/add_song_service.js");
const router = express.Router();

router.post("/", (req, res) => {
    if(req.body.song_title && req.body.total_num_lyrics){
        add_song_service(req.body.song_title, req.body.total_num_lyrics).then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(500);
    }
});

module.exports = router;
