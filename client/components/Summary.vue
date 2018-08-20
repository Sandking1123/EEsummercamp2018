<template>
  <div>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <div>
            <h2 class ="summary">Summary</h2>
            <p>{{ message }}</p>
          </div>
          <div>
            Your score:
            {{ quizDetails.percentage }}/10
            ({{ quizDetails.percentage * 10 }}%)
          </div>
          <p>Required: {{ requiredPerc*10 }}%</p>
          <p>Time: {{ time }}</p>
          <div v-if="comeFromHistory">
            <v-card-actions>
              <v-btn @click="rewiewQuiz(quizDetails.id)" flat color="orange">Review</v-btn>
            </v-card-actions>
          </div>
          <div v-else>
            You can review your answers by clicking on questions progress bar.
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { quizApi } from '../api';
import fnsDate from 'date-fns';
export default {
  name: 'summarycomp',
  props: {
    quizId: { type: Number, required: true },
    comeFromHistory: { type: Boolean, default: false }
  },
  data() {
    return {
      quizDetails: '',
      message: '',
      time: 0,
      requiredPerc: 7
    };
  },
  methods: {
    getDetails() {
      quizApi.getQuizDetails(this.quizId)
        .then((request) => {
          return request.data;
        })
        .then((details) => {
          this.quizDetails = details;
          this.getMessage();
          return this.quizDetails;
        });
    },
    getMessage() {
      const { timestamp, createdAt, percentage } = this.quizDetails;
      if (percentage < this.requiredPerc) {
        this.message = 'Unfortunately you failed.';
      } else {
        this.message = 'Congratulations you passed.';
      }
      const milisec = fnsDate.differenceInMilliseconds(timestamp, createdAt);
      this.time = fnsDate.format(milisec, 'mm:ss');
    },
    rewiewQuiz(quizId) {
      this.$router.push({ name: 'review', params: {quizId} });
    }
  },
  created() {
    this.getDetails();
  },
  watch: {
    quizId() {
      this.getDetails();
    }
  }
};
</script>

<style scoped>
.summary {
  margin: 0 0 10px 0;
}
</style>
