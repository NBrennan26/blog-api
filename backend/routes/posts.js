import { Router } from "express";
import {
  getPost,
  getPosts,
  setPost,
  updatePost,
  deletePost,
} from "../controllers/postController";
import protect from "../middleware/authMiddleware";

const router = Router();

router.route("/post/:postid").get(getPost)
router.route("/posts").get(getPosts).post(protect, setPost);
router.route("/posts/:postid").put(protect, updatePost).delete(protect, deletePost);

export default router;
