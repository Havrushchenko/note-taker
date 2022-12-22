const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const PORT = process.env.PORT || 3001;

// Use apiRoutes
const apiRoutes = require('./routes/apiRoutes');

// Creating an 'express' server
const app = express();
var notes = require('./db/db.json');
// Imported 'uuid' npm package for unique id
const { v4: uuidv4 } = require('uuid');

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data
app.use('/api', apiRoutes);
app.use(express.json());
app.use(express.static('public'));

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Method binds itself with the specified host and port to bind and listen for any connections.
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});