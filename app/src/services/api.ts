import axios from 'axios';

const api = axios.create({
  /* http://localhost:8080 | https://order-issuing-api.herokuapp.com/ */
  baseURL: 'https://order-issuing-api.herokuapp.com',
})

export default api;