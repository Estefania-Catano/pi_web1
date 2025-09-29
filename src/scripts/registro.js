    const form = document.getElementById('registroForm');
    const mensaje = document.getElementById('mensaje');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const usuario = document.getElementById('user').value;
      const password = document.getElementById('password').value;

      // Guardar usuario en localStorage
      if(localStorage.getItem(usuario)) {
        mensaje.textContent = 'El usuario ya existe.';
      } else {
        localStorage.setItem(usuario, password);
        mensaje.textContent = 'Usuario registrado con éxito!';
        form.reset();
      }
    });

