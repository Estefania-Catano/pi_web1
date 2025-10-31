document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('input[type="search"]');
    if (!searchInput) return;

    // Evitar que el form recargue la página
    const searchForm = searchInput.closest('form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const term = searchInput.value.trim();
            // Buscar contra la API con el término ingresado
            loadBooks(term || undefined);
        });
    }

    // Efecto hover en tarjetas (delegado tras carga)
    document.addEventListener('mouseover', (e) => {
        const el = e.target.closest('.card');
        if (el) {
            el.style.transform = 'scale(1.05)';
            el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
        }
    });
    document.addEventListener('mouseout', (e) => {
        const el = e.target.closest('.card');
        if (el) {
            el.style.transform = 'scale(1)';
            el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
        }
    });
});

// Función para configurar el filtro después de cargar los libros
function setupFilter() {
    const searchInput = document.querySelector('input[type="search"]');
    if (!searchInput) return;

    // Debounce para no disparar muchas peticiones
    let debounceId;
    searchInput.addEventListener('input', () => {
        const term = searchInput.value.trim();
        clearTimeout(debounceId);
        debounceId = setTimeout(() => {
            if (term.length === 0) {
                renderBooks(allBooks);
                return;
            }
            // Filtro local por título o autores
            const needle = term.toLowerCase();
            const filtered = allBooks.filter(b =>
                (b.title && b.title.toLowerCase().includes(needle)) ||
                (b.authorsText && b.authorsText.toLowerCase().includes(needle))
            );
            // Si el filtro local devuelve muy pocos resultados, intentamos buscar en la API
            if (filtered.length < 6) {
                loadBooks(term);
            } else {
                renderBooks(filtered);
            }
        }, 350);
    });

    
}

//===============================================================//
const booksContainer = document.getElementById('books-container');
let allBooks = [];

function renderBooks(books) {
  if (!booksContainer) return;
  if (!books || books.length === 0) {
    booksContainer.innerHTML = '<p>No se encontraron libros.</p>';
    return;
  }
  booksContainer.innerHTML = '';
  books.slice(0, 10).forEach(book => {
    const card = document.createElement('div');
    card.className = 'col';
    card.innerHTML = `
      <div class="card h-100">
        <a href="${book.infoLink}" target="_blank" rel="noopener noreferrer">
          <img src="${book.coverUrl}" class="card-img-top" alt="Portada de ${book.title}">
        </a>
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">${book.authorsText || 'Autor desconocido'}</p>
        </div>
      </div>
    `;
    booksContainer.appendChild(card);
  });
}

async function loadBooks(term) {
  if (!booksContainer) {
    console.warn('Contenedor de libros no encontrado: #books-container');
    return;
  }
  booksContainer.innerHTML = '<p>Cargando libros...</p>';
  try {
    // Término de búsqueda: por defecto "literatura"; si hay término, usarlo
    const query = term && term.length > 0 ? term : 'literatura';
    const langRestrict = 'es'; // idioma español
    const maxResults = 40; // máximo permitido por la API
    const orderBy = 'relevance';
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&langRestrict=${langRestrict}&maxResults=${maxResults}&orderBy=${orderBy}&printType=books`);
    const data = await response.json();

    if (!data.items) {
      booksContainer.innerHTML = '<p>No se encontraron libros.</p>';
      return;
    }

    // Normalizar datos para render y filtro local
    allBooks = data.items.map(item => {
      const info = item.volumeInfo || {};
      const authors = Array.isArray(info.authors) ? info.authors : [];
      return {
        title: info.title || 'Sin título',
        authors,
        authorsText: authors.join(', '),
        coverUrl: (info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)) || 'https://via.placeholder.com/128x193?text=Sin+Portada',
        infoLink: info.infoLink || '#'
      };
    });

    renderBooks(allBooks);
    
    // Configurar el filtro después de cargar los libros
    setupFilter();
  } catch (error) {
    console.error('Error cargando libros:', error);
    booksContainer.innerHTML = '<p>No se pudieron cargar los libros.</p>';
  }
}

loadBooks();
