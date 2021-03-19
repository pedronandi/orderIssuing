import axios from 'axios';

const api = axios.create({
  baseURL: 'https://order-issuing-api.herokuapp.com',
})

export default api;