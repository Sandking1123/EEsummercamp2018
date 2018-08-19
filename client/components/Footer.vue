<template>
  <v-footer class="footer" fixed>
    <v-flex xs12>&copy; {{ new Date().getFullYear() }}
      <strong> - Test your Knowledge</strong>
    </v-flex>
  </v-footer>
</template>

<script>
export default {
  name: 'footercomponent',
  data: () => ({

  })
};
</script>

<style scoped>
.footer {
  background-color: #ECEFF1;
}
</style>
