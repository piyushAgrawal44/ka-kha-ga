// navigationConfig.ts - Centralized navigation configuration

import { NavigationItem } from "../types/app.type";


export const navigationConfig: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/dashboard',
    roles: ['admin', 'therapist', 'parent'],
  },
  {
    id: 'children',
    label: 'Children',
    icon: 'Users',
    path: '/children',
    roles: ['admin', 'therapist', 'parent'],
  },
  {
    id: 'milestones',
    label: 'Milestones',
    icon: 'Target',
    path: '/milestones',
    roles: ['admin', 'therapist'],
  },
  {
    id: 'sessions',
    label: 'Sessions',
    icon: 'Calendar',
    path: '/sessions',
    roles: ['admin', 'therapist'],
    badge: 3, // Example: 3 upcoming sessions
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'FileText',
    path: '/reports',
    roles: ['admin', 'therapist', 'parent'],
  },
  {
    id: 'therapy',
    label: 'Therapy Management',
    icon: 'Brain',
    path: '#',
    roles: ['admin', 'therapist'],
    children: [
      {
        id: 'therapy-types',
        label: 'Therapy Types',
        icon: 'Stethoscope',
        path: '/therapy/types',
        roles: ['admin', 'therapist'],
      },
      {
        id: 'activities',
        label: 'Activities',
        icon: 'Sparkles',
        path: '/therapy/activities',
        roles: ['admin', 'therapist'],
      },
      {
        id: 'assessments',
        label: 'Assessments',
        icon: 'ClipboardCheck',
        path: '/therapy/assessments',
        roles: ['admin', 'therapist'],
      },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: 'MessageSquare',
    path: '/communication',
    roles: ['admin', 'therapist', 'parent'],
    badge: 5, // Example: 5 unread messages
  },
  {
    id: 'staff',
    label: 'Staff Management',
    icon: 'UserCog',
    path: '/staff',
    roles: ['admin'],
  },
  {
    id: 'parents',
    label: 'Parent Portal',
    icon: 'Heart',
    path: '/parents',
    roles: ['admin', 'therapist'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'TrendingUp',
    path: '/analytics',
    roles: ['admin', 'therapist'],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    path: '#',
    roles: ['admin', 'therapist', 'parent'],
    children: [
      {
        id: 'profile',
        label: 'Profile',
        icon: 'User',
        path: '/settings/profile',
        roles: ['admin', 'therapist', 'parent'],
      },
      {
        id: 'organization',
        label: 'Organization',
        icon: 'Building2',
        path: '/settings/organization',
        roles: ['admin'],
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: 'Bell',
        path: '/settings/notifications',
        roles: ['admin', 'therapist', 'parent'],
      },
      {
        id: 'security',
        label: 'Security',
        icon: 'Shield',
        path: '/settings/security',
        roles: ['admin', 'therapist', 'parent'],
      },
    ],
  },
];

// Helper function to filter navigation based on user role
export const getNavigationForRole = (role: string): NavigationItem[] => {
  return navigationConfig
    .filter(item => item.roles.includes(role as any))
    .map(item => ({
      ...item,
      children: item.children?.filter(child => 
        child.roles.includes(role as any)
      ),
    }));
};