import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../base/BaseQuery";
import { ProductPredict } from "../interface";

const PredictApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    predict: builder.mutation<ProductPredict, string>({
      query: (credentials: any) => ({
        url: `/predict`,
        method: "POST",
        data: {
          imageBase64: credentials,
        },
      }),
    }),
  }),
});

export const usePredictMutation: typeof PredictApi.usePredictMutation =
  PredictApi.usePredictMutation;
export default PredictApi;
