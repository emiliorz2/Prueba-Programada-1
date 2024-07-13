const { v4: uuidv4 } = require('uuid');

const { log } = require('console');
const express =  require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const PUBLIC = path.join(__dirname, 'public');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(PUBLIC));

let notas = []


app.get('/', (req, res) => {
    console.log('loading Main page');
    res.sendFile(path.join(PUBLIC, 'home.html'));
});


//agregar
app.post('/agregarNota', (req, res) => {
    console.log('agregando nota');
    console.log(req.body)

    console.log('\ntodas las notas');
    notas.push({id: uuidv4() , ...req.body, date: new Date()})
    console.log(notas);
    res.redirect('/');
});

//actualizar
app.get('/notas/:id', (req, res) => {
    const nota = notas.find(n => n.id === req.params.id);
    if (nota) {
        res.json(nota);
    } else {
        res.status(404).send('Nota no encontrada');
    }
});

app.put('/notas/:id', (req, res) => {
    const index = notas.findIndex(n => n.id === req.params.id);
    if (index !== -1) {
        notas[index] = { ...notas[index], ...req.body, date: new Date() };
        res.send('Nota actualizada');
    } else {
        res.status(404).send('Nota no encontrada');
    }
});

//eliminar
app.delete('/notas/:id', (req, res) => {
    const index = notas.findIndex(n => n.id === req.params.id);
    if (index !== -1) {
        notas.splice(index, 1);
        res.send('Nota eliminada');
    } else {
        res.status(404).send('Nota no encontrada');
    }
});


app.listen(PORT, () => {
    console.log("☆*: .｡. o(≧▽≦)o .｡.:*☆ el server esta corriendo en el puerto: " + PORT)
})