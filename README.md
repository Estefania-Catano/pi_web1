# 📚 Biblioteca Virtual – Proyecto Web

Aplicación web estática para explorar un catálogo de libros, leer el blog y gestionar acciones básicas de usuario (login/perfil). Incluye una interfaz de usuario y una interfaz de administrador. El catálogo se alimenta dinámicamente usando la Google Books API (búsqueda en español).

---

## 🚀 Funcionalidades

- **Catálogo de libros**: búsqueda por texto, cuadrícula responsive (5 columnas, 2 filas visibles), hover en tarjetas.
- **Blog**: listado de publicaciones informativas.
- **Autenticación básica (UI)**: pantallas de inicio de sesión para estudiante y administrador.
- **Perfil de usuario**: vista de datos de usuario y actividades.
- **Panel administrador**: páginas para categorías, estudiantes, préstamos, devoluciones, etc. (nivel UI).

---

## 🗂️ Estructura principal

- `index.html` – Entrada general.
- `public/`
  - `home/` – Vistas públicas: `catalog.html`, `Blog.html`, `detail.html`, `login.html`, `userRegistry.html`.
  - `user-interfase/` – Vistas para usuario autenticado: `index.html`, `catalog.html`, `Blog.html`, `detail.html`, `Post.html`, `userProfile.html`.
  - `admin-interfase/` – Vistas administrativas: `dashboard.html`, `catalogo.html`, `categorias.html`, `estudiantes.html`, `prestamos.html`, `devoluciones.html`, `perfil.html`, `login.html`, `registro.html`.
- `src/`
  - `scripts/` – Lógica de UI: `catalog.js`, `index.js`, `loginStudent.js`, `loginAdmin.js`, `userProfile.js`, etc.
  - `styles/` – Estilos: `stylesheet.css` (principal), `stilos.css`.
  - `assets/` – Imágenes (home/admin, íconos, portadas, logo, etc.).
  - `utils/` – Utilidades: `preferences.js`.


---

## 🧩 Detalles técnicos relevantes

- **Frameworks/Librerías**: HTML5, CSS3, JavaScript, Bootstrap 5 (CDN), Google Fonts.
- **Catálogo dinámico** (`src/scripts/catalog.js`):
  - Usa Google Books API para obtener libros en español: `https://www.googleapis.com/books/v1/volumes`.
  - Búsqueda con debounce, render de tarjetas y normalización de datos (título, autores, portada, enlace).
  - Por diseño se muestran 10 resultados (2 filas de 5 columnas) para una vista limpia.
- **Estilos** (`src/styles/stylesheet.css`):
  - Ajustes responsive para catálogo, blog y otras vistas.
  - Portadas del catálogo con alturas por breakpoint y padding lateral del contenedor para evitar que queden pegadas a los bordes.

---

## ▶️ Puesta en marcha (local)

Opción A – Abrir directamente:
1. Clona/descarga el repo.
2. Abre `index.html` en tu navegador.

Opción B – Servidor local recomendado (mejor para rutas relativas):
- VS Code + extensión Live Server → botón “Go Live”.
  - Abre `http://localhost:5500/` y navega a las páginas de `public/`.

---

## ⚙️ Configuración del Catálogo (opcional)

- Término por defecto de búsqueda: `literatura` (puedes cambiarlo en `catalog.js`).
- Idioma restringido: `es` (español).
- Para modificar cantidad visible (por filas o columnas):
  - Columnas: ajustar `row row-cols-5` en los `catalog.html`.
  - Máximo tarjetas: modificar `books.slice(0, 10)` en `renderBooks` de `catalog.js`.

---

## 📌 Notas y limitaciones

- Es un proyecto estático orientado a UI/UX. Las pantallas de login, préstamos y devoluciones son demostrativas; no hay backend ni persistencia real.
- Algunas imágenes/íconos son de ejemplo y pueden no representar datos reales.

---

## 🧪 Scripts clave

- `src/scripts/catalog.js`: búsqueda y render del catálogo (Google Books API, filtro y eventos de UI).
- `src/scripts/index.js`, `main.js`, `events.js`: utilidades y comportamientos generales de la UI.
- `src/scripts/loginStudent.js`, `loginAdmin.js`: manejo de formularios de acceso a nivel frontend.

