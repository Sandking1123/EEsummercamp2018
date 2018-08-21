<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-media>
          <question
            @select="selectAnswer"
            :full-question="fullQuestion"
            :marked-answers="markedAnswers"
            :selected-answer="selectedAnswer"
            :display-options="displayOptions" />
        </v-card-media>
        <v-card-text v-if="mode === 'quiz'">
          <answers
            @set-answer="setAnswer"
            :answers="fullQuestion.answers"
            :mode="mode" />
        </v-card-text>
        <v-card-actions v-if="mode ==='review'">
          <v-flex>
            <v-btn
              @click="displayOptions.marked = !displayOptions.marked"
              flat
              color="orange">
              {{ displayOptions.marked ? 'My answers' : 'Correct Answers' }}
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Question from './Question.vue';
import Answers from './Answers.vue';
import _ from 'lodash';

export default {
  name: 'question-card',
  props: {
    mode: {type: String, default: 'quiz'},
    fullQuestion: {type: Object, required: true},
    currentAnswers: {type: Array, required: true}
  },
  data() {
    return {
      displayOptions: {marked: true, mode: this.mode},
      prevSelectedAnswer: 0
    };
  },
  computed: {
    markedAnswers() {
      return this.currentAnswers.map(id => {
        return id !== null
          ? _.find(this.fullQuestion.answers, {id}).text : '???';
      });
    },
    selectedAnswer: {
      get: function () {
        let selected = 0;
        if (this.mode !== 'quiz') {
          selected = -1;
        } else if (this.prevSelectedAnswer < this.currentAnswers.length) {
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
