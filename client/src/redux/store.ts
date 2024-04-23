import { configureStore } from "@reduxjs/toolkit";
import { campaignAPI } from "./api/campaignAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [campaignAPI.reducerPath]: campaignAPI.reducer,
        [userReducer.name]: userReducer.reducer,
    },

    middleware: (getDefaultMiddleware) => (getDefaultMiddleware as any)().concat(userAPI.middleware, campaignAPI.middleware),

});
