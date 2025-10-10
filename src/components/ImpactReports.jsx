import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Package, Download, BarChart3 } from 'lucide-react';

const ImpactReports = () => {
  const [reportData, setReportData] = useState({});
  const [timeRange, setTimeRange] = useState('This Month');
  const [reportType, setReportType] = useState('Overview');

  useEffect(() => {
    // Mock impact report data
    setReportData({
      stats: [
        { label: 'Total Pickups', value: '119', color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { label: 'People Rescued', value: '1,300', color: 'text-green-600', bgColor: 'bg-green-100' },
        { label: 'People Fed', value: '832', color: 'text-purple-600', bgColor: 'bg-purple-100' },
        { label: 'Waste Reduced', value: '593kg', color: 'text-orange-600', bgColor: 'bg-orange-100' }
      ],
      topDonors: [
        { name: 'Green Bistro', pickups: 23, rating: 4.9 },
        { name: 'Sunshine Bakery', pickups: 18, rating: 4.8 },
        { name: 'Metro Grocery', pickups: 15, rating: 4.7 },
        { name: 'Spice Garden', pickups: 12, rating: 4.6 }
      ],
      recentActivities: [
        {
          id: 1,
          text: 'Picked up 15 meals from Green Bistro',
          time: '2 hours ago',
          type: 'pickup'
        },
        {
          id: 2,
          text: 'Delivered supplies to 5 families',
          time: '4 hours ago',
          type: 'delivery'
        },
        {
          id: 3,
          text: 'Collected bakery items from Sunshine Bakery',
          time: '1 day ago',
          type: 'pickup'
        },
        {
          id: 4,
          text: 'Reached 100+ people fed milestone!',
          time: '2 days ago',
          type: 'milestone'
        }
      ],
      environmentalImpact: {
        foodWastePrevented: '1247kg',
        mealsProvided: '3456L',
        energySaved: '892kWh',
        carbonFootprint: '593kg'
      }
    });
  }, [timeRange, reportType]);

  const handleDownloadReport = () => {
    console.log('Downloading report...');
    alert('Report download started! You will receive an email when ready.');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Impact Reports</h1>
            <p className="text-gray-600">Detailed analysis of your community impact and food rescue activities</p>
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
        <div className="flex items-center space-x-4">
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
              <option>Overview</option>
              <option>Detailed</option>
              <option>Environmental</option>
              <option>Community</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {reportData.stats?.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                {index === 0 ? <Package className={`h-6 w-6 ${stat.color}`} /> :
                 index === 1 ? <Users className={`h-6 w-6 ${stat.color}`} /> :
                 index === 2 ? <TrendingUp className={`h-6 w-6 ${stat.color}`} /> :
                 <BarChart3 className={`h-6 w-6 ${stat.color}`} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Activity Trends Chart */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Activity Trends</h2>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Activity trends chart</p>
                <p className="text-sm text-gray-500">Showing pickup and delivery trends</p>
              </div>
            </div>
          </div>
        </div>

        {/* Food Type Distribution */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Food Type Distribution</h2>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-8 border-blue-200 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full" style={{
                  background: 'conic-gradient(#3B82F6 0deg 162deg, #10B981 162deg 252deg, #F59E0B 252deg 324deg, #EF4444 324deg 360deg)'
                }}></div>
                <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center relative z-10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Prepared Meals 45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Bakery Items 25%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Fresh Produce 20%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Packaged Foods 10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Partner Donors */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Top Partner Donors</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {reportData.topDonors?.map((donor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-green-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{donor.name}</p>
                      <p className="text-sm text-gray-600">{donor.pickups} pickups completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{donor.rating}</div>
                    <div className="text-xs text-gray-500">rating</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {reportData.recentActivities?.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'pickup' ? 'bg-green-500' :
                      activity.type === 'delivery' ? 'bg-blue-500' :
                      activity.type === 'milestone' ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`}></div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Environmental Impact</h2>
          <p className="text-sm text-gray-600 ml-2">Your contribution to sustainability</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{reportData.environmentalImpact?.foodWastePrevented}</div>
            <div className="text-sm text-gray-600">Food waste prevented</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{reportData.environmentalImpact?.mealsProvided}</div>
            <div className="text-sm text-gray-600">Water Saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{reportData.environmentalImpact?.energySaved}</div>
            <div className="text-sm text-gray-600">Energy saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{reportData.environmentalImpact?.carbonFootprint}</div>
            <div className="text-sm text-gray-600">Carbon footprint reduced</div>
          </div>
        </div>
      </div>

      {/* Weekly Performance Chart */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Weekly Performance</h2>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Weekly performance chart</p>
              <p className="text-sm text-gray-500">Showing weekly pickup and delivery performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactReports;