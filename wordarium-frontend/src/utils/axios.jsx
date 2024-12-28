import axios from "axios";

const API_URL = process.env.NODE_ENV === 'production' ? 'https://vistoria-backend.vercel.app/' : 'http://localhost:4002/';


const instance = axios.create({
  baseURL: API_URL,
});


export default instance;