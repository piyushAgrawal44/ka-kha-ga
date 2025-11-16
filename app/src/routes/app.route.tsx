import { ReactNode } from "react";


export interface AppRouteType {
  path: string;
  element: ReactNode;
  protected?: boolean;
  roles?: UserRole[];
  children?: AppRouteType[];
  index?: boolean
}

import DashboardLayout from "../components/layout/layout";
import DashboardPage from "../pages/dashboard-page/dashboard";
import ParentManagement from "../pages/parent-management/parent-management";
import AuthPage from "../pages/auth/auth";
import ErrorPage from "../pages/error-page/ErrorPage";
import { UserRole } from "../types/user.type";

export const appRoutes: AppRouteType[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    protected: true,
    roles: ["PARTNER", "PARENT"],
    children: [
      {
        index: true,
        path: "/",
        element: <DashboardPage />,
        protected: true,
        roles: ["PARTNER", "PARENT"],
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        protected: true,
        roles: ["PARTNER", "PARENT"],
      },
      {
        path: "parent",
        element: <ParentManagement />,
        protected: true,
        roles: ["PARTNER"],
      }
    ]
  },

  { path: "/login", element: <AuthPage /> },

  { path: "/unauthorized", element: <ErrorPage /> },

  { path: "*", element: <ErrorPage /> }
];
