
var usuario = sessionStorage.getItem("idUsuario");
if(usuario == undefined){
  window.location.href = "login.html";
}




function obtenerCarrito() {
  /*llamada a articulos*/
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3001/articulos";
  var listarticulos;
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      listarticulos = JSON.parse(this.responseText);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();


  /*Llamada a carrito*/
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3001/carrito";

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var arrayCarrito = JSON.parse(this.responseText);
      filtrarArticulos(arrayCarrito, listarticulos);
      console.info("--Array Carrito--");
      console.info(arrayCarrito);
      console.info("--Array Articulos--");
      console.info(listarticulos);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function filtrarArticulos(arrCarrito, arrArticulo) {
  var listado = "";
  var usuario = sessionStorage.getItem("idUsuario");
  var nProductos = 0;
  var pTotal = 0;
  var n=0;

  /*Si el usuario no tiene un numero (osea no esta logueado) no hacemos nada*/
  if (!isNaN(usuario)) {
    /*Recorremos el carrito*/
    for (let i = 0; i < Object.keys(arrCarrito).length; i++) {
      /*Recorremos los articulos*/
      for (let j = 0; j < Object.keys(arrArticulo).length; j++) {
        /*Comprobamos si las referencias coinciden */
        if (
          usuario == arrCarrito[i].idusuario &&
          arrCarrito[i].referencia == arrArticulo[j].referencia
        ) {
          nProductos += arrCarrito[i].cantidad;

          pTotal += arrArticulo[j].precio * arrCarrito[i].cantidad;
          listado +=
            "<div>" +
            "<img src=" +
            arrArticulo[j].imagen +
            "><p id=nombre>" +
            arrArticulo[j].nombre +
            "</p>" +
            "<p id=cantidad>"+"Cantidad: "+arrCarrito[i].cantidad+   "<input class=modificarcant type=placeholder id=valor"+n+"></input>"+ "<button class=btn-modificar id=" + arrCarrito[i].referencia+" onclick=Modificar(this,valor"+n+".value"+","+arrCarrito[i].id+")></button>  </p>"+
            "<p id=total>"+
            "Total articulo: "+arrArticulo[j].precio * arrCarrito[i].cantidad+"€"+"    </p>"+
           
            "<button class=btn-eliminar id=" + arrCarrito[i].referencia+" onclick=eliminarItem("+arrCarrito[i].id+") ></button>" +
            "</div>";
            n++;
        }
      
      }
    }
  }
  /*----  OUTPUT  ----*/
  /*--Aqui comprobamos el numero de elementos en el carrito */
  if (nProductos == 0) {
    /*--Si tenemos 0 elementos ponemos un enlace al catalogo */
    document.getElementById("carrito").innerHTML =
      "<div><a href='catalogo.html'>Visita nuestro catalogo!</a></div>";
  } else {
    document.getElementById("carrito").innerHTML = listado;
    document.getElementById("numeroProductos").innerHTML = nProductos;
    document.getElementById("totalImporte").innerHTML = pTotal;
  }
  console.info("Numero de Productos:" + nProductos);
  console.info("Importe Total:" + pTotal);
}

// funcion modificar

function Modificar(ref,cant, ident){
  var http = new XMLHttpRequest();
  var url = "http://localhost:3001/carrito";
  var usuario = sessionStorage.getItem('idUsuario');
  http.open("PUT", url+'/'+ident, true);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      //aqui obtienes la respuesta de tu peticion
     
    }
  }
  if(cant=='' || cant<0){
    alert("Debes introducir una cantidad valida");
  }else { 
    alert("Cantidad modificada");

    http.send(JSON.stringify({ "referencia": ref.id, "cantidad": parseInt(cant), "idusuario": usuario  }));

  }
 
  obtenerCarrito();

}

obtenerCarrito();


/* Funcion para eliminar articulos del carrito */

function eliminarItem(i){
     
  var http = new XMLHttpRequest();
  var url = "http://localhost:3001/carrito";
  
  http.open("DELETE", url+'/'+i, true);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //console.log(url);
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      //aqui obtienes la respuesta de tu peticion
      alert("Articulo eliminado");
      for (let i = 0; i < Object.keys(arrCarrito).length; i++) {
     
        for (let j = 0; j < Object.keys(arrArticulo).length; j++) {
          
            pTotal -= arrArticulo[j].precio*arrCarrito[i].cantidad;
        }
      }

    }
    obtenerCarrito();

  }
  http.send();
}



