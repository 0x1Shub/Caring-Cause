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
  category: string;
  amountRaise: number;
  days: number;
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

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};

export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItemType[];
}