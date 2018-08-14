import Vue from 'vue';
import App from './App.vue';
import router from './src/router';

import auth from './src/auth';
Vue.use(auth);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
