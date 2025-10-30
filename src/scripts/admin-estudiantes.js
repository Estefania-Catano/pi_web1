const API_URL = "https://68ed5a3adf2025af78fff3c7.mockapi.io/students";

document.addEventListener("DOMContentLoaded", () => {
  loadStudents();
  
  // Search functionality
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", filterStudents);
  }

  // New student button
  const btnNuevo = document.getElementById("btnNuevo");
  if (btnNuevo) {
    btnNuevo.addEventListener("click", () => {
      window.location.href = "registroEstudiantes.html";
    });
  }
});

// Load all students
async function loadStudents() {
  try {
    const response = await fetch(API_URL);
    const students = await response.json();
    renderStudents(students);
  } catch (error) {
    console.error("Error loading students:", error);
  }
}

// Render students in table
function renderStudents(students) {
  const tbody = document.querySelector("#studentsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = students.map(student => `
    <tr>
      <td>${student.code || student.id}</td>
      <td>${student.document}</td>
      <td>${student.name}</td>
      <td>${student.lastname}</td>
      <td>${student.phone}</td>
      <td>${student.program}</td>
      <td>${student.section}</td>
      <td class="actions">
        <button class="btn btn-warning btn-sm" onclick="editStudent(${student.id})">
          <i class="fas fa-pen"></i>
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  `).join("");
}

// Filter students
async function filterStudents(e) {
  const term = e.target.value.toLowerCase();
  try {
    const response = await fetch(API_URL);
    const students = await response.json();
    const filtered = students.filter(s => 
      s.name?.toLowerCase().includes(term) || 
      s.lastname?.toLowerCase().includes(term) ||
      s.code?.toLowerCase().includes(term) ||
      s.document?.includes(term)
    );
    renderStudents(filtered);
  } catch (error) {
    console.error("Error filtering students:", error);
  }
}

// Edit student
function editStudent(id) {
  window.location.href = `registroEstudiantes.html?id=${id}`;
}

// Delete student
async function deleteStudent(id) {
  if (!confirm("¿Está seguro de eliminar este estudiante?")) return;
  
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("✅ Estudiante eliminado correctamente");
    loadStudents();
  } catch (error) {
    console.error("Error deleting student:", error);
    alert("❌ Error al eliminar estudiante");
  }
}

// Registration form handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-edit-form");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    loadStudentForEdit(id);
    form.querySelector("button[type='submit']").textContent = "Actualizar";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      code: document.getElementById("codigo").value,
      document: document.getElementById("documento").value,
      name: document.getElementById("nombres").value,
      lastname: document.getElementById("apellidos").value,
      phone: document.getElementById("telefono").value,
      program: document.getElementById("Programa").value,
      section: document.getElementById("seccion").value,
      email: document.getElementById("email").value,
      address: document.getElementById("direccion").value,
      gender: document.getElementById("genero").value,
      birthDate: document.getElementById("fechaNacimiento").value
    };

    try {
      if (id) {
        await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("✅ Estudiante actualizado correctamente");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("✅ Estudiante registrado correctamente");
      }
      window.location.href = "estudiantes.html";
    } catch (error) {
      console.error("Error saving student:", error);
      alert("❌ Error al guardar estudiante");
    }
  });

  const closeBtn = document.getElementById("closeForm");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.location.href = "estudiantes.html";
    });
  }
});

// Load student for editing
async function loadStudentForEdit(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const student = await response.json();
    
    document.getElementById("codigo").value = student.code || "";
    document.getElementById("documento").value = student.document || "";
    document.getElementById("nombres").value = student.name || "";
    document.getElementById("apellidos").value = student.lastname || "";
    document.getElementById("telefono").value = student.phone || "";
    document.getElementById("Programa").value = student.program || "";
    document.getElementById("seccion").value = student.section || "";
    document.getElementById("email").value = student.email || "";
    document.getElementById("direccion").value = student.address || "";
    document.getElementById("genero").value = student.gender || "";
    document.getElementById("fechaNacimiento").value = student.birthDate || "";
  } catch (error) {
    console.error("Error loading student:", error);
  }
}
