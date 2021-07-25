import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fast-burger-api.herokuapp.com'
});