<template>
  <v-container>
    <progress-bar
      v-if="quizQuestions.length > 0"
      @choose="changeQuestion"
      :current="current"
      :quiz-questions="quizQuestions"
      mode="review" />
    <v-container align-space-around justify-space-between>
      <v-btn
        @click="changeQuestion({step:-1})"
        :disabled="current === 0"
        color="orange"
        align-center>Previous</v-btn>
      <v-btn
        @click="changeQuestion({step:1})"
        :disabled="current + 1 === quizQuestions.length"
        color="orange"
        align-center>Next</v-btn>
      <question-card
        v-if="quizQuestions[current] && quizQuestions[current].question"
        :full-question="quizQuestions[current].question"
        :current-answers="quizQuestions[current].answers"
        mode="review" />

    </v-container>
  </v-container>
</template>

<script>
import shuffle from 'shuffle-array';
import questionCard from './QuestionCard';
import { questionApi, quizApi } from '../api';
import progressBar from './ProgressBar';

export default {
  name: 'review-screen',
  data() {
    return {
      current: 0,
      quizQuestions: []
    };
  },
  methods: {
    fetchQuestion(id) {
      questionApi.getQuestion(id)
        .then(response => response.data)
        .then(question => {
          question.answers = shuffle(question.answers);
          const qq = this.quizQuestions.find(qq => qq.questionId === id);
          if (qq.answers === null) {
            const noAnswers = (question.question.match(/\?\?\?/g) || []).length;
            qq.answers = new Array(noAnswers).fill(null);
          }
          qq.question = question;
          // force update
          const newQQs = this.quizQuestions.slice();
          this.quizQuestions = newQQs;
        });
    },
    changeQuestion({step, jump}) {
      let nextPos;
      if (step !== undefined) {
        nextPos = this.current + step;
      } else if (jump !== undefined) {
        nextPos = jump;
      }
      if (nextPos >= 0 && nextPos < this.quizQuestions.length) {
        this.current = nextPos;
      }
    }
  },
  created: function getQuiz() {
    quizApi.getQuizDetails(this.$route.params.quizId)
      .then(response => response.data)
      .then(({quizQuestions}) => {
        this.quizQuestions = quizQuestions;
        const promises = quizQuestions.map(qq => {
          return this.fetchQuestion(qq.questionId);
        });
        return Promise.all(promises);
      });
    // TODO handle errors
  },
  components: {
    questionCard,
    progressBar
  }
};
</script>
