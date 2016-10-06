'use strict';
var mongo = require('mongodb').MongoClient;
var LocalStrategy = require('passport-local').Strategy;

//https://github.com/passport/express-4.x-local-example/blob/master/server.js
module.exports = function(passport){
    passport.serializeUser(function(user, done){
        console.log("serializeUser", user);
        done(null, user);
    });
    
    passport.deserializeUser(function(id, done){
        console.log("deserializeUser with id", id);
        mongo.connect(process.env.MONGO_URI, function(err, db) {
            if (err) { return done(err); }
            var col = db.collection('books-user');
            col.find({'_id': id}).toArray(function(err, user){
                if (err){ return done(err); }
                return done(null, user);
            });
        });
    });
    
    passport.use(new LocalStrategy(
        function(username, password, done){
            process.nextTick(function(){ 
                mongo.connect(process.env.MONGO_URI, function(err, db) {
                    if (err) { return done(err); }
                    var col = db.collection('books-user');
                    col.findOne({'email': username, 'password': password }, function(err, result) {
        				if (err) { return done(err); }
        				console.log(result);
        				if (result){
        				    return done(null, result);    
        				} else {
        				    return done(null, false);
        				}
                    });
    	        });
            });
            
        }
    ));
};