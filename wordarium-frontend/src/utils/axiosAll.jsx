import axios from "axios";

const instance = axios.create({
  baseURL: "https://newsdata.io/api/1/news?apikey=pub_25854fd3e23bbb2e06a0b87d5d2f129552ba4",
  headers: {
    accept: "application/json",
    Authorization: "pub_25854fd3e23bbb2e06a0b87d5d2f129552ba4",
  },
});


export default instance;