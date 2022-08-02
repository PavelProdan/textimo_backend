// /song route module
// this module is used to edit, delete, and get a song from the database

//the get route use as parametres the song id and uses the getSong function from the song_service.js file to get the song from the database
//the delete route use as parametres the song id and uses the deleteSong function from the song_service.js file to delete the song from the database
//the put route use as url parameter the song id and body parameters the song_title and the total_num_lyrics and uses the editSong function from the song_service.js file to edit the song in the database

const express = require("express");
const router = express.Router();
const song_service = require("../services/song_service.js");

router.get("/:song_id", (req, res) => {
    if(req.params.song_id){
        song_service.getSong(req.params.song_id).then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(500);
    }
});

router.delete("/:song_id", (req, res) => {
    if(req.params.song_id){
        song_service.deleteSong(req.params.song_id).then((result) => {
            if(result==0){
                res.sendStatus(400);
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

router.put("/:song_id", (req, res) => {
    if(req.params.song_id && req.body.song_title && req.body.total_num_lyrics){
        song_service.editSong(req.params.song_id, req.body.song_title, req.body.total_num_lyrics).then((result) => {
            if(result==0){
                res.sendStatus(400);
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