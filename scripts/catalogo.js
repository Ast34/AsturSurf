function obtenerEquipos() {
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3001/articulos";

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var listarticulos = JSON.parse(this.responseText);
      getWebs(listarticulos);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
/* */
function getArticulos() {
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3001/articulos";
  var listarticulos;
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        listarticulos = JSON.parse(this.responseText);
        return (listarticulos);
      }
      else {
        return (console.info("Error en getArticulos()"))
      }
    }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

function getWebs(arr) {
  var listado = "";
  for (let i = 0; i < Object.keys(arr).length; i++) {
    listado +=
      "<div class=contenido-catalogo>" +
      "<img src=" +
      arr[i].imagen +
      ">" +
      "<div class=info-articulo>" +
      arr[i].nombre +
      " " +
      "<h1>" +
      arr[i].referencia +
      "</h1>" +
      "<p class=precio>" +
      arr[i].precio +
      "<span>" +
      "€" +
      "</span>" +
      "</p>" +
      "<button class='btn-añadir' id=" +
      arr[i].referencia +
      " onclick=obtenerCarrito(" +
      arr[i].referencia +
      ")></button>" +
      "</div>" +
      "</div>";
  }
  console.log(Object.keys(arr).length);
  document.getElementById("contenedor").innerHTML = listado;
}

obtenerEquipos();

function prueba() {
  var referencias = document.querySelectorAll("h1");
  for (i = 0; i < referencias.length; i++) {
    console.log(referencias[i].textContent);
  }
}

//si coincide usuario y referenc produc aumentar la cantidad

function Añadir(ref) {
  var http = new XMLHttpRequest();
  var url = "http://localhost:3001/carrito";
  var usuario = sessionStorage.getItem("idUsuario");
  http.open("POST", url, true);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 201) {
      //aqui obtienes la respuesta de tu peticion
      // alert(http.responseText);
    }
  };

  http.send(
    JSON.stringify({ referencia: ref.id, cantidad: 1, idusuario: usuario })
  );
}


/*  --PRUEBA-- */
function obtenerCarrito(ref) { // es la que se llama en el boton
  //Nos traemos todo el carrito con los productos que haya
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3001/carrito";
  var listacarrito;
  var usuario = sessionStorage.getItem("idUsuario");
  if (usuario != null) { // si es distinto de null puedes añadir

    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        listacarrito = JSON.parse(this.responseText);
        getCarrito(listacarrito, ref);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  } else { alert("Debes iniciar sesion primero") }
}

function getCarrito(arrayCarrito, ref) { //llamas al resto de metodos
  var usuario = sessionStorage.getItem("idUsuario");
  var flag = true;
  for (let i = 0; i < Object.keys(arrayCarrito).length; i++) {
    if (usuario == arrayCarrito[i].idusuario && arrayCarrito[i].referencia == ref.id
    ) {
     alert("ya existe en tu carrito");
      //llamar a modificar
      Modificar(arrayCarrito[i].id,arrayCarrito[i].cantidad,arrayCarrito[i].referencia);

      console.info("Deberiamos incrementar la cantidad del carrito en 1");
      flag = false;
    } else {
      console.info("Se añadio el producto a tu carrito");
    }
  }
  if (flag == true) {
    Añadir(ref);
  }
}


function Modificar(idcarrito,cant,ref){
  var http = new XMLHttpRequest();
  var url = "http://localhost:3001/carrito";
  var usuario = sessionStorage.getItem('idUsuario');
  http.open("PUT", url+'/'+idcarrito, true);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      //aqui obtienes la respuesta de tu peticion
      //alert("Cantidad modificada");
    }
  }
 
  http.send(JSON.stringify({ "referencia": ref, "cantidad": parseInt(cant+1), "idusuario": usuario  }));
}