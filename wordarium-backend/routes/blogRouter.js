const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../utils/cloudinaryConfig");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("authorObject");
    if (!blog) return res.status(404).send("Blog not found");

    const comments = await Comment.find({ blogID: req.params.id }).populate(
      "author"
    );
    return res.render("blog", {
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).send("An error occurred while fetching the blog.");
  }
});


router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const userId = req.user ? req.user.id : null;


    const query = {};

    if (category) {
      query.category = category;
    }

    if (userId) {
      query.authorObject = userId;
    }

    const blogs = await Blog.find(query).populate("authorObject");

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for the given filters.",
      });
    }

    res.status(200).json({
      success: true,
      user: req.user,
      blogs,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: err.message,
    });
  }
});


router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, content, category, source, description } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .send({ error: "Title, content, and category are required." });
    }

    if (!req.file) {
      return res.status(400).send({ error: "Cover image is required." });
    }

    const imageURL = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "vistoria_userBlog_Images" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const authorName = req.user.username;
    const blog = await Blog.create({
      title,
      content,
      category,
      description,
      source,
      authorName,
      authorObject: req.user.id,
      coverImageURL: imageURL,
    });

    const populatedBlog = await Blog.findById(blog._id).populate(
      "authorObject"
    );
    return res
      .status(201)
      .send({ success: "Post added successfully", data: populatedBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res
      .status(500)
      .send({ error: "An error occurred while creating the blog." });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");

    res.status(200).json({ success: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the blog." });
  }
});

router.post("/comment/:blogId", async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      blogID: req.params.blogId,
      authorName: req.user.username,
      profileImageURL: req.user.profileImageURL,
    });
    console.log("Comment created:", comment);
    return res.status(200).json({
      success: true,
      message: "Comment posted successfully",
      comment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).send("An error occurred while posting the comment.");
  }
});


router.get("/comment/:blogId", async (req, res) => {
  try {
    const comments = await Comment.find({ blogID: req.params.blogId }).sort({ createdAt: -1 });
    console.log(comments);
    
    if (!comments || comments.length === 0)
      return res.status(404).json({ message: "No comments found!" });

    return res
      .status(200)
      .json({ message: "Comments fetched successfully", comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching comments" });
  }
});

router.delete("/deleteComment/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    
    if (!comment)
      return res.status(404).json({ message: "No comment found to be deleted!" });

    return res
      .status(200)
      .json({ message: "Comment Deleted Succesfully"});
  } catch (error) {
    console.error("Error Deleting comment:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while Deleting comment" });
  }
});
module.exports = router;
