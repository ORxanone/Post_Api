const router = require('express').Router();
const express = require("express");
const users = require('./data.json').users;


router.get('/users', (req, res) => {
    res.status(200).send(users);
})


module.exports = router;