import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Package, Download, BarChart3 } from 'lucide-react';

const SystemAnalytics = () => {
  const [timeRange, setTimeRange] = useState('This Month');
  const [reportType, setReportType] = useState('Platform Overview');
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    // Mock system analytics data
    setAnalyticsData({
      overview: {
        totalUsers: 2847,
        totalDonations: 1456,
        successRate: 89.2,
        environmentalImpact: '3.2T CO₂'
      }
    });
  }, [timeRange, reportType]);

  const handleDownloadReport = () => {
    console.log('Downloading analytics report...');
    alert('Analytics report download started. You will receive an email when ready.');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">System Analytics</h1>
            <p className="text-gray-600">Comprehensive platform performance and usage analytics</p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex items-center space-x-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Range:</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type:</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option>Platform Overview</option>
              <option>User Analytics</option>
              <option>Donation Metrics</option>
              <option>Performance Report</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Platform Users</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.overview?.totalUsers?.toLocaleString()}</p>
              <p className="text-xs text-green-600">+23% this month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.overview?.totalDonations?.toLocaleString()}</p>
              <p className="text-xs text-green-600">+18% this month</p>
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
              <p className="text-3xl font-bold text-gray-900">{analyticsData.overview?.successRate}%</p>
              <p className="text-xs text-green-600">+2.1% improvement</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Environmental Impact</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.overview?.environmentalImpact}</p>
              <p className="text-xs text-gray-600">Emissions prevented</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Platform Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Platform Growth</h2>
          <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Platform growth chart</p>
              <p className="text-sm text-gray-500">Area chart showing user and donation growth</p>
            </div>
          </div>
        </div>

        {/* User Type Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">User Type Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-8 border-blue-200 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full" style={{
                background: 'conic-gradient(#3B82F6 0deg 162deg, #10B981 162deg 252deg, #F59E0B 252deg 324deg, #EF4444 324deg 360deg)'
              }}></div>
              <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center relative z-10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Restaurants 45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Activists 25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Individuals 20%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Organizations 10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;