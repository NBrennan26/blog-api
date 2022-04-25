import asyncHandler from "express-async-handler";

const Comment = require("../models/commentModel");

// @desc    Get comments
// @route   GET /api/post/:postid/comments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postid });
  res.status(200).json(comments);
});

// @desc    Set comments
// @route   SET /api/post/:postid/comments
// @access  Private
const setComment = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text to the comment");
  }

  const comment = await Comment.create({
    text: req.body.text,
    user: req.user.id,
    post: req.body.postid,
  });

  res.status(200).json(comment);
});

// @desc    update comment
// @route   PUT /api/post/:postid/comments/:commentid
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentid);

  if (!comment) {
    req.status(400);
    throw new Error("Comment not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check logged in user matches Comment creator
  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.commentid,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedComment);
});

// @desc    Delete comment
// @route   DELETE /api/post/:postid/comments/:commentid
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentid);

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }

  // Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check logged in user matches Comment creator
  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await comment.remove();

  res.status(200).json({ id: req.params.commentid });
});

export { getComments, setComment, updateComment, deleteComment };
