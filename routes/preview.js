// this route use 2 different routes: 
// /preview/:song_id/all that returns from lyrics_db all the verses asociated to the given song_id
// /preview/:song_id/:verse_number that returns from lyrics_db the lyrics_text asociated to the given song_id and verse_number

const express = require("express");
const router = express.Router();
const get_lyrics_service = require("../services/get_lyrics_service.js");

router.get("/:song_id/all", (req, res) => {
    if(req.params.song_id){
        get_lyrics_service.getAllLyrics(req.params.song_id).then((result) => {
            if(result.length==0){
                res.sendStatus(400);
            }else{
                res.send(result);
            }
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(500);
    }
});

router.get("/:song_id/:verse_number", (req, res) => {
    if(req.params.song_id && req.params.verse_number){
        get_lyrics_service.getLyrics(req.params.song_id, req.params.verse_number).then((result) => {
            if(result==null){
                res.sendStatus(400);
            }else{
                res.send(result);
            }
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(500);
    }
});

module.exports = router;