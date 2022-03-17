var usuario = document.getElementById("usu");
var contra = document.getElementById("pas");
var infoUser = document.getElementById("validacion");
var recuperar = document.getElementById("recupera");
recuperar.style.visibility="hidden"
var nombreu = document.getElementById("nombreusuario");
function getUser() {
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3001/usuarios";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var user = JSON.parse(this.responseText);
      obtener(user);
      console.info(user);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

  function obtener(arr) {
    var listado = "";
    var userExist = false;
    var userValid = false;
    var idUsuario;
    var nombreUsuario;
    for (let i = 0; i < Object.keys(arr).length; i++) {
      /*Recorre la array y hace una copia en listado */
      listado += arr[i].username + " - " + arr[i].password;
      if (arr[i].username == usuario.value) {
        /*Comprueba si existe el usuario */
        userExist = true;
        nombreUsuario=arr[i].username;
        if (arr[i].password == contra.value) {
          /*Comprueba si el usuario es valido (Que la contraseña coincida) */
          userValid = true;
          idUsuario = arr[i].id; // se asocia id usuario con el id de cada uno
          
          /*Info de la consola */
          console.info(" -ESTADO : ");
        }
      }
    }
    if(usuario.value=='' || contra.value==''){
      alert("Debes introducir todos los datos");
    }

    /*Cambia movidas en funcion del estado */
    if (userExist == true) {
      if (userValid == true) {
        //alert("INICIASTE SESIÓN");
        mensajeInicio();
        sessionStorage.setItem('idUsuario', idUsuario);
        sessionStorage.setItem('nombreusuario', nombreUsuario);
        for (let i = 0; i < Object.keys(arr).length; i++) {
            if(arr[i].username == usuario.value){
              nombreu.innerHTML = arr[i].username;
            }
       
        }
      } else {
        sessionStorage.setItem('idUsuario', null);
      } 
      if (!userValid == true) {
        recuperar.style.visibility="visible"
        console.info(" -ESTADO : Contraseña Incorrecta");
      }
    } else {
      infoUser.innerHTML = "Usuario Invalido";
      console.info(" -ESTADO : Usuario Invalido");
    }

    /*Basura que Sale por consola */
    console.info("Usuario Existe : " + userExist);
    console.info("Usuario Valido : " + userValid);
    contra.value = '';
    usuario.value = '';
    console.info(listado);
  }


  function Nombre(){
    var usuario = sessionStorage.getItem("nombreusuario");
    if(usuario != undefined){
      nombreu.innerHTML = usuario;
    }
  }
  Nombre();

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


function getUser2() {
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3001/usuarios";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var user = JSON.parse(this.responseText);
    Recuperar(user,usuario) //usuario es el valor el input
      console.info(user);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function Recuperar(arrayusuarios, usuario){
  var existe = false;
  var flag = false;
  for (let i = 0; i < Object.keys(arrayusuarios).length; i++) {
    if (arrayusuarios[i].username == usuario.value) {
      existe = true;
      alert("Tu nombre de usuario es: "+arrayusuarios[i].username +" y la contraseña: "+arrayusuarios[i].password);
    }
  }
   if(existe !=true && usuario.value!='') {
    alert("El nombre de usuario no esta registrado");

    flag=true;
   }

   if (usuario.value=='' && flag==false && existe!=true){
   
    alert("Debes introducir un nombre");

   }

}
