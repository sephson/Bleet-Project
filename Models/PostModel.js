const mongoose = require("mongoose");

// const CommentSchema = new mongoose.Schema(

// );

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      max: 500,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [
      {
        userId: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          max: 100,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
