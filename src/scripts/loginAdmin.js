const validEmail = 'admin@test.com';
const validPassword = '123456';


document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === validEmail && password === validPassword) {
        window.location.href = '../../public/admin-interfase/dashboard.html';

    } else {
        document.getElementById('result').innerHTML = '<div class="error">Email o contraseña incorrectos</div>';
    }
});