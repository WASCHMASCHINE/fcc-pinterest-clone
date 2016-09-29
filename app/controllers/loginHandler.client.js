'use strict';
/*global ajaxFunctions, appUrl, $, jQuery*/

function handleLogin(){
    $("#loginForm").submit(function(event){
        event.preventDefault(); // else input gets cleared after post and no redirect
    });
    $('#loginButton').on('mousedown', function(){
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();
        if (email=="" || password==""){
            alert("No empty fields allowed.");
            return;
        }
        var paramsString = "email=" + email + "&password=" + password;
       
        console.log(paramsString);
        
        var apiUrl = appUrl + "/api/login?"+paramsString;
        console.log(apiUrl)
        ajaxFunctions.ajaxRequest('POST', apiUrl, function(response){
            console.log(response);
            if (response == "OK"){
                window.location = window.location.origin;
            } else {
                $("#loginEmail").val("");
                $("#loginPassword").val("");
                alert("Wrong password or account does not exist.")
            }
        });
        return false;
    });
    
}

(function () {
   ajaxFunctions.ready(handleLogin());
})();