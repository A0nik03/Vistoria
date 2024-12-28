const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRouter");
const blogRoutes = require("./routes/blogRouter");
const newsRoutes = require("./routes/newsRouter");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const checkForAuthCookie = require("./middlewares/auth");

const app = express();
const port = 4002;

dotenv.config();

mongoose
  .connect(process.env.MONGO_SECRET)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });


  const corsOptions = {
    origin: process.env.NODE_ENV === "production" 
      ? "https://vistoria-frontend.vercel.app"
      : "http://localhost:5173",
    credentials: true,
  };
  

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthCookie("token"));

app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  res.send({ success: "Backend is working"});
});


app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/news",newsRoutes);

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err.message);
  } else {
    console.log("listening on port: ", port);
  }
});
