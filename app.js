const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'If you see this, you can have Issac rework your wardrobe',
  resave: false,
  saveUninitialized: true
}));

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/signup', (req, res, next) => {
  if(req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
});

app.use('/login', (req, res, next) => {
  if(req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
});

app.use('/profile', (req, res, next) => {
  if(!req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
});

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});