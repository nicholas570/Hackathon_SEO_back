const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Annonce = require('../models/Annonce');

const { JWT_SECRET } = process.env;

const authenticateWithJsonWebToken = (req, res, next) => {
  if (req.headers.authorization !== undefined) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err) => {
      if (err) {
        res
          .status(401)
          .json({ errorMessage: "you're not allowed to access these data" });
      } else {
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ errorMessage: "you're not allowed to access these data" });
  }
};

router.get('/', authenticateWithJsonWebToken, async (req, res) => {
  try {
    const allAnnonces = await Annonce.findAllAnnonces();

    if (!allAnnonces.length) {
      return res.status(204).json({
        success: false,
        message: 'No announcements.',
      });
    }

    return res.status(200).json({
      success: true,
      annonces: allAnnonces,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      sqlMessage: error.sqlMessage,
      sql: error.sql,
    });
  }
});

router.get('/:id', authenticateWithJsonWebToken, async (req, res) => {
  const { id } = req.params;

  try {
    const annonce = await Annonce.findOneById(id);

    if (!annonce) {
      return res.status(204).json({
        success: false,
        message: 'No announcement.',
      });
    }

    return res.status(200).json({
      success: true,
      annonce,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      sqlMessage: error.sqlMessage,
      sql: error.sql,
    });
  }
});

module.exports = router;
