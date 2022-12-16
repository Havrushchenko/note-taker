const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
var notes = require('./db/db.json');
app.use(express.static('public'));

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data
app.use(express.json());

// GET/notes return the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET return the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET/api/notes read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) =>
  res.json(notes)
);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});