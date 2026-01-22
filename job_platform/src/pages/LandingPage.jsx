import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Users, Headset, Sparkles, Upload, ClipboardCheck, Calendar,
  CheckCircle, Star, Menu, X, Award, TrendingUp, Target,
  Zap, Clock, ArrowRight, Play, MessageSquare, Building2,
  Rocket, ChevronRight, Check, ChevronDown
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect, useRef } from 'react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOrgDropdownOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    { 
      icon: Upload, 
      title: 'Smart Registration', 
      desc: 'Upload your CV or fill details manually with our intuitive form',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Sparkles, 
      title: 'AI Skill Evaluation', 
      desc: 'Advanced AI assesses your skills and matches you with perfect roles',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: Calendar, 
      title: 'Flexible Scheduling', 
      desc: 'Book interviews at your convenience with multiple companies',
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: Target, 
      title: 'Perfect Matching', 
      desc: 'Get matched with positions that align with your career goals',
      color: 'from-orange-500 to-orange-600'
    },
  ];

  const benefits = [
    { 
      icon: Zap, 
      title: 'Lightning Fast Placement', 
      desc: 'Average placement time of just 14 days',
      stat: '14 Days',
      color: 'bg-yellow-50 text-yellow-600'
    },
    { 
      icon: Building2, 
      title: 'Top Companies', 
      desc: 'Connect with 500+ hiring partners globally',
      stat: '500+',
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      icon: Award, 
      title: '95% Success Rate', 
      desc: 'Industry-leading placement success rate',
      stat: '95%',
      color: 'bg-green-50 text-green-600'
    },
    { 
      icon: Users, 
      title: 'Expert Support', 
      desc: 'Dedicated career counselors for guidance',
      stat: '24/7',
      color: 'bg-purple-50 text-purple-600'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'TechCorp',
      image: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NTk4NjA1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      text: 'This platform transformed my job search! The AI assessment was spot-on, and I landed my dream role at TechCorp in just 2 weeks.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLabs',
      image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjU5NzYzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      text: 'The interview scheduling feature is brilliant. I coordinated with 5 companies simultaneously without any hassle.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Analyst',
      company: 'DataVision',
      image: 'https://images.unsplash.com/photo-1718179804654-7c3720b78e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTk0NDQ4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      text: 'Professional, efficient, and incredibly supportive. The HR team guided me every step of the way!',
      rating: 5
    },
  ];

  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'Adobe'
  ];

  const stats = [
    { value: '50K+', label: 'Jobs Placed', icon: Briefcase },
    { value: '500+', label: 'Partner Companies', icon: Building2 },
    { value: '95%', label: 'Success Rate', icon: TrendingUp },
    { value: '24/7', label: 'Support Available', icon: Headset },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Sign up and build your comprehensive professional profile in minutes',
      icon: ClipboardCheck,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      title: 'AI Skill Assessment',
      description: 'Complete our advanced AI-powered evaluation to showcase your expertise',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '03',
      title: 'Get Matched',
      description: 'Receive personalized job matches from our network of top companies',
      icon: Target,
      color: 'from-green-500 to-emerald-500'
    },
    {
      step: '04',
      title: 'Schedule & Interview',
      description: 'Book convenient interview slots and connect with hiring managers',
      icon: Calendar,
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30"
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-xl">CareerLaunch</h1>
                <p className="text-xs text-gray-500">Your Career, Accelerated</p>
              </div>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Success Stories</a>
              <a href="#stats" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Stats</a>
              <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
              
              {/* For Organizations Dropdown */}
<div className="relative" ref={dropdownRef}>
  <button
    onClick={() => setOrgDropdownOpen(prev => !prev)}
    className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
  >
    For Organizations
    <ChevronDown
      className={`w-4 h-4 transition-transform ${
        orgDropdownOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  <AnimatePresence>
    {orgDropdownOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
      >
        <Link
          to="/pricing"
          onClick={() => setOrgDropdownOpen(false)}
          className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          View Plans
        </Link>

        <Link
          to="/login"
          onClick={() => setOrgDropdownOpen(false)}
          className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          Login
        </Link>
      </motion.div>
    )}
  </AnimatePresence>
</div>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-all"
                >
                Sign In
                </motion.button>
              </Link>
              <Link to="/register/candidate">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg"
                >
                Get Started
                </motion.button>
              </Link>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-100"
            >
              <div className="flex flex-col gap-3">
                <a href="#features" className="px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg">Features</a>
                <a href="#how-it-works" className="px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg">How It Works</a>
                <a href="#testimonials" className="px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg">Testimonials</a>
                <Link to="/login" className="px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg">Sign In</Link>
                <Link to="/register/candidate" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center">Get Started</Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">AI-Powered Job Placement Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Launch Your
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Dream Career </span>
                Today
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Connect with top companies, showcase your skills with AI-powered assessments, 
                and land your dream job faster than ever before.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/register/candidate">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-xl flex items-center gap-2 group"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-lg hover:border-blue-300 transition-all flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex items-center gap-8"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-4 border-white" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900">50,000+</span> professionals placed
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Animated Illustration - Professional Dashboard Mockup */}
              <div className="relative">
                {/* Main Card */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-32 mb-2" />
                      <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-20" />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                      <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                      className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="h-2 bg-blue-200 rounded w-16 mb-1" />
                          <div className="h-4 bg-blue-400 rounded w-12" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="h-2 bg-purple-200 rounded w-16 mb-1" />
                          <div className="h-4 bg-purple-400 rounded w-12" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="h-2 bg-green-200 rounded w-16 mb-1" />
                          <div className="h-4 bg-green-400 rounded w-12" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                      className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="h-2 bg-orange-200 rounded w-16 mb-1" />
                          <div className="h-4 bg-orange-400 rounded w-12" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 2, delay: 1 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          transition={{ duration: 2, delay: 1.2 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '95%' }}
                          transition={{ duration: 2, delay: 1.4 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Success Badge */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-8 -left-8 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">95% Success</p>
                      <p className="text-sm text-gray-500">Placement Rate</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Time Badge */}
                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [2, -2, 2]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-8 -right-8 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">14 Days Avg</p>
                      <p className="text-sm text-gray-500">Time to Hire</p>
                    </div>
                  </div>
                </motion.div>

                {/* AI Sparkle Effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <Sparkles className="w-16 h-16 text-yellow-400 opacity-20" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>




      {/* Trusted Companies */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 mb-8 font-medium"
          >
            Trusted by professionals at world-class companies
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
          >
            {companies.map((company, index) => (
              <motion.div
                key={company}
                variants={fadeIn}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-2xl font-bold text-gray-300 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>




      {/* Stats Section */}
      <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Numbers Speak
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands who've accelerated their careers with us
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20"
              >
                <stat.icon className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>






      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with personalized support
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl -z-10" 
                     style={{backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                             background: `linear-gradient(135deg, ${feature.color.includes('blue') ? '#3b82f6' : feature.color.includes('purple') ? '#a855f7' : feature.color.includes('green') ? '#10b981' : '#f97316'}, transparent)`}} 
                />
                
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>







      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-purple-50 text-purple-600 rounded-full font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Hired in 4 Easy Steps
            </h2>
            <p className="text-xl text-gray-600">
              From registration to your dream job in weeks, not months
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 -translate-y-1/2" />
            
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
            >
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative z-10"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-xl`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <div className="text-6xl font-bold text-gray-100 absolute top-4 right-4">
                      {step.step}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                  
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 z-20">
                      <ChevronRight className="w-8 h-8 text-blue-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>






      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium mb-4">
                Our Advantages
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Top Talent Chooses Us
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We're not just another job board. We're your career acceleration partner.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <div className={`w-16 h-16 ${benefit.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <benefit.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{benefit.title}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                          {benefit.stat}
                        </span>
                      </div>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzY1OTgwMTMwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Team collaboration"
                  className="w-full"
                />
              </div>
              
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">Top Rated</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>





      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-yellow-50 text-yellow-600 rounded-full font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied professionals who found their dream jobs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>






      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join 50,000+ professionals who've transformed their careers. Get started in minutes.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl flex items-center gap-2 group"
              >
                Get Started Free
                <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-lg text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Talk to Sales
            </motion.button>
          </div>

          <p className="mt-6 text-blue-100">
            <Check className="w-5 h-5 inline mr-2" />
            No credit card required • Set up in 2 minutes
          </p>
        </motion.div>
      </section>






      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl">CareerLaunch</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Accelerating careers with AI-powered job placement.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Companies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2024 CareerLaunch. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}