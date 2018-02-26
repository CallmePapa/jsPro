var mongdb = require('mongodb');

var dbServer = new mongdb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongdb.Db('mydb', dbServer, {w: 1});
