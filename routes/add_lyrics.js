// add_lyrics/:song_id route module
//post parameters: song_id, lyrics_text, verse_number

const express = require("express");
const router = express.Router();
const add_lyrics_service = require("../services/add_lyrics_service.js");

router.post("/:song_id", (req, res) => {
    if(req.body.lyrics_text && req.body.verse_number && req.params.song_id){
        add_lyrics_service(req.params.song_id, req.body.lyrics_text, req.body.verse_number).then((result) => {
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




