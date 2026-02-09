import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Building, Calendar, 
  DollarSign, Clock, Palette, Lock, Save, Check,
  ChevronRight, Globe, ShieldCheck, Zap
} from 'lucide-react';

import CandidateSidebar from '../components/CandidateSidebar';

function CandidateProfile() {
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
    <div className="flex min-h-screen bg-[#f8fafc]">
      <CandidateSidebar />
      
      <div className="flex-1 lg:ml-0 overflow-y-auto">
        {/* Top Decorative Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 w-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-12">
          {/* Header Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <User size={40} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{profileData.fullName}</h1>
                <p className="text-gray-500 font-medium flex items-center gap-2">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                   {profileData.packageType} Member • {profileData.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Activity</p>
                  <p className="text-sm font-semibold text-gray-700">{profileData.lastLogin}</p>
               </div>
            </div>
          </motion.div>

          {/* Success Notification */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                   <Check className="w-5 h-5" />
                </div>
                <p className="text-emerald-800 font-bold">Your profile configuration has been updated successfully!</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-3 sticky top-8">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-1 ring-blue-700'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                          <span className="text-sm font-bold tracking-tight">{tab.label}</span>
                        </div>
                        {isActive && <ChevronRight className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 min-h-[500px]"
              >
                {/* ACCOUNT STATUS TAB */}
                {activeTab === 'account' && (
                  <div className="space-y-8">
                    <div>
                       <h2 className="text-2xl font-black text-gray-900">Account Status</h2>
                       <p className="text-gray-500">Overview of your current membership standing.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2rem] border border-blue-100 relative overflow-hidden group">
                        <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-100 group-hover:rotate-12 transition-transform" />
                        <div className="relative z-10">
                           <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-full">Status</span>
                           <h3 className="text-3xl font-black text-blue-900 mt-4">Active</h3>
                           <p className="text-blue-700/70 font-medium mt-1">Verified Vendor Account</p>
                        </div>
                      </div>
                      <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-200">
                        <span className="px-3 py-1 bg-gray-200 text-gray-600 text-[10px] font-black uppercase rounded-full">Member Since</span>
                        <h3 className="text-3xl font-black text-gray-900 mt-4">Feb 2024</h3>
                        <p className="text-gray-500 font-medium mt-1">10 Months of Excellence</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PERSONAL INFORMATION TAB */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-black text-gray-900 mb-6">Personal Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">Full Name</label>
                        <input type="text" value={profileData.fullName} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 ring-blue-500 outline-none font-semibold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">Email Address</label>
                        <input type="email" value={profileData.email} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 ring-blue-500 outline-none font-semibold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">Phone Number</label>
                        <input type="text" value={profileData.phone} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 ring-blue-500 outline-none font-semibold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">Location</label>
                        <input type="text" value={profileData.location} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 ring-blue-500 outline-none font-semibold" />
                      </div>
                    </div>
                    <button onClick={handleSave} className="mt-4 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg">
                      <Save size={20}/> Save Changes
                    </button>
                  </div>
                )}

                {/* THEME PREFERENCES TAB */}
                {activeTab === 'preferences' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Theme Preferences</h2>
                      <p className="text-gray-500">Choose how the dashboard looks for you.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { id: 'light', label: 'Light Mode', desc: 'Default clean interface', color: 'bg-white' },
                        { id: 'dark', label: 'Dark Mode', desc: 'Midnight deep interface', color: 'bg-slate-900' }
                      ].map((t) => (
                        <div 
                          key={t.id}
                          onClick={() => setTheme(t.id)}
                          className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${theme === t.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                        >
                          <div className={`w-full h-24 ${t.color} rounded-xl mb-4 border border-gray-200 shadow-inner flex items-center justify-center`}>
                             {theme === t.id && <Check className={t.id === 'light' ? 'text-blue-600' : 'text-white'} />}
                          </div>
                          <h4 className="font-bold text-gray-900">{t.label}</h4>
                          <p className="text-sm text-gray-500">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SECURITY TAB */}
                {activeTab === 'security' && (
                  <div className="max-w-md space-y-6">
                    <h2 className="text-2xl font-black text-gray-900 mb-6">Security Settings</h2>
                    <div className="space-y-4">
                      {['current', 'new', 'confirm'].map((field) => (
                        <div key={field} className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase ml-1">{field.replace(/^\w/, (c) => c.toUpperCase())} Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                            <input 
                              type="password" 
                              className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 ring-blue-500 outline-none font-semibold" 
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleSave} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                      Update Security Credentials
                    </button>
                  </div>
                )}

                {/* Fallback for other tabs */}
                {['company', 'package', 'usage'].includes(activeTab) && (
                   <div className="flex flex-col items-center justify-center h-full text-center py-20">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                         <ShieldCheck className="text-gray-300 w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">{activeTab} Details</h3>
                      <p className="text-gray-500 max-w-xs mt-2">This information is currently encrypted and verified by your administrator.</p>
                   </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateProfile;