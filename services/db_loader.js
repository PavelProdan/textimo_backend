// Database Loader
var Datastore = require('nedb');

db = {};
db.songs_db = new Datastore('./database/songs.db');
db.lyrics_db = new Datastore('./database/lyrics.db');
db.reports = new Datastore('./database/reports.db');
db.livemanager = new Datastore('./database/livemanager.db');
db.livepage_config = new Datastore('./database/livepage_config.db');

db.songs_db.loadDatabase();
db.lyrics_db.loadDatabase();
db.reports.loadDatabase();
db.livemanager.loadDatabase();
db.livepage_config.loadDatabase();

module.exports = db;
