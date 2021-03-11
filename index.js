 // server.js
 var port = 3000;

 const express = require('express');
 const exphbs = require('express-handlebars');
 const app = express();
 const Handlebars = require("handlebars");
 const template = Handlebars.compile("Name: {{name}}");
 console.log(template({ name: "UPSTART" }));

// Configure template Engine and Main File
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    todaysDate:(date) => new Date(date)
  }
}));

// Declaring static files
app.use(express.static(__dirname + "/public"));


 // Seting template Engine
app.set('view engine', 'hbs');

 // route our app
 app.get('/', (req, res) => {
  res.render('home', {
    msg: 'This is home page'
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {msg: null});
});

app.get('/matches', (req, res) => {
  res.render('matches', {peoples: [
    {name: 'Jan Piet'},
    {name: 'Erik de Vries'}
  ]});
});

 //404
  app.use(function(req, res, next) {
    res.status(404).send('page not found');
  });

// start the server
 app.listen(port, function() {
    console.log('app started');
  });



