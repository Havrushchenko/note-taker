const express = require('express');
const router = express.Router();
router.use(require('./notesRoutes'));

module.exports = router;