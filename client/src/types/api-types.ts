import {
    Bar,
    Campaign,
    CartItem,
    Line,
    Order,
    Pie,
    ShippingInfo,
    Stats,
    User,
  } from "./types";
  
  export type CustomError = {
    status: number;
    data: {
      message: string;
      success: boolean;
    };
  };
  
  export type MessageResponse = {
    success: boolean;
    message: string;
  };
  
  export type AllUsersResponse = {
    success: boolean;
    users: User[];
  };
  
  export type UserResponse = {
    success: boolean;
    user: User;
  };
  
  export type AllCampaignsResponse = {
    success: boolean;
    campaigns: Campaign[];
  };
  export type CategoriesResponse = {
    success: boolean;
    categories: string[];
  };
  
  export type SearchCampaignsResponse = AllCampaignsResponse & {
    totalPage: number;
  };
  export type SearchCampaignsRequest = {
    amountGoal: number;
    page: number;
    category: string;
    search: string;
    sort: string;
  };
  export type CampaignResponse = {
    success: boolean;
    campaign: Campaign;
  };
  
  export type AllOrdersResponse = {
    success: boolean;
    orders: Order[];
  };
  export type OrderDetailsResponse = {
    success: boolean;
    order: Order;
  };
  
  export type StatsResponse = {
    success: boolean;
    stats: Stats;
  };
  
  export type PieResponse = {
    success: boolean;
    charts: Pie;
  };
  
  export type BarResponse = {
    success: boolean;
    charts: Bar;
  };
  
  export type LineResponse = {
    success: boolean;
    charts: Line;
  };
  
  export type NewCampaignRequest = {
    id: string;
    formData: FormData;
  };
  export type UpdateCampaignRequest = {
    userId: string;
    campaignId: string;
    formData: FormData;
  };
  export type DeleteCampaignRequest = {
    userId: string;
    campaignId: string;
  };
  
  export type NewOrderRequest = {
    shippingInfo: ShippingInfo;
    orderItems: CartItem[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    user: string;
  };
  
  export type UpdateOrderRequest = {
    userId: string;
    orderId: string;
  };
  
  export type DeleteUserRequest = {
    userId: string;
    adminUserId: string;
  };