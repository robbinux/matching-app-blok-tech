 // server.js
 var express = require('express');
 var app = express();
 var port = 3000;
 app.use(express.static('public'));

 
 // route our app
 app.get('/', function(req, res) {
   res.send('hello world!');
 });

 app.get('/movies', function(req, res) {
    res.send('find your movies here');
  });

 app.get('/movies/:movieId', function(req, res) {
    res.send('<h1>Detailpage of movie '+req.params.movieId+'</h1>');
  });

 //404
  app.use(function(req, res, next) {
    res.status(404).send('page not found');
  });

  





// start the server
 app.listen(port, function() {
    console.log('app started');
  });
  