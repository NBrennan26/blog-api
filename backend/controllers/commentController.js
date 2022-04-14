import asyncHandler from "express-async-handler";

const Comment = require("../models/commentModel");

// @desc    Get comments
// @route   GET /api/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  res.json({ message: "Get Comments" });
});

// @desc    Set comments
// @route   SET /api/comments
// @access  Private
const setComment = asyncHandler(async (req, res) => {
  res.json({ message: "Set Comment" });
});

// @desc    update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  res.json({ message: "Update Comment" });
});

// @desc    Delete comment
// @route   DELETE /api/comment
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  res.json({ message: "Delete Comment" });
});

export { getComments, setComment, updateComment, deleteComment };
