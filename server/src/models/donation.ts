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

        user:{
            type:String,
            reference: "User",
            require: true,
        },
        subtotal:{
            type:Number,
            require: true,
        },
        total: {
            type:Number,
            require: true,
        },
        status: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered"],
            default: "Processing",
        },
        donationCampaigns: {
            name: String,
            photo: String,
            amount: Number,
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