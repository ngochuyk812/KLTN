import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../base/BaseQuery";
import { ProductCreation, ProductUpdate } from "../interface";

const ProductApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    product: builder.query({
      query: () => ({
        url: `/product`,
        method: "GET",
      }),
    }),
    delProduct: builder.mutation({
      query: (id: Number) => ({
        url: `/product`,
        method: "Delete",
        data: {
          id,
        },
      }),
    }),
    createProduct: builder.mutation({
      query: (product: ProductCreation) => ({
        url: `/product`,
        method: "Post",
        data: product,
      }),
    }),
    updateProduct: builder.mutation({
      query: (product: ProductUpdate) => ({
        url: `/product`,
        method: "Put",
        data: product,
      }),
    }),
  }),
});

export const {
  useProductQuery,
  useDelProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} = ProductApi;
export default ProductApi;
