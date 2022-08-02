const db = require("./db_loader.js");

//function that returns all songs from the database and return the new document using NeDB
function getAllSongs(){
    return new Promise((resolve, reject) => {
        db.songs_db.find({}, function (err, docs) {   
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(docs);
            resolve(JSON.parse(JSON.stringify(docs)));
        });
    });
}

//function that return all songs from the database and return the new document using NeDB and takes as parameters the limit and offset
function getAllSongsWithLimitAndOffset(limit, offset){
    return new Promise((resolve, reject) => {
        db.songs_db.find({}).skip(offset).limit(limit).exec(function (err, docs) {   
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(docs);
            resolve(JSON.parse(JSON.stringify(docs)));
        });
    });
}

//module exports 2 functions to return all songs and return all songs with limit and offset and uses the getAllSongs and getAllSongsWithLimitAndOffset functions to return the songs from the database
module.exports = function(limit, offset){
    if(limit && offset){
        return getAllSongsWithLimitAndOffset(limit, offset);
    }else{
        return getAllSongs();
    }
};