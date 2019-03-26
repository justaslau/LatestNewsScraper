const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
    user: {
        type: String,
    },
    comment: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create Article Model Using Schema
const Comment = mongoose.model('comments', CommentSchema);

// Export Article Model
module.exports = Comment;