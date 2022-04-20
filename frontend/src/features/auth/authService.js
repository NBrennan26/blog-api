import axios from "axios";

const API_URL = "api/users/";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Log In User
const login = async (userData) => {

  console.log(userData)

  const response = await axios.post(API_URL + "login", userData);

  console.log("// authService.js Log In User //")

  if (response.data) {

    console.log("// authService.js Log In User response.data received //")

    localStorage.setItem("user", JSON.stringify(response.data));
  }

  console.log(response.data)

  return response.data;
};

// Log Out User
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
