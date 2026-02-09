import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, MapPin, DollarSign, Clock, Filter, Search, Grid, List,
  TrendingUp, Bookmark, Eye, Share2, Calendar, Users, Target,
  ChevronRight, Building, Award, Zap, Star, ExternalLink, Download,
  Mail, Phone, Globe, Layers, CheckCircle, X, Menu, Home, MessageSquare, 
  User, BarChart3, LogOut, ChevronDown, Heart, Users as UsersIcon,
  FileText, Bell, Settings, Check, TrendingDown, AlertCircle
} from 'lucide-react';

// Professional sidebar import
const CandidateSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-blue-100"
      >
        {isOpen ? <X className="text-blue-950" /> : <Menu className="text-blue-950" />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
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
                    onClick={() => { navigate(path); setIsOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive(path) ? 'bg-white text-blue-950 shadow-lg font-semibold' : 'hover:bg-white/10'}`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>

              {/* Small Profile Boost Section */}
              <div className="mt-4 p-2 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-300" />
                  <div className="flex-1">
                    <p className="text-xs text-white font-medium">Profile Boost</p>
                    <button 
                      onClick={() => navigate('/profile-setup')}
                      className="text-xs text-amber-300 hover:text-amber-200 transition-colors"
                    >
                      Boost Now →
                    </button>
                  </div>
                </div>
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
      <aside className="hidden lg:block w-72 h-screen fixed left-0 top-0 bg-gradient-to-b from-blue-950 to-blue-900 text-white z-40 shadow-xl">
        <div className="h-20 p-5 border-b border-white/10 flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg text-lg font-bold">
              {candidateName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold text-base">{candidateName}</h2>
              <p className="text-[10px] text-blue-200">{candidateEmail}</p>
            </div>
          </div>
        </div>

        <div className="p-3 space-y-0.5">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive(path) ? 'bg-white text-blue-950 shadow-lg font-semibold' : 'hover:bg-white/10'}`}
            >
              <Icon size={18} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>

        {/* Small Profile Boost Section */}
        <div className="absolute bottom-20 left-4 right-4">
          <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-300" />
              <div className="flex-1">
                <p className="text-xs text-white font-medium">Profile Boost</p>
                <button 
                  onClick={() => navigate('/profile-setup')}
                  className="text-xs text-amber-300 hover:text-amber-200 transition-colors"
                >
                  Boost Now →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 rounded-lg text-red-200 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

// Job data generator
const generateJobs = (count) => {
  const roles = [
    "Senior Frontend Developer", "Backend Engineer", "Full Stack Developer",
    "DevOps Specialist", "Cloud Architect", "Data Scientist",
    "ML Engineer", "Product Manager", "UX/UI Designer",
    "QA Automation Engineer", "Mobile Developer", "Security Engineer",
    "Systems Analyst", "Database Administrator", "Technical Lead"
  ];
  
  const clients = [
    "TechCorp Solutions", "InnovateLabs", "DataVision Systems", 
    "CloudNexus Inc", "SecureNet Technologies", "AI Ventures",
    "Digital Wave", "FutureTech Global", "Quantum Solutions",
    "CyberShield Corp", "MetaSphere", "Nexus Technologies",
    "Alpha Innovations", "Beta Systems", "Gamma Labs"
  ];
  
  const experienceLevels = ["1-3 years", "3-5 years", "5-8 years", "8+ years"];
  const locations = ["Remote", "New York, NY", "San Francisco, CA", "Austin, TX", "London, UK", "Berlin, DE", "Toronto, CA", "Sydney, AU"];
  const jobTypes = ["Full-time", "Contract", "Part-time", "Freelance"];
  const tags = ["React", "Node.js", "Python", "AWS", "Machine Learning", "DevOps", "UI/UX", "Mobile"];
  
  return Array.from({ length: count }, (_, i) => {
    const client = clients[i % clients.length];
    const role = roles[i % roles.length];
    const experience = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
    const location = locations[i % locations.length];
    const jobType = jobTypes[i % jobTypes.length];
    const salaryMin = 70 + (i * 4);
    const salaryMax = 140 + (i * 6);
    const matchScore = 75 + Math.floor(Math.random() * 25);
    const postedDays = Math.floor(Math.random() * 30);
    const jobTags = [...new Set([...Array(3)].map(() => tags[Math.floor(Math.random() * tags.length)]))];
    
    return {
      id: `JOB-${1000 + i}`,
      title: role,
      client: client,
      experience: experience,
      location: location,
      salary: `$${salaryMin}k - $${salaryMax}k`,
      jobType: jobType,
      matchScore: matchScore,
      posted: `${postedDays} days ago`,
      tags: jobTags,
      description: `Join ${client} as a ${role} to work on cutting-edge solutions in a fast-paced environment. We're looking for passionate individuals who thrive on challenges.`,
      fullJD: `## Job Description\n\nWe are seeking a talented ${role} with ${experience} of experience to join our team at ${client}.\n\n### Key Responsibilities:\n• Design, develop, and maintain scalable applications\n• Collaborate with cross-functional teams to define requirements\n• Implement best practices and coding standards\n• Participate in code reviews and technical discussions\n• Mentor junior team members\n• Stay updated with emerging technologies\n\n### Requirements:\n• ${experience} experience in similar role\n• Strong problem-solving skills\n• Excellent communication abilities\n• Bachelor's degree in Computer Science or related field\n• Experience with modern development tools\n• Ability to work in agile environment`,
      requirements: [
        `${experience} experience in software development`,
        "Strong proficiency in modern frameworks and tools",
        "Experience with cloud platforms (AWS/Azure/GCP)",
        "Excellent problem-solving and analytical skills",
        "Strong communication and teamwork abilities",
        "Bachelor's degree in Computer Science or related field"
      ],
      benefits: [
        "Competitive salary package with bonuses",
        "Comprehensive health insurance coverage",
        "Remote work flexibility options",
        "Professional development budget",
        "Stock options and equity",
        "Flexible working hours",
        "Generous vacation policy",
        "Wellness programs and gym membership"
      ],
      companyDetails: `${client} is a leading technology company specializing in innovative solutions for enterprise clients. Founded in ${2010 + (i % 15)}, we serve over ${100 + (i * 20)} clients globally with our cutting-edge products and services.`,
      contact: {
        name: "Sarah Johnson",
        title: "HR Manager",
        email: `hr@${client.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: `+1 (555) ${100 + i}-${1000 + i}`
      },
      urgency: i % 5 === 0,
      featured: i % 7 === 0
    };
  });
};

// Job Application Modal Component
const JobApplicationModal = ({ job, isOpen, onClose, onApply }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleApply = () => {
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setShowSuccess(true);
      
      // Call the parent apply function
      onApply(job.id);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        {showSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
            <p className="text-gray-600 mb-4">
              You have successfully applied for {job.title} at {job.client}
            </p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Apply for this position</h3>
                <p className="text-sm text-gray-600">{job.title} at {job.client}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 mb-2">Before you apply:</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Ensure your profile is complete
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Review job requirements carefully
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Prepare your resume and portfolio
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <p className="text-sm font-medium text-gray-900">Your match score: {job.matchScore}%</p>
                </div>
                <p className="text-sm text-gray-600">
                  Based on your profile, you have a {job.matchScore >= 80 ? 'high' : job.matchScore >= 60 ? 'good' : 'fair'} chance of getting shortlisted.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                disabled={isApplying}
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={isApplying}
                className="flex-1 py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isApplying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Applying...
                  </>
                ) : (
                  'Confirm & Apply'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Job Detail Page Component
const JobDetailPage = ({ job, onBack, onApply }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  const getMatchColor = (score) => {
    if (score >= 90) return 'from-emerald-500 to-emerald-600';
    if (score >= 80) return 'from-blue-500 to-blue-600';
    if (score >= 70) return 'from-amber-500 to-amber-600';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Back Button */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-900 hover:text-blue-950 font-medium"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back to Jobs
            </button>
          </div>
        </div>

        {/* Job Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-blue-200" />
                        <span className="text-lg">Wrocus</span>
                      </div>
                      <div className="text-blue-200">•</div>
                      <div className="px-3 py-1 bg-white/20 rounded-lg text-sm">
                        Client: {job.client}
                      </div>
                      <div className="text-blue-200">•</div>
                      <span className="text-sm bg-white/20 px-3 py-1 rounded-lg">ID: {job.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className={`px-4 py-2 bg-gradient-to-r ${getMatchColor(job.matchScore)} text-white rounded-xl font-bold`}>
                    {job.matchScore}% Match
                  </div>
                  {job.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-lg">
                      Featured Role
                    </span>
                  )}
                  {job.urgency && (
                    <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-lg">
                      Urgent Hiring
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Experience</p>
                  <p className="font-bold text-gray-900 text-lg">{job.experience}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-bold text-gray-900 text-lg">{job.location}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                  <p className="font-bold text-gray-900 text-lg">{job.salary}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Job Type</p>
                  <p className="font-bold text-gray-900 text-lg">{job.jobType}</p>
                </div>
              </div>

              {/* About Wrocus */}
              <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-900" />
                  About Wrocus
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Wrocus is a premier staffing and recruitment platform connecting top talent with leading companies. 
                  We specialize in technology roles and have successfully placed thousands of professionals in their dream jobs.
                </p>
              </section>

              {/* Job Description */}
              <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-900" />
                  Job Description
                </h3>
                <div className="prose max-w-none">
                  <pre className="text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {job.fullJD}
                  </pre>
                </div>
              </section>

              {/* Requirements */}
              <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements & Qualifications</h3>
                <div className="grid gap-3">
                  {job.requirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Benefits */}
              <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits & Perks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Client Info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  About the Client
                </h3>
                <p className="text-gray-600 text-sm mb-4">{job.companyDetails}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <UsersIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">500-1000 employees</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Technology · SaaS · Enterprise</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-900" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{job.contact.name}</p>
                      <p className="text-xs text-gray-500">{job.contact.title}</p>
                      <p className="text-sm text-blue-900">{job.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Phone className="w-4 h-4 text-blue-900" />
                    <span className="text-sm text-blue-900">{job.contact.phone}</span>
                  </div>
                </div>
              </div>

              {/* Match Analysis */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Your Match Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Technical Skills</span>
                      <span className="text-sm font-bold text-blue-900">92%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Experience Match</span>
                      <span className="text-sm font-bold text-blue-900">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Culture Fit</span>
                      <span className="text-sm font-bold text-blue-900">78%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="sticky top-6 space-y-3">
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="w-full py-4 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-xl font-bold hover:shadow-xl transition-all text-lg shadow-lg"
                >
                  Apply Now
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 border border-blue-900 text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                    Save Job
                  </button>
                  <button className="py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <JobApplicationModal
        job={job}
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        onApply={onApply}
      />
    </>
  );
};

// Main Job Board Component
const JobBoard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'table', 'kanban'
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    experience: '',
    location: '',
    jobType: '',
    minSalary: '',
    client: '',
    tags: []
  });
  const [sortBy, setSortBy] = useState('match');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [showKanban, setShowKanban] = useState(false);
  const navigate = useNavigate();

  const dummyJobs = generateJobs(24);

  // Filter jobs
  const filteredJobs = dummyJobs.filter(job => {
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.client.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    if (filters.experience && !job.experience.includes(filters.experience)) return false;
    if (filters.location && job.location !== filters.location) return false;
    if (filters.jobType && job.jobType !== filters.jobType) return false;
    if (filters.client && !job.client.toLowerCase().includes(filters.client.toLowerCase())) return false;
    if (filters.minSalary) {
      const minSalary = parseInt(filters.minSalary);
      const jobMinSalary = parseInt(job.salary.split('-')[0].replace('$', '').replace('k', ''));
      if (jobMinSalary < minSalary) return false;
    }
    if (filters.tags.length > 0 && !filters.tags.some(tag => job.tags.includes(tag))) return false;
    return true;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch(sortBy) {
      case 'salary':
        const aSalary = parseInt(a.salary.split('-')[0].replace('$', '').replace('k', ''));
        const bSalary = parseInt(b.salary.split('-')[0].replace('$', '').replace('k', ''));
        return bSalary - aSalary;
      case 'posted':
        const aDays = parseInt(a.posted.split(' ')[0]);
        const bDays = parseInt(b.posted.split(' ')[0]);
        return aDays - bDays;
      case 'match':
      default:
        return b.matchScore - a.matchScore;
    }
  });

  // Get unique values for filters
  const experiences = [...new Set(dummyJobs.map(job => job.experience))];
  const locations = [...new Set(dummyJobs.map(job => job.location))];
  const jobTypes = [...new Set(dummyJobs.map(job => job.jobType))];
  const clients = [...new Set(dummyJobs.map(job => job.client))];
  const allTags = [...new Set(dummyJobs.flatMap(job => job.tags))];

  const toggleSaveJob = (jobId) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
    } else {
      newSaved.add(jobId);
    }
    setSavedJobs(newSaved);
  };

  const handleApplyJob = (jobId) => {
    const newApplied = new Set(appliedJobs);
    newApplied.add(jobId);
    setAppliedJobs(newApplied);
    
    // After applying, redirect to dashboard after 2 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
    if (score >= 80) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    if (score >= 70) return 'bg-gradient-to-r from-amber-500 to-amber-600';
    return 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  const getMatchTextColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-gray-600';
  };

  // Show Job Detail Page
  if (selectedJob) {
    return <JobDetailPage job={selectedJob} onBack={() => setSelectedJob(null)} onApply={handleApplyJob} />;
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <CandidateSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        {/* Top Navigation */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Job Opportunities</h1>
              <p className="text-sm text-gray-600 mt-1">Discover your next career move with Wrocus</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                My Applications ({appliedJobs.size})
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{dummyJobs.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Match</p>
                  <p className="text-2xl font-bold text-gray-900">86%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Remote Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{dummyJobs.filter(j => j.location === 'Remote').length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Salary</p>
                  <p className="text-2xl font-bold text-gray-900">$112k</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search jobs by title, skills, or company..."
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => { setViewMode('grid'); setShowKanban(false); }}
                    className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => { setViewMode('table'); setShowKanban(false); }}
                    className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => { setShowKanban(!showKanban); if (!showKanban) setViewMode('kanban'); }}
                    className={`px-3 py-2 rounded-lg transition-all ${showKanban ? 'bg-white shadow-sm text-blue-900' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <Layers className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 rounded-xl font-medium flex items-center gap-2 ${
                    showFilters 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>

                <select
                  className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="match">Best Match</option>
                  <option value="salary">Highest Salary</option>
                  <option value="posted">Most Recent</option>
                </select>
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
                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                      <select
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={filters.experience}
                        onChange={(e) => setFilters({...filters, experience: e.target.value})}
                      >
                        <option value="">All Levels</option>
                        {experiences.map(exp => (
                          <option key={exp} value={exp}>{exp}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <select
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={filters.location}
                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                      >
                        <option value="">All Locations</option>
                        {locations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                      <select
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={filters.jobType}
                        onChange={(e) => setFilters({...filters, jobType: e.target.value})}
                      >
                        <option value="">All Types</option>
                        {jobTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary ($k)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., 80"
                        value={filters.minSalary}
                        onChange={(e) => setFilters({...filters, minSalary: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setFilters({
                        experience: '',
                        location: '',
                        jobType: '',
                        minSalary: '',
                        client: '',
                        tags: []
                      })}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {sortedJobs.length} opportunities found
                {searchTerm && (
                  <span className="text-gray-600 font-normal"> for "{searchTerm}"</span>
                )}
              </h2>
              <p className="text-sm text-gray-500">Sorted by {sortBy === 'match' ? 'best match' : sortBy === 'salary' ? 'highest salary' : 'most recent'}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Showing 1-{Math.min(sortedJobs.length, viewMode === 'grid' ? 9 : 12)} of {sortedJobs.length}
              </span>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && !showKanban && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedJobs.slice(0, 9).map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6">
                    {/* Job Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="px-2 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded">
                            WROCUS
                          </div>
                          <div className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            Client: {job.client}
                          </div>
                          <div className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{job.id}</div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                          job.matchScore >= 90 ? 'bg-emerald-50 text-emerald-700' :
                          job.matchScore >= 80 ? 'bg-blue-50 text-blue-700' :
                          'bg-amber-50 text-amber-700'
                        }`}>
                          <Target className="w-3 h-3" />
                          {job.matchScore}% Match
                        </div>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{job.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{job.jobType}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                      >
                        View Details
                      </button>
                      {appliedJobs.has(job.id) ? (
                        <button className="px-4 py-3 bg-emerald-100 text-emerald-700 rounded-lg font-medium text-sm">
                          Applied ✓
                        </button>
                      ) : (
                        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Bookmark className="w-5 h-5 text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && !showKanban && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Position</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Experience</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Salary</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Match</th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedJobs.slice(0, 12).map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-5 px-6">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-blue-600">{job.id}</span>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-900 rounded">WROCUS</span>
                            </div>
                            <h4 className="font-bold text-gray-900">{job.title}</h4>
                            <p className="text-sm text-gray-500">{job.jobType}</p>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">
                              {job.client}
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="px-3 py-1.5 bg-blue-50 text-blue-900 text-sm font-medium rounded-lg">
                            {job.experience}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{job.location}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="font-bold text-gray-900">{job.salary}</span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-full rounded-full ${getMatchColor(job.matchScore)}`}
                                style={{ width: `${job.matchScore}%` }}
                              ></div>
                            </div>
                            <span className={`font-bold ${getMatchTextColor(job.matchScore)}`}>
                              {job.matchScore}%
                            </span>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedJob(job)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm"
                            >
                              View
                            </button>
                            {appliedJobs.has(job.id) ? (
                              <button className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                                Applied
                              </button>
                            ) : (
                              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Bookmark className="w-4 h-4 text-gray-600" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Kanban View */}
          {showKanban && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'High Match (90%+)', color: 'from-emerald-500 to-emerald-600', min: 90, max: 100 },
                { title: 'Good Match (80-89%)', color: 'from-blue-500 to-blue-600', min: 80, max: 89 },
                { title: 'Average Match (70-79%)', color: 'from-amber-500 to-amber-600', min: 70, max: 79 },
                { title: 'Low Match (<70%)', color: 'from-gray-500 to-gray-600', min: 0, max: 69 }
              ].map((column) => {
                const columnJobs = sortedJobs.filter(job => 
                  job.matchScore >= column.min && job.matchScore <= column.max
                );
                
                return (
                  <div key={column.title} className="space-y-4">
                    <div className={`bg-gradient-to-r ${column.color} text-white rounded-xl p-4`}>
                      <h3 className="font-bold text-lg">{column.title}</h3>
                      <p className="text-sm opacity-90">{columnJobs.length} jobs</p>
                    </div>
                    
                    <div className="space-y-4">
                      {columnJobs.map((job) => (
                        <motion.div
                          key={job.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-900 rounded">WROCUS</span>
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">{job.id}</span>
                              </div>
                              <h4 className="font-bold text-gray-900 text-sm mb-1">{job.title}</h4>
                              <p className="text-xs text-gray-500">Client: {job.client}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              {job.experience}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </div>
                            <div className="text-xs font-bold text-gray-900">{job.salary}</div>
                          </div>
                          
                          <button
                            onClick={() => setSelectedJob(job)}
                            className="w-full py-2 text-sm bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg hover:shadow-lg transition-all"
                          >
                            View Details
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobBoard;