import { configureStore } from "@reduxjs/toolkit";
import { productQueryApi } from "./modules/product/api";

export const store = configureStore({
    reducer: {
        [productQueryApi.reducerPath]: productQueryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productQueryApi.middleware),
});