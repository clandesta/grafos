function prim(cost, cantNodos){

    var visited = Array(s.graph.nodes().length+1);
    for (var i = 1; i < visited.length; i++) {
        visited[i]=0;//Iniciar el coste de cada vértice a INFINITO y visited de cada vértice a FALSE.
    };
    var path = new Array();
    var source,target,u,v,numArista=1;//Coste del nodo raíz a uno.
    var min=Infinity,mincost=0;
    console.log(cost);

    visited[1]=1;
    while(numArista < cantNodos)
    {
        min=Infinity;
        for(var i=1;i<=cantNodos;i++)
            for(var j=1;j<=cantNodos;j++)
                if(cost[i][j]< min)
                    if(visited[i]!=0)
                    {
                        min=cost[i][j];//Obtener el vértice u con menor coste y que no haya sido visitado.
                        //Asignar source como previo de target
                        source=u=i;
                        target=v=j;
                    }
        if(visited[u]==0 || visited[v]==0)
        {
            //pasar al siguiente nodo(para revisar sus aristas).
            numArista+=1;
            console.log("Edge "+numArista+":("+source+" "+target+") costo:"+min);
            //acumular el costo camino minimo.
            mincost+=min;
            visited[target]=1;// Marcar target como visitado.
            //Añadir arista (u,previo[u]) al árbol abarcador mínimo.
            path[path.length] = source;
            path[path.length] = target;
        }

        cost[source][target]=cost[target][source]=Infinity;//Actualizar coste[v]=peso de la arista (u,v) como consumido.
    }

    console.log(path);
    colorearGrafo(path);//opcional
    console.log("COSTO MINIMO: "+mincost);
}



function runPrimm(){
    nodificar();
    console.log("<<PRIM>>")
    var cantidadNodos = s.graph.nodes().length;
    console.log(cantidadNodos);
    prim(matrizIncidencia, cantidadNodos);
}