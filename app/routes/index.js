'use strict';
var path = process.cwd();

var HuskyHandler = require(path + '/app/controllers/huskyHandler.server.js');
var huskyHandler = new HuskyHandler();
module.exports = function (app, passport) {
	function isLoggedIn(req, res, next){
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/auth/twitter');
		}
	}
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	
	app.route('/my_huskies')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + "/public/my_huskies.html");
		});
		
	app.route('/add_huskies')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + "/public/add_huskies.html");
		});
	
	// =========================================================================
	// === API 
	
	app.route("/api/add_husky")
		.post(isLoggedIn, huskyHandler.addHusky)
	
	app.route("/api/delete_husky/*")
		.get(isLoggedIn, huskyHandler.deleteHusky)
		
	app.route("/api/all_huskies")
		.get(huskyHandler.getAllHuskies)
		
	app.route("/api/my_huskies")
		.get(isLoggedIn, huskyHandler.getMyHuskies)
	
	//-----------------------------------------------
	// Redirect the user to Twitter for authentication.  When complete, Twitter
	// will redirect the user back to the application at
	//   /auth/twitter/callback
	app.get('/auth/twitter', passport.authenticate('twitter'));
	
	// Twitter will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	app.get('/auth/twitter/callback',
	  passport.authenticate('twitter', { successRedirect: '/my_huskies', 
	                                     failureRedirect: '/' }));
};
