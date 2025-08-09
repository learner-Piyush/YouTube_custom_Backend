import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const toggleSubscription = asyncHandler(async (req, res) => {
    // const {channelId} = req.params;
    // TODO: toggle subscription

    const {channelId} = req.params
    const subscriberId = req.user._id

    if (!isValidObjectId(channelId)) {
        throw new apiError(400, "Invalid channel ID");
        
    }

    if (subscriberId === channelId) {
        throw new apiError(400, "You cannot subscribe to your own channel");
        
    }

    const channelUser = await User.findById(channelId)
    const subscriberUser = await User.findById(subscriberId)
    if (!channelUser || !subscriberUser) {
        throw new apiError(404, "User not found");

    }

    const existingSubscription = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId
    })

    if (existingSubscription) {
        // Unsubscribe
        await Subscription.findByIdAndDelete(existingSubscription._id)
        res.status(200).json(new apiResponse(200, {}, "Unsubscribed successfully"))
    } else {
        // Subscribe
        const newSubscription = new Subscription({
            subscriber: subscriberId,
            channel: channelId
        })

        await newSubscription.save()
        res.status(201).json(new apiResponse(201, newSubscription, "Subscribed successfully"))
    }
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    // const {channelId} = req.params;

    const {channelId} = req.params

    if (!mongoose.isValidObjectId(channelId)) {
        throw new apiError(400, "Invalid channel ID");
        
    }

    const channelUser = await User.findById(channelId)
    if (!channelUser) {
        throw new apiError(404, "Channel not found");

    }

    const subscribers = await Subscription.find({channel : channelId}).populate("subscriber")

    res.status(200).json(new apiResponse(200, subscribers, "Subscribers fetched successfully"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    // const {subscribedId} = req.params;
    
    const {subscriberId} = req.params

    if (!mongoose.isValidObjectId(subscriberId)) {
        throw new apiError(400, "Invalid subscriber ID");
        
    }

    const subscriberUser = await User.findById(subscriberId)
    if (!subscriberUser) {
        throw new apiError(404, "Subscriber not found");

    }

    const channels = await Subscription.find({subscriber : subscriberId}).populate("channel")

    res.status(200).json(new apiResponse(200, channels, "Subscribed channels fetched successfully"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}