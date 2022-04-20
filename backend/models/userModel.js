import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please include a username"],
  },
  email: {
    type: String,
    required: [true, "Please include an email"],
  },
  password: {
    type: String,
    required: [true, "Please include a password"],
  },
  admin: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);
