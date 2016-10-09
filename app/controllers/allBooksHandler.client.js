'use strict';
/*global ajaxFunctions, appUrl, $*/

function loadAllBooksFromDatabase(){
    var apiUrl = appUrl + '/api/all_books/';
    console.log(apiUrl);
    
    ajaxFunctions.ajaxRequest('GET', apiUrl, function(response){
        var data = JSON.parse(response);
        console.log("data", data)
        for (var i=0; i<data.length; ++i) {
            var requestLink = "/api/request_book/" + data[i]._id;
            $('#allBooksGallery').append('<div class="col-xs-6 col-md-3"><a href="' + requestLink + '" class="thumbnail"><img alt="' + data[i].title + '" src="'+ data[i].imageLink +'"></a></div>');
        }
    });
}

(function () {
   ajaxFunctions.ready(loadAllBooksFromDatabase());
})();