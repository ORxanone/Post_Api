
const express = require('express');
const crypto = require('crypto');
const uniqid = require('uniqid');

const router = express.Router();
const SALT = crypto.randomBytes(32).toString('hex');


const users = [];

router.get('/users', (req, res) => {
    res.status(200).send(users);
})

router.post('/registration', (req, res) => {

    const { username, password, fullName } = req.body;
    const hashedPassword = crypto.pbkdf2Sync(password, SALT, 10000, 64, 'sha512').toString('hex');

    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        res.status(400).send({ message: 'Username already exists' });
        return;
    };

    const user = {
        id: uniqid(),
        username,
        fullName,
        password: hashedPassword,
    };
    users.push(user);
    res.status(201).send(user);
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = crypto.pbkdf2Sync(password, SALT, 10000, 64, 'sha512').toString('hex');

    const user = users.find((user) => user.username === username && user.password === hashedPassword);

    if (user) {
        res.status(200).send(user)
    } else {
        res.status(401).send({ message: 'Username or password is wrong' });
    }

});



module.exports = router;

