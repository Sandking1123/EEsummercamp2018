const express = require('express');

const router = express.Router();

// TODO setup real endpoints and controllers
router.use('/', (req, res, next) => {
  res.send('Hello!');
});

module.exports = router;
