var parent;
function kruskall(matrizIncidencia, cantNodos){
    parent = new Array(cantNodos);
    var source,target,u,v,numArista=1;//Coste del nodo raíz a uno.
    var minimo,costoMinimo=0;
    var path = new Array();

    while(numArista < cantNodos)
    {
        minimo = Infinity;
        for(var i=1;i<=cantNodos;i++)
        {
            for(var j=1;j <= cantNodos;j++)
            {
                if(matrizIncidencia[i][j] < minimo)
                {
                    minimo=matrizIncidencia[i][j];
                    source=u=i;
                    target=v=j;
                }
            }
        }
        u=find(u);
        v=find(v);
        if(uni(u,v))
        {
            numArista+=1;
            console.log(numArista+" edge ("+source+","+target+") ="+minimo);
            costoMinimo +=minimo;
            path[path.length] = source;
            path[path.length] = target;
        }
        matrizIncidencia[source][target]=matrizIncidencia[target][source]=Infinity;
    }
    console.log("Minimo costo matrizIncidencia = "+costoMinimo);

    colorearGrafo(path);
}

function find(i)
{
    while(parent[i]!=null){
        i=parent[i];
    }
    return i;
}
function uni(i, j)
{
    if(i!=j)
    {
        parent[j]=i;
        return 1;
    }
    return 0;
}

function runKruskall(){
    nodificar();
    console.log("<<Kruskall>>")
    var cantidadNodos = s.graph.nodes().length;
    console.log(cantidadNodos);
    var costos = matrizIncidencia;
    kruskall(matrizIncidencia, cantidadNodos);
}