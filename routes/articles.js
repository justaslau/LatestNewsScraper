const express = require('express');
const router = express.Router();
const keys = require('../config/keys');

// Load Articles model

router.get('/', (req, res) => res.json({ msg: 'Articles route works' }));

module.exports = router;