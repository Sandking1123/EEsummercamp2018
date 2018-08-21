const Question = require('./question.model');

function getQuestion(req, res) {
  const id = req.params.id;
  Question.findById(id)
    .then((question) => res.json(question))
    .catch(() => res.status(404).json({}));
}
function getTopics(req, res) {
  Question.findAll({ attributes: ['topic'], group: ['topic'] })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err.message));
}

function getQuestionsOfSpecificTopic(req, res) {
  const nameOfTopic = req.params.topic;
  Question.findAll({where: {topic: nameOfTopic}})
    .then((question) => res.json(question))
    .catch((err) => res.status(404).send(err.message));
}

module.exports = {
  getQuestion,
  getTopics,
  getQuestionsOfSpecificTopic
};
