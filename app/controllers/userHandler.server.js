'use strict';
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

function UserHandler(){
    this.signup = function(req, res){
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('books-user').insert(req.query, function(err, data){
                if (err) throw err;
                console.log("looooog", data.ops[0]);
                req.login(data.ops[0], function(err){
                    if (!err){
                        res.send("OK");
                    } else {
                        res.send("FAILED");
                    }
                });
            });
        });
        
    };
    
    this.updateInfo = function(req, res){
        console.log(req.body);
        var userId = req.session.passport.user._id;
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('books-user').update(
                {"_id" : ObjectId(userId) }, 
                {$set: {"city" : req.body.settingsCity, "state": req.body.settingsState}});
            res.redirect("/");
        });
    };
    
    this.updatePassword = function(req, res){
        console.log(req.body);
        var userId = req.session.passport.user._id;
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            db.collection('books-user').update(
                {"_id" : ObjectId(userId), "password": req.body.settingsCurrentPassword},
                {$set: {"password":  req.body.settingsNewPassword}});
            res.redirect("/");
        });
    };
}

module.exports = UserHandler;