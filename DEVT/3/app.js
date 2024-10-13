const express = require('express');
const hbs = require('express-handlebars').create({ defaultLayout: 'main' });
const app = express();
const port = 5001;
const taskRouter = require('./routes/tasks');
const userRouter = require('./routes/users');
const authenticate = require('./middleware/authenticate');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/tasks', authenticate, taskRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/dashboard', authenticate, (req, res) => {
  res.render('dashboard');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
