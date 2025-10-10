import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Phone, Mail, Calendar, MapPin } from 'lucide-react';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('All Requests');

  useEffect(() => {
    // Mock data for user requests
    setRequests([
      {
        id: 1,
        title: 'Fresh Sandwiches & Salads',
        donor: 'Green Bistro',
        requestedOn: 'Jan 15, 2024',
        quantity: '15 meals',
        pickup: 'Jan 15, 18:30',
        location: '123 Main St, Downtown',
        expires: 'Jan 15, 20:00',
        status: 'confirmed',
        notes: 'Please bring the best transport to pickup.',
        phone:'9876543210',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'
      },
      {
        id: 2,
        title: 'Bakery Items - End of Day',
        donor: 'Sunshine Bakery',
        requestedOn: 'Jan 15, 2024',
        quantity: '25 items',
        pickup: 'Jan 15, 17:00',
        location: '456 Baker St, Central',
        expires: 'Jan 15, 19:00',
        status: 'pending',
        notes: 'Waiting: Fresh pastries and baked items.',
        phone:'8976543210',
        image: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'
      },
      {
        id: 3,
        title: 'Prepared Meals (Vegetarian)',
        donor: 'Spice Garden',
        requestedOn: 'Jan 14, 2024',
        quantity: '12 meals',
        pickup: 'Jan 14, 19:00',
        location: '789 Spice Ave, Eastside',
        expires: 'Jan 14, 21:00',
        status: 'completed',
        notes: 'Allergies: Vegetarian curry and rice bowls.',
        phone:'9876543210',
        completedOn: 'Jan 14, 20:30',
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'
      },
      {
        id: 4,
        title: 'Fresh Produce Mix',
        donor: 'Metro Grocery',
        requestedOn: 'Jan 14, 2024',
        quantity: '20 kg',
        pickup: 'Jan 14, 15:00',
        location: '789 Market St, Westside',
        expires: 'Jan 16, 12:00',
        status: 'cancelled',
        notes: 'Allergies: Assorted vegetables and fruits.',
        phone:'9876543210',
        image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleAction = (requestId, action) => {
    console.log(`${action} request:`, requestId);
    if (action === 'Call Donor') {
      alert('Calling donor...');
    } else if (action === 'Message') {
      alert('Opening message...');
    } else if (action === 'Download') {
      alert('Downloading details...');
    }
  };

  const stats = [
    { label: 'New Requests', count: 4, color: 'text-blue-600' },
    { label: 'Confirmed', count: 1, color: 'text-green-600' },
    { label: 'Completed', count: 1, color: 'text-purple-600' },
    { label: 'People Fed', count: 12, color: 'text-orange-600' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Food Requests</h1>
        <p className="text-gray-600">Track and manage all your food pickup requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                index === 0 ? 'bg-blue-100' :
                index === 1 ? 'bg-green-100' :
                index === 2 ? 'bg-purple-100' : 'bg-orange-100'
              }`}>
                {index === 0 ? <Package className="h-6 w-6 text-blue-600" /> :
                 index === 1 ? <CheckCircle className="h-6 w-6 text-green-600" /> :
                 index === 2 ? <CheckCircle className="h-6 w-6 text-purple-600" /> :
                 <Package className="h-6 w-6 text-orange-600" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option>All Requests</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start space-x-4">
              <img
                src={request.image}
                alt={request.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.title}</h3>
                    <p className="text-sm text-gray-600">by {request.donor}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">{request.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    <span>{request.quantity}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{request.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Pickup: {request.pickup}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Expires: {request.expires}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Notes:</span> {request.notes}
                  </p>
                </div>

                {request.status === 'completed' && request.completedOn && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <span className="font-medium">Completed on:</span> {request.completedOn}
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAction(request.id, 'Call Donor')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Call Donor
                  </button>
                  <button
                    onClick={() => handleAction(request.id, 'Message')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Message
                  </button>
                  <button
                    onClick={() => handleAction(request.id, 'Download')}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600">You haven't made any food requests yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyRequests;