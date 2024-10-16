import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewDonationRequestBody } from "../types/types.js";
import { Donation } from "../models/donation.js";
import { invalidateCache, reduceGoalAmount } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";

export const newDonation = TryCatch(async (req:Request<{}, {}, NewDonationRequestBody>, res, next) => {

    const {donationInfo, donationCampaigns, userId, total,} = req.body;

    if(!donationInfo || !donationCampaigns || !userId || !total ){
        return next(new ErrorHandler("Please Enter All details", 400)); 
    }

    let temp: string[] = [];

    const donation = await Donation.create({
        donationInfo, userId, total, donationCampaigns
    });

    await reduceGoalAmount(donationCampaigns);

    if (Array.isArray(donation.donationCampaigns)){
        temp = donation.donationCampaigns.map(i => String(i?.campaignId));
    }
    
    // const campaignIds = donationCampaigns?.map((i) => String(i.campaignId)) ?? []; // Ensure campaignIds is an array

    await invalidateCache({campaign: true, donation: true, admin: true, userId: userId, campaignId: temp});

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
        donations = await Donation.find().populate("userId", "name");
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
        donation = await Donation.findById(id).populate("userId", "name");
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
            donation.status = "Processing";
            break;
        case "Donated":
            donation.status = "Donated";
            break;
        default:
            donation.status = "Donated";
            break;
    }

    await donation.save();

    invalidateCache({campaign: false, donation: true, admin: true, userId: donation.userId!, donationId: String(donation._id)});

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

    await invalidateCache({campaign: false, donation: true, admin: true, userId: donation.userId!, donationId: String(donation._id)});

    return res.status(200).json({
        success: true,
        msg: "Donation deleted successfully",
    }) 
})

