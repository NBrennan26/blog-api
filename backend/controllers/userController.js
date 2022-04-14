import asyncHandler from "express-async-handler";

const User = require("../models/userModel");

// @desc    Register New User
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register User" });
});

// @desc    Log In New User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Log In User" });
});

export { registerUser, loginUser };