var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookRouter = express.Router();

var router = function(nav){
    bookRouter.use( function(req, res, next){
        if(!req.user) {
            res.redirect('/');
        }
        next();
    });

    var url = 'mongodb://localhost:27017/libraryApp';

    bookRouter.route('/')
        .get(function (req, res) {
            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.find({}).toArray(
                    function (err, results) {
                        res.render('bookListView', {
                            title: 'Book List',
                            nav: nav,
                            books: results
                        });
                    }
                ); //We would put query inside {}
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = new objectId(req.params.id);

            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.findOne({_id: id},
                    function (err, result) {
                        res.render('bookView', {
                            title: 'Book',
                            nav: nav,
                            book: result
                        });
                    });
            });
        });

    return bookRouter;
};

module.exports = router;