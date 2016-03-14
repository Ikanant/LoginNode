var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const low = require('lowdb');
const storage = require('lowdb/file-sync')
const db = low('src/data/users.json', { storage })

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {
            console.log('+' + username);
            console.log('++' + password);
            console.log(db('').size());
        }
    ));
};