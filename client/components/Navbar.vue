<template>
  <div>
    <v-toolbar class="ma-3" dark color="#263238">
      <img src="https://a.storyblok.com/f/39898/1024x1024/dea4e1b62d/vue-js_logo-svg.png" width="40" height="40">
      <v-toolbar-title>Test your Knowledge</v-toolbar-title>
      <v-spacer></v-spacer>
      <img id="img" :src="$auth.user.picture" width="35" height="35">
      <v-toolbar-items>
        <v-toolbar-title id="username">&nbsp;{{ $auth.user.name }}</v-toolbar-title>
        <v-btn @click="$auth.logout()" round>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
export default {

};
</script>
<style scoped>
#img {
  margin:auto;
  border-radius: 50%;

}
#username {
  margin: auto;
}
</style>
