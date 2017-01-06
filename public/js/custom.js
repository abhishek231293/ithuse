function getImageSize(element){
    /*
    orientation = $("#imageSize").html();
    //console.log(orientation);

    if(orientation == 1){
        element.setAttribute('class', 'normal');
        return;
    }
    */

    getMeta(element.src, element);
}

function getMeta(url, element){
    //console.log(url);
    //console.log(element);
    var img = new Image();
    img.onload = function(){
        var width = this.width;
        var height = this.height;
        //console.log(width);
        //console.log(height);
        if(width > height){
            element.setAttribute('class', 'rotate90');
        }else{
            element.setAttribute('class', 'normal');
        }

    };
    img.src = url;
}

$( window ).load(function() {
    $(".myDate button").css("display", "none");
});

