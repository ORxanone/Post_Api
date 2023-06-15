
const express = require('express');
const uniqid = require('uniqid');

const app = express();
app.use(express.json());

const posts = [];

app.get('/posts/', (req, res) => {       
    res.send(posts);
});
app.post('/posts/', (req, res) => {         
    const post = {
        id: uniqid(),
        title: req.body.title,
        content: req.body.content,
    }
    posts.push(post);
    res.status(201).send(post);
});


app.get('/posts/:id', (req, res) => {               

});
app.put('/posts/:id', (req, res) => { });

app.delete('/posts/:id', (req, res) => { });

app.listen(8080, function () {
    console.log('Post API is running on port 8080!');
});

