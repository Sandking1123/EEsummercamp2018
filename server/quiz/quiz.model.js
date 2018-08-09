const Sequelize = require('sequelize');
const database = require('../database');

const Quiz = database.define('quiz', {
  questions: Sequelize.ARRAY(Sequelize.JSONB),
  percentage: Sequelize.DOUBLE,
  timestamp: Sequelize.DATE,
  elapsedTime: Sequelize.INTEGER
});

// set relations
const User = require('../user/user.model');
Quiz.belongsTo(User, {foreignKey: 'userId'});

module.exports = Quiz;
