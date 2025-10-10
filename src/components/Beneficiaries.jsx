import React, { useState, useEffect } from 'react';
import { Users, MapPin, Phone, Mail, Plus, Search } from 'lucide-react';

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data for beneficiaries
    setBeneficiaries([
      {
        id: 1,
        name: 'Maria Rodriguez',
        type: 'active',
        phone: '+1 (555) 123-4567',
        email: 'maria@example.com',
        lastContact: 'Jan 12',
        specialNeeds: 'Vegetarian meals preferred',
        notes: 'Single mother with 2 children'
      },
      {
        id: 2,
        name: 'James Wilson',
        type: 'active',
        phone: '+1 (555) 987-6543',
        email: 'james@example.com',
        lastContact: 'Jan 11',
        specialNeeds: 'Gluten-free meals',
        notes: 'Elderly, needs soft foods'
      },
      {
        id: 3,
        name: 'Sarah Johnson',
        type: 'active',
        phone: '+1 (555) 456-7890',
        email: 'sarah@example.com',
        lastContact: 'Jan 10',
        specialNeeds: 'Dairy-free options',
        notes: 'Family of 4, lactose intolerant'
      },
      {
        id: 4,
        name: 'Robert Chen',
        type: 'active',
        phone: '+1 (555) 321-0987',
        email: 'robert@example.com',
        lastContact: 'Jan 9',
        specialNeeds: 'No special dietary',
        notes: 'Recently unemployed, temporary assistance'
      },
      {
        id: 5,
        name: 'Linda Thompson',
        type: 'inactive',
        phone: '+1 (555) 654-3210',
        email: 'linda@example.com',
        lastContact: 'Dec 28',
        specialNeeds: 'Kosher meals preferred',
        notes: 'Elderly, homebound, needs delivery assistance'
      }
    ]);
  }, []);

  const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
    beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficiary.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Our Beneficiaries', count: 5, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Active Recipients', count: 4, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Families Served', count: 16, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Total Distributed', count: 195, color: 'text-orange-600', bgColor: 'bg-orange-100' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Beneficiaries</h1>
            <p className="text-gray-600">Manage the people and families you serve in your community</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Beneficiary
          </button>
        </div>
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
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Users className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search beneficiaries by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Beneficiaries List */}
      <div className="space-y-4">
        {filteredBeneficiaries.map((beneficiary) => (
          <div key={beneficiary.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{beneficiary.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      beneficiary.type === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {beneficiary.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{beneficiary.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{beneficiary.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span>Last contact: {beneficiary.lastContact}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm">
                        <span className="font-medium text-yellow-800">Special Needs:</span>
                        <span className="text-yellow-700 ml-1">{beneficiary.specialNeeds}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Notes:</span> {beneficiary.notes}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBeneficiaries.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No beneficiaries found</h3>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Beneficiaries;