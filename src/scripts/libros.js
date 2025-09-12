document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector(".data-table tbody");
  const formContainer = document.querySelector(".add-edit-form-container");
  const openBtn = document.getElementById("openAddForm");
  const closeBtn = document.getElementById("closeForm");
  const form = document.querySelector(".add-edit-form");
  const searchInput = document.querySelector(".search-input input");
  const paginationInfo = document.querySelector(".pagination-info small");

  // Datos iniciales con estado booleano
  let libros = [
    { id: "L-001", titulo: "El Principito", autor: "Antoine de Saint-Exupéry", categoria: "Ficción", ubicacion: "Estante A1", estado: true },
    { id: "L-002", titulo: "Cien años de soledad", autor: "Gabriel García Márquez", categoria: "Realismo Mágico", ubicacion: "Estante B2", estado: true },
    { id: "L-003", titulo: "1984", autor: "George Orwell", categoria: "Distopía", ubicacion: "Estante C3", estado: false },
    { id: "L-004", titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", categoria: "Novela", ubicacion: "Estante A2", estado: true },
  ];

  let editIndex = null;

  // Función para renderizar estado con booleano
  function renderEstado(estado) {
    if (estado === true) {
      return `<span class="badge bg-success">Disponible</span>`;
    } else {
      return `<span class="badge bg-danger">Prestado</span>`;
    }
  }

  // Renderizar tabla
  function renderTable(filtro = "") {
    tbody.innerHTML = "";
    const filtrados = libros.filter(libro =>
      Object.values(libro).some(val => String(val).toLowerCase().includes(filtro.toLowerCase()))
    );

    filtrados.forEach((libro, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><i class="fas fa-book icon-table"></i>${libro.id}</td>
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.categoria}</td>
        <td>${libro.ubicacion}</td>
        <td>${renderEstado(libro.estado)}</td>
        <td class="actions">
          <button class="btn btn-warning btn-sm edit-btn" title="Editar"><i class="fas fa-pen"></i></button>
          <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;

      row.querySelector(".edit-btn").addEventListener("click", () => editBook(index));
      row.querySelector(".delete-btn").addEventListener("click", () => deleteBook(index));

      tbody.appendChild(row);
    });

    paginationInfo.textContent = `Mostrando ${filtrados.length} de ${libros.length} registros`;
  }

  // Abrir formulario
  openBtn.addEventListener("click", () => {
    formContainer.style.display = "block";
    form.reset();
    editIndex = null;
  });

  // Cerrar formulario
  closeBtn.addEventListener("click", () => {
    formContainer.style.display = "none";
  });

  // Guardar libro
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const libro = {
      id: document.getElementById("libroID").value,
      titulo: document.getElementById("titulo").value,
      autor: document.getElementById("autor").value,
      categoria: document.getElementById("categoria").value,
      ubicacion: document.getElementById("ubicacion").value,
      estado: document.getElementById("estado").value === "Disponible" ? true : false
    };

    if (editIndex === null) {
      libros.push(libro);
    } else {
      libros[editIndex] = libro;
    }

    renderTable();
    formContainer.style.display = "none";
  });

  // Editar libro
  function editBook(index) {
    const libro = libros[index];
    document.getElementById("libroID").value = libro.id;
    document.getElementById("titulo").value = libro.titulo;
    document.getElementById("autor").value = libro.autor;
    document.getElementById("categoria").value = libro.categoria;
    document.getElementById("ubicacion").value = libro.ubicacion;
    document.getElementById("estado").value = libro.estado ? "Disponible" : "Prestado";

    formContainer.style.display = "block";
    editIndex = index;
  }

  // Eliminar libro
  function deleteBook(index) {
    if (confirm("¿Seguro que deseas eliminar este libro?")) {
      libros.splice(index, 1);
      renderTable();
    }
  }

  // Buscar libros
  searchInput.addEventListener("input", () => {
    renderTable(searchInput.value);
  });

  // Render inicial
  renderTable();
});
