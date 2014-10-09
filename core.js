var formulaValencia=[];
var matrizIncidencia;
var s;//Variable que almacena el objeto sigmaJs

$(document).ready(function(){

$("#btnCrearMatriz").click(function(){
    var cantNodos = $("#cantNodos").val();
    if(parseInt(cantNodos)){
        infoAdya = new Array(parseInt(cantNodos)+1);
        $("#matrizContainer").empty();
        $("#matrizContainer").append("<table id='tablaAdyacencia'></table>");

        for (var i = 0; i < infoAdya.length; i++) {
            $("#tablaAdyacencia").append("<tr id='fila_"+i+"' class='filas'></tr>");
            for (var j = 0; j < infoAdya.length; j++) {
                if(i===0 && j===0){
                    $("#tablaAdyacencia tr:last-child").append("<th>#</th>");
                }else if(i===0){
                    $("#tablaAdyacencia tr:last-child").append("<th>"+"nodo"+j+"</th>");
                }else if(j===0){
                    $("#tablaAdyacencia tr:last-child").append("<td>"+"nodo"+i+"</td>");
                }else{
                    $("#tablaAdyacencia tr:last-child").append("<td><input type='text' id='adj_"+i+"_"+j+"' class='adyacencia' value='0'></td>");
                }
            };
        };
        $("#matrizContainer").append("<input type='button' id='btnGraficar' onclick='nodificar()' value='Graficar'>");
    }

    //DUMMY LIBRO AHO.
    $("#adj_1_2").val("10");
    $("#adj_1_4").val("30");
    $("#adj_1_5").val("100");
    $("#adj_2_3").val("50");
    $("#adj_3_5").val("10");
    $("#adj_4_3").val("20");
    $("#adj_4_5").val("60");

});



});

function fixNode(vars){
    // //obliga a los nodos a tener una sola direccion.
    // var nodos = vars.attr("id").split("_");
    // var source = nodos[1];
    // var dest = nodos[2];
    // if(dest!=source){
    //     var idNew = "#adj_"+dest+"_"+source;
    //     $(idNew).val("0");
    // }
}


function nodificar(){
    var table = document.getElementById('tablaAdyacencia');

    var rowLength = table.rows.length;
    matrizIncidencia = new Array(rowLength);

    for(var i=1; i<rowLength; i+=1){
      var row = table.rows[i];
      var cellLength = row.cells.length;
      var sumatoria=0;

      matrizIncidencia[i] =  new Array(rowLength);

      for(var y=1; y<cellLength; y+=1){
        var cell = row.cells[y];
        //Se obtienen los valores desde el inicio de la tabla
        var valor = parseInt(cell.getElementsByClassName('adyacencia')[0].value);

        if(valor>0){
            sumatoria+=1;
            matrizIncidencia[i][y] = valor;
        }else{
            matrizIncidencia[i][y] = Infinity;
        }
      }
      
      formulaValencia[i-1]=sumatoria;
    }

    $("#botonera").remove();
    if(validarGrafo(qsort(formulaValencia) )){
        console.log("formula valida!");
        $("#mensajes").text("Formula valida... Graficando");
        graficarSimplex();
        $("#mensajes").text("Grafico listo!.");
        $("#matrizContainer").append("<div id='botonera'></div>");

        $("#botonera").append("<label for='sourceNode'>Nodo Inicio</label><input type='text' id='sourceNode'>");
        $("#botonera").append("<label for='targetNode'>Nodo Destino</label><input type='text' id='targetNode'>");

        $("#botonera").append("<input type='button' onclick='runDijkstra()' value='Graficar Dijkstra'>");
        $("#botonera").append("<input type='button' onclick='primm()' value='Graficar Primm'>");
        $("#botonera").append("<input type='button' onclick='kruskall()' value='Graficar Kruskall'>");

    }else{
        $("#mensajes").text("Formula invalida");
        console.log("formula invalida");
    }
}

function validarGrafo(formVal){
    console.log("Formula de valencia: " +formVal);
    for (var i = 0; i < formVal.length; i++) {
        desc = formVal[i];
        for (var j = 1; j <=desc; j++) {
            formVal[i+j] = formVal[i+j]-1;
            if(formVal[i+j]<0){
                return true;//false para validar grafos simples
            }
        };
        formVal = qsort(formVal);
    };
    return true;

}

function graficarSimplex(){
    $("#container").empty();
    
     s = new sigma({
      renderers: [
        {
          container: document.getElementById('container'),
          type: 'canvas', // sigma.renderers.canvas works as well
          labelThreshold: 0
        }
      ]

    });
    s.graph.clear();

    $(".sigma-scene").attr("id", "sigmaCanvas");

    var sizeX = 200;
    var sizeY = 200;

    var r = (sizeX<sizeY)?sizeX:sizeY;
    r = r/2;

    for (var i = 1; i < matrizIncidencia.length; i++) {

        for (var j = 1; j < matrizIncidencia.length; j++) {

            var valor = matrizIncidencia[i][j];
            //console.log("cadena: "+cadena);

            if(valor!=Infinity ){
                var angle = Math.random()*Math.PI*2;
                try{
                    s.graph.addNode({id:'n'+i, 
                        label:'nodo'+i, 
                        x: Math.round(Math.cos(angle)*r*sizeX) ,
                        y:Math.round(Math.sin(angle)*r*sizeY),
                        size:1,
                        color:'#0F0'
                    });
                    
                }catch(ex){
                    //console.log(ex);
                }
                angle = Math.random()*Math.PI*2;
                
                try{
                    s.graph.addNode({id:'n'+j, 
                        label:'nodo'+j, 
                        x: Math.round(Math.cos(angle)*r*sizeX) ,
                        y:Math.round(Math.sin(angle)*r*sizeY),
                        size:1,
                        color:'#0F0'
                    });
                    
                }catch(ex){
                    //console.log(ex);
                }
                s.graph.addEdge({id: 'e_'+i+"_"+j,source: 'n'+i,target: 'n'+j, color:'#bdc3c7', peso:valor, type:'t'});
            }
        }
    }
    
    s.refresh();
    // console.log(s.graph.nodes());
    // console.log(s.graph.edges());
    
}

function qsort(a) {
    if (a.length == 0) return [];

    var left = [], right = [], pivot = a[0];

    for (var i = 1; i < a.length; i++) {
        a[i] > pivot ? left.push(a[i]) : right.push(a[i]);
    }

    return qsort(left).concat(pivot, qsort(right));
}