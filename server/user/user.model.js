const Sequelize = require('sequelize');
const database = require('../database');

const User = database.define('user', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = User;
