import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Like } from "../models/like.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const toggleVideoLike = asyncHandler(async (req, res) => {
    // const {videoId} = req.params;
    // TODO: toggle like on video

    const {videoId} = req.params
    const likedBy = req.user._id

    if (!isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");

    }

    if (!likedBy) {
        throw new apiError(400, "User not authenticated");

    }

    const existingLike = await Like.findOne({
        video: videoId,
        likedBy
    })

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        res.status(200).json(new apiResponse(200, {}, "Like removed successfully"))
    } else {
        const newLike = new Like({
            video: videoId,
            likedBy
        })

        await newLike.save()
        res.status(201).json(new apiResponse(201, newLike, "Video liked successfully"))
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    // const {commentId} = req.params;
    // TODO: toggle like on comment

    const {commentId} = req.params
    const likedBy = req.user._id

    if (!isValidObjectId(commentId)) {
        throw new apiError(400, "Invalid comment ID");

    }

    if (!likedBy) {
        throw new apiError(400, "User not authenticated");

    }

    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy
    })

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        res.status(200).json(new apiResponse(200, {}, "Like removed successfully"))
    } else {
        const newLike = new Like({
            comment: commentId,
            likedBy
        })

        await newLike.save()
        res.status(201).json(new apiResponse(201, newLike, "Video liked successfully"))
    }
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    // const {tweetId} = req.params;
    // TODO: toggle like on tweet

    const {tweetId} = req.params
    const likedBy = req.user._id

    if (!isValidObjectId(tweetId)) {
        throw new apiError(400, "Invalid tweet ID");

    }

    if (!likedBy) {
        throw new apiError(400, "User not authenticated");

    }

    const existingLike = await Like.findOne({
        tweet: tweetId,
        likedBy
    })

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        res.status(200).json(new apiResponse(200, {}, "Like removed successfully"))
    } else {
        const newLike = new Like({
            tweet: tweetId,
            likedBy
        })

        await newLike.save()
        res.status(201).json(new apiResponse(201, newLike, "Video liked successfully"))
    }
})

const getLikedVideos = asyncHandler(async (req, res) => {
    // TODO: get all liked videos

    const likedBy = req.user._id
    if (!likedBy) {
        throw new apiError(400, "User not authenticated");

    }

    const likedVideos = await Like.find({likedBy, video: {$ne: null}}).populate("video", "likedby")
    if (!likedVideos || likedVideos.length === 0) {
        return res.status(404).json(new apiResponse(404, [], "No liked videos found"));
    }

    res.status(200).json(new apiResponse(200, likedVideos, "Liked videos fetched successfully"))
})

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
}