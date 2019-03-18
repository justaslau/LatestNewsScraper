const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load Comments model

router.get('/', (req, res) => res.json({ msg: 'Comments route works' }));

module.exports = router;