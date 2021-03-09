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

 // Seting template Engine
app.set('view engine', 'hbs');

 // route our app
 app.get('/', (req, res) => {
  res.render('home', {
    msg: 'This is home page'
  });
});

app.get('/about-us', (req, res) => {
  res.render('about-us', {msg: null});
});

app.get('/peoples', (req, res) => {
  res.render('peoples', {peoples: [
    {name: 'jhon smith'},
    {name: 'jhonny Bravo'}
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
  