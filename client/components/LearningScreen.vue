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
        <v-card>
          <v-card-text>Add question card here</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { topicApi } from '../api';
export default {
  data() {
    return {
      allTopics: '',
      choosenTopic: ''
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
          this.choosenTopic = questions;
          return this.choosenTopic;
        });
    }
  },
  created: function listTopics() {
    topicApi.getTopics()
      .then((response) => {
        return response.data;
      })
      .then((topics) => (this.allTopics = topics));
  }
};
</script>

<style>
.topic {
  color: #F57C00;
  text-align: center!important;
}
</style>
