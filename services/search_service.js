const db = require("./db_loader.js");

// this service implements a function called Search(query) that search in songs.db by "song_title" for the query and retuns the results
function Search(query){

    return new Promise((resolve, reject) => {
        // the find function searches using the query as keyword in the song_title field. It's not an exact match, it's a partial match
        db.songs_db.find({song_title: {$regex: new RegExp(query, "i")}}, function (err, docs) {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(docs);
                resolve(JSON.parse(JSON.stringify(docs)));
            }
        });
    });
}

module.exports = function(query){
    return Search(query);
};