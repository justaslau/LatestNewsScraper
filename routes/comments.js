const express = require('express');
const router = express.Router();
const db = require("../models");

router.post('/add', (req, res) => {
    const {user, comment, articleId} = req.body;
    console.log(articleId + " " + user + " " +  comment);
    db.Comment
        .create({user, comment})
        .then((comment) => {
            db.Article.findOneAndUpdate(
                { _id: articleId },
                { $push: { comments: comment.id } },
                { safe: true, upsert: true, new: true },
                function(err, doc) {
                    if (err) {
                        console.log(err);
                    } 
                }
            );
        })
        .catch(err => console.log(err));
});

router.get('/', (req, res) => {
    db.Comment.find()
    .then(comments => res.json(comments));
})

module.exports = router;