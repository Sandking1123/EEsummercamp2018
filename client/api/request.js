import axios from 'axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

request.interceptors.request.use(config => {
  const token = window.localStorage.getItem('id_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default request;
