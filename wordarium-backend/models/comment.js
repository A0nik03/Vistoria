const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    authorName: {
      type: String,
      required: true,
    },
    blogID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
    profileImageURL: {
      type: String,
      default: "/images/default.jpg",
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
