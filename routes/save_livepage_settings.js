// this route is used to save the livepage settings in the livepage_config.json file located in the config folder
// this route use a POST request at /save_livepage_settings with a json object as a body. The json object contains all fields of the livepage_config.json file except for the "css_content"
// the css_content field will be filled by the generate_css_content function based on the other fields of the json object

// include express
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const generate_css_by_config_service = require("../services/generate_css_by_config_service.js");

// process the post request
router.post("/", (req, res) => {
    // check if the live_data, song_id, verse_number are sent in the body of the request
    if (req.body.bg_gradient_color_one && req.body.bg_gradient_color_two && req.body.font_size && req.body.font_color && req.body.font_family && req.body.text_align && req.body.showTitle && req.body.showCurrentStrofaNumber && req.body.padding_left && req.body.padding_bottom) {
        // declare a new json object to store the livepage settings
        let livepage_settings = {
            "bg_gradient_color_one": req.body.bg_gradient_color_one,
            "bg_gradient_color_two": req.body.bg_gradient_color_two,
            "font-size": req.body.font_size,
            "font-color": req.body.font_color,
            "font-family": req.body.font_family,
            "text-align": req.body.text_align,
            "showTitle": req.body.showTitle,
            "showCurrentStrofaNumber": req.body.showCurrentStrofaNumber,
            "padding-left": req.body.padding_left,
            "padding-bottom": req.body.padding_bottom,
            "css_content": ""
        };
        const css_content = generate_css_by_config_service(livepage_settings);
        livepage_settings["css_content"] = css_content;

        // rewirte the livepage_config.json file with the new livepage settings
        fs.writeFile(path.join(__dirname, "../config/livepage_config.json"), JSON.stringify(livepage_settings), (err) => {
            if (err) {
                console.log(err);
            }
        });
        
        res.send("success");
    }else{
        res.sendStatus(500);
    }

});

module.exports = router;