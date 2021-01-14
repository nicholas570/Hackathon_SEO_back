const router = require('express').Router();

const index = require('../controllers/index');

router.use('/', index);

module.exports = router;
