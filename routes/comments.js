const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.post('/add', (req, res) => {
    const {user, comment, articleId} = req.body;
    console.log(articleId + " " + user + " " +  comment);
});

module.exports = router;