const express = require('express');

const router = express.Router();

const loginRoute = require('./login');
const registerRoute = require('./register');
const annonceRoute = require('./annonce');

router.use('/annonces', annonceRoute);
router.use('/login', loginRoute);
router.use('/register', registerRoute);

module.exports = router;
