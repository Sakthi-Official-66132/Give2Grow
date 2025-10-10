import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, Clock, CheckCircle, TrendingUp, Eye, BarChart3, Users, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import requestService from '../../services/requestService';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDonations: 24,
    activeDonations: 5,
    completedPickups: 19,
    totalImpact: 147,
    pendingRequests: 0
  });

  const [recentDonations, setRecentDonations] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock data for recent donations
    setRecentDonations([
      {
        id: 1,
        title: 'Fresh Sandwiches & Salads',
        description: '15 meals • Today Jan 15, 14:30',
        status: 'picked up',
        assignedTo: 'Sarah Johnson',
        statusColor: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        id: 2,
        title: 'Bakery Items - End of Day',
        description: '25 items • Today Jan 15, 18:00',
        status: 'requested',
        assignedTo: 'Mike Chen',
        statusColor: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      },
      {
        id: 3,
        title: 'Prepared Meals (Vegetarian)',
        description: '12 meals • Today Jan 15, 15:30',
        status: 'available',
        assignedTo: null,
        statusColor: 'text-blue-600',
        bgColor: 'bg-blue-50'
      }
    ]);

    // Set up real-time listener for pending requests
    if (user) {
      const unsubscribe = requestService.listenToPendingRequestsForDonors((result) => {
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
          requestService.cleanupListener('pendingRequestsDonors');
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

      const result = await requestService.donorRespondToRequest(
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
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Green Bistro!</h1>
        <p className="text-gray-600">Here's your impact dashboard. Thank you for helping fight food waste.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalDonations}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Listings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeDonations}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Pickups</p>
              <p className="text-3xl font-bold text-gray-900">{stats.completedPickups}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Impact</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalImpact}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingRequests}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Donations</h2>
          <Link to="/dashboard/donations" className="text-green-600 hover:text-green-700 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div key={donation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{donation.title}</h3>
                    <p className="text-sm text-gray-600">{donation.description}</p>
                    {donation.assignedTo && (
                      <p className="text-sm text-gray-500 mt-1">Assigned to: {donation.assignedTo}</p>
                    )}
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${donation.bgColor} ${donation.statusColor}`}>
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pending Requests</h2>
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pendingRequests.length} new requests
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
                          <p>Contact: {request.activistContact}</p>
                          <p>Target: {request.targetBeneficiaries}</p>
                          <p>Location: {request.location}</p>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex flex-col space-y-2">
                        <button
                          onClick={() => handleRequestClick(request)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center"
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

      {/* Impact This Month */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Your Impact This Month</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">89kg</div>
            <div className="text-sm text-gray-600">Food waste prevented</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">147</div>
            <div className="text-sm text-gray-600">People helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
            <div className="text-sm text-gray-600">Partner organizations</div>
          </div>
        </div>
      </div>

      {/* Request Review Modal */}
      {showRequestModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Review Request</h2>
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
                  <span className="text-sm text-gray-500">Requested {selectedRequest.requestedAt}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Request Details</h4>
                <p className="text-gray-700 mb-3">{selectedRequest.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span> {selectedRequest.category}
                  </div>
                  <div>
                    <span className="font-medium">Quantity:</span> {selectedRequest.quantity}
                  </div>
                  <div>
                    <span className="font-medium">Target Beneficiaries:</span> {selectedRequest.targetBeneficiaries}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {selectedRequest.location}
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Activist Information</h4>
                <div className="text-sm">
                  <p><span className="font-medium">Name:</span> {selectedRequest.activistName}</p>
                  <p><span className="font-medium">Rating:</span> {selectedRequest.activistRating}/5</p>
                  <p><span className="font-medium">Contact:</span> {selectedRequest.activistContact}</p>
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
                onClick={() => handleRequestResponse(selectedRequest.id, 'rejected', 'Unable to fulfill this request at this time')}
                disabled={loading}
                className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : 'Reject'}
              </button>
              <button
                onClick={() => handleRequestResponse(selectedRequest.id, 'approved', 'Happy to help with this request')}
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

export default DonorDashboard;