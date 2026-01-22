import { motion } from 'framer-motion';
import { 
  Briefcase, Users, Clock, TrendingUp, Plus, Eye, Award
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import EndClientSidebar from '../components/EndClientSidebar';

export default function EndClientDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Open Positions', value: '24', change: '+6 new', icon: Briefcase, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Applications', value: '186', change: '+42 today', icon: Users, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Interviews', value: '38', change: '+12 scheduled', icon: Clock, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Hired', value: '15', change: '+3 this month', icon: Users, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  ];

  const hiringTrends = [
    { month: 'Jan', applications: 120, hired: 8 },
    { month: 'Feb', applications: 145, hired: 10 },
    { month: 'Mar', applications: 165, hired: 12 },
    { month: 'Apr', applications: 178, hired: 14 },
    { month: 'May', applications: 195, hired: 16 },
    { month: 'Jun', applications: 210, hired: 18 },
  ];

  const openPositions = [
    { title: 'Senior Full Stack Developer', department: 'Engineering', applicants: 45, status: 'Active', urgency: 'High' },
    { title: 'Product Manager', department: 'Product', applicants: 32, status: 'Active', urgency: 'Medium' },
    { title: 'UX Designer', department: 'Design', applicants: 28, status: 'Active', urgency: 'High' },
    { title: 'Data Analyst', department: 'Analytics', applicants: 19, status: 'Active', urgency: 'Low' },
  ];

  const topCandidates = [
    { name: 'Alex Johnson', role: 'Senior Developer', match: 95, status: 'Interview Scheduled', vendor: 'TechRecruit' },
    { name: 'Sarah Williams', role: 'Product Manager', match: 92, status: 'Under Review', vendor: 'TalentHub' },
    { name: 'Michael Chen', role: 'UX Designer', match: 88, status: 'Shortlisted', vendor: 'DesignPro' },
    { name: 'Emily Davis', role: 'Data Analyst', match: 85, status: 'Applied', vendor: 'DataExperts' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-red-50/30">
      <EndClientSidebar />
      
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome, {localStorage.getItem('userName') || 'Client'}! 👋
                </h1>
                <p className="text-gray-600">Manage your hiring process</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/end-client/jobs/new')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden md:inline">Post New Job</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
                  </div>
                  <span className={`px-3 py-1 ${stat.bgColor} ${stat.textColor} rounded-full text-sm font-medium`}>
                    {stat.change}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Hiring Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Hiring Trends</h3>
                  <p className="text-gray-600">Applications vs Hires</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hiringTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
                  <Line type="monotone" dataKey="hired" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Top Candidates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Top Candidates</h3>
                  <p className="text-gray-600">Best matches</p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>

              <div className="space-y-4">
                {topCandidates.map((candidate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{candidate.name.charAt(0)}</span>
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{candidate.name}</p>
                      <p className="text-sm text-gray-600">{candidate.role}</p>
                      <p className="text-xs text-gray-500">via {candidate.vendor}</p>
                    </div>

                    <div className="text-right">
                      <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mb-1">
                        {candidate.match}% Match
                      </div>
                      <p className="text-xs text-gray-600">{candidate.status}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Open Positions</h3>
                <p className="text-gray-600">Active job postings</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {openPositions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/end-client/jobs')}
                  className="p-6 bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-xl border-2 border-gray-100 hover:border-orange-200 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{position.title}</h4>
                      <p className="text-sm text-gray-600">{position.department}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      position.urgency === 'High' ? 'bg-red-100 text-red-700' :
                      position.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {position.urgency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{position.applicants} applicants</span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {position.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
