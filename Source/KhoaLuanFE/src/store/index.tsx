import { configureStore } from "@reduxjs/toolkit";
import { PredictApi, ProductApi, OrderApi } from "../api";
import productReducer from "../slice/productSlice";

export const store = configureStore({
  reducer: {
    [PredictApi.reducerPath]: PredictApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    product: productReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(PredictApi.middleware)
      .concat(ProductApi.middleware)
      .concat(OrderApi.middleware),
});
