const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bcrypt = require('bcrypt');

const router = express.Router();
const connection = require('../config/connection');

const { CLIENT_URL } = process.env;

router.use(
  cors({
    origin: CLIENT_URL,
  })
);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).send('Please specify your email or password');
  } else {
    const hashpassword = bcrypt.hashSync(password, 10);
    connection.query(
      'INSERT INTO user (email, password) VALUE (?,?)',
      [email, hashpassword],
      (err, result) => {
        if (err) {
          res.status(500).json({
            error: err.message,
            sql: err.sql,
          });
        } else {
          return res.status(201).json({
            id: result.insertId,
            email,
            password: hashpassword,
          });
        }
      }
    );
  }
});

module.exports = router;
