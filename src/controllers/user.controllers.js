import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new apiError(500, "Something went wrong while generating access and refresh tokens");
        
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {fullname, email, username, password} = req.body;

    // Validation
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new apiError(400, "All fields are required");
        
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new apiError(409, "User with this email or username already exists");
        
    }

    console.warn(req.files)
    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar file is missing");
        
    }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)

    // let coverImage = ""
    // if (coverImageLocalPath) {
    //     coverImage = await uploadOnCloudinary(coverImageLocalPath)
    // }

    let avatar
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath)
        console.log("Avatar uploaded", avatar)
    } catch (error) {
        console.log("Error uploading avatar", error)
        throw new apiError(500, "Failed to upload Avatar");

    }

    let coverImage
    try {
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
        console.log("Cover image uploaded", coverImage)
    } catch (error) {
        console.log("Error uploading cover image", error)
        throw new apiError(500, "Failed to upload cover image");

    }

    try {
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        })
    
        const createdUser = await User.findById(user._id).select("-password -refreshToken")
    
        if (!createdUser) {
            throw new apiError(500, "Something went wrong while registering a user");
            
        }
    
        return res.status(201).json(new apiResponse(201, createdUser, "User registered successfully"))
    } catch (error) {
        console.log("User registration failed")

        if (avatar && coverImage) {
            await deleteFromCloudinary(avatar.public_id)
            await deleteFromCloudinary(coverImage.public_id)
            throw new apiError(500, "Something went wrong while registering a user and images were deleted");

        }
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, username, password} = req.body

    // Validation
    if (!email || !username || !password) {
        throw new apiError(400, "All fields are required");
        
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new apiError(404, "User not found");
        
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid credentials");
        
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(
        200,
        {user: loggedInUser, accessToken, refreshToken},
        "User logged in successfully"
    ))
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new apiError(401, "Refresh token is required");
        
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)

        if (!user || incomingRefreshToken !== user?.refreshToken) {
            throw new apiError(401, "Invalid refresh token");
        
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        const {accessToken, refreshToken: newRefreshToken} = await generateAccessAndRefreshToken(user._id)

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new apiResponse(
            200,
            {accessToken, refreshToken: newRefreshToken},
            "Access token refreshed successfully"
        ))
    } catch (error) {
        throw new apiError(500, "Something went wrong while refreshing access token");
        
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordValid = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordValid) {
        throw new apiError(401, "Old password is incorrect");
        
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res.status(200).json(new apiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new apiResponse(200, req.user, "Current user fetched successfully"))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const {fullname, email} = req.body

    if (!fullname || !email) {
        throw new apiError(400, "Fullname and email are required");
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                email
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res.status(200).json(new apiResponse(200, user, "Account details updated successfully"))
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar file is missing");
        
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new apiError(500, "Something went wrong while uploading avatar");
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res.status(200).json(new apiResponse(200, user, "Avatar updated successfully"))
})

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new apiError(400, "File is required");
        
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new apiError(500, "Something went wrong while uploading cover image");
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res.status(200).json(new apiResponse(200, user, "Cover image updated successfully"))
})

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const {username} = req.params

    if (!username?.trim()) {
        throw new apiError(400, "Username is required");
        
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullname: 1,
                username: 1,
                email: 1,
                avatar: 1,
                coverImage: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1
            }
        }
    ])

    if (!channel?.length) {
        throw new apiError(404, "Channel not found");
        
    }

    return res.status(200).json(new apiResponse(200, channel[0], "Channel profile fetched successfully"))
})

const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipelines: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullname: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res.status(200).json(new apiResponse(200, user[0]?.watchHistory, "Watch history fetched successfully"))
})

export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
}