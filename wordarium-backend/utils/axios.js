const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const instance = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    accept: "application/json",
    Authorization: process.env.API_KEY,
  },
});

module.exports = instance;
