import mongoose from "mongoose"
import { DonationCampaignType, InvalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Campaign } from "../models/campaign.js";

export const connectDB = (uri: string) => {
    mongoose.connect(uri, {
        dbName:"Caring_Cause",
    }).then(c=>console.log(`DB Connected to ${c.connection.host}`)).catch(e=>console.log(e));
}   


export const invalidateCache = ({campaign, donation, admin, userId, donationId, campaignId}: InvalidateCacheProps) => {
    if (campaign) {
      const campaignKeys: string[] = [
        "latest-campaigns",
        "categories",
        "all-campaigns",
      ];
  
      if (typeof campaignId === "string") campaignKeys.push(`campaign-${campaignId}`);
  
      if (typeof campaignId === "object")
        campaignId.forEach((i) => campaignKeys.push(`campaign-${i}`));
  
      myCache.del(campaignKeys);
    }
    
    if (donation) {
      const donationKeys: string[] = [
        "all-donations",
        `my-donations-${userId}`,
        `donation-${donationId}`,
      ];
  
      myCache.del(donationKeys);
    }

    if (admin) {
      myCache.del([
        "admin-stats",
        "admin-pie-charts",
        "admin-bar-charts",
        "admin-line-charts",
      ]);
    }
};


export const reduceGoalAmount = async (donationCampaigns: DonationCampaignType[]) => {
    for(let i=0; i<donationCampaigns.length; i++){
      const donation = donationCampaigns[i];
      const campaign = await Campaign.findById(donation.campaignId);
      if(!campaign) throw new Error("Campaign Not found");

      if (campaign && campaign.amountGoal !== null && campaign.amountGoal !== undefined) {
        campaign.amountGoal -= donation.amount;
      }

      await campaign.save();
    }
}

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
    if (lastMonth === 0) return thisMonth * 100;
    const percent = (thisMonth / lastMonth) * 100;
    return Number(percent.toFixed(0));
};
  
export const getInventories = async ({
    categories,
    campaignsCount,
  }: {
    categories: string[];
    campaignsCount: number;
  }) => {
    const categoriesCountPromise = categories.map((category) =>
      Campaign.countDocuments({ category })
    );
  
    const categoriesCount = await Promise.all(categoriesCountPromise);
  
    const categoryCount: Record<string, number>[] = [];
  
    categories.forEach((category, i) => {
      categoryCount.push({
        [category]: Math.round((categoriesCount[i] / campaignsCount) * 100),
      });
    });
  
    return categoryCount;
};
  
  interface MyDocument extends Document {
    createdAt: Date;
    discount?: number;
    total?: number;
  }

  type FuncProps = {
    length: number;
    docArr: MyDocument[];
    today: Date;
    property?: "discount" | "total";
  };
  
  export const getChartData = ({
    length,
    docArr,
    today,
    property,
  }: FuncProps) => {
    const data: number[] = new Array(length).fill(0);
  
    docArr.forEach((i) => {
      const creationDate = i.createdAt;
      const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
  
      if (monthDiff < length) {
        if (property) {
          data[length - monthDiff - 1] += i[property]!;
        } else {
          data[length - monthDiff - 1] += 1;
        }
      }
    });
  
    return data;
  };