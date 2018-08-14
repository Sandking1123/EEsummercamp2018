
<template>
  <div id="app">
    <router-view></router-view>
    <!-- <loader></loader> -->
    <!-- <main-page v-if="isLoggedIn"></main-page>
    <login v-else></login> -->
  </div>
</template>

<script>
// import Login from './src/views/LoginScreen';
// import MainPage from './MainPage';

export default {
  name: 'app'
  // computed: {
  //   isLoggedIn() {
  //     // check if user is logged in
  //     return true;
  //   }
  // },
  // created() {
  //   ffdg
  //   this.nekaVarijabla = true;
  // },
  // components: {
// Login
  // MainPage
// }
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
