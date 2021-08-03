const router = require("express").Router();
const Post = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");

//post comment
router.post("/:postId/addcomment", async (req, res) => {
  const newComment = new Comment({
    userId: req.body.userId,
    username: req.body.username,
    postId: req.params.postId,
    content: req.body.content,
  });
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404);
    if (post) {
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get comments for a post
router.get("/:postId/getcomment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      const comment = await Comment.find({ postId: req.params.postId });
      res.status(200).json(comment);
    } else return res.status(404);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a comment
router.get("/:commentId/onecomment", async (req, res) => {
  try {
    const comment = await Comment.findOne({ commentId: req.params.commentId });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
