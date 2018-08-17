<template>
  <div class="history">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>History</h2>
        <v-list id="list">
          <v-list-tile v-for="(item, index) in returnedJsonData" :key="item.id" @click="getMoreInfo(item)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ nameOfQuiz +" "+ (index+1) + " - "+ item.percentage + " "+ getNormalDate(item.createdAt) }}</v-list-tile-title>
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
    ShowQuizesInfo(info) {
      alert(info.id);
    },
    getMoreInfo(item) {
      alert(item.userId);
    }
  }
};
</script>
<style scoped>

</style>
