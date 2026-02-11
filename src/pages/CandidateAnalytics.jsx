import { useState, useEffect } from 'react';
import CandidateSidebar from '../components/CandidateSidebar';
import {
  TrendingUp,
  Users,
  Briefcase,
  Target,
  Clock,
  Award,
  Star,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

export default function CandidateAnalytics() {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Mock data for charts
  const applicationData = [
    { month: 'Jan', applications: 12, interviews: 4, offers: 1 },
    { month: 'Feb', applications: 18, interviews: 6, offers: 2 },
    { month: 'Mar', applications: 22, interviews: 8, offers: 3 },
    { month: 'Apr', applications: 15, interviews: 5, offers: 1 },
    { month: 'May', applications: 28, interviews: 10, offers: 4 },
    { month: 'Jun', applications: 24, interviews: 9, offers: 3 },
  ];

  const skillData = [
    { name: 'React', value: 85, color: '#3b82f6' },
    { name: 'Node.js', value: 78, color: '#10b981' },
    { name: 'TypeScript', value: 92, color: '#8b5cf6' },
    { name: 'AWS', value: 65, color: '#f59e0b' },
    { name: 'MongoDB', value: 72, color: '#ef4444' },
  ];

  const interviewData = [
    { name: 'Completed', value: 15, color: '#10b981' },
    { name: 'Scheduled', value: 4, color: '#3b82f6' },
    { name: 'Pending', value: 2, color: '#f59e0b' },
    { name: 'Cancelled', value: 1, color: '#ef4444' },
  ];

  const performanceTrend = [
    { week: 'W1', score: 65 },
    { week: 'W2', score: 72 },
    { week: 'W3', score: 68 },
    { week: 'W4', score: 78 },
    { week: 'W5', score: 85 },
    { week: 'W6', score: 82 },
    { week: 'W7', score: 88 },
  ];

  const metrics = [
    {
      title: 'Profile Views',
      value: '1,248',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Applications',
      value: '45',
      change: '+8.2%',
      trend: 'up',
      icon: Briefcase,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Interview Rate',
      value: '68%',
      change: '+15%',
      trend: 'up',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Avg Response Time',
      value: '2.4 days',
      change: '-0.8 days',
      trend: 'down',
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
    },
  ];

  const quickStats = [
    { label: 'Profile Score', value: '87/100', icon: Star, progress: 87 },
    { label: 'Skills Match', value: '92%', icon: Award, progress: 92 },
    { label: 'Response Rate', value: '76%', icon: TrendingUp, progress: 76 },
    { label: 'Offer Rate', value: '12%', icon: Briefcase, progress: 12 },
  ];

  const recentActivities = [
    { activity: 'Profile updated - Skills section', time: '2 hours ago', type: 'profile' },
    { activity: 'Applied for Senior Frontend Developer', time: '1 day ago', type: 'application' },
    { activity: 'Completed React assessment', time: '2 days ago', type: 'assessment' },
    { activity: 'Interview scheduled with TechCorp', time: '3 days ago', type: 'interview' },
    { activity: 'Received offer from StartupXYZ', time: '1 week ago', type: 'offer' },
  ];

  const topSkills = [
    { skill: 'React.js', level: 'Expert', matches: 45 },
    { skill: 'TypeScript', level: 'Advanced', matches: 38 },
    { skill: 'Node.js', level: 'Intermediate', matches: 32 },
    { skill: 'AWS', level: 'Intermediate', matches: 28 },
    { skill: 'GraphQL', level: 'Advanced', matches: 24 },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <CandidateSidebar />
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-blue-100 rounded w-48 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-white rounded-xl shadow"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Sidebar */}
      <CandidateSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-blue-950">Candidate Analytics</h1>
                  <p className="text-blue-600 mt-2">Track your job search performance and insights</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-lg text-blue-950 hover:bg-blue-50 transition-colors">
                    <Filter size={16} />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors">
                    <Download size={16} />
                    Export Report
                  </button>
                </div>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={18} className="text-blue-600" />
                <div className="flex bg-white border border-blue-200 rounded-lg p-1">
                  {['week', 'month', 'quarter', 'year'].map(range => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeRange === range
                          ? 'bg-blue-950 text-white'
                          : 'text-blue-700 hover:bg-blue-50'
                        }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-blue-100 p-5 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color}`}>
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend === 'up' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      <span className="text-sm font-semibold">{metric.change}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-1">{metric.value}</h3>
                  <p className="text-blue-600 text-sm">{metric.title}</p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Applications Trend Chart */}
              <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-blue-950">Applications Overview</h3>
                    <p className="text-blue-600 text-sm">Monthly application and interview trends</p>
                  </div>
                  <BarChart3 className="text-blue-500" />
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#4b5563" />
                      <YAxis stroke="#4b5563" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="applications" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Applications" />
                      <Bar dataKey="interviews" fill="#10b981" radius={[4, 4, 0, 0]} name="Interviews" />
                      <Bar dataKey="offers" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Offers" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Skills Distribution Pie Chart */}
              <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-blue-950">Skills Distribution</h3>
                    <p className="text-blue-600 text-sm">Your proficiency across key skills</p>
                  </div>
                  <PieChartIcon className="text-blue-500" />
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {skillData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Proficiency']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Performance Trend & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Performance Trend Line Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-blue-100 p-5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-blue-950">Performance Trend</h3>
                    <p className="text-blue-600 text-sm">Weekly assessment score progression</p>
                  </div>
                  <TrendingUp className="text-blue-500" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="week" stroke="#4b5563" />
                      <YAxis stroke="#4b5563" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        fill="url(#colorScore)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-5">
                <h3 className="text-lg font-bold text-blue-950 mb-6">Quick Stats</h3>
                <div className="space-y-4">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-100 rounded-md">
                            <stat.icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-blue-950">{stat.label}</span>
                        </div>
                        <span className="font-bold text-blue-950">{stat.value}</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${stat.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Grid - Interview Stats & Top Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Interview Statistics */}
              <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-5">
                <h3 className="text-lg font-bold text-blue-950 mb-6">Interview Statistics</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={interviewData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={70}
                        innerRadius={30}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {interviewData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} interviews`, 'Count']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Skills in Demand */}
              <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-5">
                <h3 className="text-lg font-bold text-blue-950 mb-6">Top Skills in Demand</h3>
                <div className="space-y-4">
                  {topSkills.map((skill, index) => (
                    <div key={index} className="p-3 border border-blue-100 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-blue-950">{skill.skill}</span>
                        <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {skill.level}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-600">{skill.matches} job matches</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-blue-500' : 'bg-blue-200'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-blue-950">Recent Activities</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View All →
                </button>
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-full ${activity.type === 'profile' ? 'bg-blue-100' :
                        activity.type === 'application' ? 'bg-green-100' :
                          activity.type === 'assessment' ? 'bg-purple-100' : 'bg-amber-100'
                      }`}>
                      {activity.type === 'profile' && <Users className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'application' && <Briefcase className="w-4 h-4 text-green-600" />}
                      {activity.type === 'assessment' && <Award className="w-4 h-4 text-purple-600" />}
                      {activity.type === 'interview' && <Target className="w-4 h-4 text-amber-600" />}
                      {activity.type === 'offer' && <Star className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-950 font-medium">{activity.activity}</p>
                      <p className="text-blue-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-blue-400 text-sm">
              <p>Analytics updated in real-time • Last refresh: Just now</p>
              <p className="mt-1">Need help interpreting your data? <button className="text-blue-600 hover:text-blue-800 font-medium">Contact support</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}