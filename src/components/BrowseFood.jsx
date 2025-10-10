import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, Search, Filter } from 'lucide-react';

import donationService from '../services/donationService.js';

const BrowseFood = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFoodType, setSelectedFoodType] = useState('All Food Types');
  const [selectedDistance, setSelectedDistance] = useState('All Distances');
  const [sortBy, setSortBy] = useState('Sort by Distance');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to all donations from Firebase
    const unsubscribe = donationService.subscribeToAllDonations((allDonations) => {
      console.log('Browse Food - Received donations:', allDonations);
      setDonations(allDonations);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleRequestPickup = (donationId) => {
    console.log('Requesting pickup for donation:', donationId);
    alert('Pickup request submitted successfully!');
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (donation.donorName && donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Only show available donations (not drafts) to activists
    const isAvailable = donation.status === 'available';
    
    // Filter by food type if selected
    const matchesFoodType = selectedFoodType === 'All Food Types' || 
                           (donation.category && donation.category.toLowerCase().includes(selectedFoodType.toLowerCase()));
    
    return matchesSearch && isAvailable;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Browse Available Food</h1>
        <p className="text-gray-600">Discover food donations near you and help reduce waste in your community</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search food donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Food Type Filter */}
          <select
            value={selectedFoodType}
            onChange={(e) => setSelectedFoodType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option>All Food Types</option>
            <option>Prepared Meals</option>
            <option>Bakery Items</option>
            <option>Fresh Produce</option>
            <option>Packaged Foods</option>
          </select>

          {/* Distance Filter */}
          <select
            value={selectedDistance}
            onChange={(e) => setSelectedDistance(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option>All Distances</option>
            <option>Within 1 mile</option>
            <option>Within 5 miles</option>
            <option>Within 10 miles</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option>Sort by Distance</option>
            <option>Sort by Time</option>
            <option>Sort by Quantity</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Found {filteredDonations.length} available donations near you
          {loading && <span className="ml-2 text-blue-600">Loading...</span>}
        </p>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading available donations...</p>
        </div>
      )}

      {/* Donations Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonations.map((donation) => (
          <div key={donation.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={donation.image || donation.images?.[0] || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'}
                alt={donation.title}
                className="w-full h-48 object-cover bg-gray-100"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop';
                }}
              />
              <div className="absolute top-3 right-3">
                <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium">
                  {donation.quantity}
                </span>
              </div>
              {donation.images && donation.images.length > 1 && (
                <div className="absolute bottom-3 right-3">
                  <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                    +{donation.images.length - 1} more
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{donation.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {donation.donorName || 'Anonymous Donor'}</p>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{donation.description}</p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  <span>{donation.quantity}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Pickup: {donation.pickup}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{donation.location}</span>
                </div>
                <div className="flex items-center text-red-600">
                  <span>Expires: {donation.expires}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {donation.category}
                  </span>
                  <span className="text-xs text-gray-500">{donation.notes}</span>
                </div>
              </div>

              <button
                onClick={() => handleRequestPickup(donation.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Request Pickup
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {!loading && filteredDonations.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
          <p className="text-gray-600">
            {donations.length === 0 
              ? "No donations have been posted yet." 
              : "Try adjusting your search or filter criteria."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowseFood;