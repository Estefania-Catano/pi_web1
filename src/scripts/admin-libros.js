const API_URL = "https://68ed5a3adf2025af78fff3c7.mockapi.io/books";

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.querySelector("#tablaLibros tbody");
  const inputBuscar = document.querySelector(".search-input input");
  
  if (tabla) {
    cargarLibros(tabla);
  }
  
  if (inputBuscar) {
    inputBuscar.addEventListener("input", async (e) => {
      const term = e.target.value.toLowerCase();
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const filtrados = data.filter(
          (l) =>
            l.title.toLowerCase().includes(term) ||
            l.author.toLowerCase().includes(term)
        );
        mostrarLibros(filtrados, tabla);
      } catch (err) {
        console.error("Error al buscar:", err);
      }
    });
  }
});

// === Cargar todos los libros ===
async function cargarLibros(tabla) {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    mostrarLibros(data, tabla);
  } catch (error) {
    console.error("Error al cargar los libros:", error);
  }
}

// === Mostrar libros en la tabla ===
function mostrarLibros(libros, tabla) {
  tabla.innerHTML = "";
  libros.forEach((libro) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${libro.id}</td>
      <td>${libro.title}</td>
      <td>${libro.author}</td>
      <td>${libro.category}</td>
      <td>${libro.year || "-"}</td>
      <td>
        <button class="btn-edit" data-id="${libro.id}">✏️</button>
        <button class="btn-delete" data-id="${libro.id}">🗑️</button>
      </td>
    `;
    tabla.appendChild(fila);
  });

  // Attach event listeners
  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest("button").dataset.id;
      eliminarLibro(id, tabla);
    });
  });

  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest("button").dataset.id;
      editarLibro(id);
    });
  });
}

// === Editar libro ===
function editarLibro(id) {
  window.location.href = `registroLibros.html?id=${id}`;
}

// === Eliminar libro ===
async function eliminarLibro(id, tabla) {
  if (confirm("¿Seguro que quieres eliminar este libro?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("✅ Libro eliminado correctamente");
        cargarLibros(tabla);
      } else {
        throw new Error("Error al eliminar");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("❌ Error al eliminar libro");
    }
  }
}
