'use strict';
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

function HuskyHandler(){
    this.addHusky = function(req, res){
        var newHusky = { "imgLink": req.body.huskyImgLink, 
                         "description": req.body.huskyDescription,
                         "twitterId": req.session.passport.user.userId };
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('husky-data').insert(newHusky, function(err, data){
                if (err) throw err;
                res.redirect("/my_huskies")
                });
            });
        };
    this.deleteHusky = function(req, res){
        var idToDelete = req.params[0];
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('husky-data').remove({"_id": ObjectId(idToDelete)}, function(err, data){
                if (err) throw err;
                res.redirect("/my_huskies")
                });
            });  
     };
    
    this.getAllHuskies = function(req, res){
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err){
              throw err;
            } 
            db.collection('husky-data').find({}).toArray(function(err, data){
                if (err) throw err;
                res.json(data);
            });
        });
    }
    
    this.getMyHuskies = function(req, res){
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err){
              throw err;
            } 
            db.collection('husky-data').find({"twitterId": req.session.passport.user.userId}).toArray(function(err, data){
                if (err) throw err;
                res.json(data);
            });
        });
    }
}

module.exports = HuskyHandler;