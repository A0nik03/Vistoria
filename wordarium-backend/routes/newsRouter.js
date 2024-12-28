const express = require("express");
const instance = require("../utils/axios");
const router = express.Router();

router.get("/must-blog", async (req, res) => {
  try {
    const response = await instance.get("top-headlines?country=us");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching top headlines:", error.message);
    res.status(500).json({ error: "Failed to fetch must blogs" });
  }
});

router.get("/highlights", async (req, res) => {
  try {
    const response = await instance.get("everything?q=weekly highlight");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching top headlines:", error.message);
    res.status(500).json({ error: "Failed to fetch highlights" });
  }
});

router.get("/latest-articles/:category", async (req, res) => {
  try {
    const response = await instance.get(`everything?q=${req.params.category || "today"}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching top headlines:", error.message);
    res.status(500).json({ error: "Failed to latest articles" });
  }
});



module.exports = router;
