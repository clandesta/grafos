function dij(matrizCostos, source, target, padre, predecesores)
{
    var MAXNODES = matrizCostos.length;
    var distancias= new Array(MAXNODES);
    var vistos = new Array(MAXNODES);
    var current,k,dc;
    var menorDistancia,sigDistancia;
    /* Iniciar  vistos y distancias con valores por defecto */
    for(var i=0;i<MAXNODES;i++)
    {
        vistos[i]=false;
        distancias[i]=Infinity;
    }
    vistos[source] = true;
    distancias[source] = 0;
    current = source;
    while(current != target)
    {
        menorDistancia=Infinity;
        dc=distancias[current]; //distancia actual
        for(var i=0;i<MAXNODES;i++)
        {
            if(vistos[i]==false)// si el nodo no ha sido visto
            {
                sigDistancia = dc + matrizCostos[current][i]; // la proxima distancia del arreglo
                if(sigDistancia < distancias[i])
                {
                    distancias[i]=sigDistancia;
                    predecesores[i]=current;
                }
                if(distancias[i] < menorDistancia)
                {
                    menorDistancia = distancias[i];
                    k=i;
                }
            }
        }
        current = k;
        vistos[current]=true;
    }
    padre=distancias[target];

    console.log(predecesores);
}

function runDijkstra()  
{
    
    var source = parseInt($("#sourceNode").val());
    var target = parseInt($("#targetNode").val());
    var distancias = new Array(matrizIncidencia.length);
    
    if(source>0 && target>0){
        console.log("<<DIJKSTRA>>");
        dij(matrizIncidencia,source,target, source, distancias);

        var temp= new Array();
        var current = target;
        temp[0] = current;
        var index = distancias.length-1;
        do{
            current = distancias[index];
            temp[temp.length++]=current
            index = current;

        }while(current!=source);

        var path = new Array();
        for (var i = temp.length-1; i >= 0; i--) {
            path[path.length++]=temp[i]
        };
        console.log(path);
        colorearDijkstra(path, target);
    }else{
        $("#mensajes").text("Debe ingresar Nodo inicio y Nodo Fin.");
    }
}

