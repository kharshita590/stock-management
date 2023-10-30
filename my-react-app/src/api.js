import axios from 'axios';

// Create an Axios instance with a base URL
const instance = axios.create({
  baseURL: "https://stock-store-api.vercel.app/", // Replace with your actual backend URL
});

export default instance;
