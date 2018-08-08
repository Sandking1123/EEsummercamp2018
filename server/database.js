const Sequelize = require('sequelize');

const database = new Sequelize(process.env.POSTGRES_URI);

module.exports = database;
