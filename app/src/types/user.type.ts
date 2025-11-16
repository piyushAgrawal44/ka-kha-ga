import { CommonApiResponseType } from "./response";

export type UserRole = "PARTNER" | "PARENT";

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  partnerId: number | null;
  parentId: number | null;
  avatar?: string;
  organizationId?: string;
}


export interface AuthUserResponseType extends CommonApiResponseType {
  data: UserType
};