function displayQuestion($container, $element){
    $id = parseInt($($element).attr('id')) + 1;
    //console.log($container+$id);
    $($container+$id).show();
}

/*
function showResult(){

}

 $("input[name='sticker-scheme']:checked").each( function () {
 console.log($(this).val());
 });
 */