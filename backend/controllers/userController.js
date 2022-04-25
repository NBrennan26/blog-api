import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

const User = require("../models/userModel");

// @desc    Register New User
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Check if Username is already in use (case insensitive via RegEx)
  const userExists = await User.findOne({
    username: { $regex: new RegExp(username, "i") },
  });

  if (userExists) {
    res.status(400);
    throw new Error("Username is already taken");
  }

  // Check if Email is already in use
  const emailExists = await User.findOne({
    email: { $regex: new RegExp(email, "i") },
  });

  if (emailExists) {
    res.status(400);
    throw new Error("Email is already in use");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    admin: false,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      admin: user.admin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc    Authenticate User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check for username
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      admin: user.admin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export { registerUser, loginUser };
