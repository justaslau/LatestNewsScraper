const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ArticleSchema = new Schema({
    title: {
        type: String,
    },
    link: {
        type: String,
    },
    summary: {
        type: String,
    },
    image: {
        type: String,
    },
    author: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create Article Model Using Schema
const Article = mongoose.model('articles', ArticleSchema);

// Export Article Model
module.exports = Article;