import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Filter, Clock, Award, CheckCircle, AlertCircle, Play,
  ChevronRight, Brain, Code, Database, Layout, BarChart, Users,
  Mic, Video, X, FileText, Check, AlertTriangle, Star, Target,
  TrendingUp, Bookmark, Eye, Share2, Download, ChevronLeft, Zap,
  Cpu, Globe, Shield, Cloud, Smartphone, Wifi, Server, Terminal,
  Home, Briefcase, Calendar, MessageSquare, User, LogOut, Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Sidebar Component
const CandidateSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = { pathname: '/skills-assessment' };

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

// Main Skill Assessment Component
function SkillAssessment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewingReport, setViewingReport] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Questions data
  const dummyQuestions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: [
      "What is the primary purpose of React's Virtual DOM?",
      "Which hook is used to handle side effects in functional components?",
      "How do you pass data from a parent component to a child?",
      "What does 'Lifting State Up' mean in React?",
      "Which command is used to create a new React app?",
      "What is the purpose of 'key' prop in lists?",
      "Explain the use of the 'useMemo' hook.",
      "What is Redux used for?",
      "Which lifecycle method runs after the component renders?",
      "How can you optimize a React component's performance?",
      "What is JSX?",
      "What is the difference between state and props?",
      "What is a Higher-Order Component?",
      "How do you handle forms in React?",
      "What is the use of 'useContext' hook?",
      "What are 'Fragments' used for?",
      "What is the significance of the 'default' keyword in exports?",
      "How do you conditionally render a component?",
      "What is the purpose of 'React.StrictMode'?",
      "What is the difference between Shadow DOM and Virtual DOM?"
    ][i],
    options: [
      "Optimize rendering performance by minimizing direct DOM manipulation",
      "Handle side effects in class components only",
      "Pass data through global variables",
      "Directly manipulate the browser DOM"
    ],
    correct: 0,
    explanation: "Virtual DOM improves performance by creating a lightweight copy of the real DOM and updating only the changed parts."
  }));

  // Timer Logic
  useEffect(() => {
    let timer;
    if (activeTest) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTest]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleEndAssessment = () => {
    setActiveTest(null);
    setCurrentQuestionIndex(0);
    setTimeLeft(1800);
    setUserAnswers({});
  };

  const handleSubmitAssessment = () => {
    const correctAnswers = Object.keys(userAnswers).filter(
      (qIndex) => userAnswers[qIndex] === dummyQuestions[qIndex].correct
    ).length;
    const score = Math.round((correctAnswers / dummyQuestions.length) * 100);
    
    const result = {
      id: activeTest.id,
      title: activeTest.title,
      date: new Date().toISOString().split('T')[0],
      score: score,
      status: score >= 70 ? "Passed" : "Failed",
      correctAnswers: correctAnswers,
      totalQuestions: dummyQuestions.length,
      timeSpent: formatTime(1800 - timeLeft)
    };
    
    setActiveTest(null);
    setViewingReport(result);
    setCurrentQuestionIndex(0);
    setTimeLeft(1800);
    setUserAnswers({});
  };

  const stats = [
    { label: "Total Assessments", value: "24", icon: Award, color: "text-blue-600", bg: "bg-blue-50", trend: "+12%" },
    { label: "Average Score", value: "88%", icon: BarChart, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+5%" },
    { label: "Skills Certified", value: "18", icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-50", trend: "+3" },
    { label: "Time Spent", value: "42h", icon: Clock, color: "text-amber-600", bg: "bg-amber-50", trend: "This month" },
  ];

  const categories = [
    { id: "all", label: "All Skills", icon: Brain, count: 20, color: "bg-gradient-to-r from-blue-600 to-blue-700" },
    { id: "frontend", label: "Frontend", icon: Layout, count: 8, color: "bg-gradient-to-r from-purple-600 to-purple-700" },
    { id: "backend", label: "Backend", icon: Server, count: 6, color: "bg-gradient-to-r from-emerald-600 to-emerald-700" },
    { id: "database", label: "Database", icon: Database, count: 4, color: "bg-gradient-to-r from-amber-600 to-amber-700" },
    { id: "devops", label: "DevOps", icon: Terminal, count: 2, color: "bg-gradient-to-r from-red-600 to-red-700" },
  ];

  const availableTests = [
    {
      id: 1,
      title: "React.js Advanced Assessment",
      category: "Frontend",
      level: "Expert",
      questions: 20,
      duration: "30 mins",
      icon: Code,
      tags: ["Hooks", "Redux", "Performance"],
      status: "Start",
      company: "Wrocus Certified",
      popularity: 95,
      description: "Advanced React patterns, hooks, and performance optimization techniques",
      completion: 85
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      category: "Backend",
      level: "Intermediate",
      questions: 20,
      duration: "30 mins",
      icon: Database,
      tags: ["Express", "API", "Async/Await"],
      status: "Start",
      company: "Wrocus Certified",
      popularity: 88,
      description: "Server-side JavaScript, REST APIs, and asynchronous programming",
      completion: 72
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      category: "Frontend",
      level: "Beginner",
      questions: 20,
      duration: "25 mins",
      icon: Code,
      tags: ["ES6", "Promises", "Functions"],
      status: "Start",
      company: "Wrocus Certified",
      popularity: 92,
      description: "Core JavaScript concepts and modern ES6+ features",
      completion: 90
    },
    {
      id: 4,
      title: "TypeScript Mastery",
      category: "Frontend",
      level: "Intermediate",
      questions: 20,
      duration: "30 mins",
      icon: Code,
      tags: ["Types", "Interfaces", "Generics"],
      status: "Start",
      company: "Wrocus Certified",
      popularity: 85,
      description: "Static typing and advanced TypeScript features",
      completion: 68
    },
    {
      id: 5,
      title: "AWS Cloud Fundamentals",
      category: "DevOps",
      level: "Intermediate",
      questions: 20,
      duration: "35 mins",
      icon: Cloud,
      tags: ["EC2", "S3", "Lambda"],
      status: "Start",
      company: "Wrocus Certified",
      popularity: 90,
      description: "Cloud computing concepts and AWS core services",
      completion: 45
    },
    {
      id: 6,
      title: "SQL & Database Design",
      category: "Database",
      level: "Intermediate",
      questions: 20,
      duration: "30 mins",
      icon: Database,
      tags: ["Queries", "Indexes", "Normalization"],
      status: "Start",
      company: "Wrocus Certified",
      popularity: 82,
      description: "Database design principles and SQL optimization",
      completion: 78
    },
  ];

  const pastResults = [
    { id: 101, title: "React.js Advanced Assessment", date: "2024-12-10", score: 92, status: "Passed", time: "28:42", category: "Frontend" },
    { id: 102, title: "JavaScript Fundamentals", date: "2024-11-20", score: 45, status: "Failed", time: "22:15", category: "Frontend" },
    { id: 103, title: "Node.js Backend Development", date: "2024-11-18", score: 78, status: "Passed", time: "29:55", category: "Backend" },
    { id: 104, title: "TypeScript Mastery", date: "2024-11-15", score: 88, status: "Passed", time: "26:30", category: "Frontend" },
    { id: 105, title: "AWS Cloud Fundamentals", date: "2024-11-12", score: 65, status: "Passed", time: "31:20", category: "DevOps" },
    { id: 106, title: "SQL & Database Design", date: "2024-11-10", score: 40, status: "Failed", time: "24:10", category: "Database" },
  ];

  const filteredTests = availableTests.filter(test => {
    if (selectedCategory !== "all" && test.category.toLowerCase() !== selectedCategory) return false;
    if (searchTerm && !test.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !test.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
    return true;
  });

  const filteredResults = pastResults.filter(result => {
    if (searchTerm && !result.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getLevelColor = (level) => {
    switch(level) {
      case "Beginner": return "bg-gradient-to-r from-emerald-500 to-emerald-600";
      case "Intermediate": return "bg-gradient-to-r from-blue-500 to-blue-600";
      case "Advanced": return "bg-gradient-to-r from-purple-500 to-purple-600";
      case "Expert": return "bg-gradient-to-r from-red-500 to-red-600";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/10">
      <CandidateSidebar />
      
      {/* Main Content - Perfectly aligned */}
      <main className="flex-1 lg:ml-0 lg:pl-72 w-full transition-all duration-300">
        {/* Top Navigation */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Skill Assessment Center</h1>
                <p className="text-sm text-gray-600 mt-1">Validate your expertise with industry-standard tests</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <Award className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  Dashboard
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex items-center gap-6">
              <div className="flex bg-gray-100 p-1.5 rounded-xl">
                {['browse', 'history'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab 
                        ? 'bg-white text-blue-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab === 'browse' ? 'Browse Tests' : 'Assessment History'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
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
              </div>
            ))}
          </div>

          {/* Search and Categories */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search assessments by title, skill, or technology..."
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Button */}
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
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? `${category.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{category.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-white/20'
                      : 'bg-white'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Browse Tests Section */}
          {activeTab === 'browse' ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {filteredTests.length} assessment{filteredTests.length !== 1 ? 's' : ''} available
                  </h2>
                  <p className="text-sm text-gray-500">Wrocus-certified skill validations</p>
                </div>
              </div>

              {/* Tests Grid - Perfect 3 column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.map((test, index) => (
                  <motion.div
                    key={test.id}
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
                              <span className="text-xs font-bold text-blue-900">WROCUS CERTIFIED</span>
                            </div>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg ${getLevelColor(test.level)} text-white`}>
                              {test.level}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{test.title}</h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{test.description}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">{test.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">{test.questions} Q</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-bold text-gray-900">{test.popularity}%</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Completion Rate</span>
                            <span className="font-medium text-gray-700">{test.completion}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                              style={{ width: `${test.completion}%` }}
                            />
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {test.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg border border-gray-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => setActiveTest(test)}
                        className="w-full py-3.5 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        <Play className="w-5 h-5" />
                        Start Assessment
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* Results History */
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Assessment History</h2>
                  <p className="text-sm text-gray-500">Track your progress and performance</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assessment</th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredResults.map((result) => (
                        <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                result.category === 'Frontend' ? 'bg-blue-50 text-blue-600' :
                                result.category === 'Backend' ? 'bg-emerald-50 text-emerald-600' :
                                'bg-purple-50 text-purple-600'
                              }`}>
                                {result.category === 'Frontend' ? <Code className="w-5 h-5" /> :
                                 result.category === 'Backend' ? <Server className="w-5 h-5" /> :
                                 <Database className="w-5 h-5" />}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{result.title}</h4>
                                <p className="text-sm text-gray-500">{result.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <span className="text-gray-700">{result.date}</span>
                          </td>
                          <td className="py-5 px-6">
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold ${
                              result.score >= 70 
                                ? 'bg-emerald-50 text-emerald-700' 
                                : 'bg-red-50 text-red-700'
                            }`}>
                              {result.score}%
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                              result.status === 'Passed'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-red-50 text-red-700'
                            }`}>
                              {result.status === 'Passed' ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <AlertCircle className="w-3 h-3" />
                              )}
                              {result.status}
                            </span>
                          </td>
                          <td className="py-5 px-6">
                            <span className="text-gray-700 font-medium">{result.time}</span>
                          </td>
                          <td className="py-5 px-6">
                            <button
                              onClick={() => setViewingReport(result)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm"
                            >
                              View Report
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Active Assessment Modal */}
      <AnimatePresence>
        {activeTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-950 to-black z-50 flex flex-col"
          >
            {/* Assessment Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <h2 className="text-xl font-bold text-white">{activeTest.title}</h2>
                  <p className="text-sm text-blue-200">Wrocus Certified Assessment • Question {currentQuestionIndex + 1} of 20</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-lg font-mono flex items-center gap-2 ${
                  timeLeft < 300 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                }`}>
                  <Clock className="w-4 h-4" />
                  {formatTime(timeLeft)}
                </div>
                <button
                  onClick={handleEndAssessment}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  End Assessment
                </button>
              </div>
            </div>

            {/* Assessment Content */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Sidebar */}
              <div className="w-full lg:w-1/4 p-6 border-r border-white/10 bg-black/20 flex flex-col gap-6">
                {/* Camera Preview */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-white/10 p-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center mb-4">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Proctoring Active</p>
                  <p className="text-xs text-gray-500 mt-1">AI-powered monitoring</p>
                </div>

                {/* Progress */}
                <div className="bg-black/40 rounded-xl border border-white/10 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">Question Progress</h3>
                    <span className="text-xs text-gray-400">{currentQuestionIndex + 1}/20</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {dummyQuestions.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentQuestionIndex(i)}
                        className={`h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                          currentQuestionIndex === i
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                            : userAnswers[i] !== undefined
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-black/40 rounded-xl border border-white/10 p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Assessment Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Answered</span>
                      <span className="text-white font-medium">
                        {Object.keys(userAnswers).length}/20
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Time Used</span>
                      <span className="text-white font-medium">
                        {formatTime(1800 - timeLeft)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Question Area */}
              <div className="flex-1 p-6 lg:p-12 overflow-y-auto bg-black/10">
                <div className="max-w-3xl mx-auto">
                  {/* Question Header */}
                  <div className="mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm rounded-xl">
                      <FileText className="w-4 h-4" />
                      Question {currentQuestionIndex + 1} of 20
                    </span>
                  </div>

                  {/* Question */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 leading-relaxed">
                    {dummyQuestions[currentQuestionIndex].question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-4 mb-12">
                    {dummyQuestions[currentQuestionIndex].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => setUserAnswers({...userAnswers, [currentQuestionIndex]: i})}
                        className={`w-full p-6 rounded-xl border text-left transition-all duration-300 ${
                          userAnswers[currentQuestionIndex] === i
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-600 text-white shadow-lg'
                            : 'border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            userAnswers[currentQuestionIndex] === i
                              ? 'bg-white/20'
                              : 'bg-white/5'
                          }`}>
                            <span className="font-bold text-lg">{String.fromCharCode(65 + i)}</span>
                          </div>
                          <span className="text-lg">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentQuestionIndex(i => i - 1)}
                      disabled={currentQuestionIndex === 0}
                      className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all ${
                        currentQuestionIndex === 0
                          ? 'text-gray-500 cursor-not-allowed'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>
                    
                    <button
                      onClick={() => {
                        if (currentQuestionIndex < 19) {
                          setCurrentQuestionIndex(i => i + 1);
                        } else {
                          handleSubmitAssessment();
                        }
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                    >
                      {currentQuestionIndex === 19 ? 'Submit Assessment' : 'Next Question'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <AnimatePresence>
        {viewingReport && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="px-3 py-1.5 bg-blue-100 text-blue-900 text-sm font-bold rounded-lg">
                        WROCUS ASSESSMENT REPORT
                      </div>
                      <span className="text-sm text-gray-500">{viewingReport.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{viewingReport.title}</h2>
                    <p className="text-sm text-gray-600 mt-2">Detailed performance analysis and insights</p>
                  </div>
                  <button
                    onClick={() => setViewingReport(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Score Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-900 font-medium mb-2">Overall Score</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-blue-900">{viewingReport.score}%</span>
                    </div>
                    <div className={`mt-2 text-sm font-medium ${viewingReport.score >= 70 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {viewingReport.status}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border border-emerald-200">
                    <p className="text-sm text-emerald-900 font-medium mb-2">Correct Answers</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-emerald-900">{viewingReport.correctAnswers || Math.round(viewingReport.score * 20 / 100)}</span>
                      <span className="text-lg text-emerald-700">/20</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-200">
                    <p className="text-sm text-amber-900 font-medium mb-2">Time Spent</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-amber-900">{viewingReport.timeSpent}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
                    <p className="text-sm text-purple-900 font-medium mb-2">Performance</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-purple-900">
                        {viewingReport.score >= 90 ? 'Excellent' : 
                         viewingReport.score >= 70 ? 'Good' : 
                         viewingReport.score >= 50 ? 'Average' : 'Needs Improvement'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="p-8 overflow-y-auto max-h-[60vh]">
                <div className="space-y-8">
                  {/* Detailed Analysis */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BarChart className="w-5 h-5 text-blue-600" />
                      Performance Analysis
                    </h3>
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Accuracy Rate</span>
                            <span className="text-sm font-bold text-gray-900">{viewingReport.score}%</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                              style={{ width: `${viewingReport.score}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Completion Speed</span>
                            <span className="text-sm font-bold text-gray-900">Average</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full w-3/4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900">Practice More</p>
                          <p className="text-sm text-blue-700">Focus on React Hooks and State Management patterns</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                        <TrendingUp className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-emerald-900">Strengths</p>
                          <p className="text-sm text-emerald-700">Strong understanding of JavaScript fundamentals and ES6+ features</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-3">
                  <button className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button className="flex-1 py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Results
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SkillAssessment;