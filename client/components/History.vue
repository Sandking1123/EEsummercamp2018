<template>
  <div class="history">
    <v-layout d-flex center>
      <v-flex xs12 sm6 offset-sm3>
        <h2>History</h2>
        <v-list v-if="quizHistory.length !== 0" id="list">
          <v-list-tile v-for="(item, index) in quizHistory" :key="item.id" @click="getSummary(item)">
            <v-list-tile-content id="titleContent">
              <v-list-tile-title id="titleText">
                {{ nameOfQuiz +" "+ (index+1) + ". - "+ item.percentage + "% "+ getNormalDate(item.createdAt) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list v-else>
          <h3>There are no completed quizzes.</h3>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { quizApi } from '../api';
export default {
  name: 'history',
  data() {
    return {
      nameOfQuiz: 'Quiz',
      quizHistory: ''
    };
  },
  methods: {
    getNormalDate(longDate) {
      const date = new Date(longDate);
      return date.toLocaleString();
    },
    getSummary(item) {
      // opens summry of that specific quiz
    }
  },
  created: function getHistory() {
    quizApi.getHistory()
      .then((response) => {
        console.log(response.data);
        return response.data;
      }) // response is request and .data is json
      .then((history) => (this.quizHistory = history)); // history is .data
  }
};
</script>
<style scoped>
#list {
  border: 1px solid #90A4AE;
  border-radius: 8px;
  background: #B0BEC5;
}
#titleContent {
  background-color: #B0BEC5;
}
#titleContent:hover{
  background-color: #CFD8DC;
  border-radius: 6px;
}
#titleText {
  text-align: center;

}
</style>
