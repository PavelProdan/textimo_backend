// /song route module
// this module is used to edit, delete, and get a song from the database

//the get route use as parametres the song id and uses the getSong function from the song_service.js file to get the song from the database
//the delete route use as parametres the song id and uses the deleteSong function from the song_service.js file to delete the song from the database
//the put route use as url parameter the song id and body parameters the song_title and the total_num_lyrics and uses the editSong function from the song_service.js file to edit the song in the database

const express = require("express");
const router = express.Router();
const edit_verse_service = require("../services/edit_verse_service.js");

router.put("/:song_id/:verse_number", (req, res) => {
    if(req.body.lyrics_text && req.params.song_id && req.params.verse_number){
        edit_verse_service.EditVerse(req.params.song_id, req.params.verse_number, req.body.lyrics_text).then((result) => {
            if(result==0){
                res.sendStatus(400);
                console.log(result);
            }else{
            res.sendStatus(200);
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
