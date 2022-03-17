var nombreu = document.getElementById("nombreusuario");
function Nombre(){
  var usuario = sessionStorage.getItem("nombreusuario").toUpperCase();
  if(usuario != undefined){
    nombreu.innerHTML = usuario;
  }
}
Nombre();