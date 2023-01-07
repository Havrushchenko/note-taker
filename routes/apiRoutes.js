const router = require('express').Router();
const db = require('../db/db.json');
const fs = require("fs");
// Imported 'uuid' npm package for unique id
const { v4: uuidv4 } = require('uuid');

// GET/api/notes read the db.json file and return all saved notes as JSON
router.get('/notes', (req, res) =>
    res.json(db)
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

// Deletes a note
router.delete("/:id", function (req, res) {
    notes.splice(req.params.id - 1);
    update();
    console.log("Deleted note with id " + req.params.id);
});

function update() {
    fs.writeFile("./db/db.json",JSON.stringify(notes,'\t'),err => {
        if (err) throw err;
        return true;
    });
}

// Default response for any other request (Not Found)
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;

