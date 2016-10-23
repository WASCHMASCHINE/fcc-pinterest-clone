'use strict';
/*global ajaxFunctions, appUrl, $, jQuery*/

function loadAll(){
    var apiUrl = appUrl + '/api/all_huskies/';
    console.log(apiUrl);
    
    ajaxFunctions.ajaxRequest('GET', apiUrl, function(response){
        var data = JSON.parse(response);
        console.log("data", data);
        
        for (var i=0; i<data.length; ++i) {
            var newHtml= 
                '<div class="grid-item">'+
			  	'<img src="' + data[i].imgLink + '">'+
			  	'<h2>' + data[i].description +'</h2>'+
			    '</div>';
			$("#masonryGrid").append(newHtml);
        }
    });
}

(function () {
   ajaxFunctions.ready(loadAll());
})();