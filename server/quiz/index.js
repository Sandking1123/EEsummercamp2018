const router = require('express').Router();
const controller = require('./quiz.controller');

// dummy middleware for setting user
// TODO: use real userId from auth middleware
router.use('/quizzes', (req, res, next) => {
  req.userId = 1;
  next();
});

// history
router.get('/quizzes', controller.getQuizzes);

module.exports = router;
