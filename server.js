const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/html.Routes');

// Set PORT
const PORT = process.env.PORT || 3001;

// Creating an 'express' server
const app = express();
var notes = require('./db/db.json');

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Method binds itself with the specified host and port to bind and listen for any connections.
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
