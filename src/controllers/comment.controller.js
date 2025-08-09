import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Comment } from "../models/comment.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video

    const {videoId} = req.params
    const {content} = req.body
    const owner = req.user._id

    if (!mongoose.isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");
        
    }

    if (!content || content.trim() === "") {
        throw new apiError(400, "Comment content cannot be empty");
        
    }

    const comment = new Comment({
        content,
        video: videoId,
        owner
    })

    await comment.save()
    await comment.populate("owner", "username avatar")

    res.status(201).json(new apiResponse(201, comment, "Comment added successfully"))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment

    const {commentId} = req.params
    const {content} = req.body
    const owner = req.user._id

    if (!mongoose.isValidObjectId(commentId)) {
        throw new apiError(400, "Invalid comment ID");
        
    }

    const comment = await Comment.findById(commentId)
    if (!comment) {
        throw new apiError(404, "Comment not found");
        
    }

    if (comment.owner.toString() !== owner.toString()) {
        throw new apiError(403, "You are not authorized to update this comment");

    }

    if (!content || content.trim() === "") {
        throw new apiError(400, "Comment content cannot be empty");

    }

    comment.content = content
    await comment.save()
    await comment.populate("owner", "username avatar")

    res.status(200).json(new apiResponse(200, comment, "Comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment

    const {commentId} = req.params
    const owner = req.user._id

    if (!mongoose.isValidObjectId(commentId)) {
        throw new apiError(400, "Invalid comment ID");
        
    }

    const comment = await Comment.findById(commentId)
    if (!comment) {
        throw new apiError(404, "Comment not found");
        
    }

    if (comment.owner.toString() !== owner.toString()) {
        throw new apiError(403, "You are not authorized to delete this comment");
        
    }

    await Comment.findByIdAndDelete(commentId)

    res.status(200).json(new apiResponse(200, {}, "Comment deleted successfully"))
})

const getVideoComments = asyncHandler(async (req, res) => {
    // const {videoId} = req.params;
    // const {page = 1, limit = 10} = req.query;
    // TODO: get all comments for a video

    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    if (!mongoose.isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");
        
    }

    const comments = await Comment.find({videoId: videoId}).sort({createdAt: -1}).skip((page - 1) * limit).limit(parseInt(limit))
    const totalComments = await Comment.countDocuments({videoId: videoId})

    res.status(200).json(new apiResponse(200, {comments, totalComments, page, limit}, "Comments fetched successfully"))
})

export {
    addComment,
    updateComment,
    deleteComment,
    getVideoComments
}