const express = require('express');
const router = express.Router();
const Comment = require("../models/Comment");
const Article = require("../models/Article");

// @route    POST /comments/add
// @desc     Add comment to database
// @access   Public
router.post('/add', (req, res) => {
	const { user, comment, articleId } = req.body;
	if (!user) {
		res.json({ userError: 'Please enter your name.' });
	} else if (!comment) {
		res.json({ commError: 'Please enter comment.' });
	} else {
		Comment.create({ user, comment }).then((comment) => {
			Article.findOneAndUpdate(
                { _id: articleId },
                { $push: { comments: comment.id } },
                { safe: true, upsert: true, new: true },
                function(err, doc) {
				    if (err) {
					    console.log(err);
				    } else {
					    const returnData = {
						    newComment: comment,
						    totalCount: doc.comments.length,
						    articleId: doc._id
				    	}
					    res.json(returnData);
				    }
                }
            );
		}).catch(err => console.log(err));
	}
 });
// @route    POST /comments/delete
// @desc     Delete comment from articles array
// @access   Public
router.post('/delete', (req, res) => {
	const { commId } = req.body;
	Article.findOneAndUpdate(
        { comments: commId },
        { $pull: { comments: commId } },
        function(err, doc) {
		    if (err) {
			    console.log(err);
		    } else {
			    res.json(doc.comments.length);
		    }
	    });
});
module.exports = router;