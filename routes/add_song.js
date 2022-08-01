// /add_songs route module

const express = require("express");
const db = require("../services/db_loader.js");
const router = express.Router();

router.post("/", (req, res) => {

    if(req.body.song_title && req.body.total_num_lyrics){

        var doc = {
            song_title: req.body.song_title,
            total_num_lyrics: req.body.total_num_lyrics
        };

        db.songs_db.insert(doc, function (err, newDoc) {   
            if(err){
                console.log(err);
                res.sendStatus(500);
            }
            console.log(newDoc);
            res.send(JSON.parse(JSON.stringify(newDoc)));
        });
        
    }else{
        res.sendStatus(500);
    }       
});

module.exports = router;
