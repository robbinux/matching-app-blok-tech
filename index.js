// server.js
const port = 3000;

const express = require('express');
const dotenv = require('dotenv').config();
const exphbs = require('express-handlebars');
const app = express();
const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const slug = require('slug');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'})

console.log(template({ name: "UPSTART" }));



let db = null;

// function to connect to database

async function connectDB() {

  const uri = process.env.DB_URI

  // make connection

  const options = {

    useUnifiedTopology: true

  };

  const client = new MongoClient(uri, options)

  await client.connect();

  db = await client.db(process.env.DB_NAME)
}

connectDB()

  .then(() => {

    // connection made

    console.log('We have a connection to Mongo!')

  })

  .catch(error => {

    // connection failed

    console.log(error)

  });

// get users from database
app.get('/', async (req, res) => {
  let users = {};
  users = await db.collection('users').find().toArray();
  // var user = users[Math.floor(Math.random()*users.length)];
  res.render('home', {title:'Home', users});
});



// upload profile to database
app.post('/profile', upload.single('fname'), function (req, res, next) {


})



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
    msg: 'This is home page',
    businessName: 'RJ Digital Soluions'
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {msg: null});
});

app.get('/matches', async (req, res) => {
  let users = {};
  users = await db.collection('users').find().toArray();
  res.render('matches', {title:'matches', users});
});




 //404
  app.use(function(req, res, next) {
    res.status(404).send('page not found');
  });

// start the server
 app.listen(port, function() {
    console.log('app started');
  });



