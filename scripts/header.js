var nombreu = document.getElementById("nombreusuario");
function Nombre(){
  var usuario = sessionStorage.getItem("nombreusuario");
  if(usuario != undefined){
    nombreu.innerHTML = usuario;
  }
}
Nombre();