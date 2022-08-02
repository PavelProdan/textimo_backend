// Database Loader
var Datastore = require('nedb');

db = {};
db.songs_db = new Datastore('./database/songs.db');
db.lyrics_db = new Datastore('./database/lyrics.db');
db.reports = new Datastore('./database/reports.db');

db.songs_db.loadDatabase();
db.lyrics_db.loadDatabase();
db.reports.loadDatabase();

module.exports = db;
