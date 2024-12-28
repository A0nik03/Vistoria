import axios from "axios";

const instance = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    accept: "application/json",
    Authorization: "e6a4bbbff57d4ecf88e894b70075e7ec",
  },
});


export default instance;