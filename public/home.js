document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/notas')
        .then(response => response.json())
        .then(notas => {
            const notasContainer = document.getElementById('notasContainer');
            notas.forEach(nota => {
                const notaElement = document.createElement('div');
                notaElement.className = 'nota';
                notaElement.innerHTML = `
                    <div class="nota__header">
                        <h1 class="nota__title">${nota.titulo}</h1>
                        <p class="nota__date">${new Date(nota.date).toLocaleString()}</p>
                    </div>
                    <div class="nota__body">
                        <p class="nota__text">${nota.nota}</p>
                    </div>
                    <div class="nota__buttons">
                        <button class="btn nota__btn" data-id="${nota.id}" onclick="editarNota('${nota.id}')">Actualizar</button>

                        <button class="btn nota__btn" data-id="${nota.id}" onclick="eliminarNota('${nota.id}')">Eliminar</button>
                    </div>
                `;
                notasContainer.appendChild(notaElement);
            });
        })
        .catch(error => console.error('Error fetching notas:', error));
});

function eliminarNota(id) {
    fetch(`/api/notas/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Remover la nota del DOM
            const notaElement = document.querySelector(`button[data-id='${id}']`).closest('.nota');
            notaElement.remove();
        }
    })
    .catch(error => console.error('Error deleting nota:', error));
}

function editarNota(id) {
    const titulo = prompt("Ingrese el nuevo título:");
    const nota = prompt("Ingrese el nuevo contenido de la nota:");
    if (titulo && nota) {
        fetch(`/api/notas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, nota })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                location.reload(); // Recargar la página para mostrar las actualizaciones
            }
        })
        .catch(error => console.error('Error updating nota:', error));
    }
}