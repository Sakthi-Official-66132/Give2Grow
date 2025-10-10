import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, User, Eye, TrendingUp } from 'lucide-react';

const ActivistDashboard = () => {
  const [stats, setStats] = useState({
    availableDonations: 18,
    activeRequests: 4,
    completedPickups: 31,
    peopleHelped: 243
  });

  const [availableDonations, setAvailableDonations] = useState([]);
  const [myActiveRequests, setMyActiveRequests] = useState([]);

  useEffect(() => {
    // Mock data for available donations
    setAvailableDonations([
      {
        id: 1,
        title: 'Fresh Bread & Pastries',
        donor: 'Sunshine Bakery',
        quantity: '25 items',
        pickup: '17:00 - 19:00',
        location: '123 Baker St, Central',
        expires: 'Jan 15, 20:00',
        category: 'Bakery',
        notes: 'Some sugar available'
      },
      {
        id: 2,
        title: 'Prepared Meals (Mixed)',
        donor: 'Green Bistro',
        quantity: '15 meals',
        pickup: '18:30 - 20:00',
        location: '456 Main Ave, Central',
        expires: 'Jan 15, 21:00',
        category: 'Prepared',
        notes: 'Heat available'
      },
      {
        id: 3,
        title: 'Fresh Vegetables & Fruits',
        donor: 'Metro Grocery',
        quantity: '20kg mixed',
        pickup: '14:00 - 16:00',
        location: '789 Oak Rd, Westside',
        expires: 'Jan 17, 12:00',
        category: 'Organic',
        notes: 'Vegan'
      }
    ]);

    // Mock data for active requests
    setMyActiveRequests([
      {
        id: 1,
        title: 'Sandwiches & Salads',
        donor: 'City Cafe',
        pickup: 'Jan 15, 18:30',
        status: 'confirmed',
        statusColor: 'text-green-600'
      },
      {
        id: 2,
        title: 'Surplus Groceries',
        donor: 'Fresh Market',
        pickup: 'Jan 16, 17:00',
        status: 'pending',
        statusColor: 'text-yellow-600'
      }
    ]);
  }, []);

  const handleRequestPickup = (donationId) => {
    console.log('Requesting pickup for donation:', donationId);
    alert('Pickup request submitted successfully!');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, Sarah Johnson!</h1>
        <p className="text-gray-600">Community Food Heroes - Ready to make a difference in your community today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Donations</p>
              <p className="text-3xl font-bold text-gray-900">{stats.availableDonations}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Requests</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeRequests}</p>
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
              <p className="text-sm font-medium text-gray-600">People Fed</p>
              <p className="text-3xl font-bold text-gray-900">{stats.peopleHelped}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Available Donations Near You */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Available Donations Near You</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {availableDonations.map((donation) => (
                <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{donation.title}</h3>
                      <p className="text-sm text-gray-600">by {donation.donor}</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {donation.quantity}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Pickup: {donation.pickup}</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      <span>{donation.location}</span>
                    </div>
                    <div className="flex items-center text-red-600">
                      <span>Expires: {donation.expires}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {donation.category}
                      </span>
                      <span className="text-xs text-gray-500">{donation.notes}</span>
                    </div>
                    <button
                      onClick={() => handleRequestPickup(donation.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      Request Pickup
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Active Requests */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">My Active Requests</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {myActiveRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{request.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      request.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{request.donor}</p>
                  <p className="text-sm text-gray-500">{request.pickup}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Your Impact */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Your Impact</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">127kg</div>
            <div className="text-sm text-gray-600">Food waste prevented</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">8</div>
            <div className="text-sm text-gray-600">Partner organizations</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            View Detailed Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivistDashboard;