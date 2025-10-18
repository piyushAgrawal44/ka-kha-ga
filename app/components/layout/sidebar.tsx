// Sidebar.tsx - Collapsible Sidebar Component

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { getNavigationForRole } from '../../config/navigation.config';
import { NavigationItem, UserRole } from '../../types/app.type';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  isMobileOpen,
  onMobileClose,
  userRole,
}) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navigationItems = getNavigationForRole(userRole);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : <Icons.Circle className="w-5 h-5" />;
  };

  const renderNavItem = (item: NavigationItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.path);

    return (
      <div key={item.id}>
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all rounded-lg ${
              active
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-700 hover:bg-purple-50'
            } ${level > 0 ? 'ml-4' : ''} ${isCollapsed && level === 0 ? 'justify-center' : ''}`}
          >
            <div className="flex items-center space-x-3">
              {getIcon(item.icon)}
              {!isCollapsed && <span>{item.label}</span>}
            </div>
            {!isCollapsed && hasChildren && (
              <Icons.ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {!isCollapsed && item.badge && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </button>
        ) : (
          <Link
            to={item.path}
            onClick={onMobileClose}
            className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all rounded-lg ${
              active
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-700 hover:bg-purple-50'
            } ${level > 0 ? 'ml-4' : ''} ${isCollapsed && level === 0 ? 'justify-center' : ''}`}
          >
            {getIcon(item.icon)}
            {!isCollapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        )}

        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
                  <Icons.Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  क-ख-ग
                </span>
              </div>
            )}
            {isCollapsed && (
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl mx-auto">
                <Icons.Sparkles className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigationItems.map(item => renderNavItem(item))}
          </nav>

          {/* Collapse Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onToggle}
              className="hidden lg:flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {isCollapsed ? (
                <Icons.ChevronRight className="w-5 h-5" />
              ) : (
                <>
                  <Icons.ChevronLeft className="w-5 h-5 mr-2" />
                  <span>Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;