<template>
  <v-container class="history">
    <v-flex xs4 offset-xs4>
      <h1>Quiz History</h1>
    </v-flex>
    <v-flex xs6 offset-xs3>
      <v-data-table
        :items="quizHistory"
        :headers="headers"
        class="elevation-1"
        hide-actions
        dark>
        <template slot-scope="props" slot="headers">
          <th
            v-for="header in props.headers"
            :key="header.name">
            {{ header.name }}
          </th>
        </template>
        <template slot-scope="props" slot="items" @click="getSummary(props.item)">
          <td>{{ props.item.topic }}</td>
          <td>{{ props.item.percentage * 10 }}%</td>
          <td>{{ calculateTime(props.item) }}</td>
          <td>{{ getNormalDate(props.item.timestamp) }}</td>
          <td>
            <v-icon
              @click="$router.push({ name: 'review', params: {quizId: props.item.id} })"
              small
              class="mr-2">
              rate_review
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-container>
</template>

<script>
import { quizApi } from '../api';
import fnsDate from 'date-fns';

export default {
  name: 'history',
  data() {
    return {
      headers: [
        {name: 'Type'},
        {name: 'Score'},
        {name: 'Time'},
        {name: 'Date'},
        {name: 'Action'}
      ],
      quizHistory: []
    };
  },
  methods: {
    getNormalDate(longDate) {
      const date = new Date(longDate);
      return date.toLocaleString();
    },
    calculateTime(quiz) {
      const milisec = fnsDate.differenceInMilliseconds(quiz.timestamp, quiz.createdAt);
      return fnsDate.format(milisec, 'mm:ss');
    }
  },
  created: function getHistory() {
    quizApi.getHistory()
      .then(({data}) => data.filter(h => h.timestamp))
      .then((history) => (this.quizHistory = history))
      .catch((err) => console.log(err));
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
