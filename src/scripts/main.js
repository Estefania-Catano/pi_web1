// src/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navbar-nav .nav-link");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.innerText = "⬆ Volver arriba";   // Texto personalizado
  btn.classList.add("btn", "btn-primary"); // Azul de Bootstrap
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.display = "none"; // oculto al inicio
  btn.style.zIndex = "1000";  // para que no quede detrás de nada
  document.body.appendChild(btn);

  // Mostrar/ocultar según el scroll
  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  // Acción al hacer clic
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const categorias = document.querySelectorAll(".icon-container");

categorias.forEach(cat => {
  cat.addEventListener("click", () => {
    alert("Pronto te mostraremos más libros en esta categoría 📚");
  });
});
window.addEventListener("load", () => {
  const banner = document.getElementById("banner");
  banner.style.opacity = 0;
  setTimeout(() => {
    banner.style.transition = "opacity 2s";
    banner.style.opacity = 1;
  }, 300);
});
