<template>
  <div>
    <v-app>
      <v-toolbar class="ma-3" dark color="#263238">
        <img src="https://www.graphicsprings.com/filestorage/stencils/3c59de7693edb9a01d13e3b980f7261d.png?width=500&height=500" width="50" height="50">
        <v-toolbar-title>Test your Knowledge</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-menu bottom offset-y>
            <v-btn slot="activator"><img id="img" :src="$auth.user.picture" width="35" height="35">&nbsp;{{ $auth.user.name }}
              <v-icon></v-icon>
            </v-btn>
            <v-list dark color="#263238" round>
              <v-list-tile @click="$auth.logout()">
                <v-list-tile-title id="logout"> LOGOUT </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <!-- <v-btn @click="$auth.logout()" round>Logout</v-btn> -->
        </v-toolbar-items>
      </v-toolbar>
    </v-app>
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
</style>
