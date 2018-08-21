<template>
  <v-container>
    <v-carousel class="panel">
      <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide.src">
        <v-jumbotron dark>
          <v-container fill-height>
            <v-layout align-top>
              <v-flex>
                <p class="title">{{ slide.title }}</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-jumbotron>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          src: require('../assets/pictureLogos.png'),
          title: 'LEARN ALL ABOUT:' },
        { src: require('../assets/pictureExample.png'),
          title: 'TEST YOUR KNOWLEDGE WITH OUR QUIZ' }
      ]
    };
  }
};
</script>

<style scoped>
.panel {
  margin-top: 19px;
}
.title {
  color: orangered;
  text-align: center;
  font-size: 30px !important;
}
</style>
