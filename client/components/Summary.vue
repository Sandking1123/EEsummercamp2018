<template>
  <div>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <br>
          <h2> Summary</h2>
          <br>
          <p>
            {{ message }}
            <br>
            Your score:
            {{ quizDetails.percentage }}/10
            ({{ quizDetails.percentage * 10 }}%)
            <br>
            Required: {{ requiredPerc*10 }}%
          </p>
          <p>
            Time: {{ time }}
          </p>
          <div v-if="comeFromHistory">
            <v-card-actions>
              <v-btn @click="retakeQuiz(quizDetails.id)" flat color="orange">Retake</v-btn>
            </v-card-actions>
          </div>
          <div v-else>
            You can rewiew your answers by clicking on questions progress bar.
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
      if (this.quizDetails.percentage < this.requiredPerc) {
        this.message = 'Unfortunately you failed.';
      } else {
        this.message = 'Congratulation you passed.';
      }
      const milisec = fnsDate.differenceInMilliseconds(this.quizDetails.timestamp, this.quizDetails.createdAt);
      this.time = fnsDate.format(milisec, 'mm:ss');
    },
    retakeQuiz(quizId) {
      // switch to component for retaking quiz
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
