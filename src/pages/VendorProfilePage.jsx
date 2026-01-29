import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Building, Calendar, 
  DollarSign, Clock, Palette, Lock, Save, Check
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';

export default function VendorProfilePage() {
  const [activeTab, setActiveTab] = useState('account');
  const [theme, setTheme] = useState('light');
  const [showSuccess, setShowSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: localStorage.getItem('userName') || 'John Vendor',
    email: localStorage.getItem('userEmail') || 'john@vendor.com',
    phone: '+1 (555) 987-6543',
    country: 'United States',
    location: 'New York, NY',
    companyName: localStorage.getItem('companyName') || 'TalentHub Inc.',
    companyDescription: 'Premier staffing and recruitment solutions provider',
    packageType: 'Professional',
    packageExpiry: '2025-12-31',
    lastLogin: new Date().toLocaleString(),
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { id: 'account', label: 'Account Status', icon: User },
    { id: 'personal', label: 'Personal Information', icon: Mail },
    { id: 'company', label: 'Company Information', icon: Building },
    { id: 'package', label: 'Package Information', icon: DollarSign },
    { id: 'usage', label: 'Account Usage', icon: Clock },
    { id: 'preferences', label: 'Theme Preferences', icon: Palette },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30">
      <VendorSidebar />
      
      <div className="flex-1 lg:ml-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your vendor account and preferences</p>
        </motion.div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-blue-500" />
            <p className="text-blue-800 font-semibold">Changes saved successfully!</p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Tab Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4 px-2">Settings</h3>
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{tab.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              {/* Account Status */}
              {activeTab === 'account' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Status</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Check className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-blue-700">Account Status</p>
                          <p className="text-xl font-bold text-blue-900">Active</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-700">Your vendor account is in good standing</p>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-blue-700">Joined Date</p>
                          <p className="text-xl font-bold text-blue-900">Feb 20, 2024</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-700">Member for 10 months</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Personal Information */}
              {activeTab === 'personal' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={profileData.fullName}
                            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={profileData.country}
                            onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Company Information */}
              {activeTab === 'company' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.companyName}
                          onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Description
                      </label>
                      <textarea
                        rows={4}
                        value={profileData.companyDescription}
                        onChange={(e) => setProfileData({ ...profileData, companyDescription: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Package Information */}
              {activeTab === 'package' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Package Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-50 rounded-2xl border-2 border-blue-200">
                      <DollarSign className="w-8 h-8 text-blue-600 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Current Package</p>
                      <p className="text-2xl font-bold text-gray-900 mb-2">{profileData.packageType}</p>
                      <p className="text-sm text-gray-600">Unlimited candidate submissions</p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
                      <Calendar className="w-8 h-8 text-gray-600 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Expiry Date</p>
                      <p className="text-2xl font-bold text-gray-900 mb-2">
                        {new Date(profileData.packageExpiry).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">365 days remaining</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Account Usage */}
              {activeTab === 'usage' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Usage</h2>
                  
                  <div className="space-y-4">
                    <div className="p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Last Login</p>
                          <p className="text-lg font-semibold text-gray-900">{profileData.lastLogin}</p>
                        </div>
                        <Clock className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-6 bg-blue-50 rounded-xl text-center">
                        <p className="text-3xl font-bold text-blue-600 mb-1">42</p>
                        <p className="text-sm text-gray-600">Benchlist Candidates</p>
                      </div>
                      <div className="p-6 bg-green-50 rounded-xl text-center">
                        <p className="text-3xl font-bold text-blue-600 mb-1">128</p>
                        <p className="text-sm text-gray-600">Candidates Submitted</p>
                      </div>
                      <div className="p-6 bg-purple-50 rounded-xl text-center">
                        <p className="text-3xl font-bold text-purple-600 mb-1">23</p>
                        <p className="text-sm text-gray-600">Active Job Applications</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Theme Preferences */}
              {activeTab === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Theme Preferences</h2>
                  
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setTheme('light')}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        theme === 'light'
                          ? 'border-blue-500 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">Light Mode</h3>
                          <p className="text-gray-600">Clean and bright interface</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 ${
                          theme === 'light' 
                            ? 'border-blue-600 bg-blue-600' 
                            : 'border-gray-300'
                        }`}>
                          {theme === 'light' && (
                            <Check className="w-full h-full text-white p-0.5" />
                          )}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setTheme('dark')}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        theme === 'dark'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">Dark Mode</h3>
                          <p className="text-gray-600">Easier on the eyes at night</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 ${
                          theme === 'dark' 
                            ? 'border-blue-600 bg-blue-600' 
                            : 'border-gray-300'
                        }`}>
                          {theme === 'dark' && (
                            <Check className="w-full h-full text-white p-0.5" />
                          )}
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg"
                    >
                      <Save className="w-5 h-5" />
                      Save Preferences
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Security */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={passwords.current}
                          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg"
                    >
                      <Lock className="w-5 h-5" />
                      Update Password
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
