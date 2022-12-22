const express = require('express');
const db = require('../../db/db.json');
const router = express.Router();

// GET return the index.html file
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET/api/notes read the db.json file and return all saved notes as JSON
router.get('/notes', (req, res) =>
  res.json(notes)
);

// GET/notes return the notes.html file
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Receive a new note and add it to the db.json file, and then return the new note to the client
router.post('/notes', (req, res) => {
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

module.exports = router;