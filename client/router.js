import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Callback from './components/Callback.vue';
import HistoryComp from './components/History.vue';
import QuizScreen from './components/QuizScreen';
import ReviewScreen from './components/ReviewScreen';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryComp
    },
    {
      path: '/quiz/:topic',
      name: 'quiz',
      component: QuizScreen
    },
    {
      path: '/review/:quizId',
      name: 'review',
      component: ReviewScreen
    }
  ]
});

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if (to.name === 'callback') { // check if "to"-route is "callback" and allow access
    next();
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next();
  } else { // trigger auth0 login
    router.app.$auth.login();
  }
});

export default router;
