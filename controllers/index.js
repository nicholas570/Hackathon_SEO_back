const express = require('express');
const cors = require('cors');
require('dotenv').config();

const loginRoute = require('./login');
const registerRoute = require('./register');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRoute);
app.use('/register', registerRoute);