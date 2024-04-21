import { BaseQuery, NewCampaignRequestBody, SearchRequestQuery } from './../types/types.js';
import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import {Campaign} from '../models/campaign.js';
import ErrorHandler from '../utils/utility-class.js';
import { rm } from 'fs';
import { myCache } from '../app.js';
import { invalidateCache } from '../utils/features.js';
// import  {faker} from '@faker-js/faker';


// Revalidate on New Update Delete

export const getlatestCampaign = TryCatch(async (req, res, next) => {

  let campaigns;
  if(myCache.has("latest-campaign"))
    campaigns = JSON.parse(myCache.get("latest-campaign") as string);
  else{
    campaigns = await Campaign.find({}).sort({createdAt: -1}).limit(5);

    myCache.set('latest-campaign', JSON.stringify(campaigns));
  }
  
    return res.status(200).json({
      success: true,
      campaigns,
    });
  });


export const getAllCategories = TryCatch(async (req, res, next) => {

  let categories;

  if(myCache.has("categories")) categories = JSON.parse(myCache.get("categories") as string);
  else{
    categories = await Campaign.distinct("category");
    myCache.set("categories", JSON.stringify(categories));
  }

    return res.status(200).json({
      success: true,
      categories,
    });
});


export const getAdminCampaigns = TryCatch(async (req, res, next) => {

  let campaigns;

  if(myCache.has("all-campaigns")) campaigns = JSON.parse(myCache.get("all-campaigns") as string);
  else{
    campaigns = await Campaign.find({});
    myCache.set("all-campaigns", JSON.stringify(campaigns));
  }
  
    return res.status(200).json({
      success: true,
      campaigns,
    });
  });


export const getSingleCampaign = TryCatch(async (req, res, next) => {
  let campaign;
  const id = req.params.id

  if(myCache.has(`campaign-${id}`)) campaign = JSON.parse(myCache.get(`campaign-${id}`) as string);
  else{
    campaign = await Campaign.findById(id);
    if(!campaign) return next(new ErrorHandler("Campaign Not Found", 404));
    myCache.set(`campaign-${id}`, JSON.stringify(campaign));
  }
  
    return res.status(200).json({
      success: true,
      campaign,
    });
});


export const newCampaign = TryCatch(
  async (req:Request<{}, {}, NewCampaignRequestBody>, res, next) => {
      const {title, name, category, amountGoal, days} = req.body;
      const photo = req.file;

      if(!photo) return next(new ErrorHandler('Please Add Photo', 400));

      if(!title || !category || !amountGoal || !days || !name ){

          rm(photo.path, () => {
              console.log("Deleted");
          })

          return next(new ErrorHandler('Please enter all field', 400));
      }

      await Campaign.create({
          title, 
          name,
          amountGoal, 
          days, 
          category : category.toLocaleLowerCase(), 
          photo: photo?.path,
      });

      // await invalidateCache({campaign: true, campaignId: String(campaign._id)});

      return res.status(201).json({
          success: true,
          msg: "Campaign Created Successfully",
      });
})



export const updateCampaign = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { title, amountGoal, days, category } = req.body;
    const photo = req.file;

    const campaign = await Campaign.findById(id);
  
    if (!campaign) return next(new ErrorHandler("Campaign Not Found", 404));
  
    if (photo) {
      rm(campaign.photo!, () => {
        console.log("Old Photo Deleted");
      });
      campaign.photo = photo.path;
    }
  
    if (title) campaign.title = title;
    if (amountGoal) campaign.amountGoal = amountGoal;
    if (days) campaign.days = days;
    if (category) campaign.category = category;
  
    await campaign.save();
  
    await invalidateCache({campaign: true});

    return res.status(200).json({
      success: true,
      message: "Campaign Updated Successfully",
    });
  });
  


  export const deleteCampaign = TryCatch(async (req, res, next) => {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return next(new ErrorHandler("Campaign Not Found", 404));
  
    rm(campaign.photo!, () => { 
      console.log("Campaign Photo Deleted");
    });
  
    await campaign.deleteOne();

    await invalidateCache({campaign: true});

  
    return res.status(200).json({
      success: true,
      message: "Campaign Deleted Successfully",
    });
  });



//   export const getAllCampaigns = TryCatch(async (req:Request<{}, {}, SearchRequestQuery>, res, next) => {
      
//     const {search, sort, category, amountRaise} = req.query;

//     const page = Number(req.query.page) || 1;

//     const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
//     const skip = (page-1)*limit;

//     // const baseQuery: BaseQuery = {};

//     // if (typeof search === 'string')
//     //     baseQuery.title = {
//     //         $regex: search,
//     //         $options: "i",
//     //     };

//     // if (amountRaise)
//     //     baseQuery.amountRaise = {
//     //         $lte: Number(amountRaise),
//     //     };

//     // if (typeof category === 'string')
//     //     baseQuery.category = category;


//     const campaignsPromise = Campaign.find({
//         title: {
//             $regex: search,
//             $options: "i",
//         },
//         amountRaise: {
//             $lte: Number(amountRaise),
//         },
//         category,
//     })
//     .sort(sort && {amountRaise: sort === "asc" ? 1 : -1})
//     .limit(limit)
//     .skip(skip);


//     const [campaigns, filteredOnlyCampaign] = await Promise.all([
//         campaignsPromise,
//         Campaign.find({
//             title: {
//                 $regex: search,
//                 $options: "i",
//             },
//             amountRaise: {
//                 $lte: Number(amountRaise),
//             },
//             category,
//         }),

//     ])

//     const totalPage = Math.ceil(campaigns.length / limit);

//     return res.status(200).json({
//         success: true,
//         campaigns, 
//         totalPage,
//     });
//     }
//   );


export const getAllCampaigns = TryCatch(async (req: Request<{}, {}, SearchRequestQuery>, res, next) => {
      
    let { search, sort, category, amountGoal } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    // Ensure search, sort, category, and amountRaise are strings or undefined
    search = typeof search === 'string' ? search : '';
    sort = typeof sort === 'string' ? sort : '';
    category = typeof category === 'string' ? category : '';
    amountGoal = typeof amountGoal === 'number' ? amountGoal : '';

    // Convert amountRaise to number if it's a string and not empty
    const amountGoalNumber = amountGoal ? Number(amountGoal) : undefined;

    // Build the query object based on the provided search, category, and amountRaise
    const query: any = {};
    if (search) {
        query.title = {
            $regex: search,
            $options: 'i',
        };
    }
    if (amountGoalNumber) {
        query.amountGoal = {
            $lte: amountGoalNumber,
        };
    }
    if (category) {
        query.category = category;
    }

    // Fetch campaigns based on the constructed query
    const campaigns = await Campaign.find(query)
        .sort(sort ? { amountGoal: sort === 'asc' ? 1 : -1 } : {})
        .limit(limit)
        .skip(skip);

    // Calculate total number of pages for pagination
    const totalPage = Math.ceil(campaigns.length / limit);

    return res.status(200).json({
        success: true,
        campaigns,
        totalPage,
    });
});




// const generateRandomCampaigns = async (count: number = 10) => {
//   const campaigns = [];

//   for (let i = 0; i < count; i++) {
//     const campaign = {
//       title: faker.commerce.productName(),
//       photo: "uploads\\5ba9bd91-b89c-40c2-bb8a-66703408f986.png",
//       amountRaise: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//       days: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };

//     campaigns.push(campaign);
//   }

//   await Campaign.create(campaigns);

//   console.log({ succecss: true });
// };

// generateRandomCampaigns(40);

// const deleteRandomsProducts = async (count: number = 10) => {
//   const campaigns = await Campaign.find({}).skip(2);

//   for (let i = 0; i < campaigns.length; i++) {
//     const campaign = campaigns[i];
//     await campaign.deleteOne();
//   }

//   console.log({ success: true });
// };

// deleteRandomsProducts(38);