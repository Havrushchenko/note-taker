const path = require('path');
const router = require('express').Router();
// Imported 'uuid' npm package for unique id
const { v4: uuidv4 } = require('uuid');

// GET return the index.html file
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET/notes return the notes.html file
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

module.exports = router;