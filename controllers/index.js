const express = require('express');
const cors = require('cors');
require('dotenv').config();

const loginRoute = require('./login');
const registerRoute = require('./register');

const router = express.router();

router.use(express.json());
router.use(cors());

router.use('/login', loginRoute);
router.use('/register', registerRoute);

module.exports = router;