import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Filter, MessageSquare, Send, Paperclip, Smile, MoreVertical,
  ChevronRight, CheckCircle, Clock, AlertCircle, User, Users, Star,
  Video, Phone, Archive, Trash2, Bell, Bookmark, Eye, Share2, Download,
  ChevronLeft, Zap, Cpu, Globe, Shield, Cloud, Smartphone, Wifi, Server,
  Terminal, Home, Briefcase, Calendar, Award, LogOut, Menu, X, TrendingUp,
  BarChart, Image as ImageIcon, FileText, Mic, MapPin, Heart, ThumbsUp,
  CornerUpLeft, MicOff, VideoOff, Volume2, Settings, Maximize2, Minimize2,
  PhoneOff, MessageCircle, Mail, ExternalLink, Flag, UserPlus, HelpCircle,
  ShieldCheck, CheckCircle2, Clock3, DownloadCloud, UploadCloud, Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Sidebar Component
const CandidateSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = { pathname: '/candidate/messages' };

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'Jobs', icon: Briefcase, path: '/candidate/jobs' },
    { label: 'Interviews', icon: Calendar, path: "/candidate/interviews" },
    { label: 'Assessments', icon: Award, path: '/skills-assessment' },
    { label: 'Messages', icon: MessageSquare, path: '/candidate/messages' },
    { label: 'Profile', icon: User, path: "/candidate/profile" },
    { label: 'Analytics', icon: BarChart, path: '/candidate/analytics' },
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

// Main Messages Component
function Messages() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [activeCall, setActiveCall] = useState(null); // null, 'video', or 'audio'
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [typing, setTyping] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const callTimerRef = useRef(null);

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "HR Manager",
      company: "TechCorp Solutions",
      lastMessage: "Great! Let's schedule the next round for Monday.",
      timestamp: "10:30 AM",
      unread: 3,
      online: true,
      typing: false,
      avatarColor: "from-blue-500 to-blue-600",
      messages: [
        { id: 1, text: "Hi! I saw your application for the Senior Frontend Developer position.", sender: "them", time: "10:00 AM", read: true },
        { id: 2, text: "Your portfolio looks impressive!", sender: "them", time: "10:05 AM", read: true },
        { id: 3, text: "Thank you! I'm really excited about this opportunity.", sender: "me", time: "10:15 AM", read: true },
        { id: 4, text: "Great! Let's schedule the next round for Monday.", sender: "them", time: "10:30 AM", read: false },
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Technical Lead",
      company: "InnovateLabs",
      lastMessage: "We need to discuss the system architecture.",
      timestamp: "Yesterday",
      unread: 0,
      online: true,
      typing: true,
      pinned: true,
      avatarColor: "from-purple-500 to-purple-600",
      messages: [
        { id: 1, text: "The technical interview went well!", sender: "them", time: "Yesterday 3:45 PM", read: true },
        { id: 2, text: "We need to discuss the system architecture.", sender: "them", time: "Yesterday 4:20 PM", read: true },
      ]
    },
    {
      id: 3,
      name: "David Rodriguez",
      role: "Recruitment Specialist",
      company: "Wrocus Talent",
      lastMessage: "Your profile has been shortlisted for 5 new opportunities.",
      timestamp: "2 days ago",
      unread: 0,
      online: false,
      pinned: true,
      avatarColor: "from-emerald-500 to-emerald-600",
      messages: [
        { id: 1, text: "Good news! Your profile has been shortlisted.", sender: "them", time: "2 days ago", read: true },
        { id: 2, text: "That's fantastic! Can you share more details?", sender: "me", time: "2 days ago", read: true },
        { id: 3, text: "Your profile has been shortlisted for 5 new opportunities.", sender: "them", time: "2 days ago", read: true },
      ]
    },
    {
      id: 4,
      name: "Emily Watson",
      role: "Product Manager",
      company: "Digital Wave",
      lastMessage: "The offer letter will be sent by EOD.",
      timestamp: "3 days ago",
      unread: 0,
      online: false,
      avatarColor: "from-amber-500 to-amber-600",
      messages: [
        { id: 1, text: "Congratulations! We'd like to extend an offer.", sender: "them", time: "3 days ago", read: true },
        { id: 2, text: "That's wonderful news! Thank you so much.", sender: "me", time: "3 days ago", read: true },
        { id: 3, text: "The offer letter will be sent by EOD.", sender: "them", time: "3 days ago", read: true },
      ]
    },
  ];

  // Stats for the dashboard
  const stats = [
    { label: "Total Messages", value: "48", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50", trend: "+12" },
    { label: "Active Conversations", value: conversations.filter(c => c.online).length.toString(), icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", trend: "Online" },
    { label: "Unread Messages", value: conversations.reduce((sum, c) => sum + c.unread, 0).toString(), icon: Bell, color: "text-amber-600", bg: "bg-amber-50", trend: "New" },
    { label: "Companies Contacted", value: new Set(conversations.map(c => c.company)).size.toString(), icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50", trend: "+5" },
  ];

  // Filter conversations
  const filteredConversations = conversations.filter(convo => {
    if (searchTerm && !convo.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !convo.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !convo.role.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (activeTab === "unread" && convo.unread === 0) return false;
    if (activeTab === "pinned" && !convo.pinned) return false;
    if (activeTab === "online" && !convo.online) return false;
    return true;
  });

  const currentConversation = conversations[selectedConversation];

  // Call management
  useEffect(() => {
    if (activeCall) {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Simulate receiving video/audio stream
      if (videoRef.current) {
        // In a real app, this would be actual video stream
        videoRef.current.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
        videoRef.current.play();
      }
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [activeCall]);

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startVideoCall = () => {
    setActiveCall('video');
    setCallDuration(0);
  };

  const startAudioCall = () => {
    setActiveCall('audio');
    setCallDuration(0);
  };

  const endCall = () => {
    setActiveCall(null);
    setCallDuration(0);
    setIsMuted(false);
    setIsVideoOff(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = "";
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send to a backend
      setNewMessage("");
    }
  };

  const formatTime = (timestamp) => {
    return timestamp;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/10">
      <CandidateSidebar />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-0 lg:pl-72 w-full transition-all duration-300">
        {/* Top Navigation */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-full mx-auto px-6 py-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Professional Messaging</h1>
                <p className="text-sm text-gray-600 mt-1">Communicate with recruiters and hiring teams</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Dashboard
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex bg-gray-100 p-1.5 rounded-xl">
                {['all', 'online', 'unread', 'pinned'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab 
                        ? 'bg-white text-blue-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab === 'all' ? 'All' : tab === 'online' ? 'Online' : tab === 'unread' ? 'Unread' : 'Pinned'}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                {filteredConversations.length} conversations
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-full mx-auto px-6 py-8 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Messages Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row h-[calc(100vh-320px)] min-h-[600px]">
              {/* Left Sidebar - Conversation List */}
              <div className="lg:w-1/3 border-r border-gray-200 flex flex-col">
                {/* Search Bar */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50/50 to-white">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedConversation(index)}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-all group ${
                        selectedConversation === index 
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative">
                          <div className={`w-14 h-14 bg-gradient-to-br ${conversation.avatarColor} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {getInitials(conversation.name)}
                          </div>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                          )}
                          {conversation.pinned && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                              <Star className="w-3 h-3 text-white fill-white" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900 truncate">{conversation.name}</h3>
                              {conversation.typing && (
                                <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                                  typing...
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{formatTime(conversation.timestamp)}</span>
                              {conversation.unread > 0 && (
                                <span className="w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                                  {conversation.unread}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg font-medium">
                              {conversation.role}
                            </span>
                            <span className="text-xs text-gray-500">at</span>
                            <span className="text-xs font-medium text-gray-700 truncate">{conversation.company}</span>
                          </div>
                          
                          <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side - Chat Area */}
              <div className="lg:w-2/3 flex flex-col">
                {/* Chat Header */}
                {currentConversation && (
                  <div className="p-6 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={`w-16 h-16 bg-gradient-to-br ${currentConversation.avatarColor} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                            {getInitials(currentConversation.name)}
                          </div>
                          {currentConversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h2 className="font-bold text-gray-900 text-xl">{currentConversation.name}</h2>
                            {currentConversation.pinned && (
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-sm font-medium text-blue-600">{currentConversation.role}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-600">{currentConversation.company}</span>
                            <span className="text-gray-300">•</span>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              currentConversation.online 
                                ? 'bg-emerald-50 text-emerald-600' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {currentConversation.online ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={startAudioCall}
                          className="p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-xl hover:shadow-md transition-all flex items-center gap-2"
                        >
                          <Phone className="w-5 h-5" />
                          <span className="text-sm font-medium">Call</span>
                        </button>
                        <button 
                          onClick={startVideoCall}
                          className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:shadow-md transition-all flex items-center gap-2"
                        >
                          <Video className="w-5 h-5" />
                          <span className="text-sm font-medium">Video</span>
                        </button>
                        <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages Container */}
                <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white">
                  {currentConversation ? (
                    <div className="space-y-6 max-w-3xl mx-auto">
                      {/* Date Separator */}
                      <div className="flex items-center justify-center">
                        <div className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full">
                          Today
                        </div>
                      </div>

                      {currentConversation.messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[75%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                            <div className={`rounded-2xl p-5 ${message.sender === 'me' 
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none shadow-lg' 
                              : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none shadow-sm'
                            }`}>
                              <p className="text-[15px] leading-relaxed">{message.text}</p>
                              <div className={`flex items-center justify-between mt-3 text-sm ${message.sender === 'me' ? 'text-blue-200' : 'text-gray-500'}`}>
                                <span>{message.time}</span>
                                {message.sender === 'me' && (
                                  <div className="flex items-center gap-1">
                                    {message.read ? (
                                      <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                      <CheckCircle className="w-4 h-4" />
                                    )}
                                    <span className="text-xs">{message.read ? 'Read' : 'Delivered'}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {currentConversation.typing && (
                        <div className="flex justify-start">
                          <div className="max-w-[75%]">
                            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 shadow-sm">
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span className="text-sm text-gray-500">Typing...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center max-w-md">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <MessageSquare className="w-12 h-12 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Start a Conversation</h3>
                        <p className="text-gray-600 mb-6">
                          Select a conversation from the sidebar to start messaging with recruiters and hiring managers
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                            New Message
                          </button>
                          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                            View Contacts
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                {currentConversation && (
                  <div className="p-6 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-4">
                      {/* Attachment Button */}
                      <div className="relative">
                        <button
                          onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                          className="p-3.5 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
                        >
                          <Paperclip className="w-5 h-5 text-gray-600" />
                        </button>
                        
                        <AnimatePresence>
                          {showAttachmentMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute bottom-full left-0 mb-3 w-56 bg-white rounded-xl shadow-xl border border-gray-200 p-3"
                            >
                              <div className="grid grid-cols-2 gap-2">
                                <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <ImageIcon className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <span className="text-xs font-medium">Photo & Video</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <span className="text-xs font-medium">Document</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                    <Mic className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <span className="text-xs font-medium">Voice</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-amber-600" />
                                  </div>
                                  <span className="text-xs font-medium">Location</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Input Field */}
                      <div className="flex-1">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-[15px]"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Smile className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Send Button */}
                      <button
                        onClick={handleSendMessage}
                        className="p-4 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-sm text-gray-500 font-medium">Quick actions:</span>
                      <div className="flex flex-wrap gap-2">
                        <button className="text-sm px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Schedule interview
                        </button>
                        <button className="text-sm px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-2">
                          <UploadCloud className="w-4 h-4" />
                          Send resume
                        </button>
                        <button className="text-sm px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2">
                          <Clock3 className="w-4 h-4" />
                          Share availability
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Video Call Modal */}
      <AnimatePresence>
        {activeCall === 'video' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black z-50 flex flex-col"
          >
            {/* Call Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <h2 className="text-xl font-bold text-white">Video Call with {currentConversation?.name}</h2>
                  <p className="text-sm text-blue-200">{formatCallDuration(callDuration)} • {currentConversation?.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
                </button>
                <button className="p-2.5 hover:bg-white/10 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Video Grid */}
            <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto w-full">
              {/* Remote Video */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 overflow-hidden relative group">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted={false}
                />
                <div className="absolute top-4 left-4 bg-black/60 px-4 py-2 rounded-lg text-sm text-white border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    {currentConversation?.name}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg text-xs text-white">
                  High Quality • 720p
                </div>
              </div>

              {/* Local Video */}
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-950/50 rounded-2xl border border-white/10 overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
                      <span className="text-3xl font-bold text-white">
                        {getInitials(localStorage.getItem('userName') || 'You')}
                      </span>
                    </div>
                    <p className="text-gray-300">Your camera</p>
                    <p className="text-sm text-gray-400 mt-2">Wrocus Secure Video</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded-lg text-sm text-white border border-white/10">
                  You
                </div>
                {isVideoOff && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <div className="text-center">
                      <VideoOff className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-300">Camera is off</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Call Controls */}
            <div className="p-8 bg-black/40 backdrop-blur-md border-t border-white/10">
              <div className="flex items-center justify-center gap-8">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-5 rounded-full transition-all ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                
                <button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-5 rounded-full transition-all ${isVideoOff ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                </button>
                
                <button className="p-5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all">
                  <Volume2 className="w-6 h-6" />
                </button>
                
                <button className="p-5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all">
                  <MessageCircle className="w-6 h-6" />
                </button>
                
                <button 
                  onClick={endCall}
                  className="p-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:shadow-xl hover:scale-110 transition-all"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>End-to-end encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  <span>Connection: Excellent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatCallDuration(callDuration)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Call Modal */}
      <AnimatePresence>
        {activeCall === 'audio' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black z-50 flex flex-col items-center justify-center"
          >
            {/* Call Content */}
            <div className="text-center max-w-2xl p-8">
              {/* Caller Info */}
              <div className="mb-12">
                <div className="w-40 h-40 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <span className="text-5xl font-bold text-white">
                    {getInitials(currentConversation?.name || 'Recruiter')}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{currentConversation?.name}</h2>
                <p className="text-lg text-blue-200">{currentConversation?.role} • {currentConversation?.company}</p>
                <div className="mt-4 text-2xl font-mono text-emerald-400">
                  {formatCallDuration(callDuration)}
                </div>
              </div>

              {/* Call Status */}
              <div className="mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-lg text-emerald-400">Connected</span>
                </div>
                <div className="flex items-center justify-center gap-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Secure connection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    <span>Audio: Excellent</span>
                  </div>
                </div>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center justify-center gap-8">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-6 rounded-full transition-all ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {isMuted ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                </button>
                
                <button className="p-6 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all">
                  <Volume2 className="w-7 h-7" />
                </button>
                
                <button className="p-6 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all">
                  <MessageCircle className="w-7 h-7" />
                </button>
                
                <button 
                  onClick={endCall}
                  className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:shadow-xl hover:scale-110 transition-all"
                >
                  <PhoneOff className="w-7 h-7" />
                </button>
              </div>

              {/* Call Notes */}
              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Call Notes</h3>
                <p className="text-gray-400">
                  Discuss interview feedback, next steps, and offer details
                </p>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Take Notes
                  </button>
                  <button className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors">
                    Share Screen
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Messages;