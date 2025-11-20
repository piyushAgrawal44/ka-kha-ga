import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import ApiClient from "./api-client"; // your shared axios client

interface CustomQueryArgs {
  url: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  data?: any;
  params?: any;
  useAuth?: boolean;
}

export const customBaseQuery: BaseQueryFn<
  CustomQueryArgs,
  unknown,
  unknown
> = async ({ url, method = "get", data, params, useAuth = true }) => {
  try {
    
    const response = await ApiClient.request(method, { url, urlParams: params}, { useAuth }, data);

    return { data: response.data };
  } catch (error: any) {
    return {
      error: {
        status: error?.response?.status,
        data: error?.response?.data,
      },
    };
  }
};
