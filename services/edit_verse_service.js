const db = require("./db_loader.js");

// this service uses a function EditVerse(song_id, verse_number, verse_text) to edit a verse in the database

function EditVerse(song_id, verse_number, lyrics_text){
   
    // return a promise
    // this promise contains an update stament for NeDB that updates lyrics.db with the new lyrics_text by searching the song using song_id and verse_number
    
    return new Promise((resolve, reject) => {
        
            db.lyrics_db.update({$and:[{song_id: song_id}, {verse_number: parseInt(verse_number)}]}, {$set: {lyrics_text: lyrics_text}}, {}, (err, numReplaced) => {
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    console.log(numReplaced);
                    resolve(JSON.parse(JSON.stringify(numReplaced)));
                }
            });
        });
    }

//module exports to be used in other files and exports the getSong, deleteSong and editSong functions
module.exports = {
    EditVerse: function(song_id, verse_number, lyrics_text){
        return EditVerse(song_id, verse_number, lyrics_text);
    }
};

