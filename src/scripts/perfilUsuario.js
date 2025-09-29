// Obtener usuario activo
const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

if(!usuarioActivo){
    alert("No hay usuario activo. Redirigiendo al login...");
    window.location.href = 'login.html'; // redirige si no hay usuario
}

// Llenar datos en la página
document.getElementById('nombrePerfil').textContent = usuarioActivo.nombre + ' ' + usuarioActivo.apellido;
document.getElementById('tipoDocumento').textContent = usuarioActivo.tipoDocumento;
document.getElementById('numeroDocumento').textContent = usuarioActivo.numeroDocumento;
document.getElementById('nombre').textContent = usuarioActivo.nombre;
document.getElementById('apellido').textContent = usuarioActivo.apellido;
document.getElementById('correo').textContent = usuarioActivo.correo;
document.getElementById('telefono').textContent = usuarioActivo.telefono;
document.getElementById('direccion').textContent = usuarioActivo.direccion;

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('usuarioActivo');
    window.location.href = '../../public/home/login.html';
});
