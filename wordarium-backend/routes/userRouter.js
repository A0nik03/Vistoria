const express = require("express");
const User = require("../models/user");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../utils/cloudinaryConfig");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Sign Up
router.post("/register", upload.single("profileImage"), async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res
      .status(400)
      .send({ error: "UserName, email, and password are required." });
  }

  if (!req.file) {
    return res.status(400).send({ error: "Profile image is required." });
  }

  const imageURL = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "vistoria_userProfile_Images" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(req.file.buffer);
  });

  try {
    await User.create({
      userName,
      email,
      password,
      profileImageURL: imageURL,
    });

    console.log("User successfully created!");
    return res.status(200).json({
      success: true,
      message: "User successfully created!",
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create user.",
      error: error.message,
    });
  }
});

// Sign In
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict", 
      })
      .json({
        success: true,
        message: "Logged in successfully!",
        token: token,
        user: {
          userName: user.userName,
          profileImage: user.profileImageURL,
        },
      });
  } catch (error) {
    console.error("Error signing in user:", error.message);
    return res.status(401).json({
      success: false,
      message: "Incorrect email or password.",
      error: error.message,
    });
  }
});

// Sign Out
router.get("/signout", (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Signed out successfully!",
  });
});

module.exports = router;
