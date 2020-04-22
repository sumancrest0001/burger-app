import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-2aa8f.firebaseio.com/'
});

export default instance;
