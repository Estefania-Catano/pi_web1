const API_URL = "https://68fe99007c700772bb1413ea.mockapi.io/categories";

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  
  // Search functionality
  const searchInput = document.querySelector(".search-input input");
  if (searchInput) {
    searchInput.addEventListener("input", filterCategories);
  }

  // Close form button
  const closeFormBtn = document.getElementById("closeForm");
  if (closeFormBtn) {
    closeFormBtn.addEventListener("click", () => {
      window.location.href = "categorias.html";
    });
  }
});

// Load all categories
async function loadCategories() {
  try {
    const response = await fetch(API_URL);
    const categories = await response.json();
    renderCategories(categories);
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

// Render categories in table
function renderCategories(categories) {
  const tbody = document.querySelector(".data-table tbody");
  if (!tbody) return;

  tbody.innerHTML = categories.map(cat => `
    <tr>
      <td><i class="fas fa-bookmark icon-table"></i>${cat.id}</td>
      <td>${cat.name}</td>
      <td>${cat.description}</td>
      <td>${cat.bookCount || 0}</td>
      <td class="actions">
        <button  title="Ver Libros">
          <i class="fas fa-book-reader"></i>
        </button>
        <button onclick="editCategory(${cat.id})" title="Editar">
          <i class="fas fa-pen"></i>
        </button>
        <button" onclick="deleteCategory(${cat.id})" title="Eliminar">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  `).join("");
}

// Filter categories
async function filterCategories(e) {
  const term = e.target.value.toLowerCase();
  try {
    const response = await fetch(API_URL);
    const categories = await response.json();
    const filtered = categories.filter(cat => 
      cat.name?.toLowerCase().includes(term) || 
      cat.description?.toLowerCase().includes(term)
    );
    renderCategories(filtered);
  } catch (error) {
    console.error("Error filtering categories:", error);
  }
}

// Edit category
function editCategory(id) {
  window.location.href = `registroCategorias.html?id=${id}`;
}

// Delete category
async function deleteCategory(id) {
  if (!confirm("¿Está seguro de eliminar esta categoría?")) return;
  
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("✅ Categoría eliminada correctamente");
    loadCategories();
  } catch (error) {
    console.error("Error deleting category:", error);
    alert("❌ Error al eliminar categoría");
  }
}

// Registration form handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-edit-form");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    loadCategoryForEdit(id);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById("nombreCategoria").value,
      description: document.getElementById("descripcionCategoria").value
    };

    try {
      if (id) {
        await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("✅ Categoría actualizada correctamente");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("✅ Categoría registrada correctamente");
      }
      window.location.href = "categorias.html";
    } catch (error) {
      console.error("Error saving category:", error);
      alert("❌ Error al guardar categoría");
    }
  });
});

// Load category for editing
async function loadCategoryForEdit(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const category = await response.json();
    
    document.getElementById("categoriaID").value = category.id || "";
    document.getElementById("nombreCategoria").value = category.name || "";
    document.getElementById("descripcionCategoria").value = category.description || "";
  } catch (error) {
    console.error("Error loading category:", error);
  }
}
