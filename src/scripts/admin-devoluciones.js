const API_URL = "https://68ed6426df2025af7800114f.mockapi.io/returns";

// === CARGAR DEVOLUCIONES ===
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#returns-table tbody");
  if (tableBody) loadReturns(tableBody);

  // Search functionality
  const searchInput = document.querySelector(".search-input input");
  if (searchInput) {
    searchInput.addEventListener("input", filterReturns);
  }

  const form = document.querySelector("#return-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const returnData = {
        idPrestamo: form.idPrestamo.value,
        idLibro: form.idLibro.value,
        idEstudiante: form.idEstudiante.value,
        fechaDevolucion: form.fechaDevolucion.value,
        estado: form.estado.value,
        observaciones: form.observaciones.value
      };
      
      try {
        await createReturn(returnData);
        alert("✅ Devolución registrada correctamente");
        window.location.href = "devoluciones.html";
      } catch (error) {
        console.error("Error creating return:", error);
        alert("❌ Error al registrar devolución");
      }
    });
  }
});

async function loadReturns(tableBody) {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    tableBody.innerHTML = "";
    
    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.idPrestamo}</td>
        <td>${item.idLibro}</td>
        <td>${item.idEstudiante}</td>
        <td>${item.fechaDevolucion}</td>
        <td>${item.estado}</td>
        <td>${item.observaciones || "-"}</td>
        <td>
          <button class="btn-delete" data-id="${item.id}" title="Eliminar">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Attach event listeners
    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.closest("button").dataset.id;
        deleteReturn(id);
      });
    });
  } catch (error) {
    console.error("Error al cargar devoluciones:", error);
  }
}

async function createReturn(returnData) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(returnData),
    });
  } catch (error) {
    console.error("Error al crear devolución:", error);
  }
}

async function deleteReturn(id) {
  if (!confirm("¿Deseas eliminar esta devolución?")) return;
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (response.ok) {
      alert("✅ Devolución eliminada correctamente");
      const tableBody = document.querySelector("#returns-table tbody");
      loadReturns(tableBody);
    } else {
      throw new Error("Error al eliminar");
    }
  } catch (error) {
    console.error("Error al eliminar devolución:", error);
    alert("❌ Error al eliminar devolución");
  }
}

// Filter returns
async function filterReturns(e) {
  const term = e.target.value.toLowerCase();
  try {
    const res = await fetch(API_URL);
    const returns = await res.json();
    const filtered = returns.filter(ret => 
      ret.idPrestamo?.includes(term) ||
      ret.idLibro?.includes(term) ||
      ret.idEstudiante?.includes(term) ||
      ret.estado?.toLowerCase().includes(term)
    );
    
    const tableBody = document.querySelector("#returns-table tbody");
    tableBody.innerHTML = "";
    
    filtered.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.idPrestamo}</td>
        <td>${item.idLibro}</td>
        <td>${item.idEstudiante}</td>
        <td>${item.fechaDevolucion}</td>
        <td>${item.estado}</td>
        <td>${item.observaciones || "-"}</td>
        <td>
          <button class="btn-delete" data-id="${item.id}" title="Eliminar">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Attach event listeners
    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.closest("button").dataset.id;
        deleteReturn(id);
      });
    });
  } catch (error) {
    console.error("Error filtering returns:", error);
  }
}