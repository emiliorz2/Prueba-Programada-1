document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/notas')
        .then(response => response.json())
        .then(notas => {
            const notasContainer = document.getElementById('notasContainer');
            notas.forEach(nota => {
                const notaElement = document.createElement('div');
                notaElement.className = 'nota';
                notaElement.innerHTML = `
                    <div class="header">
                        <h1>${nota.titulo}</h1>
                        <p>${new Date(nota.date).toLocaleString()}</p>
                    </div>
                    <div class="nota__body">
                        <p>${nota.nota}</p>
                    </div>
                `;
                notasContainer.appendChild(notaElement);
            });
        })
        .catch(error => console.error('Error fetching notas:', error));
});