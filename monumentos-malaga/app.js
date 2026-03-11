const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// login muy simple en memoria
const USER = { username: 'admin', password: '1234' };

// middleware para simular sesión en memoria (solo demo)
let loggedIn = false;

app.get('/', (req, res) => {
  res.render('index', { loggedIn });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    loggedIn = true;
  }
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  loggedIn = false;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
