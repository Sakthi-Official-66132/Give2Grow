import React, { useState, useEffect } from 'react';
import { Users, Package, TrendingUp, AlertTriangle, BarChart3, Clock, Eye, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import requestService from '../../services/requestService';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeDonations: 89,
    successRate: 87,
    pendingIssues: 3,
    pendingRequests: 0
  });

  const [pendingRequests, setPendingRequests] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock data for admin dashboard
    setStats({
      totalUsers: 1247,
      activeDonations: 89,
      successRate: 87,
      pendingIssues: 3,
      pendingRequests: 5
    });

    // Set up real-time listener for pending requests requiring manager approval
    if (user) {
      const unsubscribe = requestService.listenToPendingRequestsForManagers((result) => {
        if (result.success) {
          setPendingRequests(result.requests);
          setStats(prev => ({
            ...prev,
            pendingRequests: result.requests.length
          }));
        }
      });

      // Cleanup listener on unmount
      return () => {
        if (unsubscribe) {
          requestService.cleanupListener('pendingRequestsManagers');
        }
      };
    }
  }, []);

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleRequestResponse = async (requestId, response, notes = '') => {
    setLoading(true);
    
    try {
      const responseData = {
        notes: notes,
        activistId: selectedRequest.activistId
      };

      const result = await requestService.managerRespondToRequest(
        requestId, 
        response, 
        responseData, 
        user.uid
      );

      if (result.success) {
        alert(`Request ${response} successfully!`);
        setShowRequestModal(false);
        setSelectedRequest(null);
      } else {
        alert(`Failed to ${response} request: ${result.error}`);
      }
    } catch (err) {
      alert(`An error occurred while ${response}ing the request`);
      console.error('Request response error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Overview</h1>
        <p className="text-gray-600">Monitor platform performance and manage the FoodBridge ecosystem</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-600">+23 this week</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Donations</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeDonations}</p>
              <p className="text-xs text-gray-600">12 expiring soon</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">{stats.successRate}%</p>
              <p className="text-xs text-green-600">+5% vs last month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Issues</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingIssues}</p>
              <p className="text-xs text-red-600">Requires attention</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingRequests}</p>
              <p className="text-xs text-orange-600">Awaiting approval</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Donation Activity Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Donation Activity</h2>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Donation activity chart</p>
              <p className="text-sm text-gray-500">Bar chart showing weekly donation trends</p>
            </div>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">User Growth</h2>
          <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">User growth chart</p>
              <p className="text-sm text-gray-500">Line chart showing user registration trends</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests Section */}
      {pendingRequests.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pending Manager Approvals</h2>
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pendingRequests.length} requests awaiting approval
            </span>
          </div>
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{request.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency} priority
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Donor Approved
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{request.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{request.activistName} • Rating: {request.activistRating}</span>
                          </div>
                          <div className="flex items-center">
                            <Package className="h-4 w-4 mr-2" />
                            <span>{request.category} • {request.quantity}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{request.requestedAt}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          <p><span className="font-medium">Activist:</span> {request.activistContact}</p>
                          <p><span className="font-medium">Donor:</span> {request.donorName} - {request.donorContact}</p>
                          <p><span className="font-medium">Target:</span> {request.targetBeneficiaries}</p>
                          <p><span className="font-medium">Location:</span> {request.location}</p>
                          <p><span className="font-medium">Estimated Value:</span> {request.estimatedValue}</p>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex flex-col space-y-2">
                        <button
                          onClick={() => handleRequestClick(request)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Review Modal */}
      {showRequestModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Manager Review - Request Approval</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedRequest.title}</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedRequest.urgency)}`}>
                    {selectedRequest.urgency} priority
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Donor Approved
                  </span>
                  <span className="text-sm text-gray-500">Requested {selectedRequest.requestedAt}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Request Details</h4>
                  <p className="text-gray-700 mb-3">{selectedRequest.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Category:</span> {selectedRequest.category}</div>
                    <div><span className="font-medium">Quantity:</span> {selectedRequest.quantity}</div>
                    <div><span className="font-medium">Target Beneficiaries:</span> {selectedRequest.targetBeneficiaries}</div>
                    <div><span className="font-medium">Location:</span> {selectedRequest.location}</div>
                    <div><span className="font-medium">Estimated Value:</span> {selectedRequest.estimatedValue}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Activist Information</h4>
                    <div className="text-sm">
                      <p><span className="font-medium">Name:</span> {selectedRequest.activistName}</p>
                      <p><span className="font-medium">Rating:</span> {selectedRequest.activistRating}/5</p>
                      <p><span className="font-medium">Contact:</span> {selectedRequest.activistContact}</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Donor Information</h4>
                    <div className="text-sm">
                      <p><span className="font-medium">Name:</span> {selectedRequest.donorName}</p>
                      <p><span className="font-medium">Contact:</span> {selectedRequest.donorContact}</p>
                      <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">Approved</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedRequest(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleRequestResponse(selectedRequest.id, 'rejected', 'Request does not meet community guidelines')}
                disabled={loading}
                className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : 'Reject'}
              </button>
              <button
                onClick={() => handleRequestResponse(selectedRequest.id, 'approved', 'Approved for community benefit')}
                disabled={loading}
                className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;