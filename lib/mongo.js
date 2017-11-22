var mongojs = require('mongojs');
var DBprod = mongojs('127.0.0.1/Production');

module.exports.getUser = function( user, cb ) {
  var usersdb = DBprod.collection('users');
  usersdb.findOne({userid: user}, function(err, doc) {
    if ( err ) {
        return cb(new Error("An error has occured"));
    }
        cb(null, doc);
    });
}