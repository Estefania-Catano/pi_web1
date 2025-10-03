document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('input[type="search"]');
    const cards = document.querySelectorAll('.row .col');

    // Evitar que el form recargue la página
    const searchForm = searchInput.closest('form');
    searchForm.addEventListener('submit', (e) => e.preventDefault());

    // Filtrar tarjetas mientras escribes
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase().trim();
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            if (title.includes(filter)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Efecto hover en tarjetas
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
        });
    });
});

//===============================================================//
const booksContainer = document.getElementById('books-container');

async function loadBooks() {
  try {
    // Buscamos libros en español con un término genérico para obtener resultados variados
    const query = 'literatura';
    const langRestrict = ''; // idioma español
    const maxResults = 30;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${langRestrict}&maxResults=${maxResults}`);
    const data = await response.json();

    if (!data.items) {
      booksContainer.innerHTML = '<p>No se encontraron libros.</p>';
      return;
    }

    data.items.forEach(item => {
      const book = item.volumeInfo;
      const coverUrl = book.imageLinks?.thumbnail || 'https://via.placeholder.com/128x193?text=Sin+Portada';

      const card = document.createElement('div');
      card.className = 'col';

      card.innerHTML = `
        <div class="card h-100">
          <a href="${book.infoLink}" target="_blank" rel="noopener noreferrer">
            <img src="${coverUrl}" class="card-img-top" alt="Portada de ${book.title}">
          </a>
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">${book.authors ? book.authors.join(', ') : 'Autor desconocido'}</p>
          </div>
        </div>
      `;

      booksContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error cargando libros:', error);
    booksContainer.innerHTML = '<p>No se pudieron cargar los libros.</p>';
  }
}

loadBooks();
