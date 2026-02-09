import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Briefcase,
  UserCheck,
  Calendar,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Target,
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';
import EndClientSidebar from '../components/EndClientSidebar';

export default function BusinessAnalyticsPage() {
  const userRole = localStorage.getItem('userRole') || 'vendor';

  const stats = [
    { label: 'Total Job Postings', value: '142', change: '+12%', icon: Briefcase, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Active Jobs', value: '34', change: '+8%', icon: Activity, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Total Candidates', value: '856', change: '+24%', icon: Users, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Bench Resources', value: '186', change: '+18%', icon: UserCheck, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
    { label: 'Interviews Scheduled', value: '48', change: '+15%', icon: Calendar, color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
    { label: 'Placements Done', value: '94', change: '+28%', icon: Award, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50', textColor: 'text-pink-600' },
  ];

  const monthlyData = [
    { month: 'Jan', jobs: 12 },
    { month: 'Feb', jobs: 15 },
    { month: 'Mar', jobs: 18 },
    { month: 'Apr', jobs: 22 },
    { month: 'May', jobs: 28 },
    { month: 'Jun', jobs: 34 },
  ];

  const candidateFunnel = [
    { stage: 'Applied', count: 856, percentage: 100 },
    { stage: 'Screening', count: 428, percentage: 50 },
    { stage: 'Interview', count: 214, percentage: 25 },
    { stage: 'Selected', count: 94, percentage: 11 },
  ];
    const topSkills = [
    { skill: 'React', demand: 95, growth: '+24%' },
    { skill: 'Node.js', demand: 88, growth: '+18%' },
    { skill: 'Python', demand: 82, growth: '+15%' },
    { skill: 'AWS', demand: 78, growth: '+22%' },
    { skill: 'TypeScript', demand: 75, growth: '+28%' },
    { skill: 'MongoDB', demand: 68, growth: '+12%' },
  ];

  const fastestClients = [
    { name: 'TechNova Pvt Ltd', avgTime: '5 days', hires: 18 },
    { name: 'CloudSystems Inc', avgTime: '7 days', hires: 15 },
    { name: 'InnovateLabs', avgTime: '8 days', hires: 12 },
    { name: 'DataVision Corp', avgTime: '9 days', hires: 10 },
  ];
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      {userRole === 'vendor' && <VendorSidebar />}
      {userRole === 'end-client' && <EndClientSidebar />}

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-30">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            Business Analytics
          </h1>
          <p className="text-gray-600 text-sm">
            Comprehensive insights and performance metrics
          </p>
        </div>

        <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow border border-gray-200"
              >
                <div className="flex justify-between mb-4">
                  <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
                  </div>
                  <span className={`${stat.textColor} text-sm font-medium`}>
                    <TrendingUp className="inline w-4 h-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Job Trend */}
  <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full">
    <h3 className="font-bold mb-6 flex items-center gap-2">
      <TrendingUp className="w-5 h-5 text-blue-600" />
      Job Posting Trend
    </h3>

    {monthlyData.map((d, i) => (
      <div key={i} className="mb-4">
        <div className="flex justify-between text-sm">
          <span>{d.month}</span>
          <span className="font-bold">{d.jobs} jobs</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${(d.jobs / 34) * 100}%` }}
          />
        </div>
      </div>
    ))}
  </div>

  {/* Candidate Funnel */}
  <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full">
    <h3 className="font-bold mb-6 flex items-center gap-2">
      <Target className="w-5 h-5 text-purple-600" />
      Candidate Funnel
    </h3>

    {candidateFunnel.map((s, i) => (
      <div key={i} className="mb-6">
        <div className="flex justify-between text-sm">
          <span>{s.stage}</span>
          <span className="font-bold">{s.count}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
            style={{ width: `${s.percentage}%` }}
          />
        </div>
      </div>
    ))}
  </div>
</div>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Bench Utilization */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full"
  >
    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
      <PieChart className="w-5 h-5 text-green-600" />
      Bench Utilization
    </h3>

    <div className="flex items-center justify-center mb-6">
      <div className="relative">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 440 }}
            animate={{ strokeDashoffset: 440 - (440 * 78) / 100 }}
            transition={{ delay: 0.5, duration: 1 }}
            strokeDasharray="440"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900">78%</p>
            <p className="text-sm text-gray-600">Utilized</p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-green-50 rounded-xl">
        <p className="text-sm text-gray-600 mb-1">Placed</p>
        <p className="text-2xl font-bold text-green-600">145</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600 mb-1">Available</p>
        <p className="text-2xl font-bold text-gray-600">41</p>
      </div>
    </div>
  </motion.div>

  {/* Skill Demand Analytics */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full"
  >
    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
      <Activity className="w-5 h-5 text-orange-600" />
      Skill Demand Analytics
    </h3>

    <div className="space-y-4">
      {topSkills.map((skill, index) => (
        <div key={index}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-900">
              {skill.skill}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {skill.growth}
              </span>
              <span className="text-sm font-bold text-gray-900">
                {skill.demand}%
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.demand}%` }}
              transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
</div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Vendors */}
              {userRole === 'end-client' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                  <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Top Vendors
                  </h3>
                  
                  <div className="space-y-3">
                    {topVendors.map((vendor, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{vendor.name}</h4>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">
                            ⭐ {vendor.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{vendor.candidates} candidates</span>
                          <span className="font-bold text-green-600">{vendor.placements} placements</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Fastest Hiring Clients */}
              {userRole === 'vendor' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                  <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Fastest Hiring Clients
                  </h3>
                  
                  <div className="space-y-3">
                    {fastestClients.map((client, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{client.name}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
                            {client.avgTime}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{client.hires} successful hires</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

        </div>
      </div>
    </div>
  );
}
