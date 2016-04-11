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
                      {"name.first": "Ruby"},
                      function (err, results) {
                        console.log(results);
                        if (results != null && results.password === password) {
                            var user = results;
                            done(null, user);
                        }
                        else {
                            done(null, false, {message: 'Bad Password'});
                        }
                });



                // var foundUser = db('users').find({email: username});
                // if(foundUser != null && foundUser.password === password){
                //     done(null, foundUser);
                // }
                // else {
                //     done(null, false, {message: 'User not found'});
                // }
            })
        }
    ));
};
