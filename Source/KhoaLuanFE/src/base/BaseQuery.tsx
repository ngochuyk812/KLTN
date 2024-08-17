import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_SERVER_NAME;

export const axiosBaseQuery: BaseQueryFn<
  AxiosRequestConfig,
  unknown,
  { data: any }
> = async ({ url, method, data }) => {
  try {
    if (method != "Put") {
      document.body.classList.add("show_loading");
    }
    const config: AxiosRequestConfig = {
      url:
        method === "Delete" || method === "Put"
          ? `${baseURL}${url}/${data.id}`
          : `${baseURL}${url}`,
      method,
      data,
    };

    const result = await axios(config);

    if (method !== "GET") {
      toast.success("Success");
    }

    return { data: result.data, status: result.statusText };
  } catch (error) {
    const err = error as AxiosError;
    document.body.classList.remove("show_loading");

    if (method !== "GET") {
      toast.error(err.message);
    }

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  } finally {
    document.body.classList.remove("show_loading");
  }
};
