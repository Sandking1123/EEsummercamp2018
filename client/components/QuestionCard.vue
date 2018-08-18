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
          <answers :answers="fullQuestion.answers" />
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
import Question from './question-card/Question.vue';
import Answers from './question-card/Answers.vue';

export default {
  name: 'question-card',
  props: {
    fullQuestion: {type: Object, required: true},
    markedAnswers: {type: Array, required: true}
  },
  data() {
    return {
      selectedAnswer: 0
    };
  },
  methods: {
    selectAnswer(id) {
      this.selectedAnswer = id;
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
