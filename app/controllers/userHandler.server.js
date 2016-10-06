'use strict';
var mongo = require('mongodb').MongoClient;

function UserHandler(){
    this.signup = function(req, res){
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('books-user').insert(req.query, function(err, data){
                if (err) throw err;
                res.send("OK");
            });
        });
        
    };
    /*
    this.login = function(req, res){
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('books-user').find(req.query).toArray(function(err, data){
                if (err) throw err;
                if (data.length >= 1){
                    res.send("OK");    
                } else {
                    res.send("NOT FOUND");
                }
                
            });
        });
        
    };*/
}

module.exports = UserHandler;