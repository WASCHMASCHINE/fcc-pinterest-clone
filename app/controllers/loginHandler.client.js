'use strict';
/*global ajaxFunctions, appUrl, $, jQuery*/

function handleLogin(){
    $("#loginForm").submit(function(event){
        event.preventDefault(); // else input gets cleared after post and no redirect
    });
}

(function () {
   ajaxFunctions.ready(handleLogin());
})();