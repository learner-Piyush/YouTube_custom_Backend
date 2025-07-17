import { Router } from "express";
import {
    addComment,
    updateComment,
    deleteComment,
    getVideoComments
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()
router.use(verifyJWT) // Apply verifyJWT middleware to all routes in this file

router.route("/:videoId")
.get(getVideoComments)
.post(addComment)

router.route("/comment/:commentId")
.delete(deleteComment)
.patch(updateComment)

export default router