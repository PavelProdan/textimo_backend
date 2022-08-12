const db = require("./db_loader.js");

module.exports = function(){
    return new Promise((resolve, reject) => {
        db.livemanager.find({_id: "6jbWRY9acnSoazA4"}, function (err, docs) {   
            if(err){
                console.log(err);
                reject(err);
            }
            // check if the result is empty
            if(docs.length == 0){
                //if the result is empy insert a new record with id equals to 6jbWRY9acnSoazA4 and song_id and verse_number equals to 0
                db.livemanager.insert({_id: "6jbWRY9acnSoazA4", song_id: 0, verse_number: 0});
                resolve(JSON.parse(JSON.stringify(docs)));
            }
        });
    });

}