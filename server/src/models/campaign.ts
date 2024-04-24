import mongoose, { Document, Schema } from "mongoose";

// Define the schema for the campaign
const campaignSchema = new mongoose.Schema(
  {
    userInfo: {
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
    },
    campaignInfo: {
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
    },
    description: {
      description: {
        type: String,
        required: [true, "Please enter campaign description"],
      },
      documents: [String], // Assuming the file paths will be stored here
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Campaign model
export const Campaign = mongoose.model("Campaign", campaignSchema);
