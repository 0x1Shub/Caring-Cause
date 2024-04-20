// import { Campaign } from './../models/campaign.js';
// import { Donation } from './../models/donation.js';
// import { myCache } from "../app.js";
// import { TryCatch } from "../middlewares/error.js";
// import { User } from "../models/user.js";
// import {
//   calculatePercentage,
//   getChartData,
//   getInventories,
// } from "../utils/features.js";

// export const getDashboardStats = TryCatch(async (req, res, next) => {
//   let stats = {};

//   const key = "admin-stats";

//   if (myCache.has(key)) stats = JSON.parse(myCache.get(key) as string);
//   else {
//     const today = new Date();
//     const sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

//     const thisMonth = {
//       start: new Date(today.getFullYear(), today.getMonth(), 1),
//       end: today,
//     };

//     const lastMonth = {
//       start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
//       end: new Date(today.getFullYear(), today.getMonth(), 0),
//     };

//     const thisMonthCampaignsPromise = Campaign.find({
//       createdAt: {
//         $gte: thisMonth.start,
//         $lte: thisMonth.end,
//       },
//     });

//     const lastMonthCampaignsPromise = Campaign.find({
//       createdAt: {
//         $gte: lastMonth.start,
//         $lte: lastMonth.end,
//       },
//     });

//     const thisMonthUsersPromise = User.find({
//       createdAt: {
//         $gte: thisMonth.start,
//         $lte: thisMonth.end,
//       },
//     });

//     const lastMonthUsersPromise = User.find({
//       createdAt: {
//         $gte: lastMonth.start,
//         $lte: lastMonth.end,
//       },
//     });

//     const thisMonthDonationsPromise = Donation.find({
//       createdAt: {
//         $gte: thisMonth.start,
//         $lte: thisMonth.end,
//       },
//     });

//     const lastMonthDonationsPromise = Donation.find({
//       createdAt: {
//         $gte: lastMonth.start,
//         $lte: lastMonth.end,
//       },
//     });

//     const lastSixMonthDonationsPromise = Donation.find({
//       createdAt: {
//         $gte: sixMonthsAgo,
//         $lte: today,
//       },
//     });

//     const latestTransactionsPromise = Donation.find({})
//       .select(["DonationCampaigns", "discount", "total", "status"])
//       .limit(4);

//     const [
//       thisMonthCampaigns,
//       thisMonthUsers,
//       thisMonthDonations,
//       lastMonthCampaigns,
//       lastMonthUsers,
//       lastMonthDonations,
//       CampaignsCount,
//       usersCount,
//       allDonations,
//       lastSixMonthDonations,
//       categories,
//       femaleUsersCount,
//       latestTransaction,
//     ] = await Promise.all([
//       thisMonthCampaignsPromise,
//       thisMonthUsersPromise,
//       thisMonthDonationsPromise,
//       lastMonthCampaignsPromise,
//       lastMonthUsersPromise,
//       lastMonthDonationsPromise,
//       Campaign.countDocuments(),
//       User.countDocuments(),
//       Donation.find({}).select("total"),
//       lastSixMonthDonationsPromise,
//       Campaign.distinct("category"),
//       User.countDocuments({ gender: "female" }),
//       latestTransactionsPromise,
//     ]);

//     const thisMonthRevenue = thisMonthDonations.reduce(
//       (total, Donation) => total + (Donation.total || 0),
//       0
//     );

//     const lastMonthRevenue = lastMonthDonations.reduce(
//       (total, Donation) => total + (Donation.total || 0),
//       0
//     );

//     const changePercent = {
//       revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
//       Campaign: calculatePercentage(
//         thisMonthCampaigns.length,
//         lastMonthCampaigns.length
//       ),
//       user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
//       Donation: calculatePercentage(
//         thisMonthDonations.length,
//         lastMonthDonations.length
//       ),
//     };

//     const revenue = allDonations.reduce(
//       (total, Donation) => total + (Donation.total || 0),
//       0
//     );

//     const count = {
//       revenue,
//       Campaign: CampaignsCount,
//       user: usersCount,
//       Donation: allDonations.length,
//     };

//     const DonationMonthCounts = new Array(6).fill(0);       
//     const DonationMonthyRevenue = new Array(6).fill(0);

//     lastSixMonthDonations.forEach((Donation) => {
//       const creationDate = Donation.createdAt;
//       const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

//       if (monthDiff < 6) {
//         DonationMonthCounts[6 - monthDiff - 1] += 1;
//         DonationMonthyRevenue[6 - monthDiff - 1] += Donation.total;
//       }
//     });

//     const categoryCount = await getInventories({
//       categories,
//       CampaignsCount,
//     });

//     const userRatio = {
//       male: usersCount - femaleUsersCount,
//       female: femaleUsersCount,
//     };

//     const modifiedLatestTransaction = latestTransaction.map((i) => ({
//       _id: i._id,
//     //   discount: i.discount,
//       amount: i.total,
//     //   quantity: i.DonationCampaigns.length,
//       status: i.status,
//     }));

//     stats = {
//       categoryCount,
//       changePercent,
//       count,
//       chart: {
//         Donation: DonationMonthCounts,
//         revenue: DonationMonthyRevenue,
//       },
//       userRatio,
//       latestTransaction: modifiedLatestTransaction,
//     };

//     myCache.set(key, JSON.stringify(stats));
//   }

//   return res.status(200).json({
//     success: true,
//     stats,
//   });
// });

// export const getPieCharts = TryCatch(async (req, res, next) => {
//   let charts;
//   const key = "admin-pie-charts";

//   if (myCache.has(key)) charts = JSON.parse(myCache.get(key) as string);
//   else {
//     const allDonationPromise = Donation.find({}).select([
//       "total",
//       "discount",
//       "subtotal",
//       "tax",
//       "shippingCharges",
//     ]);

//     const [
//       processingDonation,
//       shippedDonation,
//       deliveredDonation,
//       categories,
//       CampaignsCount,
//       outOfStock,
//       allDonations,
//       allUsers,
//       adminUsers,
//       customerUsers,
//     ] = await Promise.all([
//       Donation.countDocuments({ status: "Processing" }),
//       Donation.countDocuments({ status: "Shipped" }),
//       Donation.countDocuments({ status: "Delivered" }),
//       Campaign.distinct("category"),
//       Campaign.countDocuments(),
//       Campaign.countDocuments({ stock: 0 }),
//       allDonationPromise,
//       User.find({}).select(["dob"]),
//       User.countDocuments({ role: "admin" }),
//       User.countDocuments({ role: "user" }),
//     ]);

//     const DonationFullfillment = {
//       processing: processingDonation,
//       shipped: shippedDonation,
//       delivered: deliveredDonation,
//     };

//     const CampaignCategories = await getInventories({
//       categories,
//       CampaignsCount,
//     });

//     const stockAvailablity = {
//       inStock: CampaignsCount - outOfStock,
//       outOfStock,
//     };

//     const grossIncome = allDonations.reduce(
//       (prev, Donation) => prev + (Donation.total || 0),
//       0
//     );

//     const discount = allDonations.reduce(
//       (prev, Donation) => prev + (Donation.discount || 0),
//       0
//     );

//     const CampaignionCost = allDonations.reduce(
//       (prev, Donation) => prev + (Donation.shippingCharges || 0),
//       0
//     );

//     const burnt = allDonations.reduce((prev, Donation) => prev + (Donation.tax || 0), 0);

//     const marketingCost = Math.round(grossIncome * (30 / 100));

//     const netMargin =
//       grossIncome - discount - CampaignionCost - burnt - marketingCost;

//     const revenueDistribution = {
//       netMargin,
//       discount,
//       CampaignionCost,
//       burnt,
//       marketingCost,
//     };

//     const usersAgeGroup = {
//       teen: allUsers.filter((i) => i.age < 20).length,
//       adult: allUsers.filter((i) => i.age >= 20 && i.age < 40).length,
//       old: allUsers.filter((i) => i.age >= 40).length,
//     };

//     const adminCustomer = {
//       admin: adminUsers,
//       customer: customerUsers,
//     };

//     charts = {
//       DonationFullfillment,
//       CampaignCategories,
//       stockAvailablity,
//       revenueDistribution,
//       usersAgeGroup,
//       adminCustomer,
//     };

//     myCache.set(key, JSON.stringify(charts));
//   }

//   return res.status(200).json({
//     success: true,
//     charts,
//   });
// });

// export const getBarCharts = TryCatch(async (req, res, next) => {
//   let charts;
//   const key = "admin-bar-charts";

//   if (myCache.has(key)) charts = JSON.parse(myCache.get(key) as string);
//   else {
//     const today = new Date();

//     const sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

//     const twelveMonthsAgo = new Date();
//     twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

//     const sixMonthCampaignPromise = Campaign.find({
//       createdAt: {
//         $gte: sixMonthsAgo,
//         $lte: today,
//       },
//     }).select("createdAt");

//     const sixMonthUsersPromise = User.find({
//       createdAt: {
//         $gte: sixMonthsAgo,
//         $lte: today,
//       },
//     }).select("createdAt");

//     const twelveMonthDonationsPromise = Donation.find({
//       createdAt: {
//         $gte: twelveMonthsAgo,
//         $lte: today,
//       },
//     }).select("createdAt");

//     const [Campaigns, users, Donations] = await Promise.all([
//       sixMonthCampaignPromise,
//       sixMonthUsersPromise,
//       twelveMonthDonationsPromise,
//     ]);

//     const CampaignCounts = getChartData({ length: 6, today, docArr: Campaigns });
//     const usersCounts = getChartData({ length: 6, today, docArr: users });
//     const DonationsCounts = getChartData({ length: 12, today, docArr: Donations });

//     charts = {
//       users: usersCounts,
//       Campaigns: CampaignCounts,
//       Donations: DonationsCounts,
//     };

//     myCache.set(key, JSON.stringify(charts));
//   }

//   return res.status(200).json({
//     success: true,
//     charts,
//   });
// });

// export const getLineCharts = TryCatch(async (req, res, next) => {
//   let charts;
//   const key = "admin-line-charts";

//   if (myCache.has(key)) charts = JSON.parse(myCache.get(key) as string);
//   else {
//     const today = new Date();

//     const twelveMonthsAgo = new Date();
//     twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

//     const baseQuery = {
//       createdAt: {
//         $gte: twelveMonthsAgo,
//         $lte: today,
//       },
//     };

//     const [Campaigns, users, Donations] = await Promise.all([
//       Campaign.find(baseQuery).select("createdAt"),
//       User.find(baseQuery).select("createdAt"),
//       Donation.find(baseQuery).select(["createdAt", "discount", "total"]),
//     ]);

//     const CampaignCounts = getChartData({ length: 12, today, docArr: Campaigns });
//     const usersCounts = getChartData({ length: 12, today, docArr: users });
//     const discount = getChartData({
//       length: 12,
//       today,
//       docArr: Donations,
//       property: "discount",
//     });
//     const revenue = getChartData({
//       length: 12,
//       today,
//       docArr: Donations,
//       property: "total",
//     });

//     charts = {
//       users: usersCounts,
//       Campaigns: CampaignCounts,
//       discount,
//       revenue,
//     };

//     myCache.set(key, JSON.stringify(charts));
//   }

//   return res.status(200).json({
//     success: true,
//     charts,
//   });
// });