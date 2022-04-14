import mongoose from "mongoose"

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "Post",
    },
    text: {
      type: String,
      required: [true, "Please include comment text"]
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Comment", commentSchema)