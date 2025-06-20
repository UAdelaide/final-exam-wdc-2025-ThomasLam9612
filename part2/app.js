const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require("express-session");
const pool = require("../part2/models/db");
const MySQLStore = require("express-mysql-session")(session);

const app = express();
const store = new MySQLStore({
  host: "localhost",
  user: "root",
  password: "root",
  database: "DogWalkService"
});
app.use(session({
  secret: "sessionScrect",
  resave: false,
  store: store,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;
