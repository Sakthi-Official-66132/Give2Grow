// Type definitions and constants for the FoodBridge application
// This file contains common types, enums, and constants used throughout the app

// User Types
export const USER_TYPES = {
  DONOR: 'donor',
  ACTIVIST: 'activist',
  ADMIN: 'admin',
  INDIVIDUAL: 'individual'
};

// Donation Categories
export const DONATION_CATEGORIES = {
  FOOD: 'food',
  CLOTHING: 'clothing',
  STATIONERY: 'stationery',
  OTHER: 'other'
};

// Donation Status
export const DONATION_STATUS = {
  ACTIVE: 'active',
  CLAIMED: 'claimed',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled'
};

// Request Status
export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Urgency Levels
export const URGENCY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending'
};

// Condition Types (for clothing/items)
export const CONDITION_TYPES = {
  NEW: 'new',
  LIKE_NEW: 'like-new',
  GOOD: 'good',
  FAIR: 'fair'
};

// Dietary Information Options
export const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Halal',
  'Kosher',
  'Sugar-Free',
  'Low-Sodium'
];

// Clothing Sizes
export const CLOTHING_SIZES = [
  'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'
];

// Notification Types
export const NOTIFICATION_TYPES = {
  DONATION_POSTED: 'donation_posted',
  DONATION_CLAIMED: 'donation_claimed',
  DONATION_COMPLETED: 'donation_completed',
  REQUEST_APPROVED: 'request_approved',
  REQUEST_REJECTED: 'request_rejected',
  SYSTEM_ALERT: 'system_alert',
  REMINDER: 'reminder'
};

// API Response Status
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading'
};

// Form Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  PASSWORD_MIN_LENGTH: 8,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGES: 5,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_TITLE_LENGTH: 100
};

// Default Values
export const DEFAULT_VALUES = {
  PAGINATION_LIMIT: 20,
  SEARCH_DEBOUNCE_MS: 300,
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
  MAX_RETRY_ATTEMPTS: 3,
  DEFAULT_LOCATION_RADIUS: 10, // miles
  DEFAULT_EXPIRY_HOURS: 24
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
  FILE_TOO_LARGE: 'File size is too large. Maximum size is 5MB.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload images only.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
  PASSWORDS_DONT_MATCH: 'Passwords do not match.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  DONATION_CREATED: 'Donation posted successfully!',
  DONATION_UPDATED: 'Donation updated successfully!',
  DONATION_DELETED: 'Donation deleted successfully!',
  REQUEST_CREATED: 'Request submitted successfully!',
  REQUEST_UPDATED: 'Request updated successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  EMAIL_SENT: 'Email sent successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'user',
  USER_TYPE: 'userType',
  THEME: 'theme',
  LANGUAGE: 'language',
  SEARCH_HISTORY: 'searchHistory',
  DRAFT_DONATION: 'draftDonation'
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  BROWSE: '/browse',
  DONATIONS: '/donations',
  POST: '/post',
  REQUESTS: '/requests',
  BENEFICIARIES: '/beneficiaries',
  ANALYTICS: '/analytics',
  REPORTS: '/reports',
  USERS: '/users',
  SYSTEM: '/system',
  PROFILE: '/profile',
  LISTINGS: '/listings'
};

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d'
  },
  SECONDARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8'
  },
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6'
};

// Utility Functions
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Export all as default for easier importing
export default {
  USER_TYPES,
  DONATION_CATEGORIES,
  DONATION_STATUS,
  REQUEST_STATUS,
  URGENCY_LEVELS,
  USER_STATUS,
  CONDITION_TYPES,
  DIETARY_OPTIONS,
  CLOTHING_SIZES,
  NOTIFICATION_TYPES,
  API_STATUS,
  VALIDATION_RULES,
  DEFAULT_VALUES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  ROUTES,
  THEME_COLORS,
  formatDate,
  formatTime,
  formatDateTime,
  truncateText,
  generateId,
  debounce
};