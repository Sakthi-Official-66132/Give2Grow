import React, { useState } from 'react';
import { Settings, Save, Database, Mail, Bell, Shield, Globe, Server, AlertTriangle, CheckCircle } from 'lucide-react';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      platformName: 'Give2Grow',
      platformDescription: 'Connecting food donors with community activists to reduce waste and feed those in need',
      maintenanceMode: false,
      registrationEnabled: true
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = (category) => {
    console.log(`Saving ${category} settings:`, settings[category]);
    alert(`${category.charAt(0).toUpperCase() + category.slice(1)} settings saved successfully!`);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'donations', label: 'Donations', icon: Database },
    { id: 'system', label: 'System', icon: Server }
  ];

  const systemStatus = [
    { name: 'Database', uptime: '99.9%', status: 'healthy', icon: Database },
    { name: 'API Server', uptime: '99.8%', status: 'healthy', icon: Server },
    { name: 'File Storage', uptime: '100%', status: 'healthy', icon: Database },
    { name: 'Email Service', uptime: '98.5%', status: 'warning', icon: Mail },
    { name: 'SMS Service', uptime: '99.2%', status: 'healthy', icon: Bell }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure and manage Give2Grow platform settings</p>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">System Status</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <service.icon className={`h-8 w-8 mx-auto mb-2 ${getStatusColor(service.status)}`} />
                <h3 className="font-medium text-gray-800">{service.name}</h3>
                <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                <div className={`flex items-center justify-center mt-2 ${getStatusColor(service.status)}`}>
                  {getStatusIcon(service.status)}
                  <span className="ml-1 text-sm font-medium">{service.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">General Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    value={settings.general.platformName}
                    onChange={(e) => handleSettingChange('general', 'platformName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Description
                  </label>
                  <textarea
                    value={settings.general.platformDescription}
                    onChange={(e) => handleSettingChange('general', 'platformDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Maintenance Mode</label>
                    <p className="text-xs text-gray-500">Temporarily disable the platform for maintenance</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('general', 'maintenanceMode', !settings.general.maintenanceMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.general.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.general.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Registration Enabled</label>
                    <p className="text-xs text-gray-500">Allow new users to register on the platform</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('general', 'registrationEnabled', !settings.general.registrationEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.general.registrationEnabled ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.general.registrationEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSaveSettings('general')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save General Settings
                </button>
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {activeTab !== 'general' && (
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label} Settings
              </h3>
              <p className="text-gray-600">Configuration options for {activeTab} will be available here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;