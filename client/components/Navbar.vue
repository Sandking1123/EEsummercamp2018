<template>
  <v-toolbar class="toolbar" dark>
    <v-menu offset-y>
      <v-toolbar-side-icon slot="activator">
      </v-toolbar-side-icon>
      <v-list dark>
        <v-list-tile
          v-for="option in options"
          :key="option.title"
          @click="navigateTo(option.url)"
          :disabled="option.disable">
          <v-list-tile-action>
            <v-icon color="orange darken-3">{{ option.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ option.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn @click="goToHome" class="navbarbtn" large round>
      <img src="../assets/logoTYK.png" width="40" height="40">
      <v-toolbar-title class="toolbartitle">Test your Knowledge</v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-menu bottom offset-y>
        <v-btn slot="activator" class="navbarbtn">
          <img class="img" :src="$auth.user.picture" width="35" height="35">
          &nbsp;{{ $auth.user.name }}
          <v-icon></v-icon>
        </v-btn>
        <v-list dark>
          <v-list-tile @click="$auth.logout()">
            <v-list-tile-title> LOGOUT </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        title: 'Home', icon: 'home', url: '/'
      }, {
        title: 'Quiz', icon: 'chat', disable: true
      }, {
        title: 'Git', url: ''
      }, {
        title: 'Regular', url: ''
      }, {
        title: 'History', icon: 'event', url: 'history'
      }, {
        title: 'Question by question', icon: 'info', url: ''
      }],
      chosenPath: ''
    };
  },
  methods: {
    goToHome() {
      this.$router.replace({name: 'home'});
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.img {
  margin:auto;
  border-radius: 50%;
}
.toolbar {
  margin: 0 0 16px !important;
}
.toolbartitle {
  text-transform: capitalize
}
.navbarbtn {
  box-shadow: none !important;
}
</style>
