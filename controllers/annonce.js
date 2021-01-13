const router = require('express').Router();

const Annonce = require('../models/Annonce');

router.get('/', async (req, res) => {
  try {
    const allAnnonces = await Annonce.findAllAnnonces();

    if (!allAnnonces.length) {
      return res.status(404).json({
        success: false,
        message: '404 Not found.',
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

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const annonce = await Annonce.findOneById(id);

    if (!annonce) {
      return res.status(404).json({
        success: false,
        message: '404 Not found.',
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
