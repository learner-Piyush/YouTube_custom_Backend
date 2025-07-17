import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Like } from "../models/like.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    // TODO: toggle like on video
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    // TODO: toggle like on comment
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params;
    // TODO: toggle like on tweet
})

const getLikedVideos = asyncHandler(async (req, res) => {
    // TODO: get all liked videos
})

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
}