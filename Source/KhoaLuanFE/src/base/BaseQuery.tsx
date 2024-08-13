import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";

const baseURL = import.meta.env.VITE_SERVER_NAME;

export const axiosBaseQuery: BaseQueryFn<
  AxiosRequestConfig,
  unknown,
  { data: any }
> = async ({ url, method, data }) => {
  try {
    if (method != "GET") {
      document.body.classList.add("show_loading");
    }
    if (method === "Delete") {
      const result = await axios({
        url: baseURL + url + `/${data.id}`,
        method,
      });

      return { data: result.data, status: result.statusText };
    } else {
      if (method === "Put") {
        const result = await axios({
          url: baseURL + url + `/${data.id}`,
          method,
          data,
        });
        return { data: result.data, status: result.statusText };
      } else {
        const result = await axios({
          url: baseURL + url,
          method,
          data,
        });
        if (method != "GET") {
          toast.success("Success");
          document.body.classList.remove("show_loading");
        }
        return { data: result.data, status: result.statusText };
      }
    }
  } catch (error) {
    console.log("error", error);
    document.body.classList.remove("show_loading");
    const err = error as AxiosError;
    if (method != "GET") {
      toast.success(err);
    }
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
