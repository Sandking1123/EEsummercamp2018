import request from './request';

function getQuestion(questionId) {
  return request.get(`/questions/${questionId}`);
}

export default {
  getQuestion
};
