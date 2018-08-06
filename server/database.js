const Sequelize = require('sequelize');

// TODO: separate this in .env file
const database = new Sequelize('postgres://postgres:admin@localhost:5432/nikolovska');

module.exports = database;
