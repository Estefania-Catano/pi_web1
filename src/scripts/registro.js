document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  localStorage.setItem("user", JSON.stringify({ email, password }));

  alert("✅ Usuario registrado");
  window.location.href = "login.html";
});
