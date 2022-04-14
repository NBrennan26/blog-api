import mongoose from "mongoose"

const postSchema = mongoose.Schema(
  {
    title: {
      type: String, 
      required: [true, "Please include a title"]
    },
    text: {
      type: String,
      required: [true, "Please include some content"]
    },
    published: {
      type: Boolean,
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Post", postSchema)