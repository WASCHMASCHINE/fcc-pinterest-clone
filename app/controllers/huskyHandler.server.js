'use strict';
var mongo = require('mongodb').MongoClient;

function HuskyHandler(){
    this.addHusky = function(req, res){
        console.log(req.session.passport.user.userId)
        console.log(req.body);
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
    
    this.getAllHuskies = function(req, res){
        mongo.connect(process.env.MONGO_URI, function(err, db){
                if (err){
                  throw err;
                } 
                db.collection('husky-data').find({}).toArray(function(err, data){
                    if (err) throw err;
                    console.log(data);
                    res.json(data);
                });
            });
    }
    
    this.getMyHuskies = function(req, res){
        /*var userId = req.session.passport.user._id;
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('books-data').find({"ownerId": userId}).toArray(function(err, data){
                if (err) throw err;
                res.json(data);
            });
        });*/
    }
}

module.exports = HuskyHandler;