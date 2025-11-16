import { Role } from "@prisma/client";

export type UserRoleType= Role
export type UserAuthTokenPayloadType={
    userId: number;
    name: string;
}