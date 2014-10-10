var formulaValencia=[];
var matrizIncidencia;
var s;//Variable que almacena el objeto sigmaJs

function dummy(op){
    $(".adyacencia").val(0);
    switch (op){
        case 1:
            //DUMMY LIBRO AHO.
            $("#adj_1_2").val("10");
            $("#adj_1_4").val("30");
            $("#adj_1_5").val("100");
            $("#adj_2_3").val("50");
            $("#adj_3_5").val("10");
            $("#adj_4_3").val("20");
            $("#adj_4_5").val("60");
            break;
        default:
            $("#adj_1_2").val("2");
            $("#adj_1_3").val("3");
            $("#adj_1_5").val("6");

            $("#adj_2_1").val("2");
            $("#adj_2_5").val("2");
            $("#adj_2_6").val("3");

            $("#adj_3_1").val("3");
            $("#adj_3_5").val("1");
            $("#adj_3_4").val("5");

            $("#adj_4_3").val("5");
            $("#adj_4_5").val("5");
            $("#adj_4_6").val("6");

            $("#adj_5_1").val("6");
            $("#adj_5_2").val("2");
            $("#adj_5_3").val("1");
            $("#adj_5_4").val("5");
            $("#adj_5_6").val("4");

            $("#adj_6_5").val("4");
            $("#adj_6_2").val("3");
            $("#adj_6_4").val("6");

            break;
    }
}

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
    
    $(".opciones .foo").empty();
    $(".opciones .foo").append("<span><a href='javascript:dummy(1);'>Dijkstra</a><span>");
    $(".opciones .foo").append("<span><a href='javascript:dummy(2);'>Prim</a><span>");
    $(".opciones .foo").append("<span><a href='javascript:dummy(3);'>Kruskall</a><span>");

});



});


function nodificar(){
    var table = document.getElementById('tablaAdyacencia');

    var rowLength = table.rows.length;
    matrizIncidencia = new Array(rowLength);
    var cntAristas=0;

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
            cntAristas+=1;
        }else{
            matrizIncidencia[i][y] = Infinity;
        }
      }
      
      formulaValencia[i-1]=sumatoria;
    }

    $("#botonera").remove();
    if(validarGrafo(quicksort(formulaValencia) ) && cntAristas > 0){
        console.log("formula valida!");
        $("#mensajes").text("Formula valida... Graficando");
        graficarSimplex();
        $("#mensajes").text("Grafico listo!.");
        $("#matrizContainer").append("<div id='botonera'></div>");

        $("#botonera").append("<label for='sourceNode'>Nodo Inicio</label><input type='text' id='sourceNode'>");
        $("#botonera").append("<label for='targetNode'>Nodo Destino</label><input type='text' id='targetNode'>");

        $("#botonera").append("<input type='button' onclick='runDijkstra()' value='Graficar Dijkstra'>");
        $("#botonera").append("<input type='button' onclick='runPrimm()' value='Graficar Primm'>");
        $("#botonera").append("<input type='button' onclick='runKruskall()' value='Graficar Kruskall'>");

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
        formVal = quicksort(formVal);
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
                s.graph.addEdge({id: 'e_'+i+"_"+j,source: 'n'+i,target: 'n'+j, color:'#bdc3c7', peso:valor, type:'noDirigido'});
            }
        }
    }
    
    s.refresh();
    // console.log(s.graph.nodes());
    // console.log(s.graph.edges());
    
}

function colorearDijkstra(path){
    var edges = s.graph.edges();
     for (var i = 0; i < edges.length; i++) {
         edges[i].color="#bdc3c7";
         edges[i].type="dirigido";
     };
    s.refresh();
    for (var i = 0; i < path.length; i++) {
        var edge = s.graph.edges("e_"+path[i]+"_"+path[i+1]);
        if( (i+1) < path.length){
            edge.color="#3498db";
        }
    };
    s.refresh();
}

function colorearGrafo(path){
    var edges = s.graph.edges();
     for (var i = 0; i < edges.length; i++) {
         edges[i].type="noDirigido";
         edges[i].color="white";
     };
    s.refresh();
    for (var i = 0; i < path.length; i++) {
        var edge = s.graph.edges("e_"+path[i]+"_"+path[i+1]);
        console.log(edge);
        if( (i+1) < path.length){   
            edge.color="#3498db";
        }
        i++;
    };
    s.refresh();
}

function quicksort(a) {
    if (a.length == 0) return [];

    var left = [], right = [], pivot = a[0];

    for (var i = 1; i < a.length; i++) {
        a[i] > pivot ? left.push(a[i]) : right.push(a[i]);
    }

    return quicksort(left).concat(pivot, quicksort(right));
}