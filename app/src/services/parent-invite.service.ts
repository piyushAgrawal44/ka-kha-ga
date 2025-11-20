
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./custom-rtk-wrapper-client.service";
import {
    ApiResponse,
    InviteData,
    InvitationListResponse,
    GetInvitationsParams
} from "../types/parent-invite.type";
import {
    PARENT_INVITE_ACCEPT_API,
    PARENT_INVITE_REJECT_API,
    PARENT_INVITE_SEND_API,
    PARENT_INVITE_VALIDATE_API,
    PARTNER_INVITE_LIST_API
} from "../constants/api-url.contant";

export const parentInviteApi = createApi({
    reducerPath: "parentInviteApi",
    baseQuery: customBaseQuery,
    tagTypes: ['InvitationList'],
    endpoints: (builder) => ({
        sendParentInvite: builder.mutation<ApiResponse, { email: string }>({
            query: (body) => ({
                url: PARENT_INVITE_SEND_API,
                method: "post",
                useAuth: true,
                data: body,
            }),
            invalidatesTags: ['InvitationList'],
        }),
        
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
        
        // NEW: Get partner's invitation list
        getPartnerInvitations: builder.query<ApiResponse<InvitationListResponse>, GetInvitationsParams>({
            query: (params) => ({
                url: PARTNER_INVITE_LIST_API,
                method: "get",
                useAuth: true,
                params: {
                    queryParams: params
                },
            }),
            providesTags: ['InvitationList'],
        }),
    }),
});

export const {
    useValidateParentInviteQuery,
    useAcceptParentInviteMutation,
    useRejectParentInviteMutation,
    useSendParentInviteMutation,
    useGetPartnerInvitationsQuery,  // NEW HOOK
} = parentInviteApi;