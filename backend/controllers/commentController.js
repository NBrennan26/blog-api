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
  res.json({ message: "Set Comment" });
});

// @desc    update comment
// @route   PUT /api/post/:postid/comments/:commentid
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  res.json({ message: "Update Comment" });
});

// @desc    Delete comment
// @route   DELETE /api/post/:postid/comments/:commentid
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  res.json({ message: "Delete Comment" });
});

export { getComments, setComment, updateComment, deleteComment };
