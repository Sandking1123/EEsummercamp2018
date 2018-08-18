<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <!-- TODO: add question -->
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <!-- TODO: add answers -->
        </v-card-title>
        <v-card-actions>
          <!-- TODO: move this to props -->
          <v-layout fill-height>
            <v-flex>
              <v-btn flat color="orange">Previous</v-btn>
            </v-flex>
            <v-flex>
              <v-btn flat color="orange">Next</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'question-card'
};
</script>

<style>

</style>
