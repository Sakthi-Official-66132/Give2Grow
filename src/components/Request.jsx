import React, { useState, useEffect } from 'react';
import { Plus, Search, Package, Clock, CheckCircle, User, Eye, MapPin, Phone, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import requestService from '../services/requestService';

const Request = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newRequest, setNewRequest] = useState({
    title: '',
    category: '',
    quantity: '',
    description: '',
    urgency: 'medium',
    location: '',
    contactInfo: '',
    targetBeneficiaries: ''
  });

  useEffect(() => {
    if (!user) return;

    // Set up real-time listener for user requests
    const unsubscribe = requestService.listenToUserRequests(user.uid, (result) => {
      if (result.success) {
        setRequests(result.requests);
        setError('');
      } else {
        setError(result.error || 'Failed to load requests');
      }
    });

    // Cleanup listener on unmount
    return () => {
      if (unsubscribe) {
        requestService.cleanupListener(`userRequests_${user.uid}`);
      }
    };
  }, [user]);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { 
      label: 'Total Requests', 
      count: requests.length, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100',
      icon: Package
    },
    { 
      label: 'Pending Approval', 
      count: requests.filter(r => r.status === 'pending').length, 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100',
      icon: Clock
    },
    { 
      label: 'Approved Requests', 
      count: requests.filter(r => r.status === 'approved').length, 
      color: 'text-green-600', 
      bgColor: 'bg-green-100',
      icon: CheckCircle
    },
    { 
      label: 'People Helped', 
      count: requests.reduce((total, r) => total + (r.actualBeneficiaries ? parseInt(r.actualBeneficiaries) : 0), 0), 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-100',
      icon: User
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const handleCreateRequest = async () => {
    if (!newRequest.title || !newRequest.category || !newRequest.description) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const requestData = {
        ...newRequest,
        estimatedValue: '$0', // Default value since currency was removed
        requestedAt: new Date().toLocaleString(),
        contactInfo: newRequest.contactInfo || `${user.displayName || user.email}`
      };

      const result = await requestService.createRequest(requestData, user.uid);

      if (result.success) {
        setNewRequest({
          title: '',
          category: '',
          quantity: '',
          description: '',
          urgency: 'medium',
          location: '',
          contactInfo: '',
          targetBeneficiaries: ''
        });
        setShowCreateForm(false);
        alert('Request submitted successfully!');
      } else {
        setError(result.error || 'Failed to create request');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Create request error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Request Management</h1>
            <p className="text-gray-600">Submit and manage your requests for donations to help your community</p>
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Request
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search requests by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Create Request Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create New Request</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Title *</label>
                <input
                  type="text"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Fresh Vegetables for Community Kitchen"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={newRequest.category}
                    onChange={(e) => setNewRequest({...newRequest, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="food">Food</option>
                    <option value="clothing">Clothing</option>
                    <option value="stationery">Stationery</option>
                    <option value="medical">Medical</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="text"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({...newRequest, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 20kg, 50 items"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe what you need and how it will help your community..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                  <select
                    value={newRequest.urgency}
                    onChange={(e) => setNewRequest({...newRequest, urgency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Beneficiaries</label>
                  <input
                    type="text"
                    value={newRequest.targetBeneficiaries}
                    onChange={(e) => setNewRequest({...newRequest, targetBeneficiaries: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 50 families, 100 individuals"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newRequest.location}
                    onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Where will this be used/distributed?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
                  <input
                    type="text"
                    value={newRequest.contactInfo}
                    onChange={(e) => setNewRequest({...newRequest, contactInfo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your name and phone number"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRequest}
                disabled={loading}
                className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency} priority
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    <span>{request.category} • {request.quantity}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{request.targetBeneficiaries}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{request.description}</p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Requested {request.requestedAt}</span>
                  {request.estimatedValue && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Estimated value: {request.estimatedValue}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Response Status */}
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Donor Response */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Donor Response
                  </h4>
                  {request.donorResponse ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{request.donorResponse.donorName}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          request.donorResponse.response === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {request.donorResponse.response}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{request.donorResponse.notes}</p>
                      <p className="text-xs text-gray-500">{request.donorResponse.responseTime}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Awaiting donor response...</p>
                  )}
                </div>

                {/* Manager Response */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Manager Response
                  </h4>
                  {request.managerResponse ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{request.managerResponse.managerName}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          request.managerResponse.response === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {request.managerResponse.response}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{request.managerResponse.notes}</p>
                      <p className="text-xs text-gray-500">{request.managerResponse.responseTime}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Awaiting manager approval...</p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Contact: {request.contactInfo}</span>
                </div>
              </div>

              {/* Completion Details */}
              {request.status === 'completed' && (
                <div className="mt-4 pt-4 border-t border-gray-200 bg-green-50 rounded-lg p-4">
                  <div className="flex items-center text-green-800 mb-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="font-medium">Request Completed</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Successfully helped {request.actualBeneficiaries} on {request.completedAt}
                  </p>
                </div>
              )}

              {/* Rejection Details */}
              {request.status === 'rejected' && (
                <div className="mt-4 pt-4 border-t border-gray-200 bg-red-50 rounded-lg p-4">
                  <div className="flex items-center text-red-800 mb-2">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span className="font-medium">Request Rejected</span>
                  </div>
                  {request.rejectionReason && (
                    <p className="text-sm text-red-700">Reason: {request.rejectionReason}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or create a new request.</p>
        </div>
      )}
    </div>
  );
};

export default Request;
