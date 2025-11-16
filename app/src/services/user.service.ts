import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_ENV } from "../config/app.config";
import { RootState } from "../store/store";
import { USER_DETAIL_API } from "../constants/api-url.contant";
import { AuthUserResponseType } from "../types/user.type";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APP_ENV.backendApiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    userDetail: builder.query<AuthUserResponseType, void>({
      query: () => ({
        url: USER_DETAIL_API,
        method: "GET",
      }),
    }),
  }),
});

export const { useUserDetailQuery } = userApi;
