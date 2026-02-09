import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  Calendar,
  Award,
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
  ChevronRight,
  MessageSquare,
  Bell,
  BarChart3,
  Video,
  MapPin,
  Clock,
  FileText,
  CheckCircle,
  Mic,
  Video as VideoIcon,
  PhoneOff,
  Settings,
  Search,
  Filter,
  Download,
  Share2,
  ExternalLink,
  Star,
  AlertCircle,
  Users,
  Building,
  ChevronDown,
  Eye,
  Bookmark
} from 'lucide-react';

// Sidebar Component
const CandidateSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = { pathname: '/candidate/interviews' };

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'Jobs', icon: Briefcase, path: '/candidate/jobs' },
    { label: 'Interviews', icon: Calendar, path: "/candidate/interviews" },
    { label: 'Assessments', icon: Award, path: '/skills-assessment' },
    { label: 'Messages', icon: MessageSquare, path: '/candidate/messages' },
    { label: 'Profile', icon: User, path: "/candidate/profile" },
    { label: 'Analytics', icon: BarChart3, path: '/candidate/analytics' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const candidateName = localStorage.getItem('userName') || 'Candidate';
  const candidateEmail = localStorage.getItem('userEmail') || 'candidate@example.com';

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-blue-100"
      >
        {isMobileOpen ? <X className="text-blue-950" /> : <Menu className="text-blue-950" />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-blue-950 to-blue-900 text-white z-40 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shrink-0 text-lg font-bold">
                  {candidateName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-base truncate">{candidateName}</h2>
                  <p className="text-xs text-blue-200 truncate">{candidateEmail}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden p-3 flex flex-col justify-between">
              <div className="space-y-0.5">
                {menuItems.map(({ label, icon: Icon, path }) => (
                  <button
                    key={path}
                    onClick={() => { navigate(path); setIsMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive(path) ? 'bg-white text-blue-950 shadow-lg font-semibold' : 'hover:bg-white/10'}`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-blue-950 shrink-0">
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 rounded-lg text-red-200 transition-colors">
                <LogOut size={18} />
                <span className="text-sm font-semibold">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 280 : 80 }}
        className="hidden lg:flex fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white z-40 flex-col shadow-xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="h-20 p-5 border-b border-white/10 flex items-center shrink-0">
          <div className="flex items-center justify-between w-full min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shrink-0 text-lg font-bold">
                {candidateName.charAt(0).toUpperCase()}
              </div>
              {isOpen && (
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-base truncate leading-none mb-1">{candidateName}</h2>
                  <p className="text-[10px] text-blue-200 truncate">{candidateEmail}</p>
                </div>
              )}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors shrink-0 ml-1">
              <ChevronRight className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={16} />
            </button>
          </div>
        </div>

        {/* Navigation Area */}
        <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden">
          <div className="space-y-0.5">
            {menuItems.map(({ label, icon: Icon, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive(path) ? 'bg-white text-blue-950 shadow-lg font-semibold' : 'hover:bg-white/10'} ${!isOpen ? 'justify-center' : ''}`}
              >
                <Icon size={isOpen ? 18 : 22} />
                {isOpen && <span className="text-sm">{label}</span>}
              </button>
            ))}
          </div>

          {/* Compact Profile Boost Section */}
          {isOpen && (
            <div className="mt-auto mb-2 p-2.5 bg-white/5 border border-white/10 rounded-xl shrink-0">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-[11px] font-bold text-white truncate">Profile Boost</h4>
                  <button 
                    onClick={() => navigate('/profile-setup')}
                    className="text-[10px] text-blue-400 font-bold hover:text-white transition-colors cursor-pointer"
                  >
                    Update Now →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Logout - Fixed to Bottom */}
        <div className="p-4 border-t border-white/10 bg-blue-950 shrink-0">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${!isOpen ? 'justify-center' : 'gap-3'} px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 rounded-lg text-red-200 transition-colors shadow-inner`}
          >
            <LogOut size={isOpen ? 18 : 22} />
            {isOpen && <span className="text-sm font-semibold">Logout</span>}
          </button>
          
          {isOpen && (
            <p className="text-center text-[9px] text-blue-500/50 mt-2 uppercase tracking-widest font-bold">
              v2.4.0
            </p>
          )}
        </div>
      </motion.aside>
    </>
  );
};

// Main Interview Management Component
const InterviewManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [viewReport, setViewReport] = useState(null);
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Generate dummy interview data
  const generateInterviews = (count) => {
    const roles = ["Senior Frontend Developer", "Backend Engineer", "Full Stack Developer", 
                  "Product Manager", "UX/UI Designer", "DevOps Specialist", "Data Scientist"];
    const companies = ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Tesla", "Stripe", "Airbnb", "Uber"];
    const platforms = ["Google Meet", "Zoom", "Microsoft Teams"];
    const statuses = ["Today", "Upcoming", "Past"];
    const interviewers = ["Sarah Jenkins", "Michael Chen", "David Rodriguez", 
                         "Emily Watson", "James Wilson", "Lisa Park", "Robert Kim", "Jennifer Lee"];

    return Array.from({ length: count }, (_, i) => {
      const isPast = i < 8;
      const status = i < 2 ? "Today" : i < 8 ? "Upcoming" : "Past";
      const daysOffset = status === "Today" ? 0 : status === "Upcoming" ? i + 1 : -(i - 7);
      
      return {
        id: `INT-${1000 + i}`,
        role: roles[i % roles.length],
        client: companies[i % companies.length],
        date: new Date(Date.now() + daysOffset * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        time: `${9 + (i % 8)}:${i % 2 === 0 ? '00' : '30'} ${(i % 2 === 0 ? 'AM' : 'PM')} - ${10 + (i % 6)}:${i % 2 === 0 ? '30' : '00'} ${(i % 2 === 0 ? 'AM' : 'PM')}`,
        platform: platforms[i % platforms.length],
        status: status,
        interviewer: interviewers[i % interviewers.length],
        meetingId: `meet-${Math.random().toString(36).substr(2, 9)}`,
        duration: i % 3 === 0 ? "30 minutes" : i % 3 === 1 ? "45 minutes" : "60 minutes",
        preparation: ["Technical assessment", "Behavioral questions", "System design"],
        feedback: isPast ? {
          technical: 4.0 + Math.random() * 1.0,
          communication: 4.0 + Math.random() * 1.0,
          problemSolving: 4.0 + Math.random() * 1.0,
          overall: 4.0 + Math.random() * 1.0,
          comments: "Candidate showed strong proficiency in React and System Design. Excellent communication skills and problem-solving approach.",
          strengths: ["Technical expertise", "Communication", "Problem-solving", "Team collaboration"],
          areas: ["Time management", "More real-world examples", "Deep dive questions"]
        } : null
      };
    });
  };

  const dummyInterviews = generateInterviews(15);

  const filteredInterviews = dummyInterviews.filter(interview => {
    if (activeTab === 'upcoming') {
      return interview.status === 'Upcoming' || interview.status === 'Today';
    } else if (activeTab === 'past') {
      return interview.status === 'Past';
    }
    return true; // All tab
  }).filter(interview => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        interview.role.toLowerCase().includes(searchLower) ||
        interview.client.toLowerCase().includes(searchLower) ||
        interview.interviewer.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Today': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'Upcoming': return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white';
      case 'Past': return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Today': return <AlertCircle className="w-4 h-4" />;
      case 'Upcoming': return <Clock className="w-4 h-4" />;
      case 'Past': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
      <CandidateSidebar />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-0 lg:pl-72 w-full transition-all duration-300">
        {/* Top Navigation */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Interview Management</h1>
              <p className="text-sm text-gray-600 mt-1">Schedule, join, and review your interviews</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">{dummyInterviews.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dummyInterviews.filter(i => i.status === 'Upcoming' || i.status === 'Today').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dummyInterviews.filter(i => i.status === 'Past').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-950 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.3/5</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search interviews by role, client, or interviewer..."
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                    showFilters 
                      ? 'bg-blue-900 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>

                <div className="flex bg-gray-100 p-1.5 rounded-xl">
                  {['all', 'upcoming', 'past'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab 
                          ? 'bg-white text-blue-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab === 'all' ? 'All Interviews' : tab === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                      <select className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                        <option value="">All Platforms</option>
                        <option value="zoom">Zoom</option>
                        <option value="google-meet">Google Meet</option>
                        <option value="teams">Microsoft Teams</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Client Company</label>
                      <select className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                        <option value="">All Clients</option>
                        <option value="google">Google</option>
                        <option value="microsoft">Microsoft</option>
                        <option value="amazon">Amazon</option>
                        <option value="meta">Meta</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                      <select className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                        <option value="">All Dates</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                      </select>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => {}}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interviews Grid */}
          <div>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredInterviews.length} interview{filteredInterviews.length !== 1 ? 's' : ''} found
                  {activeTab !== 'all' && (
                    <span className="text-gray-600 font-normal"> ({activeTab} only)</span>
                  )}
                </h2>
                <p className="text-sm text-gray-500">Showing all interviews in grid view</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Showing 1-{filteredInterviews.length} of {filteredInterviews.length}
                </span>
              </div>
            </div>

            {/* FIXED: 3 cards per row on desktop */}
            {filteredInterviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInterviews.map((interview, index) => (
                  <motion.div
                    key={interview.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-xs font-bold text-blue-900">WROCUS</span>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(interview.status)}`}>
                              {getStatusIcon(interview.status)}
                              {interview.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{interview.role}</h3>
                          
                          {/* Client Info */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-blue-600" />
                              <div>
                                <p className="text-sm font-medium text-blue-900">{interview.client}</p>
                                <p className="text-xs text-gray-500">Client Company</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interview Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 flex-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{interview.date}</p>
                              <p className="text-xs text-gray-500">Date</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{interview.time}</p>
                              <p className="text-xs text-gray-500">Time</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 flex-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{interview.interviewer}</p>
                              <p className="text-xs text-gray-500">Interviewer</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <Video className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{interview.platform}</p>
                              <p className="text-xs text-gray-500">Platform</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <p className="text-sm font-medium text-blue-900">Meeting ID</p>
                            </div>
                            <code className="text-xs font-mono text-blue-700 bg-white px-2 py-1 rounded">
                              {interview.meetingId}
                            </code>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {interview.status === 'Past' ? (
                          <button
                            onClick={() => setViewReport(interview)}
                            className="flex-1 py-3 bg-blue-950 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            View Feedback
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveMeeting(interview)}
                            className="flex-1 py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <VideoIcon className="w-4 h-4" />
                            Join Interview
                          </button>
                        )}
                        
                        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group-hover:border-blue-200">
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No interviews found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  {searchTerm 
                    ? `No results found for "${searchTerm}". Try different search terms.`
                    : `No ${activeTab === 'all' ? '' : activeTab + ' '}interviews scheduled.`
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveTab('all');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    View All Interviews
                  </button>
                  <button
                    onClick={() => navigate('/candidate/jobs')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Explore Jobs
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Meeting Modal */}
      <AnimatePresence>
        {activeMeeting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-950 to-black z-50 flex flex-col"
          >
            {/* Meeting Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <h2 className="text-xl font-bold text-white">{activeMeeting.client} Interview</h2>
                  <p className="text-sm text-blue-200">{activeMeeting.role} • Scheduled via Wrocus</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg border border-white/20">
                  {activeMeeting.platform}
                </span>
                <button
                  onClick={() => setActiveMeeting(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Video Grid */}
            <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto w-full">
              {/* Interviewer View */}
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-950/50 rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-white">
                    {activeMeeting.interviewer.split(' ')[0][0]}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{activeMeeting.interviewer}</h3>
                <p className="text-blue-200 font-medium">Interviewer</p>
                <p className="text-sm text-blue-300 mt-2">{activeMeeting.client}</p>
                <div className="mt-6 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-sm text-white/80">Waiting for you to join...</p>
                </div>
              </div>

              {/* Candidate View */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-2xl border border-white/10 overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-white">You</span>
                    </div>
                    <p className="text-gray-300">Your camera preview</p>
                    <p className="text-sm text-gray-400 mt-2">via Wrocus Platform</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded-lg text-sm text-white border border-white/10">
                  Candidate Preview
                </div>
              </div>
            </div>

            {/* Meeting Controls */}
            <div className="p-6 bg-black/40 backdrop-blur-md border-t border-white/10">
              <div className="flex items-center justify-center gap-6">
                <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all group">
                  <Mic className="w-6 h-6 text-white group-hover:scale-110" />
                </button>
                <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all group">
                  <VideoIcon className="w-6 h-6 text-white group-hover:scale-110" />
                </button>
                <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all group">
                  <Settings className="w-6 h-6 text-white group-hover:scale-110" />
                </button>
                <button
                  onClick={() => setActiveMeeting(null)}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <PhoneOff className="w-5 h-5" />
                  Leave Meeting
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Report Modal */}
      <AnimatePresence>
        {viewReport && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-blue-100 text-blue-900 text-sm font-bold rounded-lg">
                      WROCUS
                    </div>
                    <span className="text-sm text-gray-500">Interview Feedback</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{viewReport.role}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    at {viewReport.client} • {viewReport.date}
                  </p>
                </div>
                <button
                  onClick={() => setViewReport(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Score Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-900 font-medium mb-1">Technical Skills</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-blue-900">{viewReport.feedback.technical.toFixed(1)}</span>
                    <span className="text-sm text-blue-700">/5</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                  <p className="text-sm text-emerald-900 font-medium mb-1">Communication</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-emerald-900">{viewReport.feedback.communication.toFixed(1)}</span>
                    <span className="text-sm text-emerald-700">/5</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
                  <p className="text-sm text-amber-900 font-medium mb-1">Problem Solving</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-amber-900">{viewReport.feedback.problemSolving.toFixed(1)}</span>
                    <span className="text-sm text-amber-700">/5</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <p className="text-sm text-purple-900 font-medium mb-1">Overall Score</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-purple-900">{viewReport.feedback.overall.toFixed(1)}</span>
                    <span className="text-sm text-purple-700">/5</span>
                  </div>
                </div>
              </div>

              {/* Feedback Details */}
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Interviewer's Comments
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-gray-700 leading-relaxed italic">"{viewReport.feedback.comments}"</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Key Strengths</h4>
                    <div className="space-y-2">
                      {viewReport.feedback.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm text-emerald-900">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Areas for Development</h4>
                    <div className="space-y-2">
                      {viewReport.feedback.areas.map((area, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <AlertCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-900">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Feedback
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InterviewManagement;