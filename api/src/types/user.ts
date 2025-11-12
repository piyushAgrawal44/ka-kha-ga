import { Role } from "@prisma/client";

export type UserRoleType= Role
export type UserAuthTokenPayloadType={
    user_id: number;
    name: string;
    role: UserRoleType;
    partnerId: number | null;
    parentId: number | null;
}