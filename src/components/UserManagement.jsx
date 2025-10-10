import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, MoreVertical, Edit, Trash2, Ban, CheckCircle, Mail, Phone } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  useEffect(() => {
    // Mock user data
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        role: 'donor',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '2 hours ago',
        donationsCount: 15,
        organizationName: 'Green Bistro',
        location: 'Downtown'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+1 (555) 987-6543',
        role: 'activist',
        status: 'active',
        joinDate: '2024-02-20',
        lastActive: '1 day ago',
        donationsCount: 0,
        pickupsCount: 23,
        organizationName: 'Community Helpers',
        location: 'Midtown'
      },
      {
        id: 3,
        name: 'Mike Chen',
        email: 'mike.c@example.com',
        phone: '+1 (555) 456-7890',
        role: 'donor',
        status: 'inactive',
        joinDate: '2024-01-10',
        lastActive: '2 weeks ago',
        donationsCount: 8,
        organizationName: 'Pizza Palace',
        location: 'Uptown'
      },
      {
        id: 4,
        name: 'Lisa Rodriguez',
        email: 'lisa.r@example.com',
        phone: '+1 (555) 321-0987',
        role: 'activist',
        status: 'active',
        joinDate: '2024-03-05',
        lastActive: '5 minutes ago',
        donationsCount: 0,
        pickupsCount: 31,
        organizationName: 'Food Rescue Team',
        location: 'Suburbs'
      },
      {
        id: 5,
        name: 'Admin User',
        email: 'admin@foodbridge.com',
        phone: '+1 (555) 000-0000',
        role: 'admin',
        status: 'active',
        joinDate: '2023-12-01',
        lastActive: '30 minutes ago',
        donationsCount: 0,
        organizationName: 'FoodBridge',
        location: 'System'
      },
      {
        id: 6,
        name: 'Robert Wilson',
        email: 'robert.w@example.com',
        phone: '+1 (555) 654-3210',
        role: 'donor',
        status: 'suspended',
        joinDate: '2024-01-25',
        lastActive: '1 week ago',
        donationsCount: 3,
        organizationName: 'Wilson\'s Deli',
        location: 'Downtown'
      }
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filter by role
    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(user => user.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.organizationName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [users, selectedRole, selectedStatus, searchTerm]);

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'donor': return 'bg-green-100 text-green-800';
      case 'activist': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUserAction = (userId, action) => {
    setUsers(prev => 
      prev.map(user => {
        if (user.id === userId) {
          switch (action) {
            case 'activate':
              return { ...user, status: 'active' };
            case 'suspend':
              return { ...user, status: 'suspended' };
            case 'delete':
              // In a real app, you'd probably soft delete or show a confirmation
              return null;
            default:
              return user;
          }
        }
        return user;
      }).filter(Boolean)
    );
    setShowDropdown(null);
  };

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'donor', label: 'Donor' },
    { value: 'activist', label: 'Activist' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
        <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Donors</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'donor').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Activists</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'activist').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Role Filter */}
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    USER
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROLE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTIVITY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-green-600">GB</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Green Bistro</div>
                        <div className="text-sm text-gray-500">restaurant@demo.com</div>
                        <div className="text-xs text-gray-400">Green Bistro</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      restaurant
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>Joined: Jan 15, 2024</div>
                    <div className="text-xs text-gray-500">Last active: Sep 13, 09:21</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>donations</div>
                    <div>pickups</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-green-600">SJ</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Sarah Johnson</div>
                        <div className="text-sm text-gray-500">activist@demo.com</div>
                        <div className="text-xs text-gray-400">Community Helpers</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      activist
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>Joined: Feb 20, 2024</div>
                    <div className="text-xs text-gray-500">Last active: Sep 13, 09:21</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>requests</div>
                    <div>completed</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;