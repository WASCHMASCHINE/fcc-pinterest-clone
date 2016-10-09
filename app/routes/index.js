'use strict';

var path = process.cwd();
var BookHandler = require(path + '/app/controllers/bookHandler.server.js');
var UserHandler = require(path + '/app/controllers/userHandler.server.js');
var bookHandler = new BookHandler();
var userHandler = new UserHandler();

module.exports = function (app, passport) {
		function isLoggedIn(req, res, next){
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/mybooks')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/mybooks.html');
		});
		
	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});
	
	app.route('/settings')
		.get(isLoggedIn, function (req, res) {
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
	
	
	app.route('/api/my_books')
		.get(bookHandler.getMyBooks);
	
	app.route('/api/request_book/*')
		.get(isLoggedIn, bookHandler.requestBook);
	
	app.route('/api/my_requests/')
		.get(isLoggedIn, bookHandler.getMyRequests);
		
	app.route('/api/requests_to_me/')
		.get(isLoggedIn, bookHandler.getRequestsToMe);
	
	app.post('/api/signup', function(req, res){
		userHandler.signup(req, res);
	});
	
	app.route('/api/:id')
		.get(function(req, res){
			res.json(req.session);
	});
		
	app.route('/api/settings_info')
		.post(isLoggedIn, userHandler.updateInfo);
	
	app.route('/api/settings_password')
		.post(isLoggedIn, userHandler.updatePassword);
		
		
	//http://stackoverflow.com/questions/34431785/req-isauthenticated-is-returning-false-using-nodejs-express-and-passportjs
	app.post('/api/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if (err) { return next(err); }
			if (!user) { return res.redirect('/login'); }
			req.logIn(user, function(err) { // not sure what this does
				if (err) { return next(err); }
				return res.redirect('/mybooks');
			});
		})(req, res, next);
	});
};
