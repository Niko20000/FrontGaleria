const resultsContainer = document.getElementById('results-container');
const btnCargar = document.getElementById('btnCargar');
const btnLimpiar = document.getElementById('btnLimpiar'); // 🔹 Nuevo botón

const TEST_ISBNS = ['0385732554', '0140449265', '0307474275', '0385730314']; 


function displayStatus(message, type) {
    resultsContainer.innerHTML = `<p class="${type}-message">${message}</p>`;
    resultsContainer.classList.remove('cards-grid');
}

function getCoverUrl(isbn) {
    return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
}

async function obtenerPortadas() {
    btnCargar.disabled = true;
    displayStatus("Cargando...  (Trayendo portadas por ISBN)", "Cargando");
    
    resultsContainer.innerHTML = ''; 
    resultsContainer.classList.add('cards-grid');

    try {
        TEST_ISBNS.forEach(isbn => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('book-card');

            const title = document.createElement('h3');
            title.textContent = `ISBN: ${isbn}`;

            const img = document.createElement('img');
            img.src = getCoverUrl(isbn);
            img.alt = `Portada para ISBN ${isbn}`;
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.minHeight = '200px';

            cardDiv.appendChild(title);
            cardDiv.appendChild(img);
            resultsContainer.appendChild(cardDiv);
        });
        
        if (TEST_ISBNS.length === 0) {
             displayStatus("No hay ISBNs de prueba para cargar.", "error-message");
        }

    } catch (error) {
        console.error("Error en la visualización de portadas (Mariana):", error);
        displayStatus("Ocurrió un error al intentar mostrar las portadas.", "error-message");
    } finally {
        btnCargar.disabled = false;
    }
}


function limpiarResultados() {
    resultsContainer.innerHTML = '<p id="initial-message">Resultados limpiados. Vuelve a cargar las portadas.</p>';
    resultsContainer.classList.remove('cards-grid');
}

btnCargar.addEventListener('click', obtenerPortadas);
btnLimpiar.addEventListener('click', limpiarResultados); 
document.addEventListener('DOMContentLoaded', limpiarResultados); 
