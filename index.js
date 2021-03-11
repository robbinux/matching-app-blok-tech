// server.js
const port = 3000;

const express = require('express');
const dotenv = require('dotenv').config();
const exphbs = require('express-handlebars');
const app = express();
const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "UPSTART" }));

console.log(process.env.TESTVAR)
 
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://arjay432:<6035>@cluster0.zujnn.mongodb.net/database1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


let db = null;

// functie om de database te connecten

async function connectDB() {

  const uri = process.env.DB_URI

  // connectie maken met de database

  const options = {

    useUnifiedTopology: true

  };

  const client = new MongoClient(uri, options)

  await client.connect();

  db = await client.db(process.env.DB_NAME)
}

connectDB()

  .then(() => {

    // succes om te verbinden

    console.log('Feest!')

  })

  .catch(error => {

    // geen succes om te verbinden

    console.log(error)

  });


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



