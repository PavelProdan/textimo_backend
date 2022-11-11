
const express = require("express");
const router = express.Router();
const search_service = require("../services/search_service.js");

router.get("/:query", (req, res) => {
    if(req.params.query){
        search_service(req.params.query).then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }
});

module.exports = router;