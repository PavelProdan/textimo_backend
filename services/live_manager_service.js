const db = require("./db_loader.js");

function now_playing(){
    // this function returns the song_id and verse_number from the database by _id 6jbWRY9acnSoazA4
    return new Promise((resolve, reject) => {
        db.livemanager.findOne({_id: "6jbWRY9acnSoazA4"}, function (err, doc) {
            if(err){
                console.log(err);
                reject(err);
            }
            resolve(doc);
        }
        );
    }
    );
}

function stop_playing(){
    // this function sets the song_id and verse_number to null in the database by _id 6jbWRY9acnSoazA4
    return new Promise((resolve, reject) => {
        db.livemanager.update({_id: "6jbWRY9acnSoazA4"}, {$set: {song_id: 0, verse_number: 0}}, function (err, doc) {
            if(err){
                console.log(err);
                reject(err);
            }
            resolve(JSON.parse(JSON.stringify(doc)));
        }
        );
    }
    );
}

function update(song_id, verse_number){
    // this function updates the song_id and verse_number in the database by _id 6jbWRY9acnSoazA4
    return new Promise((resolve, reject) => {
        db.livemanager.update({_id: "6jbWRY9acnSoazA4"}, {$set: {song_id: song_id, verse_number: verse_number}}, function (err, doc) {
            if(err){
                console.log(err);
                reject(err);
            }
            resolve(JSON.parse(JSON.stringify(doc)));
        }
        );
    }
    );
}

//exports the functions to be used in other files
module.exports = {
    now_playing: function(){return now_playing();},
    stop_playing: function(){return stop_playing();},
    update: function(song_id, verse_number){return update(song_id, verse_number);}
}

