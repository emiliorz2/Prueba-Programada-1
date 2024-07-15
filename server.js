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

//mostrar
app.get('/notas', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'notas.html'));
});

app.get('/api/notas', (req, res) => {
    res.json(notas.slice(0, 5)); // Limitar a 5 notas
});

//eliminar

app.delete('/api/notas/:id', (req, res) => {
    const { id } = req.params;
    notas = notas.filter(nota => nota.id !== id);
    res.json({ success: true });
});

//actualizar
app.put('/api/notas/:id', (req, res) => {
    const { id } = req.params;
    const index = notas.findIndex(n => n.id === id);
    if (index !== -1) {
        notas[index] = { ...notas[index], ...req.body, date: new Date() };
        res.json({ success: true });
    } else {
        res.status(404).send('Nota no encontrada');
    }
});


app.listen(PORT, () => {
    console.log("☆*: .｡. o(≧▽≦)o .｡.:*☆ el server esta corriendo en el puerto: " + PORT)
})