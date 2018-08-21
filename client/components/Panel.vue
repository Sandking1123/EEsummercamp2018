<template>
  <v-container>
    <v-carousel style="cursor: pointer;">
      <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide.src">
        <v-jumbotron dark>
          <v-container fill-height>
            <v-layout align-top>
              <v-flex>
                <h1 class="title">{{ slide.title }}</h1>
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
        { // zabi slike u assets i ode promini src i molin te popravi stilove
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          title: 'Learn all about git, javascript, sql and more! ' },
        { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          title: 'Or you can test your knowledge with our quizzes... Good luck!' }
      ]
    };
  }
};
</script>

<style scoped>
.title {

}
</style>
