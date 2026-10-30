//Aqui se consolida la lógica del ejercicio para registrar mascotas
document.getElementById("formulario").addEventListener("submit",(e)=>{
e.preventDefault();//Evita que se recargue la página al enviar el formulario
document.getElementById("mensaje").textContent = "Mascota registrada correctamente!";
}
)