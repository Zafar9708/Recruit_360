import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  Award, 
  Briefcase, 
  Download, 
  Edit, 
  LogOut, 
  CheckCircle, 
  Clock,
  MapPin,
  Video,
  Phone,
  Mail,
  TrendingUp,
  Target,
  Bell,
  Settings,
  Search,
  FileText,
  Users,
  BarChart3,
  ArrowUpRight,
  Sparkles,
  Eye,
  Heart,
  Share2,
  Building2,
  Rocket,
  ChevronRight,
  Headset
} from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import CandidateSidebar from '../components/CandidateSidebar';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [profileData] = useState(JSON.parse(localStorage.getItem('profileData') || '{}'));

  const profileCompleteness = 95;

  const upcomingInterviews = [
    {
      id: 1,
      company: 'TechCorp',
      logo: 'TC',
      role: 'Senior Developer',
      date: 'Dec 22, 2025',
      time: '10:00 AM',
      mode: 'Online',
      link: 'https://meet.google.com/abc-defg-hij',
      color: 'from-blue-500 to-cyan-500',
      status: 'Confirmed'
    },
    {
      id: 2,
      company: 'InnovateLabs',
      logo: 'IL',
      role: 'Full Stack Engineer',
      date: 'Dec 25, 2025',
      time: '2:00 PM',
      mode: 'Offline',
      address: '123 Tech Park, Bangalore',
      color: 'from-purple-500 to-pink-500',
      status: 'Pending'
    },
    {
      id: 3,
      company: 'DataVision',
      logo: 'DV',
      role: 'Data Scientist',
      date: 'Dec 28, 2025',
      time: '11:00 AM',
      mode: 'Online',
      link: 'https://zoom.us/j/123456789',
      color: 'from-green-500 to-emerald-500',
      status: 'Confirmed'
    },
  ];

  const applicationStats = [
    { name: 'Applied', value: 15, color: '#3b82f6' },
    { name: 'Screening', value: 8, color: '#8b5cf6' },
    { name: 'Interviews', value: 5, color: '#10b981' },
    { name: 'Offers', value: 2, color: '#f59e0b' },
  ];

  const weeklyActivity = [
    { day: 'Mon', applications: 3, interviews: 0 },
    { day: 'Tue', applications: 5, interviews: 1 },
    { day: 'Wed', applications: 2, interviews: 0 },
    { day: 'Thu', applications: 4, interviews: 2 },
    { day: 'Fri', applications: 1, interviews: 1 },
    { day: 'Sat', applications: 0, interviews: 0 },
    { day: 'Sun', applications: 0, interviews: 1 },
  ];

  const jobMatches = [
    {
      id: 1,
      company: 'CloudSystems',
      role: 'Cloud Architect',
      match: 95,
      salary: '$120K - $150K',
      location: 'Remote',
      type: 'Full-time',
      posted: '2 days ago'
    },
    {
      id: 2,
      company: 'AI Innovations',
      role: 'ML Engineer',
      match: 88,
      salary: '$110K - $140K',
      location: 'San Francisco',
      type: 'Full-time',
      posted: '1 week ago'
    },
    {
      id: 3,
      company: 'SecureNet',
      role: 'Security Engineer',
      match: 82,
      salary: '$100K - $130K',
      location: 'New York',
      type: 'Full-time',
      posted: '3 days ago'
    },
  ];

  const recentActivity = [
    { action: 'Application viewed', company: 'TechCorp', time: '2 hours ago', icon: Eye },
    { action: 'Profile saved', company: 'InnovateLabs', time: '5 hours ago', icon: Heart },
    { action: 'Interview scheduled', company: 'DataVision', time: '1 day ago', icon: Calendar },
    { action: 'Application submitted', company: 'CloudSystems', time: '2 days ago', icon: FileText },
  ];

  const hrContact = {
    name: 'Sarah Johnson',
    email: 'sarah.j@careerlaunch.com',
    phone: '+1 (555) 123-4567',
    avatar: 'SJ'
  };

  const stats = [
    { 
      label: 'Profile Views', 
      value: '2,847', 
      change: '+12%', 
      icon: Eye, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Applications', 
      value: '15', 
      change: '+3 this week', 
      icon: FileText, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      label: 'Interviews', 
      value: '5', 
      change: '+2 scheduled', 
      icon: Calendar, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      label: 'Job Matches', 
      value: '28', 
      change: 'High match', 
      icon: Target, 
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const downloadProfile = () => {
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'profile.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <CandidateSidebar />
      
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {localStorage.getItem('userName') || 'User'}! 👋
              </h1>
              <p className="text-gray-600">Here's what's happening with your job search today</p>
            </div>
            <Link to="/schedule-interview">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r  from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden md:inline">AI Interview</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
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

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Profile Completeness */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Profile Strength</h3>
                <p className="text-gray-600">Keep your profile updated to attract employers</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600  rounded-2xl flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">Completion Progress</span>
                <span className="text-2xl font-bold text-cyan-600">{profileCompleteness}%</span>
              </div>
              <Progress.Root className="relative h-4 overflow-hidden rounded-full bg-gray-100">
                <Progress.Indicator
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-600  transition-all duration-1000 ease-out relative"
                  style={{ width: `${profileCompleteness}%` }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </Progress.Indicator>
              </Progress.Root>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Edit className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900" onClick={()=>navigate("/profile-setup")}>Edit Profile</span>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={downloadProfile}
                className="flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Download Resume</span>
                </div>
                <ChevronRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Share Profile</span>
                </div>
                <ChevronRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Settings</span>
                </div>
                <ChevronRight className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* HR Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-600 to-cyan-600  rounded-2xl shadow-xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Headset className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Need Help?</h3>
                  <p className="text-blue-100 text-sm">Talk to your HR</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">{hrContact.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{hrContact.name}</p>
                    <p className="text-blue-100 text-sm">Career Advisor</p>
                  </div>
                </div>

                <a href={`mailto:${hrContact.email}`} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{hrContact.email}</span>
                </a>

                <a href={`tel:${hrContact.phone}`} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{hrContact.phone}</span>
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transition-all"
              >
                Schedule Call
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Charts and Activity */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Application Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Application Pipeline</h3>
                <p className="text-gray-600">Track your application progress</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={applicationStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-4 gap-4 mt-6">
              {applicationStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: stat.color }} />
                  <p className="text-xs text-gray-600">{stat.name}</p>
                  <p className="font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Weekly Activity</h3>
                <p className="text-gray-600">Your job search momentum</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>

            <ResponsiveContainer width="100%" height={250}>
  <LineChart data={weeklyActivity}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
    <XAxis dataKey="day" stroke="#666" />
    <YAxis stroke="#666" />
    <Tooltip 
      contentStyle={{ 
        backgroundColor: 'white', 
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }} 
    />

    {/* Blue Line */}
    <Line 
      type="monotone" 
      dataKey="applications" 
      stroke="#3b82f6"   // blue-500
      strokeWidth={3}
      dot={{ fill: '#3b82f6', r: 5 }}
      activeDot={{ r: 7 }}
    />

    {/* Purple Line */}
    <Line 
      type="monotone" 
      dataKey="interviews" 
      stroke="#8b5cf6"   // purple-500
      strokeWidth={3}
      dot={{ fill: '#8b5cf6', r: 5 }}
      activeDot={{ r: 7 }}
    />
  </LineChart>
</ResponsiveContainer>


            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm text-gray-600">Interviews</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Upcoming Interviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Upcoming Interviews</h3>
              <p className="text-gray-600">You have {upcomingInterviews.length} interviews scheduled</p>
            </div>
            <Link to="/schedule-interview">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all font-medium"
              >
                <Calendar className="w-5 h-5" />
                Schedule New
              </motion.button>
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingInterviews.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 5, scale: 1.01 }}
                className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all cursor-pointer group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${interview.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-white font-bold text-xl">{interview.logo}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{interview.company}</h4>
                      <p className="text-gray-600">{interview.role}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      interview.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {interview.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      {interview.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      {interview.time}
                    </div>
                    <div className="flex items-center gap-2">
                      {interview.mode === 'Online' ? (
                        <>
                          <Video className="w-4 h-4 text-green-600" />
                          <span>Online</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4 text-orange-600" />
                          <span>Offline</span>
                        </>
                      )}
                    </div>
                  </div>

                  {interview.mode === 'Online' && interview.link && (
                    <motion.a
                      href={interview.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg hover:bg--700 transition-all text-sm font-medium"
                    >
                      <Video className="w-4 h-4" />
                      Join Meeting
                    </motion.a>
                  )}

                  {interview.mode === 'Offline' && interview.address && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-orange-600 mt-0.5" />
                      <span>{interview.address}</span>
                    </div>
                  )}
                </div>

                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Job Matches and Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Job Matches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Top Job Matches</h3>
                <p className="text-gray-600">AI-powered recommendations</p>
              </div>
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>

            <div className="space-y-4">
              {jobMatches.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="p-4 bg-gradient-to-r from-gray-50 to-purple-50/50 rounded-xl border border-gray-100 hover:border-purple-200 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{job.role}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{job.match}%</div>
                      <p className="text-xs text-gray-500">Match</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {job.salary}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {job.location}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{job.posted}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-br from-blue-600 to-cyan-600  text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
                    >
                     Interested ?
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Recent Activity</h3>
                <p className="text-gray-600">Your latest updates</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.company}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full mt-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
            >
              View All Activity
            </motion.button>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}