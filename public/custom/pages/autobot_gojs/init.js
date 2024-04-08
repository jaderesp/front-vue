

export function start(gojs_){


        var elem = "gojsDiv";

    let margens = 10;
    let width = document.getElementById("menu_autor").offsetWidth - margens;

    

    $('#gojsDiv').css("top", '0px'); 
    $('#gojsDiv').css("margin-left", margens + 'px'); 
    $('#gojsDiv').css("width", (width) + 'px');
    $('#gojsDiv').css("height", '1800px'); 
    $('#gojsDiv').css("overflow", 'hidden'); /* fixar limite borda do editor */
    /* overflow: hidden; */
      /* finalizar loading */
      $("#menu_autor").loading('stop');


      /* incializar o plugin GoJs */
      gojs_.initGoJs();


}