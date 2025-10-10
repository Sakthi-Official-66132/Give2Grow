import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, MoreVertical } from 'lucide-react';
import donationService from '../services/donationService.js';

const ViewListings = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortBy, setSortBy] = useState('Newest First');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user's donations from Firebase
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currentUser.uid || 'current_user_id';

    const unsubscribe = donationService.subscribeToUserDonations(userId, (donations) => {
      console.log('Received user donations:', donations);
      setListings(donations);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': 
      case 'picked up': return 'text-green-600 bg-green-50';
      case 'claimed':
      case 'requested': return 'text-yellow-600 bg-yellow-50';
      case 'available': return 'text-blue-600 bg-blue-50';
      case 'draft': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || listing.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Donations</h1>
        <p className="text-gray-600">Manage and track all your food donations</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option>All Status</option>
              <option>Available</option>
              <option>Requested</option>
              <option>Picked up</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Expiring Soon</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading your donations...</p>
        </div>
      )}

      {/* Listings Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                  {listing.status}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{listing.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{listing.description}</p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <span className="font-medium">Quantity:</span>
                  <span className="ml-1">{listing.quantity}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Location:</span>
                  <span className="ml-1">{listing.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Expires: {listing.expires}</span>
                </div>
              </div>

              {listing.claimedBy && (
                <div className="mb-4 p-2 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Claimed by:</span> {listing.claimedBy}
                  </p>
                </div>
              )}

              {listing.status === 'draft' && (
                <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-700">
                    <span className="font-medium">Draft:</span> This donation is saved as draft and not visible to activists yet.
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center">
                    <Edit className="h-4 w-4 mr-1" />
                    {listing.status === 'draft' ? 'Complete' : 'Edit'}
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {!loading && filteredListings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
          <p className="text-gray-600">You haven't posted any donations yet. Start by posting your first donation!</p>
        </div>
      )}
    </div>
  );
};

export default ViewListings;