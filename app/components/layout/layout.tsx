// DashboardLayout.tsx - Main Dashboard Layout Component

import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Topbar from './topbar';
import { User, BreadcrumbItem } from '../../types/app.type';

interface DashboardLayoutProps {
  user: User;
  breadcrumbs?: BreadcrumbItem[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, breadcrumbs }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    console.log('Logging out...');
    // Redirect to login
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
        userRole={user.role}
      />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Topbar */}
        <Topbar
          onMobileMenuToggle={toggleMobileSidebar}
          user={user}
          breadcrumbs={breadcrumbs}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
            <p>© 2025 क-ख-ग. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <a href="/privacy" className="hover:text-purple-600 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-purple-600 transition-colors">
                Terms of Service
              </a>
              <a href="/support" className="hover:text-purple-600 transition-colors">
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;