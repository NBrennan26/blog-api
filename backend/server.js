import express from "express"
import "dotenv/config"

import routes from "./routes"
import errorHandler from "./middleware/errorMiddleware"
import connectDB from "./config/db"

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/posts", routes.posts)
app.use("/api/users", routes.user)
app.use("/api/post", routes.comments)

// Serve Frontend
// COMING SOON! //

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`)
})