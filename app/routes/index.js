'use strict';
var mongo = require('mongodb').MongoClient;
var path = process.cwd();

module.exports = function (app, passport) {
	app.route('/')
		.get(function (req, res) {
			// TEST MONGODB ON HEROKU
			mongo.connect(process.env.MONGO_URI, function(err, db){
                if (err) throw err;
                db.collection('books-data').find({}).toArray(function(err, data){
                    if (err) throw err;
                    console.log(data);
                    res.send("WE GOT SOME MONGODB DATA: "+ data[0]);
                });
            });
			//res.sendFile(path + '/public/index.html');
		});
		
};
