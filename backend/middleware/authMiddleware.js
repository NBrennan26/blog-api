import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

const User = require("../models/userModel")

const protect = asyncHandler(async(req, res, next) => {
  console.log("Running Auth Process...")
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get Token from Header
      token = req.headers.authorization.split(" ")[1]

      // Verify the token 
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get User from Token
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error("Not Authorized")
    }
  }

  if (!token) {
    res.status(401) 
    throw new Error("Not Authorized, No Token")
  }
})

export default protect