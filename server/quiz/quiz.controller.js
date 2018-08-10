const Quiz = require('./quiz.model');

function getQuizzes(req, res) {
  const userId = req.userId;
  Quiz.findAll({where: {userId}, raw: true})
    .then((quizzes) => res.json(quizzes))
    .catch(() => res.status(404).json({}));
}

function getQuizDetails(req, res) {
  const userId = req.userId;
  Quiz.find({
    where: {
      id: req.params.id,
      userId
    },
    include: [{
      model: Quiz.Questions
    }]
  })
    .then(quizDetails => res.json(quizDetails))
    .catch(() => res.status(404).json({}));
}

module.exports = {
  getQuizzes,
  getQuizDetails
};
