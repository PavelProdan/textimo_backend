const db = require("./db_loader.js");

//function to add a song to the database using NeDB and return the new document
function addSong(song_title, total_num_lyrics){
    return new Promise((resolve, reject) => {
        var doc = {
            song_title: song_title,
            total_num_lyrics: total_num_lyrics
        };

        db.songs_db.insert(doc, function (err, newDoc) {   
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(newDoc);
            resolve(JSON.parse(JSON.stringify(newDoc)));
        });
    });
}

//module exports to be used in other files and takes as parameters the song title and the total number of lyrics and uses the addSong function to add the song to the database
module.exports = function(song_title, total_num_lyrics){
        return addSong(song_title, total_num_lyrics);
};