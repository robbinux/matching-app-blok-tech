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
const mongoose = require('mongoose');
const { Db } = require('mongodb');

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

//BodyParser
app.use(express.urlencoded({ extended: false }));


// Database schemas
// const { Schema } = mongoose;
const usersSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: String
  },
  businessName: {
    type: String
  },
  branche: {
    type: String
  },
  size: {
    type: String
  },
  time: {
    type: String
  }
});

// Collections
const usersModel = mongoose.model('users', usersSchema);
// const vacaturesCollection = mongoose.model('vacatures', vacaturesSchema);
const uri = process.env.DB_URI;

//Connect Database
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connection made'))
.catch(err => console.log(err));



// route our app
// get users from database
app.get('/', async (req, res) => {

  let userlist = {};
  userlist = await usersModel.find().toArray();
  res.render('home', {title:'home', userlist});
});




app.get('/profile', (req, res) => {
  res.render('profile', {msg: null});
});

app.get('/matches', async (req, res) => {
  res.render('matches', {title:'matches', users});
});

// upload profile to database
// app.post('/profile', upload.single('fname'), function (req, res, next) {
// })







 //404
  app.use(function(req, res, next) {
    res.status(404).send('page not found');
  });

// start the server
 app.listen(port, function() {
    console.log('app started');
  });



