export type UserRole = "PARTNER" | "PARENT";

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organizationId?: string;
}