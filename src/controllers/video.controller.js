import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const getAllVideos = asyncHandler(async (req, res) => {
    const {page = 1, limit = 10, query, sortBy, sortType, userId} = req.query;
    // TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const {title, description} = req.body;
    // TODO: get video, upload to cloudinary, create video
})

const getVideoById = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    // TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    // TODO: update video details like title, description, thumbnail
})

const deleteVideo = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    // TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}