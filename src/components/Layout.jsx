import React, { useState, useEffect, useRef } from 'react';
import { Bell, User, LogOut, Settings, Menu, X, Home, Package, BarChart3, Users, FileText, Plus, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  // Navigation items based on user role
  const getNavigationItems = () => {
    const userType = user?.userType || user?.role || 'donor';
    
    switch (userType) {
      case 'admin':
        return [
          { name: 'Dashboard', href: '/dashboard', icon: Home },
          { name: 'All Donations', href: '/dashboard/all-donations', icon: Package },
          { name: 'User Management', href: '/dashboard/users', icon: Users },
          { name: 'System Analytics', href: '/dashboard/system-analytics', icon: BarChart3 },
          { name: 'System Settings', href: '/dashboard/system-settings', icon: Settings }
        ];
      case 'activist':
        return [
          { name: 'Dashboard', href: '/dashboard', icon: Home },
          { name: 'Browse Food', href: '/dashboard/browse', icon: Search },
          { name: 'My Requests', href: '/dashboard/requests', icon: Package },
          { name: 'Request', href: '/dashboard/request', icon: Users },
          { name: 'Impact Reports', href: '/dashboard/reports', icon: FileText }
        ];
      case 'donor':
      case 'individual':
      default:
        return [
          { name: 'Dashboard', href: '/dashboard', icon: Home },
          { name: 'Post Donation', href: '/dashboard/post', icon: Plus },
          { name: 'My Donations', href: '/dashboard/donations', icon: Package },
          { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 }
        ];
    }
  };

  const navigationItems = getNavigationItems();

  // Sample notifications based on user role
  useEffect(() => {
    const userType = user?.userType || user?.role || 'donor';
    const roleNotifications = {
      admin: [
        { id: 1, type: 'user', message: 'New user registered: Sarah Johnson', time: '5 min ago', read: false },
        { id: 2, type: 'system', message: 'System maintenance scheduled for tonight', time: '1 hour ago', read: false },
        { id: 3, type: 'donation', message: '15 new donations posted today', time: '2 hours ago', read: true }
      ],
      activist: [
        { id: 1, type: 'donation', message: 'New donation available nearby: Fresh vegetables', time: '10 min ago', read: false },
        { id: 2, type: 'pickup', message: 'Pickup confirmed for Green Bistro donation', time: '30 min ago', read: false },
        { id: 3, type: 'milestone', message: 'You\'ve helped distribute 50 meals this month!', time: '1 day ago', read: true }
      ],
      donor: [
        { id: 1, type: 'claim', message: 'Your donation has been claimed by Food Rescue Team', time: '15 min ago', read: false },
        { id: 2, type: 'pickup', message: 'Pickup completed for your bread donation', time: '2 hours ago', read: false },
        { id: 3, type: 'impact', message: 'Your donations helped feed 25 people this week', time: '1 day ago', read: true }
      ]
    };

    const userNotifications = roleNotifications[userType] || roleNotifications.donor;
    setNotifications(userNotifications);
    setUnreadCount(userNotifications.filter(n => !n.read).length);
  }, [user?.userType, user?.role]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'user': return '👤';
      case 'system': return '⚙️';
      case 'donation': return '🍎';
      case 'pickup': return '🚚';
      case 'claim': return '✋';
      case 'milestone': return '🎉';
      case 'impact': return '📊';
      default: return '📢';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-green-600">Give2Grow</span>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        isActive
                          ? 'text-green-600 border-b-2 border-green-500'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right side - Notifications and User Menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowUserMenu(false);
                  }}
                  className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-sm text-green-600 hover:text-green-700"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.id)}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.name || user?.email}
                  </span>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <p className="text-xs text-green-600 capitalize">{user?.role}</p>
                      </div>
                      <Link 
                        to="/dashboard/settings"
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block pl-3 pr-4 py-2 text-base font-medium ${
                        isActive
                          ? 'text-green-700 bg-green-50 border-r-4 border-green-500'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
