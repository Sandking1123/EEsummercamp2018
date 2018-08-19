<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-media>
          <question
            @select="selectAnswer"
            :question="fullQuestion.question"
            :marked-answers="markedAnswers"
            :selected-answer="selectedAnswer" />
        </v-card-media>
        <v-card-text>
          <answers
            @set-answer="setAnswer"
            :answers="fullQuestion.answers" />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Question from './Question.vue';
import Answers from './Answers.vue';

export default {
  name: 'question-card',
  props: {
    fullQuestion: {type: Object, required: true},
    currentAnswers: {type: Array, required: true}
  },
  data() {
    return {
      prevSelectedAnswer: 0
    };
  },
  computed: {
    markedAnswers() {
      return this.currentAnswers.map(id => {
        return id !== null ? this.fullQuestion.answers[id].text : '???';
      });
    },
    selectedAnswer: {
      get: function () {
        let selected = 0;
        if (this.prevSelectedAnswer < this.currentAnswers.length) {
          selected = this.prevSelectedAnswer;
        }
        return selected;
      },
      set: function (index) {
        if (index >= 0 && index < this.currentAnswers.length) {
          this.prevSelectedAnswer = index;
        }
      }
    }
  },
  methods: {
    selectAnswer(index) {
      this.selectedAnswer = index;
    },
    setAnswer(answerId) {
      this.$emit('set-answer', this.selectedAnswer, answerId);
      this.selectedAnswer++;
    }
  },
  watch: {
    fullQuestion: function () {
      this.selectedAnswer = 0;
    }
  },
  components: {
    Question,
    Answers
  }
};
</script>
