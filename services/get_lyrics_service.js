// service that gets the lyrics from the database

const db = require("./db_loader.js");

//function to get all the lyrics from the database using NeDB and return the new document. The function takes as parametres the song id and sort the result by verse_number
function getAllLyrics(song_id){
    return new Promise((resolve, reject) => {
        db.lyrics_db.find({song_id: song_id}).sort({verse_number: 1}).exec(function (err, docs) {
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(docs);
            resolve(JSON.parse(JSON.stringify(docs)));
        });
    });
}

//function to get a specific lyrics from the database using NeDB and return the new document. The function takes as parametres the song id and the verse number
function getLyrics(song_id, verse_number){
    return new Promise((resolve, reject) => {
        db.lyrics_db.findOne({song_id: song_id, verse_number: verse_number}, function (err, doc) {   
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(doc);
            resolve(JSON.parse(JSON.stringify(doc)));
        });
    });
}

//module exports to be used in other files and exports the getAllLyrics and getLyrics functions
module.exports = {
    getAllLyrics: function(song_id){
        return getAllLyrics(song_id);
    }
    ,
    getLyrics: function(song_id, verse_number){
        return getLyrics(song_id, verse_number);
    }
};
