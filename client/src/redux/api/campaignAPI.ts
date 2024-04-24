import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllCampaignsResponse, CampaignResponse, CategoriesResponse, DeleteCampaignRequest, MessageResponse, NewCampaignRequest, SearchCampaignsRequest, SearchCampaignsResponse, UpdateCampaignRequest } from "../../types/api-types";

export const campaignAPI = createApi({
  reducerPath: "campaignApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/campaigns/`,
  }),
  tagTypes: ["campaign"],

  endpoints: (builder) => ({
    latestCampaigns: builder.query<AllCampaignsResponse, string>({
      query: () => "latest",
      providesTags: ["campaign"],
    }),
    allCampaigns: builder.query<AllCampaignsResponse, string>({
      query: (id) => `?id=${id}`,
      providesTags: ["campaign"],
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => `categories`,
      providesTags: ["campaign"],
    }),

    searchCampaigns: builder.query<SearchCampaignsResponse, SearchCampaignsRequest>({
      query: ({ amountGoal, search, sort, category, page }) => {
        let base = `?search=${search}&page=${page}`;

        if (amountGoal) base += `&amountGoal=${amountGoal}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags: ["campaign"],
    }),

    campaignDetails: builder.query<CampaignResponse, string>({
      query: (id) => id,
      providesTags: ["campaign"],
    }),

    newCampaign: builder.mutation<MessageResponse, NewCampaignRequest>({
      query: ({ formData, id }) => ({
        url: `create?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["campaign"],
    }),

    updateCampaign: builder.mutation<MessageResponse, UpdateCampaignRequest>({
      query: ({ formData, userId, campaignId }) => ({
        url: `${campaignId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["campaign"],
    }),

    deleteCampaign: builder.mutation<MessageResponse, DeleteCampaignRequest>({
      query: ({ userId, campaignId }) => ({
        url: `${campaignId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["campaign"],
    }),
  }),
});

export const {
  useLatestCampaignsQuery,
  useAllCampaignsQuery,
  useCategoriesQuery,
  useSearchCampaignsQuery,
  useNewCampaignMutation,
  useCampaignDetailsQuery,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} = campaignAPI;