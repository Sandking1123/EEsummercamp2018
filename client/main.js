import Vue from 'vue';
import App from './src/views/Home.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
