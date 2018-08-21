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
          src: require('../assets/picture1.png'),
          title: 'Learn all about git, javascript, sql and more! ' },
        { src: require('../assets/picture2.png'),
          title: 'Or... Test your knowledge with our quiz!' }
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
  color: orange;
  text-align: center;
  font-size: 20px!important;
}
</style>
