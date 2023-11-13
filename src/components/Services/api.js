import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://financial-health-calculator-l7eu.onrender.com', // Your API base URL
});

export default instance;
