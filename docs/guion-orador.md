# Guion del orador – Exposición (5–7 min)

## 0:00 – Portada (10-15s)
- Proyecto: Sistema de Gestión de Biblioteca (Web)
- Tecnologías: HTML, CSS, JS (módulos)
- Objetivo: demostrar arquitectura + DOM + arrays + control de flujo + asincronía + fetch

## 0:15 – Arquitectura (45s)
- Estructura: `public/` vistas; `src/styles/` CSS; `src/scripts/` JS; `src/main.js` entrada; `src/assets/` imágenes.
- Punto de entrada `src/main.js`: importa módulos y escucha `DOMContentLoaded` con `try/catch`.
- Valor: separación de responsabilidades y modularidad.

Fragmento:
```js
import { initApp } from './scripts/app.js';
import { setupEventListeners } from './scripts/events.js';
import { loadUserPreferences } from './utils/preferences.js';

document.addEventListener('DOMContentLoaded', function() {
  try { initApp(); setupEventListeners(); loadUserPreferences(); }
  catch (error) { console.error('Error al inicializar la aplicación:', error); }
});
```

## 1:00 – DOM: filtrado en vivo (45s)
- `catalog.js`: prevenir recarga del formulario, escuchar `input`, recorrer tarjetas y ocultar/mostrar.
- Mensaje clave: la UI reacciona al texto sin recargar la página.

Fragmento:
```js
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('input[type="search"]');
  const cards = document.querySelectorAll('.row .col');
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase().trim();
    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      card.style.display = title.includes(filter) ? '' : 'none';
    });
  });
});
```

## 1:45 – DOM: creación dinámica (30s)
- Crear tarjeta con `createElement` y `innerHTML`; insertar con `appendChild`.

Fragmento:
```js
const card = document.createElement('div');
card.className = 'col';
card.innerHTML = `...`; // título, autores, imagen
booksContainer.appendChild(card);
```

## 2:15 – Arrays y control de flujo (60s)
- `estudiantes.js`: `filter` para coincidencias, `forEach` para renderizado, `findIndex` para índice real.
- Control: `if` para condiciones y `switch` en `events.js` para acciones.

Fragmentos:
```js
const filtrados = estudiantes.filter(est =>
  Object.values(est).some(val => String(val).toLowerCase().includes(filtroLower))
);
filtrados.forEach(est => { /* ...crear fila... */ });
```
```js
switch (action) { case 'login': handleLogin(); break; /* ... */ default: console.log('Acción no reconocida'); }
```

## 3:15 – Asincronía y fetch (75s)
- `catalog.js`: `async/await` para Google Books API.
- `try/catch` para fallos de red; `if (!data.items)` para estado vacío; renderizado de tarjetas.

Fragmento:
```js
async function loadBooks() {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=literatura&maxResults=30`);
    const data = await response.json();
    if (!data.items) { booksContainer.innerHTML = 'No se encontraron libros.'; return; }
    data.items.forEach(item => { /* ...card... */ });
  } catch (e) {
    booksContainer.innerHTML = 'No se pudieron cargar los libros.';
  }
}
```

## 4:30 – Formularios + almacenamiento (45s)
- `userRegistry.js`: prevenir recarga, construir objeto, validar duplicados con `localStorage`, guardar JSON.

Fragmento:
```js
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const usuarioData = { /* ... */ };
  const correo = usuarioData.correo;
  if (localStorage.getItem(correo)) { mensaje.textContent = 'El usuario ya existe.'; }
  else { localStorage.setItem(correo, JSON.stringify(usuarioData)); mensaje.textContent = 'Usuario registrado con éxito!'; form.reset(); }
});
```

## 5:15 – Demo guiada (45–90s)
- Abrir catálogo: escribir en búsqueda → filtrado en vivo.
- Ejecutar `loadBooks()` ya carga automáticamente → tarjetas desde API.
- Registro: completar datos → ver validación de duplicados y éxito.
- (Opcional admin) Estudiantes: escribir filtro, editar/eliminar (prompts).

## 6:45 – Cierre (15–30s)
- Arquitectura modular, DOM reactivo, arrays para colecciones, control de flujo claro.
- Asincronía con `fetch` y manejo de errores.
- Persistencia local para demo sin backend.
