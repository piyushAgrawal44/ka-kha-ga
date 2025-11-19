import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./custom-rtk-wrapper-client.service";
import { ApiResponse, InviteData } from "../types/parent-invite.type";
import { PARENT_INVITE_ACCEPT_API, PARENT_INVITE_REJECT_API, PARENT_INVITE_VALIDATE_API } from "../constants/api-url.contant";

export const parentInviteApi = createApi({
    reducerPath: "parentInviteApi",
    baseQuery: customBaseQuery,

    endpoints: (builder) => ({

        validateParentInvite: builder.query<ApiResponse<InviteData>, string>({
            query: (inviteId) => ({
                method: "get",
                url: PARENT_INVITE_VALIDATE_API,
                useAuth: false,
                params: {
                    pathParams: { inviteId },
                },
            }),
        }),

        acceptParentInvite: builder.mutation<ApiResponse, string>({
            query: (inviteId) => ({
                url: PARENT_INVITE_ACCEPT_API,
                method: "post",
                useAuth: false,
                params: {
                    pathParams: { inviteId },
                },
            }),
        }),

        rejectParentInvite: builder.mutation<ApiResponse, string>({
            query: (inviteId) => ({
                url: PARENT_INVITE_REJECT_API,
                method: "post",
                useAuth: false,
                params: {
                    pathParams: { inviteId },
                },
            }),
        }),

    }),
});

export const {
    useValidateParentInviteQuery,
    useAcceptParentInviteMutation,
    useRejectParentInviteMutation,
} = parentInviteApi;
