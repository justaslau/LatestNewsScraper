const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Loading Route Files
const articles = require('./routes/articles');
const comments = require('./routes/comments');

// Assigning Ports for App
const PORT = process.env.PORT || 8000;
const app = express();

// Require DB Logins
const db = require('./config/keys').mongoURI;

// Connecting to Mongo Database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB.'))
    .catch(err => console.log(err));

// Setting Up Body Parser
app.use(express.urlencoded({ extended: false }));

// Setting Up Static Category
app.use(express.static(path.join(__dirname, 'public')));

// Assigning Routes
app.use('/api/articles', articles);
app.use('/api/comments', comments);

// Opening PORT, Startig Server
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));



