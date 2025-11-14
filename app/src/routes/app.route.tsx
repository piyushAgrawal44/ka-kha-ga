
import ErrorPage from "../pages/error-page/ErrorPage";
import AuthPage from "../pages/auth/auth";
import DashboardLayout from "../components/layout/layout";
import DashboardPage from "../pages/dashboard-page/dashboard";
import ProtectedRoute from "./protected-route";


// Route Config Array
export const appRoutes = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />, // common error page
        children: [
            { index: true, element: <DashboardPage  /> },
            { path: "/dashboard", element: <DashboardPage  /> },
        ]
    },

    {
        path: "/login",
        element: <AuthPage />,
        errorElement: <ErrorPage />
    },

    // Catch-all for 404
    {
        path: "*",
        element: <ErrorPage />,
    },
];
