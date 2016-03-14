var express = require('express');

const low = require('lowdb');
const storage = require('lowdb/file-sync');
const db = low('src/data/users.json', {storage});

var userRouter = express.Router();

var router = function(nav){
    userRouter.use( function(req, res, next){
        if(!req.user) {
            res.redirect('/');
        }
        next();
    });

    userRouter.route('/:_id')
        .get(function (req, res) {
            var id = req.params._id;
            var foundUser = db('users').find({_id: id});

            if(foundUser!=null){
                res.render('userView', {
                    title: 'Profile',
                    nav: nav,
                    user: foundUser
                });
            }
        });

    return userRouter;
};

module.exports = router;