const Sequelize = require('sequelize');
const database = require('../database');

const Question = database.define('question', {
  topic: Sequelize.STRING,
  course: Sequelize.STRING,
  lesson: Sequelize.STRING,
  author: Sequelize.STRING,
  category: Sequelize.STRING,
  question: Sequelize.TEXT,
  answers: Sequelize.ARRAY(Sequelize.JSONB)
});

Question.prototype.filter = function filterQuestion() {
  const question = this.dataValues;

  // remove the correct/correctIndex from the returned answer
  question.answers = question.answers.map((answer, index) => {
    return {
      text: answer.text,
      id: index
    };
  });

  return question;
};

module.exports = Question;
