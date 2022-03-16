var usuario = document.getElementById("usu").value;
var contra = document.getElementById("pas").value;
var contra2 = document.getElementById("pas2").value;
var infoUser = document.getElementById("validacion");




function Añadir(u, c, c2) {
  var http = new XMLHttpRequest();
  var url = "http://localhost:3001/usuarios";

  http.open("POST", url, true);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


  http.onreadystatechange = function () {
    if (http.readyState == 400 || http.status == 200) {
      //aqui obtienes la respuesta de tu peticion
      console.log(http.responseText);
    }
  }
  if (c == c2) {
    http.send(JSON.stringify({ "username": u, "password": c }));
  } else {
    alert("Las contraseñas no coinciden");
  }

  usuario.value = '';
  contra.value = '';
}

function mensajeInicio() {
  (function (window, document) { // asilamos el componente
    // creamos el contedor del mensaje
    var container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    // esta es la funcion que hace el mensaje
    window.doToast = function (message) {
      // creamos tostada
      var toast = document.createElement('div');
      toast.className = 'toast-toast';
      toast.innerHTML = message;
      // agregamos el mensaje
      container.appendChild(toast);
      // programamos su eliminación
      setTimeout(function () {
        // cuando acabe de desaparecer, lo eliminamos del dom.
        toast.addEventListener("transitionend", function () {
          container.removeChild(toast);
        }, false);
        // agregamos un estilo que inicie la "transition".
        toast.classList.add("fadeout");
      }, 2000); // OP dijo, "solo dos segundos"
    }
  })(window, document);
  // ejemplo retardado de uso
  setTimeout(function () {
    doToast("Has iniciado sesion");
  }, 1200);

}


function obtenerUsuarios(u,c,c2) {
  /*llamada a usuarios*/
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3001/usuarios";
  var listausuarios;
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      listausuarios = JSON.parse(this.responseText);
      getUsuarios(listausuarios,u,c,c2);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function getUsuarios(arrayusuarios,u,c,c2) {
  var flag = true;
  for (let i = 0; i < Object.keys(arrayusuarios).length; i++) {
    if(arrayusuarios[i].username == u){
      alert("Ya existe el usuario");
      flag=false;
    }
  }

  if(u=='' || c=='' || c2==''){
alert("Debes introducir todos los datos");
  } else if(flag==true){
    Añadir(u,c,c2);
    mensajeInicio();
  }

}


