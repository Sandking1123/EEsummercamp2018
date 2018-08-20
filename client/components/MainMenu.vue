<template>
  <v-flex>
    <v-navigation-drawer permanent>
      <v-list dense dark>
        <v-list-tile
          v-for="option in options"
          :key="option.title"
          @click="navigateTo(option)">
          <v-list-tile-action>
            <v-icon color="orange darken-2">{{ option.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ option.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { title: 'Quiz', icon: 'chat', url: 'quiz' },
        { title: 'History', icon: 'event', url: 'history' }
      ],
      chosenPath: ''
    };
  },
  methods: {
    navigateTo(clickedItem) {
      this.$router.push({name: clickedItem.url});
    }
  }
};
</script>
