import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/Cryptoapi";
import { cryptoNews } from "../services/CryptoNewsApi";

export const store = configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNews.reducerPath]: cryptoNews.reducer
    }
})