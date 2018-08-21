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
// v-for="item in choosenQuestions" :key="item"
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
    }
  },
  methods: {
    chooseTopic(selectedTopic) {
      topicApi.getQuestionsOfSpecificTopic(selectedTopic)
        .then(response => response.data)
        .then(questions => (this.choosenQuestions = questions));
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
