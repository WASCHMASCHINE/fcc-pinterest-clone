'use strict';
/*global ajaxFunctions, appUrl, $*/



function loadRequests(){
    ajaxFunctions.ajaxRequest('GET', appUrl + "/api/my_requests" , function(response){
        var data = JSON.parse(response);
        for (var i=0; i<data.length; ++i) {
            $("#myRequestsList").append('<li class="list-group-item">' + data[i].title + '<span class="btn glyphicon glyphicon-remove"></span></li>');
        }
    });
    
    ajaxFunctions.ajaxRequest('GET', appUrl + "/api/requests_to_me" , function(response){
        var data = JSON.parse(response);
        for (var i=0; i<data.length; ++i) {
            $("#requestToMeList").append('<li class="list-group-item">' + data[i].title + ' <span class="btn glyphicon glyphicon-ok"></span><span class="btn glyphicon glyphicon-remove"></span></li>');
        }
    });
}

function loadMyBooks(){
    var apiUrl = appUrl + '/api/my_books/';
    console.log(apiUrl);
    ajaxFunctions.ajaxRequest('GET', apiUrl, function(response){
        var data = JSON.parse(response);
        for (var i=0; i<data.length; ++i) {
            $('#myBooksGallery').append('<div class="col-xs-6 col-md-3"><a href="#" class="thumbnail"><img alt="' + data[i].title + '" src="'+ data[i].imageLink +'"></a></div>');
        }
    });
}

function executeSearch(){
    var searchString = $('#searchString').val();
    if (searchString=="") return;
    var apiUrl = appUrl + '/api/book_search/' + encodeURIComponent(searchString);;
    console.log(apiUrl);
    ajaxFunctions.ajaxRequest('GET', apiUrl, function(response){
        var data = JSON.parse(response);
        if ($.isEmptyObject(data)){
            $('#searchString').val('');
            $('#searchString').attr('placeholder', "No image or no book found!");
        } else {
            $('#myBooksGallery').append('<div class="col-xs-6 col-md-3"><a href="#" class="thumbnail"><img alt="' + data.title + '" src="'+ data.imageLink +'"></a></div>');
        }
    });
}

function handleSearchFunction(){
    loadRequests();
    loadMyBooks();
    
    
    $("#searchString").on('keydown', function(evt){
        if (evt.which == 13){
            executeSearch();
        }
    });
    $('#searchBooksButton').on('mousedown', function(){
        executeSearch();
    });
}

(function () {
   ajaxFunctions.ready(handleSearchFunction());
})();