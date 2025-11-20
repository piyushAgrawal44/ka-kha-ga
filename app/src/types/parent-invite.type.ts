// Types
export interface InviteData {
  invitationId: string;
  partnerName: string;
  expiryAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
}



export interface ApiResponse<T = any> {
    success: boolean;
    code: number;
    message: string;
    data?: T;
}

export interface InviteData {
    partnerId: number;
    partnerName: string;
    parentId: number;
    expiryAt: string;
}

export interface InvitationListItem {
    invitationId: number;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    parentName: string;
    parentEmail: string;
    sentAt: string;
    expiryAt: string;
    parentActionAt: string | null;
    isExpired: boolean;
    daysUntilExpiry: number | null;
}

export interface InvitationStatistics {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    expired: number;
    acceptanceRate: number;
}

export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface InvitationListResponse {
    invitations: InvitationListItem[];
    statistics: InvitationStatistics;
    pagination: PaginationMeta;
}

export interface GetInvitationsParams {
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'expiryAt' | 'status' | 'parentActionAt';
    sortOrder?: 'asc' | 'desc';
    status?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    parentName?: string;
    startDate?: string;
    endDate?: string;
}


export interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    gradient: string;
}