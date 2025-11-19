// Types
export interface InviteData {
  invitationId: string;
  partnerName: string;
  expiryAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}