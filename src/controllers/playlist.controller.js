import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Playlist } from "../models/playlist.models.js";
import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const createPlaylist = asyncHandler(async (req, res) => {
    // const {name, description} = req.body;
    // TODO: create playlist

    const {name, description} = req.body

    if (!name) {
        throw new apiError(400, "Playlist name is required");
        
    }

    let playlist;
    try {
        playlist = await Playlist.create({
            name,
            description,
            userId: req.user._id
        })

        console.log("Playlist created:", playlist)
    } catch (error) {
        throw new apiError(400, "Failed to create playlist");
        
    }

    res.status(201).json(new apiResponse(201, playlist, "Playlist created successfully"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    // const {userId} = req.params;
    // TODO: get user playlists

    const {userId} = req.params

    if (!mongoose.isValidObjectId(userId)) {
        throw new apiError(400, "Invalid user ID");
        
    }

    const playlists = await Playlist.find({userId : userId}).populate("videos")
    if (!playlists || playlists.length === 0) {
        throw new apiError(404, "No playlists found for this user");
        
    }

    res.status(200).json(new apiResponse(200, playlists, "Playlists fetched successfully"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    // const {playlistId} = req.params;
    // TODO: get playlist by id

    const {playlistId} = req.params

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new apiError(400, "Invalid playlist ID");

    }

    const playlist = await Playlist.findById(playlistId).populate("videos")
    if (!playlist) {
        throw new apiError(404, "Playlist not found");
        
    }

    res.status(200).json(new apiResponse(200, playlist, "Playlist fetched successfully"))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    // const {videoId, playlistId} = req.params;

    const {videoId, playlistId} = req.params

    if (!mongoose.isValidObjectId(videoId) || !isValidObjectId(playlistId)) {
        throw new apiError(400, "Invalid video or playlist ID");

    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new apiError(404, "Playlist not found");
        
    }

    const user = await User.findById(req.user._id)

    if (!user || !playlist.userId || !playlist.userId.equals(user._id)) {
        throw new apiError(403, "You are not authorized to add videos to this playlist");
            
    }

    const video = await Video.findById(videoId)
    if (!video) {
        throw new apiError(404, "Video not found");
        
    }

    if (playlist.videos.includes(videoId)) {
        throw new apiError(409, "Video already exists in the playlist");
        
    }

    playlist.videos.push(videoId)
    await playlist.save()
    await playlist.populate("videos")

    res.status(200).json(new apiResponse(200, playlist, "Video added to playlist successfully"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    // const {videoId, playlistId} = req.params;
    // TODO: remove video from playlist

    const {videoId, playlistId} = req.params

    if (!mongoose.isValidObjectId(videoId) || !isValidObjectId(playlistId)) {
        throw new apiError(400, "Invalid video or playlist ID");

    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new apiError(404, "Playlist not found");
        
    }

    const user = await User.findById(req.user._id)

    if (!user || !playlist.userId || !playlist.userId.equals(user._id)) {
        throw new apiError(403, "You are not authorized to remove videos from this playlist");
            
    }

    const videoIndex = playlist.videos.indexOf(videoId);
    if (videoIndex === -1) {
        throw new apiError(404, "Video not found in the playlist");
        
    }

    playlist.videos.splice(videoIndex, 1)
    await playlist.save()
    await playlist.populate("videos")

    res.status(200).json(new apiResponse(200, playlist, "Video removed from playlist successfully"))
})

const deletePlaylist = asyncHandler(async (req, res) => {
    // const {playlistId} = req.params;
    // TODO: delete playlist

    const {playlistId} = req.params

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new apiError(400, "Invalid playlist ID");

    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new apiError(404, "Playlist not found");
        
    }

    const user = await User.findById(req.user._id)

    if (!user || !playlist.userId || !playlist.userId.equals(user._id)) {
        throw new apiError(403, "You are not authorized to delete this playlist");
            
    }

    await Playlist.findByIdAndDelete(playlistId)

    res.status(200).json(new apiResponse(200, {}, "Playlist deleted successfully"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    // const {playlistId} = req.params;
    // const {name, description} = req.body;
    // TODO: update playlist

    const {playlistId} = req.params
    const {name, description} = req.body

    console.log(req.body)

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new apiError(400, "Invalid playlist ID");

    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new apiError(404, "Playlist not found");
        
    }

    const user = await User.findById(req.user._id)

    if (!user || !playlist.userId || !playlist.userId.equals(user._id)) {
        throw new apiError(403, "You are not authorized to update this playlist");
            
    }

    if (name) {
        playlist.name = name
    }

    if (description) {
        playlist.description = description
    }

    await playlist.save()

    res.status(200).json(new apiResponse(200, playlist, "Playlist updated successfully"))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}