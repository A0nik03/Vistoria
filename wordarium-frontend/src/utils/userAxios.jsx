import axios from "axios";
const API_URL = 'https://vistoria-backend.vercel.app/';
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


export default instance;