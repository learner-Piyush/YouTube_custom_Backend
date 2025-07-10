/*
id string pk
subscriber Objectld users
channel Objectld users
createdAt Date
updatedAt Date
*/

import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId,
            ref: "User" // who is subscribing
        },
        channel: {
            type: Schema.Types.ObjectId,
            ref: "User" // who is being subscribed to
        }
    },
    {
        timestamps: true
    }
)

export const Subscription = mongoose.model("Subscription", subscriptionSchema)