'use strict';

var path = process.cwd();
var BookHandler = require(path + '/app/controllers/bookHandler.server.js');
var UserHandler = require(path + '/app/controllers/userHandler.server.js');
var bookHandler = new BookHandler();
var userHandler = new UserHandler();

module.exports = function (app, passport) {
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/mybooks')
		.get(function (req, res) {
			res.sendFile(path + '/public/mybooks.html');
		});
		
	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});
	
	app.route('/settings')
		.get(function (req, res) {
			res.sendFile(path + '/public/settings.html');
		});
		
	app.route('/signup')
		.get(function (req, res) {
			res.sendFile(path + '/public/signup.html');
		});
	// -------------------------------------------------	
	app.route('/api/book_search/*')
		.get(bookHandler.search);
		
	app.route('/api/all_books')
		.get(bookHandler.getAllBooks);
	
	app.route('/api/signup')
		.post(userHandler.signup);
		
		//http://stackoverflow.com/questions/34431785/req-isauthenticated-is-returning-false-using-nodejs-express-and-passportjs
	
	app.post('/api/login', function(req, res, next) {
		console.log(req.body);
		passport.authenticate('local', function(err, user, info) {
			console.log(err, user, info);
			if (err) { return next(err); }
			if (!user) { return res.redirect('/login'); }
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				return res.redirect('/mybooks');
			});
		})(req, res, next);
	});
};
