var formulaValencia=[];
var matrizIncidencia;

$(document).ready(function(){

$("#btnCrearMatriz").click(function(){
    var cantNodos = $("#cantNodos").val();
    if(parseInt(cantNodos)){
        //console.log("Cantidad de nodos."+ cantNodos);
        infoAdya = new Array(parseInt(cantNodos)+1);
        //console.log(infoAdya.length);
        $("#matrizContainer").empty();
        $("#matrizContainer").append("<table id='tablaAdyacencia'></table>");

        for (var i = 0; i < infoAdya.length; i++) {
            $("#tablaAdyacencia").append("<tr id='fila_"+i+"' class='filas'></tr>");
            //// console.log("TR");
            for (var j = 0; j < infoAdya.length; j++) {
                //// console.log("TD")
                if(i===0 && j===0){
                    $("#tablaAdyacencia tr:last-child").append("<th>#</th>");
                }else if(i===0){
                    $("#tablaAdyacencia tr:last-child").append("<th>"+"nodo"+j+"</th>");
                }else if(j===0){
                    $("#tablaAdyacencia tr:last-child").append("<td>"+"nodo"+i+"</td>");
                }else{
                    $("#tablaAdyacencia tr:last-child").append("<td><input type='text' id='adj_"+i+"_"+j+"' class='adyacencia' value='0' onchange='javascript:fixNode($(this))'></td>");
                }
            };
        };
        $("#matrizContainer").append("<input type='button' id='btnGraficar' onclick='nodificar()' value='Graficar'>");
    }

});



});

function fixNode(vars){
    var nodos = vars.attr("id").split("_");
    var source = nodos[1];
    var dest = nodos[2];
    if(dest!=source){
        var idNew = "#adj_"+dest+"_"+source;
        //console.log("RESET:" +idNew);
        $(idNew).val("0");
    }
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
        var valor = parseInt(cell.getElementsByClassName('adyacencia')[0].value);

        if(valor>0){
            sumatoria+=1;
            matrizIncidencia[i][y] = i+"_"+y+"_"+valor;
            // if(y>i){
            //     matrizIncidencia[i][y] = i+"_"+y+"_"+valor;
            // }else{
            //     matrizIncidencia[i][y] = Infinity;
            // }
        }else{
            matrizIncidencia[i][y] = Infinity;
        }
        
        //// console.log("sumatoria: "+sumatoria);
        
      }
      
      formulaValencia[i-1]=sumatoria;
      
    }

    for (var i = 1; i < matrizIncidencia.length; i++) {
    for (var j = 1; j < matrizIncidencia.length; j++) {
        //console.log(i+":"+j+", CELL: " + matrizIncidencia[i][j]);
    };
    };


    //// console.log("formula valencia" + formulaValencia.length);
    // for (var i = 0; i < formulaValencia.length; i++) {
    ////     console.log("elemento",formulaValencia[i]);
    // };
    $("#botonera").remove();
    if(validarGrafo( qsort(formulaValencia) )){
        //console.log("formula valida!");
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
        //console.log("formula invalida");
    }
}

function validarGrafo(formVal){
    //console.log(formVal);
    for (var i = 0; i < formVal.length; i++) {
        desc = formVal[i];
        //console.log("index: "+i);
        //console.log("nextElem: "+(i+1));
        //console.log("grado: "+desc);

        for (var j = 1; j <=desc; j++) {
            //console.log("a descontar 1: "+ formVal[j]);
            formVal[i+j] = formVal[i+j]-1;
            if(formVal[i+j]<0){
                return true;
            }
        };
        formVal = qsort(formVal);
    };
    return true;

}

sigma.canvas.edges.t = function(edge, source, target, context, settings, peso) {
   var color = edge.color,
        prefix = settings('prefix') || '',
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        size = edge[prefix + 'size'] || 1,
        tSize = target[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        aSize = Math.max(size * 2.5, 10),
        d = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2)),
        aX = sX + (tX - sX) * (d - aSize - tSize) / d,
        aY = sY + (tY - sY) * (d - aSize - tSize) / d,
        vX = (tX - sX) * aSize / d,
        vY = (tY - sY) * aSize / d;

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    context.lineTo(
      aX,
      aY
    );
    context.stroke();

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(aX + vX, aY + vY);
    context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
    context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
    context.lineTo(aX + vX, aY + vY);
    context.closePath();
    context.fill();

    //draw text
    context.font = '12pt Arial';
    context.fillStyle = 'red';
    var medioX =  source[prefix + 'x'] + target[prefix+"x"];
    medioX= medioX/2;
    var medioY =  source[prefix + 'y'] + target[prefix+"y"];
    medioY= medioY/2;
    
    context.fillText(""+edge.peso,medioX, medioY);

  };

function graficarSimplex(){
    $("#container").empty();
    
    var s = new sigma({
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
    var edge = 1;

    for (var i = 1; i < matrizIncidencia.length; i++) {
        var comp=null;

        for (var j = 1; j < matrizIncidencia.length; j++) {

            var cadena = matrizIncidencia[i][j];
            //console.log("cadena: "+cadena);

            if(cadena!=Infinity ){
                comp = cadena.split("_");
                var angle = Math.random()*Math.PI*2;
                try{
                    s.graph.addNode({id:'n'+comp[0], 
                        label:'nodo'+comp[0], 
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
                    s.graph.addNode({id:'n'+comp[1], 
                        label:'nodo'+comp[1], 
                        x: Math.round(Math.cos(angle)*r*sizeX) ,
                        y:Math.round(Math.sin(angle)*r*sizeY),
                        size:1,
                        color:'#0F0'
                    });
                    
                }catch(ex){
                    //console.log(ex);
                }
                s.graph.addEdge({id: 'e'+edge,source: 'n'+comp[0],target: 'n'+comp[1], color:'#bdc3c7', peso:comp[2], type:'t'});
                edge+=1;
                

            }
        }
    }
    
    s.refresh();

    console.log(s.graph.edges());
    
}

function qsort(a) {
    if (a.length == 0) return [];

    var left = [], right = [], pivot = a[0];

    for (var i = 1; i < a.length; i++) {
        a[i] > pivot ? left.push(a[i]) : right.push(a[i]);
    }

    return qsort(left).concat(pivot, qsort(right));
}