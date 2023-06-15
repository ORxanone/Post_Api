
const express = require('express');
const uniqid = require('uniqid');
const userRoutes = require('./users');

const postRoutes = require('./posts');

const app = express();
app.use(express.json());

app.use(postRoutes);
app.use(userRoutes);


app.listen(8080, function () {
    console.log('Post API is running on port 8080!');
});

