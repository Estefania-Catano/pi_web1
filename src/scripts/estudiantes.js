document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#studentsTable tbody");
  const searchInput = document.getElementById("searchInput");
  const btnNuevo = document.getElementById("btnNuevo");
  const paginationInfo = document.getElementById("paginationInfo");

  // Datos iniciales
  let estudiantes = [
    { codigo: "E-1001", documento: "10203040", nombres: "María", apellidos: "González", telefono: "3001234567", programa: "Desarrollo de Software", seccion: "A" },
    { codigo: "E-1002", documento: "20304050", nombres: "Juan", apellidos: "Rodríguez", telefono: "3019876543", programa: "Salud Ocupacional", seccion: "B" },
    { codigo: "E-1003", documento: "30405060", nombres: "Sofía", apellidos: "Fernández", telefono: "3024567890", programa: "Asistente Administrativo", seccion: "C" },
    { codigo: "E-1004", documento: "40506070", nombres: "Pedro", apellidos: "López", telefono: "3037890123", programa: "Diseño Gráfico", seccion: "A" },
    { codigo: "E-1005", documento: "50607080", nombres: "Laura", apellidos: "Díaz", telefono: "3045678901", programa: "Contabilidad", seccion: "A" }
  ];

  // Renderiza la tabla (usa findIndex para obtener el índice real en el array original)
  function renderTable(filtro = "") {
    tbody.innerHTML = "";
    const filtroLower = filtro.trim().toLowerCase();

    const filtrados = estudiantes.filter(est =>
      Object.values(est).some(val => String(val).toLowerCase().includes(filtroLower))
    );

    filtrados.forEach(est => {
      const realIndex = estudiantes.findIndex(e => e.codigo === est.codigo);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${est.codigo}</td>
        <td>${est.documento}</td>
        <td>${est.nombres}</td>
        <td>${est.apellidos}</td>
        <td>${est.telefono}</td>
        <td>${est.programa}</td>
        <td>${est.seccion}</td>
        <td class="actions">
          <button class="btn btn-warning btn-sm edit" data-index="${realIndex}" title="Editar"><i class="fas fa-pen"></i></button>
          <button class="btn btn-danger btn-sm delete" data-index="${realIndex}" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    paginationInfo.textContent = `Mostrando ${filtrados.length} de ${estudiantes.length} registros`;
  }

  // Delegación de eventos para editar/eliminar
  tbody.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit");
    const delBtn = e.target.closest(".delete");

    if (editBtn) {
      const idx = Number(editBtn.dataset.index);
      editStudent(idx);
    } else if (delBtn) {
      const idx = Number(delBtn.dataset.index);
      deleteStudent(idx);
    }
  });

  // Agregar nuevo (usa prompt para simplicidad)
  btnNuevo.addEventListener("click", (e) => {
    e.preventDefault();
    const codigo = prompt("Código del estudiante (ej: E-1006):");
    if (!codigo) return alert("Código requerido.");

    if (estudiantes.some(s => s.codigo === codigo)) {
      return alert("Ya existe un estudiante con ese código.");
    }

    const documento = prompt("Documento:") || "";
    const nombres = prompt("Nombres:") || "";
    const apellidos = prompt("Apellidos:") || "";
    const telefono = prompt("Teléfono:") || "";
    const programa = prompt("Programa:") || "";
    const seccion = prompt("Sección (A/B/C):") || "";

    estudiantes.push({ codigo, documento, nombres, apellidos, telefono, programa, seccion });
    renderTable(searchInput.value);
  });

  // Editar estudiante (prompt)
  function editStudent(index) {
    const est = estudiantes[index];
    if (!est) return alert("Estudiante no encontrado.");

    const codigo = prompt("Código:", est.codigo) || est.codigo;
    // evita que dos estudiantes queden con mismo codigo distinto al actual
    if (codigo !== est.codigo && estudiantes.some(s => s.codigo === codigo)) {
      return alert("Otro estudiante ya tiene ese código.");
    }

    const documento = prompt("Documento:", est.documento) || est.documento;
    const nombres = prompt("Nombres:", est.nombres) || est.nombres;
    const apellidos = prompt("Apellidos:", est.apellidos) || est.apellidos;
    const telefono = prompt("Teléfono:", est.telefono) || est.telefono;
    const programa = prompt("Programa:", est.programa) || est.programa;
    const seccion = prompt("Sección (A/B/C):", est.seccion) || est.seccion;

    estudiantes[index] = { codigo, documento, nombres, apellidos, telefono, programa, seccion };
    renderTable(searchInput.value);
  }

  // Eliminar estudiante
  function deleteStudent(index) {
    const est = estudiantes[index];
    if (!est) return;
    if (confirm(`¿Eliminar a ${est.nombres} ${est.apellidos} (${est.codigo})?`)) {
      estudiantes.splice(index, 1);
      renderTable(searchInput.value);
    }
  }

  // Buscar en vivo
  searchInput.addEventListener("input", () => {
    renderTable(searchInput.value);
  });

  // Render inicial
  renderTable();
});
