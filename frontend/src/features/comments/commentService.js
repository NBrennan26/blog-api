import axios from "axios"

const API_URL = "/api/post/"

// Create New Comment
const createComment = async () => {

}

// Get Post Comments
const getComments = async (postId) => {
  const response = await axios.get(API_URL + postId + "/comments")

  console.log(response.data)

  return response.data
}

const commentService = {
  createComment,
  getComments, 
}

export default commentService