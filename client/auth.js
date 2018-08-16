import auth0 from 'auth0-js';
import Vue from 'vue';

// exchange the object with your own from the setup step above.
const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientID: process.env.VUE_APP_AUTH0_CLIENTID,
  redirectUri: process.env.VUE_APP_REDIRECTURI,
  audience: process.env.VUE_APP_AUDIENCE,
  responseType: 'token id_token'
});
const auth = new Vue({
  computed: {
    token: {
      get: () => {
        return localStorage.getItem('id_token');
      },
      set: (idToken) => {
        localStorage.setItem('id_token', idToken);
      }
    },
    accessToken: {
      get: () => {
        return localStorage.getItem('access_token');
      },
      set: (accessToken) => {
        localStorage.setItem('access_token', accessToken);
      }
    },
    expiresAt: {
      get: () => {
        return localStorage.getItem('expires_at');
      },
      set: (expiresIn) => {
        const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
        localStorage.setItem('expires_at', expiresAt);
      }
    },
    user: {
      get: () => {
        return JSON.parse(localStorage.getItem('user'));
      },
      set: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
  },
  methods: {
    login() {
      webAuth.authorize();
    },
    logout() {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user');
        webAuth.authorize();
      });
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt;
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = authResult.expiresIn;
            this.accessToken = authResult.accessToken;
            this.token = authResult.idToken;
            this.user = authResult.idTokenPayload;
            resolve();
          } else if (err) {
            this.logout();
            reject(err);
          }
        });
      });
    }
  }
});

export default {
  install: (Vue) => {
    Vue.prototype.$auth = auth;
  }
};
