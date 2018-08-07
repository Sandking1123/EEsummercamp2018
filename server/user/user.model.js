const Sequelize = require('sequelize');
const database = require('../database');

const User = database.define('user', {
  googleId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
});

module.exports = User;
