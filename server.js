const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;

// Creating an 'express' server
const app = express();
var notes = require('./db/db.json');

// Imported 'uuid' npm package for unique id
const { v4: uuidv4 } = require('uuid');

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

// GET return the index.html file
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET/api/notes read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) =>
  res.json(notes)
);

// GET/notes return the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Receive a new note and add it to the db.json file, and then return the new note to the client
app.post('/api/notes', (req, res) => {
  // Extracted new note from request body
  const newNote = req.body;
  // Assigned unique id obtained from 'uuid' package
  newNote.id = uuidv4();
  // Read data from 'db.json' file
  let data = JSON.parse(fs.readFileSync('./db/db.json', "utf8"));
  // Pushed new note in notes file 'db.json'
  data.push(newNote);
  // Written notes data to 'db.json' file
  fs.writeFileSync('./db/db.json', JSON.stringify(data));
  // Send response
  res.json(data);
});

// Method binds itself with the specified host and port to bind and listen for any connections.
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});