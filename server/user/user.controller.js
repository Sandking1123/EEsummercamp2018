const Quiz = require('../quiz/quiz.model');
const User = require('./user.model');
const sequelize = require('sequelize');

function getLeaderboard(req, res) {
  Quiz.findAll({
    attributes: [
      [sequelize.fn('sum', sequelize.col('percentage')), 'score']
    ],
    group: ['userId', 'user.id'],
    order: [[sequelize.col('score'), 'desc']],
    limit: 10,
    include: [{model: User, attributes: ['name']}],
    raw: true
  })
    .then(leaderboard => res.json(leaderboard));
}

module.exports = {
  getLeaderboard
};
