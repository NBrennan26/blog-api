import axios from "axios";

const API_URL = "/api/posts/";

// Get Posts
const getPosts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Create New Post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, postData, config);

  return response.data;
};

// Delete Post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + postId, config);

  return response.data;
};

const postService = {
  getPosts,
  createPost,
  deletePost,
};

export default postService;
