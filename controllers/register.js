const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const router = express.Router();
const connection = require('../config/connection');

router.post('/user', (req, res) => {
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
          connection.query(
            'SELECT * FROM users WHERE id=?',
            [result.insertId],
            (error, results) => {
              if (err) {
                res.status(500).json({
                  error: err.message,
                  sql: err.sql,
                });
              } else {
                const token = jwt.sign(
                  {
                    id: result.id,
                  },
                  JWT_SECRET,
                  { expiresIn: '1h' }
                );
                const user = {
                  id: results[0].id,
                  email,
                  password: 'hidden',
                };
                res.status(201).json({ user, token });
              }
            }
          );
        }
      }
    );
  }
});

module.exports = router;
// res.status(201).json({
//   id: result.insertId,
//   email,
//   password: hashpassword,
// });
