const express = require('express');
const uniqid = require('uniqid');

const router = express.Router();

let posts = [];

router.get('/posts/', (req, res) => {
    res.send(posts);
});

router.post('/posts/', (req, res) => {
    const post = {
        id: uniqid(),
        title: req.body.title,
        content: req.body.content,
    }
    posts.push(post);
    res.status(201).send(post);
});


router.get('/posts/:id', (req, res) => {

});

router.put('/posts/:id', (req, res) => {
    const post = posts.find((post) => post.id === req.params.id);
    if (post) {
        post.title = req.body.title,
            post.content = req.body.content,
            res.status(200).send();
    } else {
        res.status(404).send({ message: 'Not Found!' })
    }
});

router.delete('/posts/:id', (req, res) => {
    console.log(req.params.id);
    posts = posts.filter((post) => post.id !== req.params.id);
    res.status(204).send();
    
});

module.exports = router;
