
const resultsContainer = document.getElementById('results-container');
const btnCargar = document.getElementById('btnCargar');
const btnLimpiar = document.getElementById('btnLimpiar');


const API_URL = "https://openlibrary.org/search.json?q=javascript&limit=10"; 



/**
 * 
 * @param {string} message 
 * @param {string} type 
 */
function displayStatus(message, type) {
    resultsContainer.innerHTML = `<p class="${type}-message">${message}</p>`;
   
    resultsContainer.classList.remove('cards-grid');
}

/**
 
 * @param {Array<Object>} books 
 */
function renderCards(books) {
   
    resultsContainer.innerHTML = ''; 
    resultsContainer.classList.add('cards-grid'); 

    if (books.length === 0) {
        displayStatus("No se encontraron resultados.", "error");
        return;
    }

    
    books.forEach(libro => {
       
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('book-card');

        const title = document.createElement('h3');
   
        title.textContent = libro.title || "Título Desconocido";

        const author = document.createElement('p');
        author.classList.add('author');
       
        const authorName = Array.isArray(libro.author_name) ? libro.author_name[0] : (libro.author_name || "Autor Desconocido");
        author.textContent = `Autor: ${authorName}`;

        const year = document.createElement('p');
        year.textContent = `Año: ${libro.first_publish_year || 'N/A'}`;

       
        cardDiv.appendChild(title);
        cardDiv.appendChild(author);
        cardDiv.appendChild(year);

     
        resultsContainer.appendChild(cardDiv);
    });
}




 
 
async function obtenerLibros() {
    
    btnCargar.disabled = true;

    
    displayStatus("Cargando... 📖 (Buscando libros de JavaScript)", "loading");

    
    try {
        
        const response = await fetch(API_URL);

        
        if (!response.ok) {
            throw new Error(`Fallo en la solicitud: ${response.status} ${response.statusText}`);
        }

       
        const data = await response.json();
        
       
        renderCards(data.docs || []); 

    } catch (error) {
        
        console.error("Error en la obtención de datos:", error);
        displayStatus("❌ No se pudieron cargar los datos. Intenta más tarde.", "error-message");
    } finally {
        
        btnCargar.disabled = false;
    }
}


function limpiarResultados() {
    resultsContainer.innerHTML = '<p id="initial-message">Resultados limpiados. Vuelve a cargar los libros.</p>';
    resultsContainer.classList.remove('cards-grid');
}


btnCargar.addEventListener('click', obtenerLibros);
btnLimpiar.addEventListener('click', limpiarResultados);


document.addEventListener('DOMContentLoaded', limpiarResultados);