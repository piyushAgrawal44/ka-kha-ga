// Auth Endpoint
export const LOGIN_API="/user/generate-auth-token"
export const REGISTER_API="/user"


// User Endpoint
export const USER_DETAIL_API = "/user/me";


// Parent Invite Endpoint
export const PARENT_INVITE_SEND_API="/parent/send-invite";
export const PARENT_INVITE_VALIDATE_API="/parent/invite/:inviteId/validate";
export const PARENT_INVITE_ACCEPT_API="/parent/invite/:inviteId/accept";
export const PARENT_INVITE_REJECT_API="/parent/invite/:inviteId/reject";