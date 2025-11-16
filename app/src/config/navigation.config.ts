// navigationConfig.ts - Centralized navigation configuration

import { NavigationItem } from "../types/app.type";


export const navigationConfig: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/dashboard',
    roles: ['PARTNER', 'PARENT'],
  },
  {
    id: 'parent',
    label: 'Parents',
    icon: 'Users',
    path: '/parent',
    roles: ['PARTNER'],
  },
  {
    id: 'children',
    label: 'Children',
    icon: 'Users',
    path: '/children',
    roles: ['PARTNER', 'PARENT'],
  },
  {
    id: 'milestones',
    label: 'Milestones',
    icon: 'Target',
    path: '/milestones',
    roles: ['PARTNER'],
  },
  {
    id: 'sessions',
    label: 'Sessions',
    icon: 'Calendar',
    path: '/sessions',
    roles: ['PARTNER'],
    badge: 3, // Example: 3 upcoming sessions
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'FileText',
    path: '/reports',
    roles: ['PARTNER', 'PARENT'],
  },
  {
    id: 'therapy',
    label: 'Therapy Management',
    icon: 'Brain',
    path: '#',
    roles: ['PARTNER'],
    children: [
      {
        id: 'therapy-types',
        label: 'Therapy Types',
        icon: 'Stethoscope',
        path: '/therapy/types',
        roles: ['PARTNER'],
      },
      {
        id: 'activities',
        label: 'Activities',
        icon: 'Sparkles',
        path: '/therapy/activities',
        roles: ['PARTNER'],
      },
      {
        id: 'assessments',
        label: 'Assessments',
        icon: 'ClipboardCheck',
        path: '/therapy/assessments',
        roles: ['PARTNER'],
      },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: 'MessageSquare',
    path: '/communication',
    roles: ['PARTNER', 'PARENT'],
    badge: 5, // Example: 5 unread messages
  },
  {
    id: 'staff',
    label: 'Staff Management',
    icon: 'UserCog',
    path: '/staff',
    roles: [],
  },
  {
    id: 'parents',
    label: 'Parent Portal',
    icon: 'Heart',
    path: '/parents',
    roles: ['PARTNER'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'TrendingUp',
    path: '/analytics',
    roles: ['PARTNER'],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    path: '#',
    roles: ['PARTNER', 'PARENT'],
    children: [
      {
        id: 'profile',
        label: 'Profile',
        icon: 'User',
        path: '/settings/profile',
        roles: ['PARTNER', 'PARENT'],
      },
      {
        id: 'organization',
        label: 'Organization',
        icon: 'Building2',
        path: '/settings/organization',
        roles: [],
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: 'Bell',
        path: '/settings/notifications',
        roles: ['PARTNER', 'PARENT'],
      },
      {
        id: 'security',
        label: 'Security',
        icon: 'Shield',
        path: '/settings/security',
        roles: ['PARTNER', 'PARENT'],
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