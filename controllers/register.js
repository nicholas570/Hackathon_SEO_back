const express = require('express');

const bcrypt = require('bcrypt');

const router = express.Router();
const connection = require('../config/connection');

router.post('/', (req, res) => {
  const { email, password, nom, prenom } = req.body;

  if (email === '' || password === '' || nom === '' || prenom === '') {
    res.status(400).send('Please specify all fields');
  } else {
    const hashpassword = bcrypt.hashSync(password, 10);
    connection.query(
      'INSERT INTO users (mail, password, nom, prenom) VALUE (?, ?, ?, ?)',
      [email, hashpassword, nom, prenom],
      (err, result) => {
        if (err) {
          res.status(500).json({
            error: err.message,
            sql: err.sql,
          });
        } else {
          res.status(201).json({
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
