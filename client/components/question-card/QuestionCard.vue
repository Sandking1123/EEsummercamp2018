<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
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
        <v-card-actions>
          <!-- TODO: move this to props -->
          <v-layout fill-height>
            <v-flex>
              <v-btn flat color="orange">Previous</v-btn>
            </v-flex>
            <v-flex>
              <v-btn flat color="orange">Next</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
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
      selectedAnswer: 0
    };
  },
  computed: {
    markedAnswers() {
      return this.currentAnswers.map(id => {
        return id !== null ? this.fullQuestion.answers[id].text : '???';
      });
    }
  },
  methods: {
    selectAnswer(index) {
      this.selectedAnswer = index;
    },
    setAnswer(answerId) {
      this.$emit('set-answer', this.selectedAnswer, answerId);
    }
  },
  components: {
    Question,
    Answers
  }
};
</script>

<style>

</style>
