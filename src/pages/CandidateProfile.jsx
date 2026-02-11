import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Building, Calendar, 
  Lock, Save, Check, ShieldCheck, CreditCard, 
  ChevronRight, Activity, Globe, Info, 
  AlertCircle, TrendingUp, Database, 
  HardDrive, Users, EyeOff, Smartphone, LogOut,
  Server, Shield, RefreshCw, BarChart, Download,
  Eye, Key, Bell, Cpu, FileText, Home,Briefcase
} from 'lucide-react';
import CandidateSidebar from '../components/CandidateSidebar';
export default function CandidateProfile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSuccess, setShowSuccess] = useState(false);

  const profileData = {
    fullName: "Alexander Sterling",
    email: "a.sterling@techcorp.io",
    phone: "+1 (888) 000-1234",
    country: "United Kingdom",
    location: "London, Mayfair",
    companyName: "Sterling-Knight Global",
    companyDescription: "A leading tier-one enterprise providing decentralized infrastructure, high-performance digital governance, and global security solutions.",
    website: "https://sterling-knight.io",
    industry: "Cybersecurity & Infrastructure",
    packageType: "Titanium Enterprise",
    renewalDate: "Jan 01, 2027",
    lastLogin: "Feb 03, 2026 - 12:45 PM",
    serverRegion: "AWS-West-1 (Primary)",
    accountCreated: "Jan 15, 2024",
    usage: {
      members: { used: 65, total: 100 },
      storage: { used: 8.8, total: 10 },
      projects: { used: 3, total: 10 },
      api: { used: 45, total: 100 }
    }
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'identity', label: 'Identity', icon: User },
    { id: 'organization', label: 'Organization', icon: Building },
    { id: 'usage', label: 'Usage', icon: TrendingUp },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="flex min-h-screen bg-white text-blue-950 font-sans">
      {/* Using CandidateSidebar instead of EndClientSidebar */}
      <CandidateSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER - Updated for candidate profile */}
        <header className="h-16 lg:h-20 bg-blue-950 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-50 border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-800 rounded-lg flex items-center justify-center">
              <User className="text-white" size={14} />
            </div>
            <div>
              <h1 className="text-white text-[10px] lg:text-xs font-black uppercase tracking-widest">Profile</h1>
              <p className="text-blue-400 text-[8px] lg:text-[9px] font-medium uppercase">Candidate Dashboard</p>
            </div>
          </div>
          
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute lg:relative left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 top-16 lg:top-auto bg-blue-800 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Check size={12} /> Updated Successfully
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <p className="text-white text-xs font-bold">{profileData.fullName}</p>
              <p className="text-blue-400 text-[10px] uppercase">Candidate</p>
            </div>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-sm border border-blue-700">
              AS
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* SIDEBAR NAVIGATION */}
              <div className="w-full lg:w-64 shrink-0">
                <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-blue-950 text-sm font-black uppercase tracking-wider">Navigation</h2>
                    <div className="h-px bg-blue-100 mt-2"></div>
                  </div>
                  
                  <div className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          activeTab === tab.id 
                            ? 'bg-blue-950 text-white shadow-md' 
                            : 'hover:bg-blue-50 text-blue-900'
                        }`}
                      >
                        <tab.icon size={16} className={activeTab === tab.id ? 'text-white' : 'text-blue-600'} />
                        <span className="text-xs font-bold">{tab.label}</span>
                        {activeTab === tab.id && (
                          <ChevronRight size={14} className="ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-900 text-xs font-bold">Status</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600 text-[10px] font-bold">Active</span>
                      </div>
                    </div>
                    <p className="text-blue-600 text-[10px]">Last login: {profileData.lastLogin}</p>
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="flex-1 min-w-0">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden"
                >
                  
                  {/* OVERVIEW TAB */}
                  {activeTab === 'overview' && (
                    <div className="p-6 lg:p-8">
                      <div className="mb-8">
                        <h2 className="text-2xl lg:text-3xl font-black text-blue-950">Candidate Profile Overview</h2>
                        <p className="text-blue-600 text-sm mt-2">Welcome back, {profileData.fullName}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <StatBox 
                          icon={<User size={20} />}
                          label="Profile Score"
                          value="95%"
                          color="blue"
                        />
                        <StatBox 
                          icon={<Briefcase size={20} />}
                          label="Active Applications"
                          value="12"
                          color="blue"
                        />
                        <StatBox 
                          icon={<Calendar size={20} />}
                          label="Upcoming Interviews"
                          value="3"
                          color="blue"
                        />
                      </div>
                      
                      <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                        <h3 className="text-lg font-black text-blue-950 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <QuickActionButton icon={<FileText size={16} />} label="Resume" />
                          <QuickActionButton icon={<Briefcase size={16} />} label="Apply Jobs" />
                          <QuickActionButton icon={<Calendar size={16} />} label="Schedule" />
                          <QuickActionButton icon={<BarChart size={16} />} label="Analytics" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <UsageCard 
                          label="Application Status"
                          items={[
                            { label: 'Viewed', value: 65, color: 'bg-blue-600' },
                            { label: 'Shortlisted', value: 35, color: 'bg-blue-700' },
                            { label: 'Interviewed', value: 15, color: 'bg-blue-800' }
                          ]}
                        />
                        <div className="bg-blue-950 text-white rounded-2xl p-6">
                          <h3 className="text-lg font-black mb-4">Job Search Status</h3>
                          <div className="space-y-4">
                            <SecurityItem label="Resume Status" status="Updated 2 days ago" />
                            <SecurityItem label="Skills Match" status="92%" />
                            <SecurityItem label="Response Rate" status="78%" />
                          </div>
                          <button className="mt-6 w-full py-3 bg-blue-800 hover:bg-blue-700 rounded-xl text-sm font-bold transition-colors">
                            View Job Matches
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* IDENTITY TAB */}
                  {activeTab === 'identity' && (
                    <div className="p-6 lg:p-8">
                      <div className="mb-8">
                        <h2 className="text-2xl lg:text-3xl font-black text-blue-950">Personal Information</h2>
                        <p className="text-blue-600 text-sm mt-2">Update your personal details</p>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <InputField 
                          label="Full Name"
                          icon={<User size={16} />}
                          value={profileData.fullName}
                          placeholder="Enter full name"
                        />
                        <InputField 
                          label="Email"
                          icon={<Mail size={16} />}
                          value={profileData.email}
                          placeholder="Enter email"
                        />
                        <InputField 
                          label="Phone"
                          icon={<Phone size={16} />}
                          value={profileData.phone}
                          placeholder="Enter phone"
                        />
                        <InputField 
                          label="Location"
                          icon={<MapPin size={16} />}
                          value={profileData.location}
                          placeholder="Enter location"
                        />
                      </div>
                      
                      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6 border-t border-blue-100">
                        <div className="flex items-center gap-2 text-blue-600 text-sm">
                          <Info size={16} />
                          <span>All changes are securely logged</span>
                        </div>
                        <button 
                          onClick={handleSave}
                          className="w-full lg:w-auto px-8 py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <Save size={16} /> Save Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ORGANIZATION TAB - Updated for Candidate */}
                  {activeTab === 'organization' && (
                    <div className="p-6 lg:p-8">
                      <div className="mb-8">
                        <h2 className="text-2xl lg:text-3xl font-black text-blue-950">Professional Details</h2>
                        <p className="text-blue-600 text-sm mt-2">Your career information</p>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <InputField 
                          label="Current Title"
                          icon={<User size={16} />}
                          value="Senior Frontend Developer"
                        />
                        <InputField 
                          label="Experience"
                          icon={<Calendar size={16} />}
                          value="5+ years"
                        />
                        <InputField 
                          label="Education"
                          icon={<Building size={16} />}
                          value="Masters in Computer Science"
                        />
                        <InputField 
                          label="Expected Salary"
                          icon={<CreditCard size={16} />}
                          value="$120,000 - $150,000"
                        />
                      </div>
                      
                      <div className="mb-8">
                        <label className="text-blue-950 text-sm font-bold block mb-3">Professional Summary</label>
                        <textarea 
                          className="w-full p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-950 text-sm outline-none focus:border-blue-500 resize-none h-32"
                          defaultValue="Experienced frontend developer with expertise in React, TypeScript, and modern web technologies. Passionate about creating user-friendly interfaces and scalable applications."
                        />
                      </div>
                      
                      <button 
                        onClick={handleSave}
                        className="w-full py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl transition-colors"
                      >
                        Update Professional Details
                      </button>
                    </div>
                  )}

                  {/* USAGE TAB - Updated for Candidate */}
                  {activeTab === 'usage' && (
                    <div className="p-6 lg:p-8">
                      <div className="mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div>
                            <h2 className="text-2xl lg:text-3xl font-black text-blue-950">Job Search Activity</h2>
                            <p className="text-blue-600 text-sm mt-2">Monitor your job search progress</p>
                          </div>
                          <button className="px-4 py-2 border border-blue-200 text-blue-700 text-sm font-bold rounded-lg hover:bg-blue-50 transition-colors">
                            Download Report
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <UsageProgress 
                          label="Applications Submitted"
                          icon={<FileText size={20} />}
                          used={45}
                          total={100}
                          unit="applications"
                        />
                        <UsageProgress 
                          label="Profile Views"
                          icon={<Eye size={20} />}
                          used={1248}
                          total={5000}
                          unit="views"
                        />
                        <UsageProgress 
                          label="Skills Match Score"
                          icon={<TrendingUp size={20} />}
                          used={92}
                          total={100}
                          unit="score"
                        />
                        <UsageProgress 
                          label="Interview Invites"
                          icon={<Calendar size={20} />}
                          used={8}
                          total={20}
                          unit="invites"
                        />
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-blue-100">
                        <h3 className="text-lg font-black text-blue-950 mb-4">Monthly Summary</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <SummaryItem label="Applications" value="45" />
                          <SummaryItem label="Response Rate" value="68%" />
                          <SummaryItem label="Interviews" value="8" />
                          <SummaryItem label="Offers" value="2" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBSCRIPTION TAB - Updated for Candidate */}
                  {activeTab === 'subscription' && (
                    <div className="p-6 lg:p-8">
                      <div className="mb-8">
                        <h2 className="text-2xl lg:text-3xl font-black text-blue-950">Account Plan</h2>
                        <p className="text-blue-600 text-sm mt-2">Manage your account plan</p>
                      </div>
                      
                      <div className="bg-blue-950 text-white rounded-2xl p-6 lg:p-8 mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                          <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-800 rounded-full text-xs font-bold mb-4">
                              <Shield size={12} /> PREMIUM
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-black mb-2">Premium Candidate</h3>
                            <p className="text-blue-300">Priority visibility & advanced features</p>
                          </div>
                          <div className="text-right">
                            <p className="text-blue-300 text-sm">Monthly</p>
                            <p className="text-3xl lg:text-4xl font-black">$49<span className="text-lg text-blue-300">/month</span></p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                          <FeatureItem icon={<Eye size={16} />} text="Profile Highlighted" />
                          <FeatureItem icon={<Briefcase size={16} />} text="Early Job Access" />
                          <FeatureItem icon={<Users size={16} />} text="Direct Recruiter Access" />
                        </div>
                        
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-6 border-t border-blue-800">
                          <div>
                            <p className="text-blue-300 text-sm">Plan Renewal</p>
                            <p className="text-xl font-bold">Mar 15, 2026</p>
                          </div>
                          <div className="flex gap-4">
                            <button className="px-6 py-3 bg-blue-800 hover:bg-blue-700 rounded-xl text-sm font-bold transition-colors">
                              Upgrade
                            </button>
                            <button className="px-6 py-3 bg-white text-blue-950 hover:bg-blue-50 rounded-xl text-sm font-bold transition-colors">
                              Manage Plan
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <InfoBox label="Plan Type" value="Premium" />
                        <InfoBox label="Billing" value="Monthly" />
                        <InfoBox label="Status" value="Active" />
                        <InfoBox label="Joined" value="Jan 2025" />
                      </div>
                    </div>
                  )}

                  {/* SECURITY TAB */}
                  {activeTab === 'security' && (
                    <div className="p-6 lg:p-8">
                      <div className="mb-8">
                        <h2 className="text-2xl lg:text-3xl font-black text-blue-950">Security Settings</h2>
                        <p className="text-blue-600 text-sm mt-2">Protect your account</p>
                      </div>
                      
                      <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                          <Key className="text-blue-600" size={24} />
                          <h3 className="text-lg font-black text-blue-950">Password Management</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                          <InputField 
                            label="Current Password"
                            icon={<Lock size={16} />}
                            type="password"
                            value="********"
                          />
                          <InputField 
                            label="New Password"
                            icon={<EyeOff size={16} />}
                            type="password"
                            placeholder="Enter new password"
                          />
                        </div>
                        
                        <button 
                          onClick={handleSave}
                          className="w-full py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl transition-colors"
                        >
                          Update Password
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <SecurityCard 
                          icon={<Smartphone size={20} />}
                          title="Two-Factor Auth"
                          status="Enabled"
                          action="Manage"
                        />
                        <SecurityCard 
                          icon={<LogOut size={20} />}
                          title="Active Sessions"
                          status="1 Device"
                          action="View All"
                        />
                        <SecurityCard 
                          icon={<Bell size={20} />}
                          title="Job Alerts"
                          status="On"
                          action="Configure"
                        />
                        <SecurityCard 
                          icon={<AlertCircle size={20} />}
                          title="Privacy Settings"
                          status="Active"
                          action="Settings"
                        />
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-blue-100">
                        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                          <AlertCircle className="text-blue-600" size={20} />
                          <div>
                            <p className="text-blue-950 text-sm font-bold">Security Tip</p>
                            <p className="text-blue-600 text-sm">Enable 2FA and use strong passwords</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SUB-COMPONENTS (keep these as they are)
function StatBox({ icon, label, value, color }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-white rounded-lg border border-blue-100">
          {React.cloneElement(icon, { className: 'text-blue-600' })}
        </div>
        <span className="text-blue-600 text-xs font-bold">{label}</span>
      </div>
      <p className="text-blue-950 text-lg font-black">{value}</p>
    </div>
  );
}

function QuickActionButton({ icon, label }) {
  return (
    <button className="flex flex-col items-center gap-2 p-3 bg-white hover:bg-blue-50 border border-blue-100 rounded-xl transition-colors">
      {React.cloneElement(icon, { className: 'text-blue-600' })}
      <span className="text-blue-950 text-xs font-bold">{label}</span>
    </button>
  );
}

function UsageCard({ label, items }) {
  return (
    <div className="bg-white border border-blue-100 rounded-2xl p-6">
      <h3 className="text-lg font-black text-blue-950 mb-6">{label}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-950 text-sm font-bold">{item.label}</span>
              <span className="text-blue-600 text-sm font-bold">{item.value}%</span>
            </div>
            <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                className={`h-full ${item.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityItem({ label, status }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-blue-800/30 last:border-0">
      <span className="text-blue-300 text-sm">{label}</span>
      <span className="text-white text-sm font-bold">{status}</span>
    </div>
  );
}

function InputField({ label, icon, value, placeholder, type = "text" }) {
  return (
    <div className="space-y-2">
      <label className="text-blue-950 text-sm font-bold flex items-center gap-2">
        {React.cloneElement(icon, { className: 'text-blue-600' })} {label}
      </label>
      <div className="relative">
        <input 
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          className="w-full pl-4 pr-4 py-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-950 text-sm outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function UsageProgress({ label, icon, used, total, unit }) {
  const percentage = (used / total) * 100;
  
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg border border-blue-100">
            {React.cloneElement(icon, { className: 'text-blue-600' })}
          </div>
          <span className="text-blue-950 text-sm font-bold">{label}</span>
        </div>
        <span className="text-blue-600 text-sm font-bold">{percentage.toFixed(0)}%</span>
      </div>
      <div className="space-y-2">
        <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className="h-full bg-blue-600 rounded-full"
          />
        </div>
        <div className="flex justify-between">
          <span className="text-blue-600 text-xs">{used} {unit} used</span>
          <span className="text-blue-950 text-xs font-bold">{total} {unit} total</span>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="text-center p-3 bg-blue-50 rounded-xl">
      <p className="text-blue-600 text-xs mb-1">{label}</p>
      <p className="text-blue-950 text-sm font-bold">{value}</p>
    </div>
  );
}

function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-blue-800/30 rounded-xl">
      {React.cloneElement(icon, { className: 'text-blue-300' })}
      <span className="text-blue-200 text-sm">{text}</span>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="p-4 bg-blue-50 rounded-xl text-center">
      <p className="text-blue-600 text-xs mb-1">{label}</p>
      <p className="text-blue-950 text-sm font-bold">{value}</p>
    </div>
  );
}

function SecurityCard({ icon, title, status, action }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white rounded-lg border border-blue-100">
          {React.cloneElement(icon, { className: 'text-blue-600' })}
        </div>
        <div>
          <h4 className="text-blue-950 text-sm font-bold">{title}</h4>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600 text-xs font-bold">{status}</span>
          </div>
        </div>
      </div>
      <button className="w-full py-2 border border-blue-200 text-blue-700 text-xs font-bold rounded-lg hover:bg-white transition-colors">
        {action}
      </button>
    </div>
  );
}