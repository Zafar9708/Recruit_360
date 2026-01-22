import { motion } from 'framer-motion';
import { 
  Users, Briefcase, TrendingUp, UserCheck, DollarSign, Award, Plus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import VendorSidebar from '../components/VendorSidebar';

export default function VendorDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Candidates', value: '142', change: '+18', icon: Users, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Shortlisted Candidates', value: '58', change: '+12', icon: UserCheck, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Active Jobs', value: '34', change: '+5', icon: Briefcase, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Approx. Revenue', value: '$45K', change: '+24%', icon: DollarSign, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  ];

  const placementData = [
    { month: 'Jan', placements: 8, revenue: 12000 },
    { month: 'Feb', placements: 12, revenue: 18000 },
    { month: 'Mar', placements: 15, revenue: 22500 },
    { month: 'Apr', placements: 18, revenue: 27000 },
    { month: 'May', placements: 22, revenue: 33000 },
    { month: 'Jun', placements: 25, revenue: 37500 },
  ];

  const topCandidates = [
    { name: 'Sarah Johnson', role: 'Senior Developer', placements: 5, status: 'Placed', rating: 4.8 },
    { name: 'Mike Chen', role: 'Data Scientist', placements: 4, status: 'Interviewing', rating: 4.7 },
    { name: 'Emily Davis', role: 'UI/UX Designer', placements: 3, status: 'Available', rating: 4.9 },
    { name: 'David Kumar', role: 'DevOps Engineer', placements: 4, status: 'Placed', rating: 4.6 },
  ];

  const activeClients = [
    { name: 'TechCorp', openPositions: 8, placements: 15, status: 'Active' },
    { name: 'InnovateLabs', openPositions: 5, placements: 12, status: 'Active' },
    { name: 'CloudSystems', openPositions: 3, placements: 8, status: 'Active' },
    { name: 'DataVision', openPositions: 6, placements: 10, status: 'Active' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30">
    <VendorSidebar/>
      
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome, {localStorage.getItem('userName') || 'Vendor'}! 👋
                </h1>
                <p className="text-gray-600">Manage your candidates and track placements</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/vendor/benchlist')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden md:inline">Add to Benchlist</span>
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
            {/* Placement Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Placement Trends</h3>
                  <p className="text-gray-600">Monthly performance</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={placementData}>
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
                 <Line
  type="monotone"
  dataKey="placements"
  stroke="#1487D3"
  strokeWidth={3}
  dot={{ fill: '#1487D3', r: 5 }}
  activeDot={{ r: 7 }}
/>
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
                  <p className="text-gray-600">Best performers</p>
                </div>
                <Award className="w-8 h-8 text-blue-600" />
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
                    <div className="w-12 h-12 bg-gradient-to-br bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{candidate.name.charAt(0)}</span>
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{candidate.name}</p>
                      <p className="text-sm text-gray-600">{candidate.role}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{candidate.placements} placements</p>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs text-gray-600">{candidate.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Active Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Active Clients</h3>
                <p className="text-gray-600">Your end clients</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {activeClients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{client.name}</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {client.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Open Positions</p>
                      <p className="text-2xl font-bold text-gray-900">{client.openPositions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Placements</p>
                      <p className="text-2xl font-bold text-blue-600">{client.placements}</p>
                    </div>
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
