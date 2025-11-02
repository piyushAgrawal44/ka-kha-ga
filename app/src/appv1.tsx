// App.tsx - Main Application Component with Routing

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/layout';
import DashboardPage from './pages/dashboard-page/dashboard';
import { User } from '../types/app.type';
import ChildListPage from './pages/child-list-page/chlid-list-page';

const MilestonesPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Milestones</h1></div>;
const SessionsPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Sessions</h1></div>;
const ReportsPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Reports</h1></div>;
const CommunicationPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Communication</h1></div>;
const StaffPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Staff Management</h1></div>;
const ParentsPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Parent Portal</h1></div>;
const AnalyticsPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Analytics</h1></div>;
const ProfilePage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Profile Settings</h1></div>;
const OrganizationPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Organization Settings</h1></div>;
const NotificationsPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Notification Settings</h1></div>;
const SecurityPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Security Settings</h1></div>;

// Therapy Management Pages
const TherapyTypesPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Therapy Types</h1></div>;
const ActivitiesPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Activities</h1></div>;
const AssessmentsPage = () => <div className="p-6 bg-white rounded-xl shadow-sm"><h1 className="text-2xl font-bold">Assessments</h1></div>;

// Mock user - Replace with actual authentication
const mockUser: User = {
  id: '1',
  name: 'Dr. Priya Sharma',
  email: 'priya.sharma@example.com',
  role: 'therapist',
  organizationId: 'org-1',
};

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  userRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  userRole,
}) => {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard Layout with nested routes */}
        <Route path="/" element={<DashboardLayout user={mockUser} />}>
          {/* Dashboard Home */}
          <Route
            path="dashboard"
            element={<DashboardPage userRole={mockUser.role} />}
          />

          {/* Children Management */}
          <Route path="children" element={<ChildListPage />} />

          {/* Milestones */}
          <Route
            path="milestones"
            element={
              <ProtectedRoute
                allowedRoles={['admin', 'therapist']}
                userRole={mockUser.role}
              >
                <MilestonesPage />
              </ProtectedRoute>
            }
          />

          {/* Sessions */}
          <Route
            path="sessions"
            element={
              <ProtectedRoute
                allowedRoles={['admin', 'therapist']}
                userRole={mockUser.role}
              >
                <SessionsPage />
              </ProtectedRoute>
            }
          />

          {/* Reports */}
          <Route path="reports" element={<ReportsPage />} />

          {/* Therapy Management */}
          <Route path="therapy">
            <Route
              path="types"
              element={
                <ProtectedRoute
                  allowedRoles={['admin', 'therapist']}
                  userRole={mockUser.role}
                >
                  <TherapyTypesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="activities"
              element={
                <ProtectedRoute
                  allowedRoles={['admin', 'therapist']}
                  userRole={mockUser.role}
                >
                  <ActivitiesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="assessments"
              element={
                <ProtectedRoute
                  allowedRoles={['admin', 'therapist']}
                  userRole={mockUser.role}
                >
                  <AssessmentsPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Communication */}
          <Route path="communication" element={<CommunicationPage />} />

          {/* Staff Management (Admin only) */}
          <Route
            path="staff"
            element={
              <ProtectedRoute
                allowedRoles={['admin']}
                userRole={mockUser.role}
              >
                <StaffPage />
              </ProtectedRoute>
            }
          />

          {/* Parent Portal */}
          <Route
            path="parents"
            element={
              <ProtectedRoute
                allowedRoles={['admin', 'therapist']}
                userRole={mockUser.role}
              >
                <ParentsPage />
              </ProtectedRoute>
            }
          />

          {/* Analytics */}
          <Route
            path="analytics"
            element={
              <ProtectedRoute
                allowedRoles={['admin', 'therapist']}
                userRole={mockUser.role}
              >
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          {/* Settings */}
          <Route path="settings">
            <Route path="profile" element={<ProfilePage />} />
            <Route
              path="organization"
              element={
                <ProtectedRoute
                  allowedRoles={['admin']}
                  userRole={mockUser.role}
                >
                  <OrganizationPage />
                </ProtectedRoute>
              }
            />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="security" element={<SecurityPage />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                <a
                  href="/dashboard"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;