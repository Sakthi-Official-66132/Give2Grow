import React, { useState, useEffect } from 'react';
import { Package, Search, Eye, Phone, User, Mail, MapPin, Clock } from 'lucide-react';
import donationService from '../services/donationService.js';

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [foodTypeFilter, setFoodTypeFilter] = useState('All Food Types');
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Subscribe to all donations from Firebase
    const unsubscribe = donationService.subscribeToAllDonations((allDonations) => {
      console.log('All Donations - Received donations:', allDonations);
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

  const handleViewDonation = (donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

  const handleCallDonor = (donation) => {
    if (donation.donorPhone) {
      window.open(`tel:${donation.donorPhone}`, '_self');
    } else {
      alert('Phone number not available');
    }
  };

  const handleEmailDonor = (donation) => {
    if (donation.donorEmail) {
      window.open(`mailto:${donation.donorEmail}?subject=Regarding your donation: ${donation.title}`, '_self');
    } else {
      alert('Email address not available');
    }
  };

  const handleUpdateStatus = async (donationId, newStatus) => {
    try {
      const result = await donationService.updateDonation(donationId, { status: newStatus });
      if (result.success) {
        alert(`Donation status updated to ${newStatus}`);
      } else {
        alert('Failed to update donation status');
      }
    } catch (error) {
      console.error('Error updating donation status:', error);
      alert('Error updating donation status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'claimed':
      case 'requested': return 'bg-yellow-100 text-yellow-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (donation.donorName && donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All Status' || donation.status === statusFilter.toLowerCase();
    const matchesType = foodTypeFilter === 'All Food Types' || 
                       (donation.donationCategory && donation.donationCategory.toLowerCase().includes(foodTypeFilter.toLowerCase())) ||
                       (donation.category && donation.category.toLowerCase().includes(foodTypeFilter.toLowerCase()));
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Donations</h1>
        <p className="text-gray-600">Monitor and manage all food donations across the Give2Grow platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-3xl font-bold text-gray-900">{donations.length}</p>
              <p className="text-xs text-gray-500">All time</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Now</p>
              <p className="text-3xl font-bold text-gray-900">{donations.filter(d => d.status === 'available').length}</p>
              <p className="text-xs text-gray-500">Ready for pickup</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">{donations.filter(d => d.status === 'claimed').length}</p>
              <p className="text-xs text-gray-500">Being processed</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900">{donations.filter(d => d.status === 'completed').length}</p>
              <p className="text-xs text-gray-500">Successfully rescued</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search donations by title, donor, or description..."
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
              <option>Claimed</option>
              <option>Completed</option>
              <option>Draft</option>
            </select>

            <select
              value={foodTypeFilter}
              onChange={(e) => setFoodTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option>All Food Types</option>
              <option>Food</option>
              <option>Clothing</option>
              <option>Stationery</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading donations...</p>
        </div>
      )}

      {/* Donations Table */}
      {!loading && filteredDonations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DONATION
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DONOR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PICKUP INFO
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTIVIST
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{donation.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{donation.description}</p>
                        <div className="flex items-center mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {donation.donationCategory || donation.category || 'N/A'}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">{donation.quantity}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{donation.donorName}</p>
                        <p className="text-sm text-gray-600">{donation.donorEmail || 'N/A'}</p>
                        <p className="text-sm text-gray-600">{donation.donorPhone || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{donation.pickup || donation.availableFrom + ' - ' + donation.availableTo}</span>
                        </div>
                        <div className="flex items-center mb-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{donation.location || donation.pickupAddress}</span>
                        </div>
                        <div className="flex items-center text-red-600">
                          <span>Expires: {donation.expires || donation.expiryDate + ' ' + donation.expiryTime}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {donation.claimedBy ? (
                        <div>
                          <p className="font-medium text-gray-900">{donation.claimedBy}</p>
                          <p className="text-sm text-gray-600">
                            Claimed: {donation.claimedAt ? new Date(donation.claimedAt).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewDonation(donation)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleCallDonor(donation)}
                          className="text-green-600 hover:text-green-700 p-1"
                          title="Call Donor"
                        >
                          <Phone className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEmailDonor(donation)}
                          className="text-purple-600 hover:text-purple-700 p-1"
                          title="Email Donor"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* Donation Details Modal */}
      {showModal && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Donation Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedDonation.image && (
                <img
                  src={selectedDonation.image}
                  alt={selectedDonation.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{selectedDonation.title}</h3>
                <p className="text-gray-600 mb-4">{selectedDonation.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Donor</p>
                  <p className="text-gray-900">{selectedDonation.donorName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Category</p>
                  <p className="text-gray-900">{selectedDonation.donationCategory || selectedDonation.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Quantity</p>
                  <p className="text-gray-900">{selectedDonation.quantity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedDonation.status)}`}>
                    {selectedDonation.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Pickup Time</p>
                  <p className="text-gray-900">{selectedDonation.pickup || `${selectedDonation.availableFrom} - ${selectedDonation.availableTo}`}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Location</p>
                  <p className="text-gray-900">{selectedDonation.location || selectedDonation.pickupAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Expires</p>
                  <p className="text-gray-900">{selectedDonation.expires || `${selectedDonation.expiryDate} ${selectedDonation.expiryTime}`}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Posted</p>
                  <p className="text-gray-900">{selectedDonation.createdAt ? new Date(selectedDonation.createdAt).toLocaleString() : 'N/A'}</p>
                </div>
              </div>
              
              {selectedDonation.specialInstructions && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Special Instructions</p>
                  <p className="text-gray-900">{selectedDonation.specialInstructions}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => handleCallDonor(selectedDonation)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Donor
                </button>
                <button
                  onClick={() => handleEmailDonor(selectedDonation)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Donor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDonations;