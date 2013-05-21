var MongoDb = require('mongodb').Db;
var Server = require('mongodb').Server;

var dbName      = 'twoarches',
    dbHost      = 'localhost',
    dbPort      = 27017;


var db = new MongoDb(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d) {
    if(e) {
        console.log(e);
    } else {
        console.log('Connected to :: ' + d.databaseName);
    }
});

exports.createCollection = function(name) {
    return db.collection(name);
};