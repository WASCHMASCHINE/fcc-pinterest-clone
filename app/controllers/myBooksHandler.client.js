'use strict';
/*global ajaxFunctions, appUrl, $*/

function executeSearch(){
    var searchString = $('#searchString').val();
    if (searchString=="") return;
    var apiUrl = appUrl + '/api/book_search/' + encodeURIComponent(searchString);;
    console.log(apiUrl);
    ajaxFunctions.ajaxRequest('GET', apiUrl, function(response){
        var data = JSON.parse(response);
        
        console.log(data);
        if ($.isEmptyObject(data)){
            $('#searchString').val('');
            $('#searchString').attr('placeholder', "No image or no book found!");
        } else {
            $('#myBooksGallery').append('<div class="col-xs-6 col-md-3"><a href="#" class="thumbnail"><img alt="' + data.title + '" src="'+ data.imageLink +'"></a></div>');
        }
    });
}

function handleSearchFunction(){
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