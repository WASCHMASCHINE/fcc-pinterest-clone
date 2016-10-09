'use strict';
var mongo = require('mongodb').MongoClient;
var request = require("request");
var ObjectId = require('mongodb').ObjectId; 

function BookHandler(){
    this.search = function(req, res){
        var searchString = req.params[0];
        var googleApiString = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(searchString);
        console.log(googleApiString);
        request(googleApiString, function(error, response, body) {
            var jsonBody = JSON.parse(body);
            var jsonClient = {};
            jsonClient["title"] = jsonBody.items[0].volumeInfo.title;
            if (jsonBody.items[0].volumeInfo.imageLinks){
                jsonClient["imageLink"] = jsonBody.items[0].volumeInfo.imageLinks.thumbnail;
            } else {
                return res.json({}); // don't show it
            }
            jsonClient["imageLink"] = jsonClient["imageLink"].replace("http", "https"); // security
            console.log("jsonClient", jsonClient);
            
            mongo.connect(process.env.MONGO_URI, function(err, db){
                if (err) throw err;
               
                console.log(req.session.passport);
                var extendedDatabaseData = jsonClient;
                extendedDatabaseData["requesterId"] = "";
                extendedDatabaseData["ownerId"] = req.session.passport.user._id;
                db.collection('books-data').insert(extendedDatabaseData, function(err, data){
                    if (err) throw err;
                        res.json(jsonClient);
                });
            });
        });
    };

    
    this.getAllBooks = function(req, res){
        mongo.connect(process.env.MONGO_URI, function(err, db){
                if (err) throw err;
                db.collection('books-data').find({}).toArray(function(err, data){
                    if (err) throw err;
                    res.json(data);
                });
            });
    };
    
    this.getMyBooks = function(req, res){
        var userId = req.session.passport.user._id;
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('books-data').find({"ownerId": userId}).toArray(function(err, data){
                if (err) throw err;
                res.json(data);
            });
        });
    };
    
    this.requestBook = function(req, res){
        var bookId = req.params[0];
        var requesterId = req.session.passport.user._id;
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            console.log("requesting book",bookId, requesterId);
            db.collection('books-data').update({"_id": ObjectId(bookId)}, {$set: {"requesterId" : requesterId}});
            res.redirect("/mybooks");
        });
    };
    
    this.getMyRequests = function(req, res){
        var userId = req.session.passport.user._id;
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('books-data').find({"requesterId": userId}).toArray(function(err, data){
                if (err) throw err;
                res.json(data);
            });
        });
    };
    
    this.getRequestsToMe = function(req, res){
        var userId = req.session.passport.user._id;
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('books-data').find({"ownerId": userId, "requesterId" : {$ne: ""}}).toArray(function(err, data){
                if (err) throw err;
                res.json(data);
            });
        });
    };
}

module.exports = BookHandler;