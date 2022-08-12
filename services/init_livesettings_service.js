const db = require("./db_loader.js");

module.exports = function(){
    // search in the livepage_config database for the record with id equals to 9kbWRY9acnSoazA5
    // if there is no record with id equals to 9kbWRY9acnSoazA5, create a new record with _id equals to 9kbWRY9acnSoazA5 with the following fields:
    // bg_gradient_color_one, bg_gradient_color_two, font-size, font-color, font-family, text-align, showTitle, showCurrentStrofaNumber, padding-left, padding-bottom, css_content
    // all the fields will pe set to ""

    return new Promise((resolve, reject) => {
        db.livepage_config.find({_id: "9kbWRY9acnSoazA5"}, function (err, docs) {
            if(err){
                console.log(err);
                reject(err);
            }
            // check if the result is empty
            if(docs.length == 0){
                //if the result is empy insert a new record with id equals to 9kbWRY9acnSoazA5 and song_id and verse_number equals to 0
                db.livepage_config.insert({_id: "9kbWRY9acnSoazA5", bg_gradient_color_one: "", bg_gradient_color_two: "", font_size: "", font_color: "", font_family: "", text_align: "", showTitle: "", showCurrentStrofaNumber: "", padding_left: "", padding_bottom: "", css_content: ""});
                resolve(JSON.parse(JSON.stringify(docs)));
            }
        });
    });
}