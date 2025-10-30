// === CONFIGURACIÓN DE API ===
const API_URL = "https://68ed6426df2025af7800114f.mockapi.io/Loans";

// === CARGA CONDICIONAL SEGÚN PÁGINA ===
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#loans-table")) {
    getLoans(); // Página de lista
    
    // Search functionality
    const searchInput = document.querySelector(".search-input input");
    if (searchInput) {
      searchInput.addEventListener("input", filterLoans);
    }
  }

  if (document.querySelector("#loan-form")) {
    initLoanForm(); // Página de registro
  }
});

// === FUNCIÓN: OBTENER PRÉSTAMOS ===
async function getLoans() {
  const tableBody = document.querySelector("#loans-table tbody");
  try {
    const res = await fetch(API_URL);
    const loans = await res.json();
    tableBody.innerHTML = "";

    loans.forEach(loan => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${loan.id}</td>
        <td>${loan.bookId}</td>
        <td>${loan.studentId}</td>
        <td>${loan.loanDate}</td>
        <td>${loan.returnDate}</td>
        <td>${loan.status}</td>
        <td>
          <button class="btn-edit" data-id="${loan.id}">✏️</button>
          <button class="btn-delete" data-id="${loan.id}">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Attach event listeners
    document.querySelectorAll(".btn-delete").forEach(btn =>
      btn.addEventListener("click", (e) => {
        const id = e.target.closest("button").dataset.id;
        deleteLoan(id);
      })
    );

    document.querySelectorAll(".btn-edit").forEach(btn =>
      btn.addEventListener("click", (e) => {
        const id = e.target.closest("button").dataset.id;
        window.location.href = `registroPrestamos.html?id=${id}`;
      })
    );
  } catch (err) {
    console.error("Error al obtener préstamos:", err);
  }
}

// === FUNCIÓN: FORMULARIO DE REGISTRO / EDICIÓN ===
function initLoanForm() {
  const form = document.querySelector("#loan-form");
  const btnSubmit = document.querySelector("#btnSubmit");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) loadLoan(id);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loanData = {
      bookId: form.bookId.value,
      studentId: form.studentId.value,
      loanDate: form.loanDate.value,
      returnDate: form.returnDate.value,
      status: form.status.value
    };

    try {
      if (id) {
        await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loanData)
        });
        alert("✅ Préstamo actualizado correctamente");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loanData)
        });
        alert("✅ Préstamo registrado con éxito");
      }

      window.location.href = "prestamos.html";
    } catch (error) {
      console.error("Error al guardar préstamo:", error);
    }
  });
}

// === CARGAR PRÉSTAMO EXISTENTE (para editar) ===
async function loadLoan(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const loan = await res.json();

  const form = document.querySelector("#loan-form");
  form.bookId.value = loan.bookId;
  form.studentId.value = loan.studentId;
  form.loanDate.value = loan.loanDate;
  form.returnDate.value = loan.returnDate;
  form.status.value = loan.status;

  document.querySelector("#btnSubmit").textContent = "Actualizar";
}

// === ELIMINAR PRÉSTAMO ===
async function deleteLoan(id) {
  if (confirm("¿Seguro que deseas eliminar este préstamo?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("✅ Préstamo eliminado correctamente");
        getLoans();
      } else {
        throw new Error("Error al eliminar");
      }
    } catch (error) {
      console.error("Error deleting loan:", error);
      alert("❌ Error al eliminar préstamo");
    }
  }
}

// === FILTRAR PRÉSTAMOS ===
async function filterLoans(e) {
  const term = e.target.value.toLowerCase();
  try {
    const res = await fetch(API_URL);
    const loans = await res.json();
    const filtered = loans.filter(loan =>
      loan.bookId?.toLowerCase().includes(term) ||
      loan.studentId?.toLowerCase().includes(term) ||
      loan.status?.toLowerCase().includes(term) ||
      loan.loanDate?.includes(term) ||
      loan.returnDate?.includes(term)
    );
    
    const tableBody = document.querySelector("#loans-table tbody");
    tableBody.innerHTML = "";
    
    filtered.forEach(loan => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${loan.id}</td>
        <td>${loan.bookId}</td>
        <td>${loan.studentId}</td>
        <td>${loan.loanDate}</td>
        <td>${loan.returnDate}</td>
        <td>${loan.status}</td>
        <td>
          <button class="btn-edit" data-id="${loan.id}">✏️</button>
          <button class="btn-delete" data-id="${loan.id}">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Attach event listeners
    document.querySelectorAll(".btn-delete").forEach(btn =>
      btn.addEventListener("click", (e) => {
        const id = e.target.closest("button").dataset.id;
        deleteLoan(id);
      })
    );

    document.querySelectorAll(".btn-edit").forEach(btn =>
      btn.addEventListener("click", (e) => {
        const id = e.target.closest("button").dataset.id;
        window.location.href = `registroPrestamos.html?id=${id}`;
      })
    );
  } catch (err) {
    console.error("Error filtering loans:", err);
  }
}
