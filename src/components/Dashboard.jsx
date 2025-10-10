import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import DonorDashboard from './dashboards/DonorDashboard.jsx';
import ActivistDashboard from './dashboards/ActivistDashboard.jsx';
import AdminDashboard from './dashboards/AdminDashboard.jsx';

const Dashboard = () => {
  const { user } = useAuth();
  const [userType, setUserType] = useState('donor'); // Default fallback

  useEffect(() => {
    // In a real app, this would come from the authenticated user's profile
    // For demo purposes, we'll use a default or localStorage
    const storedUserType = localStorage.getItem('userType') || 'donor';
    setUserType(storedUserType);
  }, [user]);

  const renderDashboard = () => {
    switch (userType) {
      case 'activist':
        return <ActivistDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'donor':
      case 'individual':
      default:
        return <DonorDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;