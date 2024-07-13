
fetch('/notas')
    
    .then(response => response.json())
    .then(notas => {
        const container = document.getElementById('notas-container');
        notas.forEach(nota => {
            const notaDiv = document.createElement('div');
            notaDiv.innerHTML = `
                <h2>${nota.titulo}</h2>
                <p>${nota.nota}</p>
                <button onclick="deleteNota('${nota.id}')">Eliminar</button>
                <button onclick="editNota('${nota.id}')">Editar</button>
            `;
            container.appendChild(notaDiv);
            console.log('aqui se importan las notas');
        });
    });


function deleteNota(id) {
    fetch('/notas/' + id, { method: 'DELETE' })
        .then(response => response.text())
        .then(msg => {
            alert(msg);
            location.reload(); // Recargar la página para actualizar la lista de notas
        });
}

function editNota(id) {
    fetch(`/notas/${id}`)
        .then(response => response.json())
        .then(nota => {
            document.getElementById('edit-titulo').value = nota.titulo;
            document.getElementById('edit-nota').value = nota.nota;
            document.getElementById('edit-id').value = nota.id;
            document.getElementById('edit-modal').style.display = 'block';
        })
        .catch(error => console.error('Error al cargar la nota:', error));
}



//modal

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function updateNota() {
    const id = document.getElementById('edit-id').value;
    const titulo = document.getElementById('edit-titulo').value;
    const nota = document.getElementById('edit-nota').value;

    fetch(`/notas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, nota })
    })
    .then(response => response.json())
    .then(data => {
        alert('Nota actualizada');
        closeModal();
        location.reload(); // Recargar para ver los cambios
    })
    .catch(error => console.error('Error al actualizar la nota:', error));
}
