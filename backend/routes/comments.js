import { Router } from "express"
import {
  getComments,
  setComment, 
  updateComment, 
  deleteComment,
} from "../controllers/commentController"
import protect from "../middleware/authMiddleware"

const router = Router()

router.route("/:postid/comments").get(getComments).post(protect, setComment);
router.route("/:postid/comments/:commentid").put(protect, updateComment).delete(protect, deleteComment);

export default router
