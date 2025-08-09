import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { Tweet } from "../models/tweet.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const createTweet = asyncHandler(async (req, res) => {
    // TODO: create tweet

    const {content} = req.body
    if (!content) {
        throw new apiError(400, "Content is required");

    }

    const owner = await User.findById(req.user._id);
    if (!mongoose.isValidObjectId(owner._id)) {
        throw new apiError(400, "Invalid user ID");

    }

    const tweet = await Tweet.create({
        content,
        owner: owner._id
    })

    res.status(201).json(new apiResponse(201, tweet, "Tweet created successfully"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets

    const {userId} = req.params
    if (!mongoose.isValidObjectId(userId)) {
        throw new apiError(400, "Invalid user ID");

    }

    const tweets = await Tweet.find({owner: userId}).populate("owner", "username");
    if (!tweets || tweets.length === 0) {
        throw new apiError(404, "No tweets found for this user");

    }

    res.status(200).json(new apiResponse(200, tweets, "Tweets fetched successfully"))
})

const updateTweet = asyncHandler(async (req, res) => {
    // TODO: update tweet

    const {tweetId} = req.params
    const {content} = req.body

    if (!mongoose.isValidObjectId(tweetId)) {
        throw new apiError(400, "Invalid tweet ID");

    }
    
    const tweet = await Tweet.findById(tweetId)
    if (!tweet) {
        throw new apiError(404, "Tweet not found");
        
    }

    const owner = await User.findById(req.user._id)

    if (tweet.owner.toString() !== owner._id.toString()) {
        throw new apiError(403, "You are not authorized to update this tweet");

    }

    if (!content  || content.trim() === "") {
        throw new apiError(400, "Content is required");

    }

    tweet.content = content
    await tweet.save()

    res.status(200).json(new apiResponse(200, tweet, "Tweet updated successfully"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    // TODO: delete tweet

    const {tweetId} = req.params
    if (!mongoose.isValidObjectId(tweetId)) {
        throw new apiError(400, "Invalid tweet ID");

    }

    const tweet = await Tweet.findById(tweetId)
    if (!tweet) {
        throw new apiError(404, "Tweet not found");

    }

    const owner = await User.findById(req.user._id)

    if (tweet.owner.toString() !== owner._id.toString()) {
        throw new apiError(403, "You are not authorized to delete this tweet");

    }

    await Tweet.findByIdAndDelete(tweetId)

    res.status(200).json(new apiResponse(200, null, "Tweet deleted successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}