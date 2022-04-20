import express from "express";
import path from "path";
import "dotenv/config";

import routes from "./routes";
import errorHandler from "./middleware/errorMiddleware";
import connectDB from "./config/db";

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", routes.posts);
app.use("/api/users", routes.user);
app.use("/api/post", routes.comments);

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to Production"));
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
