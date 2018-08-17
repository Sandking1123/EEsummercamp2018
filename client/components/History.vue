<template>
  <div class="history">
    <v-layout d-flex center>
      <v-flex xs12 sm6 offset-sm3>
        <h2>History</h2>
        <v-list id="list">
          <v-list-tile v-for="(item, index) in returnedJsonData" :key="item.id" @click="getSummary(item)">
            <v-list-tile-content id="titleContent">
              <v-list-tile-title id="titleText">
                {{ nameOfQuiz +" "+ (index+1) + ". - "+ item.percentage + "% "+ getNormalDate(item.createdAt) }}
              </v-list-tile-title>
              <v-divider></v-divider>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
// import { quizApi, questionApi } from '../api';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
const nameOfQuiz = 'Quiz';
const returnedJsonData = [
  {
    'id': 2,
    'percentage': 86,
    'timestamp': '2018-08-16T23:00:38.203Z',
    'createdAt': '2018-08-16T22:47:51.491Z',
    'updatedAt': '2018-08-16T22:47:51.491Z',
    'userId': 'google-oauth2|100366373761693429089'
  },
  {
    'id': 1,
    'percentage': 80,
    'timestamp': '2018-08-16T23:00:38.203Z',
    'createdAt': '2018-08-16T22:47:51.485Z',
    'updatedAt': '2018-08-16T22:47:51.485Z',
    'userId': 'google-oauth2|100366373761693429089'
  }
];

export default {
  name: 'history',
  data() {
    return {
      nameOfQuiz,
      returnedJsonData
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
