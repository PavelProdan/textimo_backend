// /songs route module

const express = require("express");
const router = express.Router();
const get_all_songs_service = require("../services/get_all_songs_service.js");

router.get("/", (req, res) => {
    if(req.query.limit && req.query.offset){
        get_all_songs_service(req.query.limit, req.query.offset).then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }else{
        get_all_songs_service().then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }
});

module.exports = router;
