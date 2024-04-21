import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  name: string;
  email: string;
  photo: string;
  gender: string;
  _id: string;
  dob: Date;
}

export interface NewCampaignRequestBody {
  title: string;
  name: string;
  category: string;
  amountGoal: number;
  days: Date;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  amountRaise?: string;
  category?: string;
  sort?: string;
  page?: string;
};

interface TitleQuery {
  $regex: string;
  $options: string;
}

export interface BaseQuery {
  title?: TitleQuery;
  amountRaise?: { $lte: number };
  category?: string; 
}

export type InvalidateCacheProps = {
  campaign?: boolean;
  donation?: boolean;
  admin?: boolean;
  userId?: string;
  donationId?: string;
  campaignId?: string | string[];
};

export type DonationCampaignType = {
  name: string;
  photo: string;
  amount: number;
  campaignId: string;
  transactionId: Number,
};

export type DonationInfoType = {
  name: string;
  email: string;
  phone: number;
  amount: number;
};

export interface NewDonationRequestBody {
  donationInfo: DonationInfoType;
  userId: string;
  subtotal: number;
  tax: number;
  reward: number;
  total: number;
  donationCampaigns: DonationCampaignType[];
}