'use strict';

var path = process.cwd();
var BookHandler = require(path + '/app/controllers/bookHandler.server.js');
var UserHandler = require(path + '/app/controllers/userHandler.server.js');
var bookHandler = new BookHandler();
var userHandler = new UserHandler();

module.exports = function (app) {
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
		
	app.route('/api/login')
		.post(userHandler.login);
	
};
