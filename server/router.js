const express = require('express');
const questionRouter = require('./question');

const router = express.Router();
router.use('/', questionRouter);

module.exports = router;
