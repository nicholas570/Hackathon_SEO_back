const router = require('express').Router();

const annonce = require('../controllers/annonce');

router.use('/annonce', annonce);

module.exports = router;
