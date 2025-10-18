// Topbar.tsx - Top Navigation Bar Component

import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, Bell, Search, User, Settings, LogOut, 
  ChevronDown, Moon, Sun 
} from 'lucide-react';
import { User as UserType, NotificationItem, BreadcrumbItem } from '../../types/app.type';

interface TopbarProps {
  onMobileMenuToggle: () => void;
  user: UserType;
  breadcrumbs?: BreadcrumbItem[];
  onLogout: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  onMobileMenuToggle,
  user,
  breadcrumbs = [],
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock notifications - Replace with actual data
  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'New Milestone Achieved',
      message: 'Alex Johnson completed speech therapy goal',
      type: 'success',
      read: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Session Reminder',
      message: 'Upcoming session with Emma Rodriguez at 2:00 PM',
      type: 'info',
      read: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Parent Message',
      message: 'New message from Sarah Lee\'s parent',
      type: 'info',
      read: true,
      createdAt: new Date(),
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="hidden md:flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <ChevronDown className="w-4 h-4 mx-2 rotate-[-90deg] text-gray-400" />}
                  {crumb.path ? (
                    <a
                      href={crumb.path}
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-gray-900 font-medium">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search children, sessions, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Button (Mobile) */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-700" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <button className="text-sm text-purple-600 hover:text-purple-700">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-purple-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                          <Bell className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.createdAt.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 text-center">
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <ChevronDown className="hidden sm:block w-4 h-4 text-gray-500" />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <a
                    href="/settings/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </a>
                </div>
                <div className="border-t border-gray-200 py-2">
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;