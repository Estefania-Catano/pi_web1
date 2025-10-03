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

