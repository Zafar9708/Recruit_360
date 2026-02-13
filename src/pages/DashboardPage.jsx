import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Headset,
  ChevronDown,
  ExternalLink,
  Brain,
  AlertCircle,
  Zap,
  Code,
  MessageSquare,
  Trophy,
  X,
  Check
} from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import CandidateSidebar from '../components/CandidateSidebar';

export default function DashboardPage() {
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const [profileData] = useState(JSON.parse(localStorage.getItem('profileData') || '{}'));
  const [interviewData] = useState(() => {
    const saved = localStorage.getItem('aiInterviewData');
    return saved ? JSON.parse(saved) : null;
  });
  const [showInterviewPopup, setShowInterviewPopup] = useState(false);
  const [popupMounted, setPopupMounted] = useState(false);
  
  // New state for job applications and success messages
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem('appliedJobs');
    return saved ? JSON.parse(saved) : [];
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  const [selectedJobMatch, setSelectedJobMatch] = useState(null);

  const profileCompleteness = 95;

  // Show popup after 5 seconds if no interview taken
  useEffect(() => {
    if (!interviewData) {
      const timer = setTimeout(() => {
        setShowInterviewPopup(true);
        setPopupMounted(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [interviewData]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowInterviewPopup(false);
      }
    };

    if (showInterviewPopup) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showInterviewPopup]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (showInterviewPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showInterviewPopup]);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

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
      color: 'bg-gradient-to-br from-blue-600 to-blue-700',
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
      color: 'bg-gradient-to-br from-purple-600 to-purple-700',
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
      color: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
      status: 'Confirmed'
    },
  ];

  const applicationStats = [
    { name: 'Applied', value: 15 + appliedJobs.length, color: '#1e40af' },
    { name: 'Screening', value: 8, color: '#4f46e5' },
    { name: 'Interviews', value: 5, color: '#059669' },
    { name: 'Offers', value: 2, color: '#d97706' },
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
      posted: '2 days ago',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'Python'],
      experience: '5+ years',
      description: 'Looking for an experienced Cloud Architect to design and implement cloud infrastructure solutions.'
    },
    {
      id: 2,
      company: 'AI Innovations',
      role: 'ML Engineer',
      match: 88,
      salary: '$110K - $140K',
      location: 'San Francisco',
      type: 'Full-time',
      posted: '1 week ago',
      skills: ['TensorFlow', 'PyTorch', 'Python', 'Computer Vision'],
      experience: '3+ years',
      description: 'Join our AI team to develop cutting-edge machine learning models for computer vision applications.'
    },
    {
      id: 3,
      company: 'SecureNet',
      role: 'Security Engineer',
      match: 82,
      salary: '$100K - $130K',
      location: 'New York',
      type: 'Full-time',
      posted: '3 days ago',
      skills: ['Network Security', 'Penetration Testing', 'Python', 'AWS Security'],
      experience: '4+ years',
      description: 'Seeking a Security Engineer to protect our infrastructure and conduct security assessments.'
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
      color: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-900',
      textColor: 'text-blue-900'
    },
    { 
      label: 'Applications', 
      value: String(15 + appliedJobs.length), 
      change: `+${appliedJobs.length} this week`, 
      icon: FileText, 
      color: 'bg-gradient-to-br from-blue-50/50 to-white',
      iconColor: 'text-blue-900',
      textColor: 'text-gray-900'
    },
    { 
      label: 'Interviews', 
      value: '5', 
      change: '+2 scheduled', 
      icon: Calendar, 
      color: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-900',
      textColor: 'text-blue-900'
    },
    { 
      label: 'Job Matches', 
      value: '28', 
      change: 'High match', 
      icon: Target, 
      color: 'bg-gradient-to-br from-blue-50/50 to-white',
      iconColor: 'text-blue-900',
      textColor: 'text-gray-900'
    },
  ];

  const handleStartAIInterview = () => {
    setShowInterviewPopup(false);
    navigate('/ai-interview');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  const getLevelColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'expert': return 'text-emerald-700 bg-emerald-100';
      case 'advanced': return 'text-blue-700 bg-blue-100';
      case 'intermediate': return 'text-amber-700 bg-amber-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

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

  // Handle apply for job
  const handleApplyJob = (job) => {
    // Check if already applied
    if (appliedJobs.some(j => j.id === job.id)) {
      setShowSuccessMessage({
        type: 'info',
        message: `You've already applied for ${job.role} at ${job.company}`
      });
      return;
    }

    // Add to applied jobs
    const newAppliedJob = {
      ...job,
      appliedDate: new Date().toISOString(),
      status: 'Applied'
    };
    
    const updatedAppliedJobs = [...appliedJobs, newAppliedJob];
    setAppliedJobs(updatedAppliedJobs);
    localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
    
    // Show success message
    setShowSuccessMessage({
      type: 'success',
      message: `Successfully applied for ${job.role} at ${job.company}!`
    });
  };

  // Handle show match score
  const handleShowMatchScore = (job) => {
    setSelectedJobMatch(job);
  };

  // Close match score modal
  const closeMatchScore = () => {
    setSelectedJobMatch(null);
  };

  // Check if job is applied
  const isJobApplied = (jobId) => {
    return appliedJobs.some(job => job.id === jobId);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <CandidateSidebar />
      
      {/* Success Message Toast */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[200] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 ${
              showSuccessMessage.type === 'success' 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
            }`}
          >
            {showSuccessMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{showSuccessMessage.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Match Score Modal */}
      <AnimatePresence>
        {selectedJobMatch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150]"
              onClick={closeMatchScore}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-[151] p-4"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden w-full max-w-lg">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-900 to-blue-950 p-6">
                  <button
                    onClick={closeMatchScore}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{selectedJobMatch.role}</h3>
                      <p className="text-blue-200 text-sm">{selectedJobMatch.company}</p>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Match Score */}
                  <div className="text-center mb-6">
                    <div className="inline-block">
                      <div className={`text-5xl font-bold ${getScoreColor(selectedJobMatch.match)} mb-2`}>
                        {selectedJobMatch.match}%
                      </div>
                      <p className="text-gray-600 text-sm">Overall Match Score</p>
                    </div>
                  </div>
                  
                  {/* Match Breakdown */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold text-gray-900">Match Analysis</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Skills Match</span>
                          <span className="font-semibold text-blue-900">{selectedJobMatch.match - 5}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedJobMatch.match - 5}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-blue-900 rounded-full"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Experience Match</span>
                          <span className="font-semibold text-blue-900">{selectedJobMatch.match - 10}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedJobMatch.match - 10}%` }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="h-full bg-blue-900 rounded-full"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Location Match</span>
                          <span className="font-semibold text-blue-900">{selectedJobMatch.location === 'Remote' ? 100 : 90}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedJobMatch.location === 'Remote' ? 100 : 90}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="h-full bg-blue-900 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJobMatch.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-blue-50 text-blue-900 rounded-lg text-xs font-medium border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    {isJobApplied(selectedJobMatch.id) ? (
                      <div className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-lg font-medium flex items-center justify-center gap-2 border border-emerald-200">
                        <CheckCircle className="w-5 h-5" />
                        Already Applied
                      </div>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            handleApplyJob(selectedJobMatch);
                            closeMatchScore();
                          }}
                          className="flex-1 py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          Apply Now
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={closeMatchScore}
                          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                        >
                          Close
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Interview Popup */}
      <AnimatePresence>
        {showInterviewPopup && !interviewData && popupMounted && (
          <>
            {/* Backdrop with high z-index */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]"
              onClick={() => setShowInterviewPopup(false)}
            />
            
            {/* Popup with high z-index */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-[101] p-4"
            >
              <div 
                ref={popupRef}
                className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-200 shadow-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Close button */}
                <button
                  onClick={() => setShowInterviewPopup(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg border border-gray-200 hover:border-gray-300"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                {/* Header */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 opacity-10"></div>
                  <div className="relative p-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl mb-6 shadow-lg">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      Unlock Your Potential with AI Interview Assessment
                    </h2>
                    <p className="text-lg text-gray-600">
                      Take your career to the next level with personalized insights
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Stats Row */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                      <div className="text-2xl font-bold text-blue-900 mb-1">95%</div>
                      <p className="text-sm text-gray-600">Accuracy Rate</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                      <div className="text-2xl font-bold text-blue-900 mb-1">24/7</div>
                      <p className="text-sm text-gray-600">Available</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                      <div className="text-2xl font-bold text-blue-900 mb-1">1000+</div>
                      <p className="text-sm text-gray-600">Candidates Improved</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                      How AI Interview Helps You Grow
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Identify Skill Gaps</h4>
                          <p className="text-sm text-gray-600">
                            Discover areas where you need improvement with precise analysis
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Track Progress</h4>
                          <p className="text-sm text-gray-600">
                            Monitor your improvement over time with detailed metrics
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Personalized Guidance</h4>
                          <p className="text-sm text-gray-600">
                            Get custom recommendations based on your performance
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Boost Confidence</h4>
                          <p className="text-sm text-gray-600">
                            Practice in a realistic environment to ace real interviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-950 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">AJ</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Alex Johnson</h4>
                        <p className="text-sm text-gray-600">Software Engineer at Google</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">
                      "The AI interview assessment helped me identify weaknesses I didn't know I had. 
                      The personalized feedback was instrumental in my job search success!"
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartAIInterview}
                      className="py-4 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-xl font-bold hover:shadow-xl transition-all shadow-lg flex items-center justify-center gap-3"
                    >
                      <Rocket className="w-5 h-5" />
                      Start AI Interview Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowInterviewPopup(false)}
                      className="py-4 border-2 border-blue-900 text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all"
                    >
                      Maybe Later
                    </motion.button>
                  </div>

                  {/* Footer note */}
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Takes only 45-60 minutes • Completely free • Instant results
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {localStorage.getItem('userName') || 'User'}! 👋
                </h1>
                <p className="text-gray-600 text-sm mt-1">Here's what's happening with your job search today</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartAIInterview}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-xl font-semibold hover:shadow-lg transition-all shadow-sm"
                >
                  <Brain className="w-5 h-5" />
                  <span>AI Interview</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className={`${stat.color} rounded-xl p-5 border border-gray-200`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color.includes('from-blue-50') ? 'bg-white' : 'bg-blue-50'}`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Profile Completeness */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Profile Strength</h3>
                  <p className="text-gray-600 text-sm">Keep your profile updated to attract employers</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl flex items-center justify-center shadow-sm">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">Completion Progress</span>
                  <span className="text-xl font-bold text-blue-900">{profileCompleteness}%</span>
                </div>
                <Progress.Root className="relative h-3 overflow-hidden rounded-full bg-gray-100">
                  <Progress.Indicator
                    className="h-full bg-gradient-to-r from-blue-900 to-blue-950 transition-all duration-1000 ease-out"
                    style={{ width: `${profileCompleteness}%` }}
                  />
                </Progress.Root>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate("/profile-setup")}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all group border border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <Edit className="w-5 h-5 text-blue-900" />
                    <span className="font-medium text-gray-900">Edit Profile</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-900 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={downloadProfile}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all group border border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-blue-900" />
                    <span className="font-medium text-gray-900">Download Resume</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-900 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all group border border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-blue-900" />
                    <span className="font-medium text-gray-900">Share Profile</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-900 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all group border border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-blue-900" />
                    <span className="font-medium text-gray-900">Settings</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-900 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>

            {/* HR Contact Card */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Headset className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Need Help?</h3>
                    <p className="text-blue-200 text-sm">Talk to your HR</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="font-bold text-blue-900">{hrContact.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{hrContact.name}</p>
                      <p className="text-blue-200 text-sm">Career Advisor</p>
                    </div>
                  </div>

                  <a href={`mailto:${hrContact.email}`} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm truncate">{hrContact.email}</span>
                  </a>

                  <a href={`tel:${hrContact.phone}`} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">{hrContact.phone}</span>
                  </a>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Schedule Call
                </motion.button>
              </div>
            </div>
          </div>

          {/* Charts and Activity */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Application Pipeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Application Pipeline</h3>
                  <p className="text-gray-600 text-sm">Track your application progress</p>
                </div>
                <BarChart3 className="w-6 h-6 text-blue-900" />
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={applicationStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      fontSize: '12px'
                    }} 
                  />
                  <Bar dataKey="value" fill="#1e40af" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-4 gap-2 mt-6">
                {applicationStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: stat.color }} />
                    <p className="text-xs text-gray-600">{stat.name}</p>
                    <p className="font-bold text-gray-900 text-sm">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Weekly Activity</h3>
                  <p className="text-gray-600 text-sm">Your job search momentum</p>
                </div>
                <TrendingUp className="w-6 h-6 text-blue-900" />
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      fontSize: '12px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#1e40af"
                    strokeWidth={2}
                    dot={{ fill: '#1e40af', r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="interviews" 
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={{ fill: '#4f46e5', r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-900" />
                  <span className="text-xs text-gray-600">Applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600" />
                  <span className="text-xs text-gray-600">Interviews</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 p-6 mb-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl flex items-center justify-center shadow-sm">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">AI Interview Assessment</h3>
                  <p className="text-gray-600 text-sm">
                    {interviewData ? 'Your latest AI interview results' : 'Take our AI-powered interview to assess your skills'}
                  </p>
                </div>
              </div>
              
              {interviewData ? (
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(interviewData.overallScore)}`}>
                    {interviewData.overallScore}/100
                  </div>
                  <p className="text-gray-600 text-sm">Overall Score</p>
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-950 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">?</span>
                </div>
              )}
            </div>

            {!interviewData ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <p className="text-gray-700 font-medium">No AI Interview Taken Yet</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Complete an AI interview to get personalized insights on your technical skills, 
                    communication abilities, and areas for improvement.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-900" />
                      <h4 className="font-semibold text-gray-900 text-sm">What you'll get:</h4>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        Real-time coding assessment
                      </li>
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        Technical MCQ questions
                      </li>
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        Communication evaluation
                      </li>
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        Detailed skill analysis
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-purple-900" />
                      <h4 className="font-semibold text-gray-900 text-sm">Time Required:</h4>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Duration: 45-60 minutes
                      </li>
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        20+ Technical questions
                      </li>
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        2 Coding challenges
                      </li>
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Real-time video recording
                      </li>
                    </ul>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartAIInterview}
                  className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Start AI Interview Assessment
                </motion.button>
              </>
            ) : (
              <>
                {/* Score Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-700">Performance Level</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getScoreBgColor(interviewData.overallScore)} ${getScoreColor(interviewData.overallScore)}`}>
                      {interviewData.overallScore >= 80 ? 'Excellent' : interviewData.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${interviewData.overallScore}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${
                        interviewData.overallScore >= 80 ? 'bg-emerald-500' : 
                        interviewData.overallScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Skill Breakdown */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-900" />
                    Skill Breakdown
                  </h4>
                  <div className="space-y-3">
                    {interviewData.skillBreakdown?.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${skill.color || 'bg-blue-500'}`}></div>
                          <span className="text-sm text-gray-900">{skill.skill}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                          <span className="font-bold text-gray-900 w-10 text-right">{skill.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Areas to Improve */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      <h4 className="font-semibold text-gray-900">Areas to Improve</h4>
                    </div>
                    <ul className="space-y-2">
                      {interviewData.improvements?.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-semibold text-gray-900">Recommendations</h4>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        Practice algorithm problems daily
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        Review system design patterns
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        Improve communication skills
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        Take mock interviews weekly
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartAIInterview}
                    className="py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Video className="w-5 h-5" />
                    Retake Interview
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-3 border-2 border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    View Detailed Report
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>

          {/* Upcoming Interviews */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Upcoming Interviews</h3>
                <p className="text-gray-600 text-sm">You have {upcomingInterviews.length} interviews scheduled</p>
              </div>
              <Link to="/schedule-interview">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-all text-sm font-medium"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule New
                </motion.button>
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingInterviews.map((interview, index) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <div className={`w-12 h-12 ${interview.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <span className="text-white font-bold text-sm">{interview.logo}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900">{interview.company}</h4>
                        <p className="text-gray-600 text-sm">{interview.role}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        interview.status === 'Confirmed' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {interview.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-900" />
                        {interview.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-900" />
                        {interview.time}
                      </div>
                      <div className="flex items-center gap-1">
                        {interview.mode === 'Online' ? (
                          <>
                            <Video className="w-3 h-3 text-blue-900" />
                            <span>Online</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3 h-3 text-blue-900" />
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
                        className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-all text-xs font-medium"
                      >
                        <Video className="w-3 h-3" />
                        Join Meeting
                      </motion.a>
                    )}

                    {interview.mode === 'Offline' && interview.address && (
                      <div className="mt-2 flex items-start gap-1.5 text-xs text-gray-600">
                        <MapPin className="w-3 h-3 text-blue-900 mt-0.5" />
                        <span>{interview.address}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Job Matches and Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Job Matches */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Top Job Matches</h3>
                  <p className="text-gray-600 text-sm">AI-powered recommendations</p>
                </div>
                <Sparkles className="w-6 h-6 text-blue-900" />
              </div>

              <div className="space-y-3">
                {jobMatches.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 2 }}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{job.role}</h4>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-900">{job.match}%</div>
                        <p className="text-xs text-gray-500">Match</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-900 rounded-full text-xs font-medium border border-blue-200">
                        {job.salary}
                      </span>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-900 rounded-full text-xs font-medium border border-emerald-200">
                        {job.location}
                      </span>
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-900 rounded-full text-xs font-medium border border-purple-200">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{job.posted}</span>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShowMatchScore(job)}
                          className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-medium hover:bg-blue-950 transition-all flex items-center gap-1"
                        >
                          <Target className="w-3 h-3" />
                          View Match
                        </motion.button>
                        {isJobApplied(job.id) ? (
                          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-200 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Applied
                          </span>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              handleApplyJob(job);
                            }}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all flex items-center gap-1"
                          >
                            <Rocket className="w-3 h-3" />
                            Apply Now
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Recent Activity</h3>
                  <p className="text-gray-600 text-sm">Your latest updates</p>
                </div>
                <Clock className="w-6 h-6 text-blue-900" />
              </div>

              <div className="space-y-3">
                {/* Show recent applications first */}
                {appliedJobs.slice(0, 2).map((job, index) => (
                  <motion.div
                    key={`applied-${job.id}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                  >
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">Application submitted</p>
                      <p className="text-xs text-gray-700">{job.role} at {job.company}</p>
                      <p className="text-xs text-gray-500 mt-1">Just now</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Show other activities */}
                {recentActivity.slice(appliedJobs.length > 0 ? 1 : 0).map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-4 h-4 text-blue-900" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.company}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full mt-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
              >
                View All Activity
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}