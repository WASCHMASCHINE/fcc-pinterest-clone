'use strict';
/*global ajaxFunctions, appUrl, $, jQuery*/

function handleSignup(){
    $("#signupForm").submit(function(event){
        event.preventDefault(); // else input gets cleared after post and no redirect
    });
    $('#signupButton').on('mousedown', function(){
        var name = $("#signupName").val();
        var email = $("#signupEmail").val();
        var password = $("#signupPassword").val();
        if (name=="" || email=="" || password==""){
            alert("No empty fields allowed.");
            return;
        }
        var paramsString = "name=" + name + "&email=" + email + "&password=" + password;
       
        console.log(paramsString);
        
        var apiUrl = appUrl + "/api/signup?"+paramsString;
        console.log(apiUrl)
        ajaxFunctions.ajaxRequest('POST', apiUrl, function(response){
            console.log(response);
            if (response == "OK"){
                window.location = window.location.origin;
            }
        });
        return false;
    });
    
}

(function () {
   ajaxFunctions.ready(handleSignup());
})();