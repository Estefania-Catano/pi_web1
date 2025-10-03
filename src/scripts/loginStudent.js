const loginForm = document.getElementById('loginForm');
const mensajeLogin = document.getElementById('mensaje'); // mensaje en login

// Login
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const correo = document.getElementById('user').value;
  const password = document.getElementById('password').value;

  const usuarioData = JSON.parse(localStorage.getItem(correo)); // parseamos JSON

  if(usuarioData && usuarioData.password === password) {
    mensajeLogin.textContent = 'Inicio de sesión exitoso!';
    mensajeLogin.classList.remove('text-danger');
    mensajeLogin.classList.add('text-success');

    // Guardar usuario activo
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioData));

    // Redirigir a otra página después de 1 segundo
    setTimeout(() => {
        window.location.href = '../../public/user-interfase/index.html';
    }, 1000);
  } else {
    mensajeLogin.textContent = 'Usuario o contraseña incorrectos.';
    mensajeLogin.classList.remove('text-success');
    mensajeLogin.classList.add('text-danger');
  }
});

// Recuperar contraseña
const formRecuperar = document.getElementById('formRecuperar');
const mensajeRecuperar = document.getElementById('mensajeRecuperar');

formRecuperar.addEventListener('submit', function(e) {
    e.preventDefault();

    const correo = document.getElementById('correoRecuperar').value.trim();
    const usuarioData = JSON.parse(localStorage.getItem(correo));

    if (!correo) {
        mensajeRecuperar.textContent = 'Ingrese un correo válido.';
        mensajeRecuperar.classList.remove('text-success');
        mensajeRecuperar.classList.add('text-danger');
        return;
    }

    if(usuarioData) {
        mensajeRecuperar.textContent = `La contraseña de ${correo} es: ${usuarioData.password}`;
        mensajeRecuperar.classList.remove('text-danger');
        mensajeRecuperar.classList.add('text-success');
    } else {
        mensajeRecuperar.textContent = 'Correo no registrado.';
        mensajeRecuperar.classList.remove('text-success');
        mensajeRecuperar.classList.add('text-danger');
    }

    formRecuperar.reset();
});
