const API_URL = "https://68fe99007c700772bb1413ea.mockapi.io/profiles";

document.addEventListener("DOMContentLoaded", () => {
  loadProfiles();
  
  // Search functionality
  const searchInput = document.querySelector(".search-input input");
  if (searchInput) {
    searchInput.addEventListener("input", filterProfiles);
  }
});

// Load all profiles
async function loadProfiles() {
  try {
    const response = await fetch(API_URL);
    const profiles = await response.json();
    renderProfiles(profiles);
  } catch (error) {
    console.error("Error loading profiles:", error);
  }
}

// Render profiles in table
function renderProfiles(profiles) {
  const tbody = document.querySelector(".data-table tbody");
  if (!tbody) return;

  tbody.innerHTML = profiles.map(profile => `
    <tr>
      <td><i class="fas fa-chalkboard-teacher icon-table"></i>${profile.id}</td>
      <td>${profile.document}</td>
      <td>${profile.name}</td>
      <td>${profile.lastname}</td>
      <td>${profile.phone}</td>
      <td>${profile.specialty}</td>
      <td class="actions">
        <button class="btn btn-warning btn-sm" onclick="editProfile(${profile.id})" title="Editar">
          <i class="fas fa-pen"></i>
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteProfile(${profile.id})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  `).join("");
}

// Filter profiles
async function filterProfiles(e) {
  const term = e.target.value.toLowerCase();
  try {
    const response = await fetch(API_URL);
    const profiles = await response.json();
    const filtered = profiles.filter(p => 
      p.name?.toLowerCase().includes(term) || 
      p.lastname?.toLowerCase().includes(term) ||
      p.document?.includes(term) ||
      p.specialty?.toLowerCase().includes(term)
    );
    renderProfiles(filtered);
  } catch (error) {
    console.error("Error filtering profiles:", error);
  }
}

// Edit profile
function editProfile(id) {
  window.location.href = `registroPerfil.html?id=${id}`;
}

// Delete profile
async function deleteProfile(id) {
  if (!confirm("¿Está seguro de eliminar este profesor?")) return;
  
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("✅ Profesor eliminado correctamente");
    loadProfiles();
  } catch (error) {
    console.error("Error deleting profile:", error);
    alert("❌ Error al eliminar profesor");
  }
}

// Registration form handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-edit-form");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    loadProfileForEdit(id);
    form.querySelector("button[type='submit']").textContent = "Actualizar";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      document: document.getElementById("documentoProfesor").value,
      name: document.getElementById("nombresProfesor").value,
      lastname: document.getElementById("apellidosProfesor").value,
      phone: document.getElementById("telefonoProfesor").value,
      specialty: document.getElementById("especialidad").value,
      email: document.getElementById("emailProfesor").value
    };

    try {
      if (id) {
        await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("✅ Profesor actualizado correctamente");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("✅ Profesor registrado correctamente");
      }
      window.location.href = "perfil.html";
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("❌ Error al guardar profesor");
    }
  });

  const closeBtn = document.getElementById("closeForm");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.location.href = "perfil.html";
    });
  }
});

// Load profile for editing
async function loadProfileForEdit(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const profile = await response.json();
    
    document.getElementById("profesorID").value = profile.id || "";
    document.getElementById("documentoProfesor").value = profile.document || "";
    document.getElementById("nombresProfesor").value = profile.name || "";
    document.getElementById("apellidosProfesor").value = profile.lastname || "";
    document.getElementById("telefonoProfesor").value = profile.phone || "";
    document.getElementById("especialidad").value = profile.specialty || "";
    document.getElementById("emailProfesor").value = profile.email || "";
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}
