import { Router } from "express"
import { getPosts, setPost, updatePost, deletePost } from "../controllers/postController"
import protect from "../middleware/authMiddleware"

const router = Router()

router.route("/posts").get(getPosts)
router.route("/post").post(protect, setPost)
router.route("/post/:id").put(protect, updatePost).delete(protect, deletePost)

export default router