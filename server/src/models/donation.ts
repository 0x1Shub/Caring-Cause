import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        donationInfo: {
            name: {
                type: String,
                required: true,
            },
            phone : {
                type: Number,
                required: true,
            },
            email : {
                type: String,
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
        subtotal:{
            type:Number,
            require: true,
        },
        tax:{
            type:Number,
            require: true,
        },
        reward:{
            type:Number,
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
            name: String,
            photo: String,
            amount: Number,
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