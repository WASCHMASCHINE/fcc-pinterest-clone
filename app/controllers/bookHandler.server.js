'use strict';
var mongo = require('mongodb').MongoClient;
var request = require("request");

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
            console.log(jsonClient);
            
            mongo.connect(process.env.MONGO_URI, function(err, db){
                if (err) throw err;
                var extendedDatabaseData = jsonClient;
                extendedDatabaseData["UserIdsWhoRequestThis"] = [];
                extendedDatabaseData["UserIdsWhoOwnThis"] = []; // TODO: Put User ID here soon
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
}

module.exports = BookHandler;