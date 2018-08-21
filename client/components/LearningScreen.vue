<template>
  <v-container grid-list-md text-xs-center>
    <v-layout align-start justify-start row fill-height>
      <v-flex xs3 class="resultContainer">
        <v-card dark>
          <v-card-text class="topic">PICK A TOPIC</v-card-text>
          <v-list>
            <v-list-tile
              v-for="item in allTopics"
              :key="item.topic"
              @click="chooseTopic(item.topic)">
              <v-list-tile-content>
                <v-list-tile-title class="topic">
                  {{ item.topic }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs9>
        <v-layout row wrap>
          <v-flex xs3 offset-xs2>
            <v-btn @click="decrement" color="orange">Prev</v-btn>
          </v-flex>
          <v-flex xs1>
            <v-text-field v-model="displayedNumber" type="number" :hint="hint" />
          </v-flex>
          <v-flex xs3>
            <v-btn @click="increment" color="orange">Next</v-btn>
          </v-flex>
        </v-layout>
        <question-card
          v-if="choosenQuestions.length > 0"
          :full-question="choosenQuestions[current]"
          :current-answers="answers"
          mode="learn" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { topicApi } from '../api';
import QuestionCard from './QuestionCard';
import _ from 'lodash';

export default {
  data() {
    return {
      allTopics: [],
      choosenQuestions: [],
      current: 0
    };
  },
  computed: {
    answers() {
      const answers = this.choosenQuestions[this.current].answers;
      return _.map(
        _.sortBy(_.filter(answers, a => a.correct), 'id'),
        a => a.id
      );
    },
    hint() {
      return `1 - ${this.choosenQuestions.length}`;
    },
    displayedNumber: {
      get: function () {
        return this.current + 1;
      },
      set: function (val) {
        const next = val - 1;
        if (next >= 0 && next < this.choosenQuestions.length) {
          this.current = next;
        }
      }
    }
  },
  methods: {
    chooseTopic(selectedTopic) {
      this.current = 0;
      topicApi.getQuestionsOfSpecificTopic(selectedTopic)
        .then(response => response.data)
        .then(questions => (this.choosenQuestions = questions));
    },
    getIndex() {
      const qLength = this.choosenQuestions.length;
      const inputV = this.indexText;
      if (qLength !== 0 && inputV <= qLength && inputV !== 0) {
        this.current = this.indexText;
      }
    },
    increment() {
      this.displayedNumber++;
    },
    decrement() {
      this.displayedNumber--;
    }
  },
  created: function listTopics() {
    topicApi.getTopics()
      .then(({data}) => (this.allTopics = data))
      .then(() => this.chooseTopic(this.allTopics[0].topic));
  },
  components: {
    QuestionCard
  }
};
</script>

<style>
.topic {
  color: 'orange';
  text-align: center!important;
}
</style>
