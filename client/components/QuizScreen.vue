<template>
  <v-layout>
    <question-card
      v-if="questions.length > 0"
      @set-answer="setAnswer"
      :full-question="questions[current].question"
      :current-answers="questions[current].answers" />
  </v-layout>
</template>

<script>
import questionCard from './QuestionCard';
import { questionApi } from '../api';

export default {
  name: 'quiz-screen',
  data() {
    return {
      current: 0,
      questions: []
    };
  },
  methods: {
    setAnswer(answerIndex, answerId) {
      const newAnswers = this.questions[this.current].answers.slice();
      newAnswers.forEach((id, index, array) => {
        if (id === answerId) {
          array[index] = null;
        }
      });
      newAnswers[answerIndex] = answerId;
      // trigger update
      this.questions[this.current].answers = newAnswers;
    }
  },
  // TODO: start quiz and fetch all questions
  created: function getQuestion() {
    questionApi.getQuestion(10)
      .then(response => response.data)
      .then(question => {
        const noAnswers = (question.question.match(/\?\?\?/g) || []).length;
        const answers = new Array(noAnswers).fill(null);
        this.questions.push({question, answers});
      });
  },
  components: {
    questionCard
  }
};
</script>

<style scoped>

</style>
