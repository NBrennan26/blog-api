import { Router } from "express"
import {
  getComments,
  setComment, 
  updateComment, 
  deleteComment,
} from "../controllers/commentController"
import protect from "../middleware/authMiddleware"

const router = Router()

router.route("/").get(protect, getComments).post(protect, setComment);
router.route("/:id").put(protect, updateComment).delete(protect, deleteComment);

export default router