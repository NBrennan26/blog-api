import asyncHandler from "express-async-handler";

const Post = require("../models/postModel");

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});

  res.status(200).json(posts);
});

// @desc    Set post
// @route   SET /api/posts
// @access  Private
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title");
  }
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text");
  }

  // Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check that User is admin
  if (!req.user.admin) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const post = await Post.create({
    title: req.body.title,
    text: req.body.text,
    published: req.body.published,
  });

  res.status(200).json(post);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postid);

  // Check if Post exists
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check that User is admin
  if (!req.user.admin) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postid,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postid);

  // Check if Post exists
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check that user is admin
  if (!req.user.admin) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.remove();

  res.status(200).json({ id: req.params.postid });
});

export { getPosts, setPost, updatePost, deletePost };
