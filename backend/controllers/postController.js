import asyncHandler from "express-async-handler";

const Post = require("../models/postModel");

// @desc    Get posts
// @route   GET /api/
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  res.json({ message: "Get Post" });
});

// @desc    Set post
// @route   SET /api/post
// @access  Private
const setPost = asyncHandler(async (req, res) => {
  res.json({ message: "Set Post" });
});

// @desc    update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  res.json({ message: "Update Post" });
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  res.json({ message: "Delete Post" });
});

export { getPosts, setPost, updatePost, deletePost };
