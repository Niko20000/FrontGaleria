const resultsContainer = document.getElementById('results-container');
const btnCargar = document.getElementById('btnCargar');

const API_URL = 'https://gutendex.com/books/?topic=fiction&sort=-download_count'; 

function displayStatus(message, type) {
    resultsContainer.innerHTML = `<p class="${type}-message">${message}</p>`;
    resultsContainer.classList.remove('cards-grid');
}

async function obtenerLibrosClasicos() {
    btnCargar.disabled = true;
    displayStatus("Cargando...  (Buscando libros de ficción de alta descarga)", "loading");

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Fallo en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        
       
        renderCards(data.results.slice(0, 8)); 

    } catch (error) {
        console.error("Error en la obtención de datos (Ángel):", error);
        displayStatus("❌ No se pudieron cargar los libros. Intenta más tarde.", "error-message");
    } finally {
        btnCargar.disabled = false;
    }
}

function renderCards(books) {
    resultsContainer.innerHTML = ''; 
    resultsContainer.classList.add('cards-grid');

    books.forEach(libro => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('book-card');

        const title = document.createElement('h3');
        title.textContent = libro.title || "Título Desconocido";

        const author = document.createElement('p');
        author.classList.add('author');
      
        const authorName = libro.authors && libro.authors.length > 0 ? libro.authors[0].name : "Autor Desconocido";
        author.textContent = `Autor: ${authorName}`;

        const lang = document.createElement('p');
        lang.textContent = `Idioma: ${libro.languages ? libro.languages[0].toUpperCase() : 'N/A'}`;

        cardDiv.appendChild(title);
        cardDiv.appendChild(author);
        cardDiv.appendChild(lang);
        resultsContainer.appendChild(cardDiv);
    });
}

function limpiarResultados() {
    resultsContainer.innerHTML = '<p id="initial-message">Resultados limpiados. Vuelve a cargar los libros.</p>';
    resultsContainer.classList.remove('cards-grid');
}

btnCargar.addEventListener('click', obtenerLibrosClasicos);
btnLimpiar.addEventListener('click', limpiarResultados);


document.addEventListener('DOMContentLoaded', limpiarResultados);