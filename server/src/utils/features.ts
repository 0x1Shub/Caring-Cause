import mongoose from "mongoose"
import { InvalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";

export const connectDB = (uri: string) => {
    mongoose.connect(uri, {
        dbName:"Caring_Cause",
    }).then(c=>console.log(`DB Connected to ${c.connection.host}`)).catch(e=>console.log(e));
}   

// export const invalidateCache = ({campaign, donation, admin} : InvalidateCacheProps) => {
//     if(campaign) {
//         const productKeys: string[] = [];
//     }
// };

export const invalidateCache = ({campaign, donation, admin, userId, donationId, campaignId}: InvalidateCacheProps) => {
    if (campaign) {
      const campaignKeys: string[] = [
        "latest-campaigns",
        "categories",
        "all-campaigns",
      ];
  
      if (typeof campaignId === "string") campaignKeys.push(`product-${campaignId}`);
  
      if (typeof campaignId === "object")
      campaignId.forEach((i) => campaignKeys.push(`product-${i}`));
  
      myCache.del(campaignKeys);
    }
    if (donation) {
      const donationKeys: string[] = [
        "all-orders",
        `my-orders-${userId}`,
        `order-${donationId}`,
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