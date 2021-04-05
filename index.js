// server.js
// const port = 3000;

const express = require('express');
const dotenv = require('dotenv').config();
const exphbs = require('express-handlebars');
const app = express();
const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
// const slug = require('slug');
// const multer = require('multer');

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

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }))

// Configure template Engine and Main File
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    todaysDate:(date) => new Date(date)
  }
}));

// MULTER

// Declaring static files
app.use(express.static(__dirname + "/public"));


 // Seting template Engine
app.set('view engine', 'hbs');




// ----------------- ROUTING -----------------

// HOME PAGE (SWIPING)
app.get('/', async (req, res) => {
  let users = {};
  users = await db.collection('users').find().toArray();
  // var user = users[Math.floor(Math.random()*users.length)];
  res.render('home', {title:'Home', users});
});


// PROFILE PAGE (CREATE)
app.get('/profile', async (req, res) => {

  // profile = await db.collection('profile').find().toArray();
  res.render('profile', {title:'add profile'});
});

app.post('/profile', async (req,res) => {
  await connectDB()
  .then(() => {
     console.log('Connection made for profile :)')
  })
  .catch( error => {
     console.log(error)
  });
  
  const profile = {
    'name': req.body.name,
    'age': req.body.age,
    'businessName': req.body.businessName,
    'branche': req.body.branche,
    'size': req.body.size,
    'time': req.body.time,
  };
  
  await db.collection('profile').deleteMany();
  await db.collection('profile').insertOne(profile);
  
  savedprofile = await db.collection('profile').find().toArray();
  res.render('profile', {title:'add profile', profile});
});

// VIEW PROFILE (READ)
app.get('/viewprofile', async (req, res) => {

  profile = await db.collection('profile').find().toArray();
  res.render('viewprofile', {title:'view profile', profile});
});

// EDIT PROFILE (UPDATE)
app.get('/editprofile', async (req, res) => {

  profile = await db.collection('profile').find().toArray();
  res.render('editprofile', {title:'edit profile', profile});
});

app.post('/editprofile', async (req,res) => {
  await connectDB()
  .then(() => {
     console.log('Connection made for profile :)')
  })
  .catch( error => {
     console.log(error)
  });
  
  profile = await db.collection('profile').find().toArray();

  const profileupdate = {
    'name': req.body.name,
    'age': req.body.age,
    'businessName': req.body.businessName,
    'branche': req.body.branche,
    'size': req.body.size,
    'time': req.body.time
  };
  
  console.log(profileupdate)

  await db.collection("profile")
  .findOneAndUpdate(
      {  },
      { $set: profileupdate },
      { new: true, upsert: true, returnOriginal: false }
  );
  
  res.render('editprofile', {title:'edit profile', profile});
});

// MATCHES PAGE
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