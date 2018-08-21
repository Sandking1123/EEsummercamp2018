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
        <v-card v-if="Show === true">
          <!-- <question-card
            :full-question="choosenQuestions[1].questions"
            :current-answers="choosenQuestions[1].answers"
            mode="learn" /> -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// v-for="item in choosenQuestions" :key="item"
import { topicApi } from '../api';
import QuestionCard from './QuestionCard';
export default {
  data() {
    return {
      allTopics: '',
      choosenQuestions: '',
      Show: false
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
          this.Show = true;
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
  watch: {
    choosenObjects: {

    }
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
