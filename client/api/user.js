import request from './request';

function getLeaderboard() {
  return request.get('users/leaderboard');
}

export default {
  getLeaderboard
};
