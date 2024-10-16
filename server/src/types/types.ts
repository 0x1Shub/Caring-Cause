import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  name: string;
  email: string;
  photo: string;
  gender: string;
  _id: string;
  dob: Date;
}

export type UserInfoType = {
  userName: string;
  education: string;
  employment: string;
  mobile: number;
  dob: Date;
};

export type CampaignInfoType = {
  title: string;
  categories: string;
  amountGoal: number;
  endDate: Date;
  photo?: String;
};

export type DescriptionInfoType = {
  description: string;
  documents?: string[];
};

export interface NewCampaignRequestBody {
    userName: string;
    education: string;
    employment: string;
    mobile: string;
    dob: string;
    title: string;
    categories: string;
    amountGoal: string;
    endDate: string;
    photo: string;
    description: string;
    documents: FileList | null;
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
  title: string;
  photo: string;
  amount: number;
  campaignId: string;
  transactionId: Number,
};

export type DonationInfoType = {
  userName: string;
  email: string;
  phone: number;
  amountGoal: number;
};

export interface NewDonationRequestBody {
  donationInfo: DonationInfoType;
  userId: string;
  total: number;
  donationCampaigns: DonationCampaignType[];
}