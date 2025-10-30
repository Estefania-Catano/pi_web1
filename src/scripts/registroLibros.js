const API_URL = "https://68ed5a3adf2025af78fff3c7.mockapi.io/books";

document.addEventListener("DOMContentLoaded", () => {
  // Check if we're editing
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  
  if (id) {
    loadBookForEdit(id);
  }

  document.getElementById("formRegistroLibro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const bookData = {
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      category: document.getElementById("category").value,
      year: document.getElementById("year").value,
      description: document.getElementById("description").value,
      cover: document.getElementById("cover").value,
      available: true
    };

    try {
      if (id) {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData)
        });
        
        if (!res.ok) throw new Error("Error al actualizar libro");
        alert("✅ Libro actualizado correctamente");
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData)
        });
        
        if (!res.ok) throw new Error("Error al guardar libro");
        alert("📘 Libro guardado correctamente");
      }
      
      window.location.href = "catalogo.html";
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo guardar el libro");
    }
  });
});

async function loadBookForEdit(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const book = await response.json();
    
    document.getElementById("title").value = book.title || "";
    document.getElementById("author").value = book.author || "";
    document.getElementById("category").value = book.category || "";
    document.getElementById("year").value = book.year || "";
    document.getElementById("description").value = book.description || "";
    document.getElementById("cover").value = book.cover || "";
    
    document.querySelector("h1").textContent = "Editar Libro";
    document.querySelector("button[type='submit']").textContent = "Actualizar libro";
  } catch (error) {
    console.error("Error loading book:", error);
  }
}

