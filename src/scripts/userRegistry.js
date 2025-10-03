const form = document.getElementById('registroForm');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener todos los datos del formulario
    const usuarioData = {
        tipoDocumento: document.getElementById('tipoDocumento').value,
        numeroDocumento: document.getElementById('numeroDocumento').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('user').value,
        password: document.getElementById('password').value
    };

    const correo = usuarioData.correo;

    // Verificar si el usuario ya existe
    if(localStorage.getItem(correo)) {
        mensaje.textContent = 'El usuario ya existe.';
        mensaje.classList.remove('text-success');
        mensaje.classList.add('text-danger');
    } else {
        // Guardar como JSON en localStorage
        localStorage.setItem(correo, JSON.stringify(usuarioData));
        mensaje.textContent = 'Usuario registrado con éxito!';
        mensaje.classList.remove('text-danger');
        mensaje.classList.add('text-success');
        form.reset();
    }
});
