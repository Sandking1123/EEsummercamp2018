const Sequelize = require('sequelize');
const database = require('../database');

const Quiz = database.define('quiz', {
  questions: Sequelize.ARRAY(Sequelize.JSONB),
  percentage: Sequelize.DOUBLE,
  timestamp: Sequelize.DATE,
  elapsedTime: Sequelize.INTEGER
});

module.exports = Quiz;
