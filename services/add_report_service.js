// add_report_service.js

const db = require("./db_loader.js");

//function to add a report to the database using NeDB
function add_report(song_id, verse_number, report_text, report_status){
    return new Promise((resolve, reject) => {
        db.reports.insert({song_id: song_id, verse_number: verse_number, report_text: report_text, report_status: report_status}, (err, newDoc) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(newDoc);
                resolve(JSON.parse(JSON.stringify(newDoc)));
            }
        });
    });
}

//export the module to use it in other files and take as parameter the song_id, verse_number, report_text, report_status
module.exports = (song_id, verse_number, report_text, report_status) => {
    return add_report(song_id, verse_number, report_text, report_status);
};
