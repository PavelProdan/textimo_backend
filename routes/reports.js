// /reports route module
/// this route accept GET request and return all the reports in the database
// also, this route is used to update a report using a PUT request

//to update a report you need to send in the request the following fields: report_id, report_status

const express = require("express");
const router = express.Router();
const get_update_report_service = require("../services/get_update_report_service.js");

router.get("/", (req, res) => {
    get_update_report_service.get_reports().then((result) => {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.sendStatus(400);
        }
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.put("/", (req, res) => {
    if(req.body.report_id && req.body.report_status){
        get_update_report_service.update_report(req.body.report_id, req.body.report_status).then((result) => {
            if(result === 1){
                res.sendStatus(200);
            }else{
                res.sendStatus(400);
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
