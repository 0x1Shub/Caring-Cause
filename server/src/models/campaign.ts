import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
    },
    photo: {
      type: String,
      required: [true, "Please enter Photo"],
    },
    amountGoal: {
      type: Number,
      required: [true, "Please enter amount you want to raise"],
    },
    days: {
      type: Date,
      required: [true, "Please enter days"],
    },
    category: {
      type: String, 
      required: [true, "Please enter Category"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Campaign = mongoose.model("Campaign", schema);