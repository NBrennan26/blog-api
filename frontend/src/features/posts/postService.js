import axios from "axios";

const API_URL = "/api/post";

// Get Post
const getPost = async (postId) => {
  const response = await axios.get(API_URL + "/" + postId);

  return response.data;
};

// Get Posts
const getPosts = async () => {
  const response = await axios.get(API_URL + "s/");

  return response.data;
};

// Create New Post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "s/", postData, config);

  return response.data;
};

// Delete Post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "s/" + postId, config);

  return response.data;
};

const postService = {
  getPost,
  getPosts,
  createPost,
  deletePost,
};

export default postService;
