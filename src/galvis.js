
const resultsContainer = document.getElementById('results-container');
const btnCargar = document.getElementById('btnCargar');

const API_URL = 'https://poetrydb.org/author/William%20Shakespeare'; 

function displayStatus(message, type) {
    resultsContainer.innerHTML = `<p class="${type}-message">${message}</p>`;
    resultsContainer.classList.remove('cards-grid');
}

async function obtenerPoemas() {
    btnCargar.disabled = true;
    displayStatus("Cargando... ✨ (Buscando poemas de Shakespeare)", "loading");

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Fallo en la solicitud: ${response.status}`);
        }
        const data = await response.json();
       
        renderCards(data.slice(0, 5)); 

    } catch (error) {
        console.error("Error en la obtención de datos (Galvis):", error);
        displayStatus("❌ No se pudieron cargar los poemas. Intenta más tarde.", "error-message");
    } finally {
        btnCargar.disabled = false;
    }
}

function renderCards(poemas) {
    resultsContainer.innerHTML = ''; 
    resultsContainer.classList.add('cards-grid');

    poemas.forEach(poema => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('book-card'); 

        const title = document.createElement('h3');
        title.textContent = poema.title || "Poema Sin Título";

        const author = document.createElement('p');
        author.classList.add('author');
        author.textContent = `Autor: ${poema.author}`;

    
        const lineCount = poema.lines ? poema.lines.length : 0;
        const snippet = poema.lines ? poema.lines.slice(0, 5).join(' / ') + '...' : 'Contenido no disponible.';

        const content = document.createElement('p');
        content.innerHTML = `Líneas (${lineCount}): <br> "${snippet}"`;

        cardDiv.appendChild(title);
        cardDiv.appendChild(author);
        cardDiv.appendChild(content);
        resultsContainer.appendChild(cardDiv);
    });
}


function limpiarResultados() {
    resultsContainer.innerHTML = '<p id="initial-message">Resultados limpiados. Vuelve a cargar los libros.</p>';
    resultsContainer.classList.remove('cards-grid');
}

btnCargar.addEventListener('click', obtenerPoemas);
btnLimpiar.addEventListener('click', limpiarResultados);


document.addEventListener('DOMContentLoaded', limpiarResultados);