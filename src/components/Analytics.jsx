import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Package, BarChart3 } from 'lucide-react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalDonations: 147,
    peopleHelped: 1247,
    totalWeight: 426,
    successRate: 89
  });

  const [partnerOrgs, setPartnerOrgs] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Mock data for partner organizations
    setPartnerOrgs([
      { name: 'Community Kitchen', pickups: 23, rating: 4.9 },
      { name: 'Hope Foundation', pickups: 18, rating: 4.8 },
      { name: 'Local Food Bank', pickups: 15, rating: 4.7 },
      { name: 'Shelter Support', pickups: 12, rating: 4.6 }
    ]);

    // Mock data for recent activity
    setRecentActivity([
      {
        id: 1,
        action: 'Fresh sandwiches picked up by Community Kitchen',
        time: '2 hours ago',
        type: 'pickup'
      },
      {
        id: 2,
        action: 'New bakery items donation posted',
        time: '4 hours ago',
        type: 'donation'
      },
      {
        id: 3,
        action: 'Hope Foundation requested vegetarian meals',
        time: '6 hours ago',
        type: 'request'
      },
      {
        id: 4,
        action: 'Reached 100+ people fed milestone!',
        time: '1 day ago',
        type: 'milestone'
      }
    ]);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your impact and donation performance over time</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalDonations}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">People Helped</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.peopleHelped.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Weight</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalWeight}kg</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.successRate}%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Trends Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Chart visualization would go here</p>
              <p className="text-sm text-gray-500">Showing donation trends over time</p>
            </div>
          </div>
        </div>

        {/* Food Type Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Food Type Distribution</h2>
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
                <span className="text-sm text-gray-700">Packaged Foods 25%</span>
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
                <span className="text-sm text-gray-700">Bakery Items 10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Partner Organizations */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Partner Organizations</h2>
          <div className="space-y-4">
            {partnerOrgs.map((org, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-green-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{org.name}</p>
                    <p className="text-sm text-gray-600">{org.pickups} pickups completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{org.rating}</div>
                  <div className="text-xs text-gray-500">rating</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'pickup' ? 'bg-green-500' :
                    activity.type === 'donation' ? 'bg-blue-500' :
                    activity.type === 'request' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`}></div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
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
            <div className="text-3xl font-bold text-green-600 mb-1">426kg</div>
            <div className="text-sm text-gray-600">Food waste prevented</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">1,247</div>
            <div className="text-sm text-gray-600">Meals Provided</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">892kg</div>
            <div className="text-sm text-gray-600">CO2 emissions saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">147</div>
            <div className="text-sm text-gray-600">Organizations served</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;