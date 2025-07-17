import { Router } from "express";
import {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()
router.use(verifyJWT) // Apply verifyJWT middleware to all routes in this file

router.route("/channel/:channelId")
.get(getSubscribedChannels)
.post(toggleSubscription)

router.route("/user/:subscribedId").get(getUserChannelSubscribers)

export default router