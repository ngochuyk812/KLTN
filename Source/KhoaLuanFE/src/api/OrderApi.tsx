import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../base/BaseQuery";
import { CreateOrder } from "../interface";

const OrderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (order: CreateOrder) => ({
        url: `/orders`,
        method: "POST",
        data: order,
      }),
    }),
    getOrderDetail: builder.mutation({
      query: (id) => ({
        url: `/orders/order-detail/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderDetailMutation,
} = OrderApi;
export default OrderApi;
