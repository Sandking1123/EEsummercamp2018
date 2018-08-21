<template>
  <div class="history">
    <v-layout d-flex center>
      <v-flex xs12 sm6 offset-sm3>
        <h2>History</h2>
        <v-list v-if="quizHistory.length !== 0" dark>
          <v-list-tile
            v-for="(item, index) in quizHistory"
            :key="item.id"
            @click="getSummary(item)">
            <v-list-tile-content>
              <v-list-tile-title class="title-text">
                {{ nameOfQuiz + " " + (quizHistory.length - index) + ". - "+ (item.percentage*10) +
                "% " + getNormalDate(item.createdAt) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list v-else>
          <h3>There are no completed quizzes.</h3>
        </v-list>
      </v-flex>
    </v-layout>
    <br>
    <summary-comp
      v-if="clicked"
      :comeFromHistory="true"
      :quizId="idOfQuiz">
    </summary-comp>
  </div>
</template>

<script>
import { quizApi } from '../api';
import summaryComp from './Summary';
export default {
  name: 'history',
  data() {
    return {
      nameOfQuiz: 'Quiz',
      quizHistory: '',
      idOfQuiz: '',
      clicked: false
    };
  },
  methods: {
    getNormalDate(longDate) {
      const date = new Date(longDate);
      return date.toLocaleString();
    },
    getSummary(quiz) {
      this.idOfQuiz = quiz.id;
      this.clicked = true;
    }
  },
  created: function getHistory() {
    quizApi.getHistory()
      .then(({data}) => data.filter(h => h.timestamp))
      .then((history) => (this.quizHistory = history))
      .catch((err) => console.log(err));
  },
  components: {
    summaryComp
  }
};
</script>

<style scoped>
.history {
  margin-bottom: 65px;
}
.title-text {
  text-align: center;
}
</style>
