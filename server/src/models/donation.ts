import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        donationInfo: {
            userName: {
                type: String,
                required: true,
            },
            phone : {
                type: Number,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            }
        },

        userId:{
            type:String,
            reference: "User",
            require: true,
        },
        total: {
            type:Number,
            require: true,
        },
        status: {
            type: String,
            enum: ["Processing",  "Donated"],
            default: "Processing",
        },
        donationCampaigns: {
            title: String,
            photo: String,
            amountGoal: Number,
            transactionId: Number,
            campaignId: {
                type: mongoose.Types.ObjectId,
                ref: 'Campaign',
            }
        }
    },
    {
        timestamps: true,
    }
);

export const Donation = mongoose.model("Donation", schema);