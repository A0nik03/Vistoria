const express = require("express");
const cors = require("cors");
const path = require("path");
const Blog = require("./models/blog");
const userRoutes = require("./routes/userRouter");
const blogRoutes = require("./routes/blogRouter");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const checkForAuthCookie = require("./middlewares/auth");
const { env } = require("process");

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

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthCookie("token"));

app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.send({ success: "All User Blogs", Blogs: allBlogs });
});

app.get("/api/blogs", async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.status(200).json({
      success: true,
      user: req.user,
      blogs: allBlogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: err.message,
    });
  }
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err.message);
  } else {
    console.log("listening on port: ", port);
  }
});
