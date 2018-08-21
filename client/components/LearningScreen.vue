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
              @click="ChooseTopic(item.topic)">
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
        <v-card v-for="item in choosenQuestions" :key="item">
          <question-card
            :full-question="item.question"
            :current-answers="item.answers"
            mode="learn" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { topicApi } from '../api';
import QuestionCard from './QuestionCard';
export default {
  data() {
    return {
      allTopics: '',
      choosenQuestions: ''
    };
  },
  methods: {
    ChooseTopic(selectedTopic) {
      console.log(selectedTopic);
      topicApi.getQuestionsOfSpecificTopic(selectedTopic)
        .then((response) => {
          return response.data;
        })
        .then((questions) => {
          this.choosenQuestions = questions;
          return this.choosenQuestions;
        });
    }
  },
  created: function listTopics() {
    topicApi.getTopics()
      .then((response) => {
        return response.data;
      })
      .then((topics) => (this.allTopics = topics));
  },
  components: {
    QuestionCard
  }
};
</script>

<style>
.topic {
  color: 'orange darken-2';
  text-align: center!important;
}
</style>
