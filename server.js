
const express = require('express');
const uniqid = require('uniqid');
const userRoutes = require('./users');
const jwt = require('jsonwebtoken');
const user2 = require('./user2')

const auth = require('./middleware/auth');


const postRoutes = require('./posts');

const app = express();

app.use(express.json());
app.use('/post', auth, postRoutes);
app.use(userRoutes);
app.use(user2);

app.listen(8080, function () {
    console.log('Post API is running on port 8080!');
});

