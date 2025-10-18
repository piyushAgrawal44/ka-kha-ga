// types.ts - Central type definitions for the admin panel

export type UserRole = 'admin' | 'therapist' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organizationId?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  path: string;
  roles: UserRole[]; // Which roles can access this route
  children?: NavigationItem[]; // For nested navigation
  badge?: number; // Optional notification badge
}

export interface Organization {
  id: string;
  name: string;
  type: 'clinic' | 'individual' | 'school';
}

export interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}