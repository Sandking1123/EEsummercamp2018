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
          <v-flex xs7>
            <v-btn @click="decrement">Prev</v-btn>
            {{ current }}/{{ choosenQuestions.length }}
            <v-btn @click="increment">Next</v-btn>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="indexText" label= "#No question" hint="2/757" clearable>
            </v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-btn @click="getIndex()">Get </v-btn>
          </v-flex>
        </v-layout>
        <question-card
          v-if="choosenQuestions.length > 0"
          :full-question="choosenQuestions[current - 1]"
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
      current: 1,
      indexText: 1
    };
  },
  computed: {
    answers() {
      const answers = this.choosenQuestions[this.current].answers;
      return _.map(
        _.sortBy(_.filter(answers, a => a.correct), 'id'),
        a => a.id
      );
    }
  },
  methods: {
    chooseTopic(selectedTopic) {
      this.current = 1;
      this.textField = this.current + '/' + this.choosenQuestions.length;
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
      if (this.current < this.choosenQuestions.length) {
        this.current++;
      }
    },
    decrement() {
      if (this.current !== 1) {
        this.current--;
      }
    }
  },
  created: function listTopics() {
    topicApi.getTopics()
      .then(({data}) => (this.allTopics = data));
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
