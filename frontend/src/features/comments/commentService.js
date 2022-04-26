import axios from "axios";

const API_URL = "/api/post/";

// Create New Comment
const createComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + commentData.postId + "/comments/",
    commentData,
    config
  );

  return response.data;
};

// Get Post Comments
const getComments = async (postId) => {
  const response = await axios.get(API_URL + postId + "/comments");

  return response.data;
};

// Delete Comment
const deleteComment = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + data.postid + "/comments/" + data.commentid,
    config
  );

  return response.data;
};

const commentService = {
  createComment,
  getComments,
  deleteComment,
};

export default commentService;
