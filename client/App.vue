<template>
  <v-app id="app">
    <navbar v-if="$route.name !== 'callback'" />
    <router-view></router-view>
  </v-app>
</template>

<script>
import navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    navbar
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
}
</style>
