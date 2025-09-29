document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.innerText = "⬆ Volver arriba";   
  btn.classList.add("btn", "btn-primary"); 
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.display = "none"; 
  btn.style.zIndex = "1000"; 
  document.body.appendChild(btn);


  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  });


  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

//Ingreso
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.password === password) {
    alert("✅ Inicio de sesión correcto");
    window.location.href = "../../public/user-interfase/perfilusuario.html";
  } else {
    alert("❌ Correo o contraseña incorrectos");
  }
});
