'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var bodyParser = require('body-parser');
var passport = require("passport");
var session = require("express-session");
var app = express();

require('dotenv').load();
require('./app/config/passport')(passport); // set the three needed functions for passport

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/public', express.static(process.cwd() + '/public'));

app.use(session({ 
    secret: 'secretBookTradingClubApp',
    cookie: {maxAge: 60*1000},
    resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});