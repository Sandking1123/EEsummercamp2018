<template>
  <v-footer class="footer">
    <v-flex xs12>&copy; {{ new Date().getFullYear() }}
      <strong> - Test Your Knowledge</strong>
    </v-flex>
  </v-footer>
</template>

<style scoped>
.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: hsla(hue, saturation, lightness, alpha);
}
</style>
