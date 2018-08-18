import Vue from 'vue';
import App from './App.vue';
import router from './router';
import auth from './auth';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(auth);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
