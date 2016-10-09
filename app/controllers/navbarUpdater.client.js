'use strict';
/*global ajaxFunctions, appUrl, $, jQuery*/

function updateNavbar(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/:id';
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        var data = JSON.parse(this.response);
        if (data.passport){ // add some html
            $("#menuHeader").html("Hello, " + data.passport.user.name + "!");
            $("#menuLeft").append('<li id="nav-allbooks"><a href="/">All Books</a></li>');
            $("#menuLeft").append('<li id="nav-mybooks"><a href="/mybooks">My Books</a></li>');
            $("#menuRight").append('<li id="nav-settings"><a href="/settings"><span class="glyphicon glyphicon-cog"></span> Settings</a></li>');
        } else {
            $("#menuHeader").html("Not logged in - Guest");
            $("#menuLeft").append('<li id="nav-allbooks"><a href="/">All Books</a></li>');
            $("#menuRight").append('<li id="nav-signup"><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>');
            $("#menuRight").append('<li id="nav-login"><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>');
        }
        
        var currentNav = "";
        if (window.location.pathname == "/mybooks") {
            currentNav = "#nav-mybooks";
        } else if (window.location.pathname == "/settings") {
            currentNav = "#nav-settings";
        } else if (window.location.pathname == "/signup") {
            currentNav = "#nav-signup";
        } else if (window.location.pathname == "/login") {
            currentNav = "#nav-login";
        } else {
            currentNav = "#nav-allbooks";
        }
        $(currentNav).addClass("active");
        
    };
    xmlhttp.open('GET', apiUrl, true);
    xmlhttp.send();
}

(function () {
   ajaxFunctions.ready(updateNavbar());
})();