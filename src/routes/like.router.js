import { Router } from "express";
import {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()
router.use(verifyJWT) // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/video/:videoId").post(toggleVideoLike)

router.route("/toggle/comment/:commentId").post(toggleCommentLike)

router.route("/toggle/tweet/:tweetId").post(toggleTweetLike)

router.route("/videos").get(getLikedVideos)

export default router