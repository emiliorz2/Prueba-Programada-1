const express =  require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const PUBLIC = path.join(__dirname, 'public');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC));

app.get('/', (req, res) => {
    console.log('loading Main page');
    res.sendFile(path.join(PUBLIC, 'home.html'));
});

app.post('/agregarNota', (req, res) => {
    console.log('loading Main page');
    res.sendFile(path.join(PUBLIC, 'home.html'));
});

// app.get('/contactus', (req,res) => {
//     console.log('loading contact us.....');
//     res.sendFile(path.join(PUBLIC, 'contactus.html'));
// })

// app.post('/contactus', (req,res) => {
//     console.info('Contact us has been called...');
//     const name = req.body.name;
//     const email = req.body.email;
//     const subject = req.body.subject;

//     console.log('Form data:\n');
//     console.log('Name: ' + name);
//     console.log('Email: ' + email);
//     console.log('Subject: ' + subject);

//     res.redirect('/');

// })

app.listen(PORT, () => {
    console.log("☆*: .｡. o(≧▽≦)o .｡.:*☆ el server esta corriendo en el puerto: " + PORT)
})