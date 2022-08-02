// /add_report route module
// this route is used to add a report to the database
// the report includes the following fields: song_id, verse_number, report_text
// the report is added to the database and the new report is returned

//this route need in request the following fields: song_id, verse_number, report_text, report_status

const express = require("express");
const db = require("../services/db_loader.js");
const router = express.Router();
const add_report_service = require("../services/add_report_service.js");

router.post("/", (req, res) => {
    if(req.body.song_id && req.body.verse_number && req.body.report_text && req.body.report_status){
        add_report_service(req.body.song_id, req.body.verse_number, req.body.report_text, req.body.report_status).then((result) => {
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