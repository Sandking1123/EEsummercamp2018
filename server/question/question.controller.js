const Question = require('./question.model');

function getQuestion(req, res) {
  const id = req.params.id;
  Question.findById(id)
    .then((question) => question.format())
    .then((question) => res.json(question))
    .catch(() => res.status(404).json({}));
}

module.exports = {
  getQuestion
};
