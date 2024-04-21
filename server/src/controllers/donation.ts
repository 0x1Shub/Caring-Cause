import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewDonationRequestBody } from "../types/types.js";
import { Donation } from "../models/donation.js";
import { invalidateCache, reduceGoalAmount } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";

export const newDonation = TryCatch(async (req:Request<{}, {}, NewDonationRequestBody>, res, next) => {

    const {donationInfo, donationCampaigns, userId, subtotal, total, tax, reward} = req.body;

    if(!donationInfo ||!donationCampaigns || !userId || !total ){
        return next(new ErrorHandler("Please Enter All details", 400)); 
    }

    await Donation.create({
        donationInfo, donationCampaigns, userId, subtotal, total, tax, reward
    });

    await reduceGoalAmount(donationCampaigns);

    const donation = await invalidateCache({campaign: true, donation: true, admin: true});

    return res.status(201).json({
        success: true,
        msg: "Donation provided successfully",
    }) 
})


export const myDonations = TryCatch(async (req:Request<{}, {}, NewDonationRequestBody>, res, next) => {

    const {id: userId} = req.query;


    let donations = [];

    if(myCache.has(`my-donations${userId}`)) donations = JSON.parse(myCache.get(`my-donations${userId}`) as string);
    else{
        donations = await Donation.find({userId});
        myCache.set(`my-donations${userId}`, JSON.stringify(donations));
    }

    return res.status(201).json({
        success: true,
        donations,
    })
})


export const allDonations = TryCatch(async (req:Request<{}, {}, NewDonationRequestBody>, res, next) => {
    const key = `all-donations`


    let donations = [];

    if(myCache.has(key)) donations = JSON.parse(myCache.get(key) as string);
    else{
        donations = await Donation.find().populate("user", "name");
        myCache.set(key, JSON.stringify(donations));
    }

    return res.status(200).json({
        success: true,
        donations,
    }) 
})


export const getSingleDonation = TryCatch(async (req, res, next) => {
    
    const {id} = req.params;
    const key = `donation-${id}`;


    let donation;

    if(myCache.has(key)) donation = JSON.parse(myCache.get(key) as string);
    else{
        donation = await Donation.findById(id).populate("user", "name");
        if(!donation) return next(new ErrorHandler("Donation not found", 404))
        myCache.set(key, JSON.stringify(donation));
    }

    return res.status(200).json({
        success: true,
        donation,
    }) 
})


export const processDonation = TryCatch(async (req, res, next) => {

    const {id} = req.params;
    const donation = await Donation.findById(id);

    if(!donation) return next(new ErrorHandler("Donation not found", 404));

    switch(donation.status) {
        case "Processing":
            donation.status = "Received by Caring Cause";
            break;
        case "Donated":
            donation.status = "Donated to fundraiser, Thanks for your donation";
            break;
        default:
            donation.status = "Donated to fundraiser, Thanks for your donation";
            break;
    }

    await donation.save();

    await invalidateCache({campaign: false, donation: true, admin: true, userId: donation.user!, donationId: String(donation._id)});

    return res.status(200).json({
        success: true,
        msg: "Donation Process successfully",
    }) 
})


export const deleteDonation = TryCatch(async (req, res, next) => {

    const {id} = req.params;
    const donation = await Donation.findById(id);

    if(!donation) return next(new ErrorHandler("Donation not found", 404));

   await donation.deleteOne();

    await invalidateCache({campaign: false, donation: true, admin: true, userId: donation.user!, donationId: String(donation._id)});

    return res.status(200).json({
        success: true,
        msg: "Donation deleted successfully",
    }) 
})