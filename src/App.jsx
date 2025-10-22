import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import UserManagement from './components/UserManagement.jsx';
import AllDonations from './components/AllDonations.jsx';
import SystemAnalytics from './components/SystemAnalytics.jsx';
import SystemSettings from './components/SystemSettings.jsx';
import PostDonation from './components/PostDonation.jsx';
import ViewListings from './components/ViewListings.jsx';
import Analytics from './components/Analytics.jsx';
import Layout from './components/Layout.jsx';
import LandingPage from './components/LandingPage.jsx';
import AuthPage from './components/AuthPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import BrowseFood from './components/BrowseFood.jsx';
import MyRequests from './components/MyRequests.jsx';
import Request from './components/Request.jsx';
import ImpactReports from './components/ImpactReports.jsx';
import ProfileSettings from './components/ProfileSettings.jsx';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<PublicRoute><AuthPage mode="signin" /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><AuthPage mode="register" /></PublicRoute>} />
            <Route path="/get-started" element={<PublicRoute><AuthPage mode="register" /></PublicRoute>} />
            <Route path="/dashboard/post" element={<ProtectedRoute><Layout><PostDonation /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/donations" element={<ProtectedRoute><Layout><ViewListings /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/analytics" element={<ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/all-donations" element={<ProtectedRoute><Layout><AllDonations /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/users" element={<ProtectedRoute><Layout><UserManagement /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/system-analytics" element={<ProtectedRoute><Layout><SystemAnalytics /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/system-settings" element={<ProtectedRoute><Layout><SystemSettings /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/browse" element={<ProtectedRoute><Layout><BrowseFood /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/requests" element={<ProtectedRoute><Layout><MyRequests /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/request" element={<ProtectedRoute><Layout><Request /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/reports" element={<ProtectedRoute><Layout><ImpactReports /></Layout></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Layout><ProfileSettings /></Layout></ProtectedRoute>} />
            <Route 
              path="/auth" 
              element={
                <PublicRoute>
                  <AuthPage mode="signin" />
                </PublicRoute>
              } 
            />
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
