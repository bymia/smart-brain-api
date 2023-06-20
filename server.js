const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection:{
  connectionString: process.env.DATABASE_URL,
  host : process.env.DATABASE_HOST,
  port : 5432,
  user : process.env.DATABASE_USER,
  password : process.env.DATABASE_PW,
  database : process.env.DATABASE_DB
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.json()});
app.post('/signin', (req, res) => {signin.handleSignin(db, bcrypt, req, res)});
app.post('/register', (req, res) => {register.handleRegister(db, bcrypt, req, res)});
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(db, req, res)});
app.post('/image', (req, res) => {image.handleImage(db, req, res)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
  console.log(`app is running on ${port}`);
})
