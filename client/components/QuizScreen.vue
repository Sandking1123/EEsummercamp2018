<template>
  <v-container>
    <progress-bar
      v-if="quizQuestions.length > 0"
      @choose="changeQuestion"
      :current="current"
      :quiz-questions="quizQuestions" />
    <v-container align-center fill-height>
      <v-flex xs2>
        <v-btn
          @click="changeQuestion({step:-1})"
          flat
          color="orange">{{ backwardButtonText[current === 0 ? 1 : 0] }}</v-btn>
      </v-flex>
      <v-flex xs8 class="quizscreen">
        <question-card
          v-if="quizQuestions[current] && quizQuestions[current].question"
          @set-answer="setAnswer"
          :full-question="quizQuestions[current].question"
          :current-answers="quizQuestions[current].answers" />
      </v-flex>
      <v-flex xs2>
        <v-btn
          @click="changeQuestion({step:1})"
          flat
          color="orange">{{ forwardButtonText[current === 9 ? 1 : 0] }}</v-btn>
      </v-flex>
    </v-container>
  </v-container>
</template>

<script>
import shuffle from 'shuffle-array';
import questionCard from './QuestionCard';
import { questionApi, quizApi } from '../api';
import progressBar from './ProgressBar';

export default {
  name: 'quiz-screen',
  data() {
    return {
      current: 0,
      quizId: null,
      quizQuestions: [],
      backwardButtonText: ['previous', 'quit'],
      forwardButtonText: ['next', 'finish']
    };
  },
  methods: {
    setAnswer(answerIndex, answerId) {
      const newAnswers = this.quizQuestions[this.current].answers.slice();
      newAnswers.forEach((id, index, array) => {
        if (id === answerId) {
          array[index] = null;
        }
      });
      newAnswers[answerIndex] = answerId;
      // trigger update
      this.quizQuestions[this.current].answers = newAnswers;
    },
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
          this.$forceUpdate();
        });
    },
    sendAnswer(finalize) {
      const current = this.quizQuestions[this.current];
      return quizApi.answerQuestion(current.questionId, current.answers, finalize);
    },
    changeQuestion({step, jump}) {
      let nextPos;
      if (step !== undefined) {
        nextPos = this.current + step;
      } else if (jump !== undefined) {
        nextPos = jump;
      }
      if (nextPos >= 0 && nextPos < this.quizQuestions.length) {
        this.sendAnswer();
        this.current = nextPos;
      } else if (nextPos === this.quizQuestions.length) {
        // TODO: alert user that this will end the quiz
        this.sendAnswer(true)
          .then(() => {
            this.$router.replace({
              name: 'review',
              params: {quizId: this.quizId}
            });
          });
      } else if (nextPos === -1) {
        this.sendAnswer(true)
          .then(() => this.$router.replace({name: 'home'}));
      }
    }
  },
  created: function startQuiz() {
    quizApi.createInstance()
      .catch(error => {
        if (error.response && error.response.status === 302) {
          // TODO prompt user to choose what to to
          return quizApi.getInstance();
        } else {
          return Promise.reject(error);
        }
      })
      .then(response => response.data)
      .then(({id, quizQuestions}) => {
        this.quizId = id;
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

<style>
.quizscreen {
  margin-bottom: 60px;
}
</style>
