const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//const articles = require('./routes/articles');
//const comments = require('./routes/comments');

const PORT = process.env.PORT || 8000;
const app = express();

const db = require('./config/keys').mongoURI;

// Connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB.'))
    .catch(err => console.log(err));

// Setting Up Body Parser
app.use(express.urlencoded({ extended: false }));

// Setting Up Static Category
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/api/articles', require('./routes/articles'));
app.use('/api/comments', require('./routes/comments'));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));



