import { Router } from "express"
import { getPosts, setPost, updatePost, deletePost } from "../controllers/postController"
import protect from "../middleware/authMiddleware"

const router = Router()

router.route("/").get(getPosts).post(protect, setPost)
router.route("/:postid").put(protect, updatePost).delete(protect, deletePost)

export default router