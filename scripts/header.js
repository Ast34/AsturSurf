var nombreu = document.getElementById("nombreusuario");
function Nombre(){
  var usuario = sessionStorage.getItem("nombreusuario").charAt(0).toUpperCase();
  if(usuario != undefined){
    nombreu.style.display="block";
    nombreu.innerHTML = usuario;
  }else{
    usuario = "none"
  }
}
Nombre();