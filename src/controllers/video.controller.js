import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const getAllVideos = asyncHandler(async (req, res) => {
    // const {page = 1, limit = 10, query, sortBy, sortType, userId} = req.query;
    // TODO: get all videos based on query, sort, pagination

    const {page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc", userId} = req.query
    const mongoQuery = {}

    if (query) {
        mongoQuery.$or = [
            {
                title: {
                    $regex: query,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: query,
                    $options: "i"
                }
            }
        ]
    }
    
    if (userId) {
        mongoQuery.uploader = mongoose.Types.ObjectId(userId)
    }

    const sortObj = {}

    sortObj[sortBy] = sortType === "asc" ? 1 : -1

    const videos = await Video.find(mongoQuery).sort(sortObj).skip((page - 1) * limit).limit(parseInt(limit))
    const totalVideos = await Video.countDocuments(mongoQuery)

    res.status(200).json(new apiResponse(200, {videos, totalVideos, page, limit}, "Videos fetched successfully"))
})

const publishAVideo = asyncHandler(async (req, res) => {
    // const {title, description} = req.body;
    // TODO: get video, upload to cloudinary, create video

    const {title, description} = req.body

    console.log("Files received", req.files)

    if (!req.files || !req.files.videoFile || !req.files.videoFile[0]) {
        throw new apiError(400, "No video file uploaded");
        
    }

    const uploader = await User.findById(req.user._id)

    if (!uploader) {
        throw new apiError(404, "Uploader not found");

    }
    
    const uploadResult = await uploadOnCloudinary(req.files.videoFile[0].path)

    if (!uploadResult) {
        throw new apiError(500, "Failed to upload video to Cloudinary");

    }

    console.log("Cloudinary upload result:", uploadResult);

    let thumbnailUrl = "";
    if (req.files.thumbnail && req.files.thumbnail[0]) {
        const thumbnailUpload = await uploadOnCloudinary(req.files.thumbnail[0].path)
        thumbnailUrl = thumbnailUpload?.url || ""
    } else {
        thumbnailUrl = uploadResult?.url
    }

    let video;
    try {
        video = await Video.create({
            title,
            description,
            videoFile: uploadResult?.url,
            thumbnail: thumbnailUrl,
            duration: 1,
            owner: uploader._id
        });
    } catch (err) {
        console.error("Error creating video document in MongoDB:", err);
        throw new apiError(500, "Failed to create video record in database");

    }

    uploader.totalVideos = (uploader.totalVideos || 0) + 1
    await uploader.save()
    const updatedUploader = await User.findById(uploader._id).select("-password -refreshToken")

    console.log(updatedUploader.totalVideos)

    res.status(201).json(new apiResponse(201, video, "Video published successfully"))
})

const getVideoById = asyncHandler(async (req, res) => {
    // const {videoId} = req.params;
    // TODO: get video by id

    const {videoId} = req.params

    if (!isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");
        
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new apiError(404, "Video not found");

    }

    res.status(200).json(new apiResponse(200, video, "Video fetched successfully"))
})

const updateVideo = asyncHandler(async (req, res) => {
    // const {videoId} = req.params;
    // TODO: update video details like title, description, thumbnail

    const {videoId} = req.params
    const {updates} = req.body

    if (!isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");
        
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new apiError(404, "Video not found");
        
    }

    const user = await User.findById(req.user._id)

    if (!user || video.owner.toString() !== user._id.toString()) {
        throw new apiError(403, "You are not authorized to update this video");
        
    }

    if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path)
        video.thumbnailUrl = uploadResult.secure_url
    }

    Object.assign(video, updates)
    await video.save()

    res.status(200).json(new apiResponse(200, video, "Video updated successfully"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    // const {videoId} = req.params;
    // TODO: delete video

    const {videoId} = req.params

    if (!isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");
        
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new apiError(404, "Video not found");
        
    }

    const user = await User.findById(req.user._id)

    if (!user || video.owner.toString() !== user._id.toString()) {
        throw new apiError(403, "You are not authorized to delete this video");
        
    }

    await Video.findByIdAndDelete(videoId)
    user.totalVideos = user.totalVideos > 0 ? user.totalVideos - 1 : 0
    await user.save()

    res.status(200).json(new apiResponse(200, {}, "Video deleted successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    // const {videoId} = req.params;

    const {videoId} = req.params

    if (!isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");
        
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new apiError(404, "Video not found");
        
    }

    const user = await User.findById(req.user._id)

    if (!user || video.uploader.toString() !== user._id.toString()) {
        throw new apiError(403, "You are not authorized to change the publish status of this video");
        
    }

    video.isPublished = !video.isPublished
    await video.save()

    res.status(200).json(new apiResponse(200, video, "Video publish status toggled successfully"))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}