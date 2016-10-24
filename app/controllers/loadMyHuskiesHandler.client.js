'use strict';
/*global ajaxFunctions, appUrl, $, jQuery*/

function loadAll(){
    var apiUrl = appUrl + '/api/my_huskies/';
    console.log(apiUrl);
    
    ajaxFunctions.ajaxRequest('GET', apiUrl, function(response){
        var data = JSON.parse(response);
        console.log("data", data);
        
        for (var i=0; i<data.length; ++i) {
            var deleteLink = appUrl + '/api/delete_husky/' + data[i]._id;
            var newHtml= 
                '<div class="grid-item">'+
			  	'<img src="' + data[i].imgLink + '">'+
			  	'<h2><a href="' + deleteLink + '" class="btn btn-danger">X</a> ' + data[i].description +'</h2>'+
			    '</div>';
			$("#masonryGrid").append(newHtml);
        }
        $('img').error( function(){
            $(this).attr('src', './public/images/questionmark.png');
        });
    });
}

(function () {
   ajaxFunctions.ready(loadAll());
})();