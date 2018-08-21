<template>
  <v-app id="app">
    <navbar v-if="$route.name !== 'callback'" />
    <router-view></router-view>
    <footer-component />
  </v-app>
</template>

<script>
import navbar from './components/Navbar';
import footerComponent from './components/Footer';

document.title = 'Test Your Knowledge';
export default {
  name: 'app',
  components: {
    navbar,
    footerComponent
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("./assets/backgroundTYK_large.png");
}
</style>
