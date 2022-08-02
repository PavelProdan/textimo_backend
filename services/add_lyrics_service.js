//service that appends a lyrics to a song in the database and inserts the lyrics into the lyrics database
const db = require("./db_loader.js");

//function to add lyrics to the database using NeDB and return the new document. The function takes as parametres the song id lyrics text and the verse number
function addLyrics(song_id, lyrics_text, verse_number){
    return new Promise((resolve, reject) => {
        var doc = {
            song_id: song_id,
            lyrics_text: lyrics_text,
            verse_number: verse_number
        };

        db.lyrics_db.insert(doc, function (err, newDoc) {   
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(newDoc);
            resolve(JSON.parse(JSON.stringify(newDoc)));
        });
    });
}

//module exports to be used in other files and takes as parameters the song id, lyrics text and the verse number and uses the addLyrics function to add the lyrics to the database
module.exports = function(song_id, lyrics_text, verse_number){
        return addLyrics(song_id, lyrics_text, verse_number);
};