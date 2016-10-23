'use strict';
/*global ajaxFunctions, appUrl, $, jQuery*/

function handlePreview(){
    $("#huskyImgLink").focus();
    $('#huskyImgLinkDiv').on('input',function(e){
        $("#previewImage").attr("src", $("#huskyImgLink").val());
        $("#previewImage").on("error", function(){
            $(this).attr('src', './public/images/questionmark.png');
    });
    });
}

(function () {
   ajaxFunctions.ready(handlePreview());
})();