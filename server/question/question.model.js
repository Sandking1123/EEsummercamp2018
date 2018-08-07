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

module.exports = Question;
