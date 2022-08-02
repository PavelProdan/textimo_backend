//service that get, deletes, and edits a song

const db = require("./db_loader.js");

//function to get a song from the database using NeDB and return the new document. The function takes as parametres the song id
function getSong(song_id){
    return new Promise((resolve, reject) => {
        db.songs_db.findOne({_id: song_id}, function (err, doc) {   
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(doc);
            resolve(JSON.parse(JSON.stringify(doc)));
        });
    });
}

//function to delete a song from the database using NeDB and return succes or failure. The function takes as parametres the song id
function deleteSong(song_id){
    return new Promise((resolve, reject) => {
        db.songs_db.remove({_id: song_id}, {}, function (err, numRemoved) {   
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(numRemoved);
            resolve(JSON.parse(JSON.stringify(numRemoved)));
        });
    });
}

//function to edit a song from the database using NeDB and return the new document. The function takes as parametres the song id, song title and the total number of lyrics
function editSong(song_id, song_title, total_num_lyrics){
    return new Promise((resolve, reject) => {
        var doc = {
            song_title: song_title,
            total_num_lyrics: total_num_lyrics
        };

        db.songs_db.update({_id: song_id}, doc, {}, function (err, numReplaced) {
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(numReplaced);
            resolve(JSON.parse(JSON.stringify(numReplaced)));
        });
    });
}

//module exports to be used in other files and exports the getSong, deleteSong and editSong functions
module.exports = {
    getSong: function(song_id){
        return getSong(song_id);
    }
    ,
    deleteSong: function(song_id){
        return deleteSong(song_id);
    }
    ,
    editSong: function(song_id, song_title, total_num_lyrics){
        return editSong(song_id, song_title, total_num_lyrics);
    }
};