
const express = require('express');
const crypto = require('crypto');
const config = require('config');
const uniqid = require('uniqid');
const jwt = require('jsonwebtoken');
const auth = require("./middleware/auth")
const users = require('./data.json').users;
const SALT = config.get('SALT');
const SECRET_KEY = config.get('SECRET_KEY');


const router = express.Router();

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
        const { password, ...theRest } = user;
        const accessToken = jwt.sign(theRest, SECRET_KEY);
        res.status(200).send({
            accessToken
        })
    } else {
        res.status(401).send({ message: 'Username or password is wrong' });
    }

});



module.exports = router;


