var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongodb = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {
            mongodb.connect("mongodb://localhost:27017/acmeAccounts", function(err, db){

                var collection = db.collection('accounts');

                collection.findOne(
                      {email: username},
                      function (err, results) {
                        if (results != null && results.password === password) {
                            var user = results;
                            done(null, user);
                        }
                        else {
                            done(null, false, {message: 'Bad Password'});
                        }
                });
            })
        }
    ));
};
