var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

var userRoute = function () {
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/User/' + req.user._id);
        });

    return authRouter;
};

module.exports = userRoute;