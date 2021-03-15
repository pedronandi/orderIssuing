import axios from 'axios';

const api = axios.create({
  /* https://order-issuing-api.herokuapp.com/ */
  baseURL: 'http://localhost:8080',
})

export default api;