const router = require('express').Router();
const controller = require('./user.controller');

router.get('/users/leaderboard', controller.getLeaderboard);

module.exports = router;
