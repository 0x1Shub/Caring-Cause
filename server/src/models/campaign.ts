import mongoose, { Document, Schema } from "mongoose";

// Define the schema for the campaign
const campaignSchema = new mongoose.Schema(
  {
    userName: {
        type: String,
        required: [true, "Please enter user name"],
      },
      education: {
        type: String,
        required: [true, "Please enter education"],
      },
      employment: {
        type: String,
        required: [true, "Please enter employment"],
      },
      mobile: {
        type: String,
        required: [true, "Please enter mobile number"],
      },
      dob: {
        type: Date,
        required: [true, "Please enter date of birth"],
      },
      title: {
        type: String,
        required: [true, "Please enter campaign title"],
      },
      categories: {
        type: String,
        required: [true, "Please select campaign categories"],
      },
      amountGoal: {
        type: Number,
        required: [true, "Please enter campaign goal amount"],
      },
      endDate: {
        type: Date,
        required: [true, "Please enter campaign end date"],
      },
      photo: {
        type: String,
        required: [true, "Please upload campaign photo"],
      },
      description: {
        type: String,
        required: [true, "Please enter campaign description"],
      },
      documents: [String], 
    }
  {
    timestamps: true,
  }
);

// Create and export the Campaign model
export const Campaign = mongoose.model("Campaign", campaignSchema);
