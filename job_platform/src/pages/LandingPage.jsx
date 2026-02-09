import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Users, Building2, Rocket, Menu, X, ChevronDown,
  FileText, UserCheck, Building, Database, ArrowRight, Sparkles,
  Search, Target, BarChart, Zap, Shield, Globe,Play,CheckCircle
} from 'lucide-react';
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

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  };

  const products = [
    {
      id: 'ats',
      title: 'ATS',
      description: 'Advanced Applicant Tracking System for enterprise recruitment',
      icon: Briefcase,
      color: 'from-blue-950 to-blue-800',
      iconBg: 'bg-gradient-to-br from-blue-900 to-blue-700',
      iconColor: 'text-white',
      link: 'http://localhost:5175/',
      external: true,
      features: ['AI Resume Parsing', 'Automated Screening', 'Candidate Pipeline', 'Analytics Dashboard'],
      badge: 'Enterprise'
    },
    {
      id: 'candidates',
      title: 'Candidates',
      description: 'Connect with top employers and accelerate your career journey',
      icon: UserCheck,
      color: 'from-blue-600 to-blue-500',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-400',
      iconColor: 'text-white',
      link: '/login',
      external: false,
      features: ['Smart Job Matching', 'Profile Builder', 'Interview Prep', 'Career Guidance'],
      badge: 'For Job Seekers'
    },
    {
      id: 'vendor',
      title: 'Recruit_X_Vendor',
      description: 'Comprehensive portal for staffing agencies and recruitment partners',
      icon: Building,
      color: 'from-blue-700 to-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-600 to-blue-500',
      iconColor: 'text-white',
      link: '/login/organization',
      external: false,
      features: ['Vendor Dashboard', 'Candidate Submission', 'Performance Metrics', 'Billing System'],
      badge: 'Partners'
    },
    {
      id: 'enterprise',
      title: 'Recruit_X_Enterprise',
      description: 'End-to-end recruitment solutions for large-scale organizations',
      icon: Database,
      color: 'from-blue-800 to-blue-700',
      iconBg: 'bg-gradient-to-br from-blue-700 to-blue-600',
      iconColor: 'text-white',
      link: '/login/organization',
      external: false,
      features: ['Bulk Hiring', 'Team Collaboration', 'Advanced Analytics', 'Custom Workflows'],
      badge: 'Premium'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process applications 3x faster with AI automation'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with GDPR compliance'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with talent and opportunities worldwide'
    },
    {
      icon: BarChart,
      title: 'Data-Driven Insights',
      description: 'Make informed decisions with advanced analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-blue-50/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/30 to-blue-50/20 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f7ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f7ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent)]" />
      </div>

      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-blue-100/50 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-950 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-950/20"
              >
                <Rocket className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="font-bold text-blue-950 text-2xl tracking-tight">CareerLaunch</h1>
                <p className="text-xs text-blue-600/80 font-medium">Your Career, Accelerated</p>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-6">
              {/* For Organizations Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setOrgDropdownOpen(prev => !prev)}
                  className="text-blue-900 hover:text-blue-950 transition-colors font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50/50"
                >
                  <span className="font-semibold">For Organizations</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${orgDropdownOpen ? "rotate-180" : ""}`}
                  />
                </motion.button>

                <AnimatePresence>
                  {orgDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl shadow-blue-950/10 border border-blue-100/50 py-3 z-50 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-blue-50/30" />
                      <div className="relative">
                        <Link
                          to="/login/vendor"
                          onClick={() => setOrgDropdownOpen(false)}
                          className="block px-5 py-3 text-blue-900 hover:bg-blue-50/50 hover:text-blue-950 transition-colors font-medium border-b border-blue-100/50"
                        >
                          <div className="flex items-center gap-3">
                            <Building className="w-4 h-4" />
                            Vendor Login
                          </div>
                        </Link>
                        <Link
                          to="/login/enterprise"
                          onClick={() => setOrgDropdownOpen(false)}
                          className="block px-5 py-3 text-blue-900 hover:bg-blue-50/50 hover:text-blue-950 transition-colors font-medium"
                        >
                          <div className="flex items-center gap-3">
                            <Database className="w-4 h-4" />
                            Enterprise Login
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 text-blue-900 font-semibold hover:text-blue-950 rounded-xl transition-all border border-blue-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 bg-white/50"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register/candidate">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(30, 64, 175, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-950 to-blue-800 text-white rounded-xl font-semibold shadow-xl shadow-blue-950/20 hover:shadow-2xl hover:shadow-blue-950/30 transition-all"
                >
                  Get Started Free
                </motion.button>
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-xl hover:bg-blue-50/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-blue-950" /> : <Menu className="w-6 h-6 text-blue-950" />}
            </motion.button>
          </div>

          {/* Enhanced Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden py-6 border-t border-blue-100/50 bg-white/80 backdrop-blur-xl rounded-b-2xl overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-5 py-3.5 text-blue-900 hover:bg-blue-50/50 rounded-lg font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register/candidate" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-5 py-3.5 bg-gradient-to-r from-blue-950 to-blue-800 text-white rounded-lg font-semibold text-center shadow-lg"
                  >
                    Get Started Free
                  </Link>
                  <Link 
                    to="/login/vendor" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-5 py-3.5 text-blue-900 hover:bg-blue-50/50 rounded-lg font-medium transition-colors border-t border-blue-100/50 mt-2"
                  >
                    Vendor Login
                  </Link>
                  <Link 
                    to="/login/enterprise" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-5 py-3.5 text-blue-900 hover:bg-blue-50/50 rounded-lg font-medium transition-colors"
                  >
                    Enterprise Login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50/80 to-blue-100/50 rounded-2xl mb-8 border border-blue-200/50 backdrop-blur-sm shadow-lg shadow-blue-100/30"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-blue-600" />
              </motion.div>
              <span className="text-sm font-semibold text-blue-700">Unified Recruitment Platform • Trusted by 500+ Companies</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-950 mb-8 tracking-tight"
            >
              Choose Your
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"> Portal</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-blue-700/80 max-w-2xl mx-auto leading-relaxed"
            >
              Select the platform that matches your needs and start your journey with our industry-leading recruitment solutions
            </motion.p>
          </motion.div>

          {/* Platform Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-blue-100/50 hover:border-blue-200/50 hover:shadow-lg hover:shadow-blue-100/30 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-950 mb-1">{feature.title}</h3>
                <p className="text-sm text-blue-700/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Product Cards Grid */}
          <motion.div
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 to-blue-300/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative bg-gradient-to-b from-white to-blue-50/50 rounded-3xl p-8 shadow-xl shadow-blue-950/5 hover:shadow-2xl hover:shadow-blue-950/10 transition-all duration-300 border border-blue-100/50 h-full flex flex-col backdrop-blur-sm">
                  {/* Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      {product.badge}
                    </span>
                  </div>

                  {/* Icon Section with Gradient */}
                  <div className={`relative w-24 h-24 rounded-2xl ${product.iconBg} flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-blue-950/20`}>
                    <product.icon className={`w-12 h-12 ${product.iconColor}`} />
                    
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                  </div>

                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-blue-950 mb-3 text-center tracking-tight">
                      {product.title}
                    </h3>
                    <p className="text-blue-700/80 text-center leading-relaxed flex-grow">
                      {product.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8 flex-grow">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-colors group/item"
                      >
                        <div className={`w-8 h-8 rounded-lg ${product.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <span className="text-sm font-medium text-blue-900">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    {product.external ? (
                      <motion.a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`block w-full bg-gradient-to-r ${product.color} text-white py-4 px-6 rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-300 group/btn relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative flex items-center justify-center gap-3">
                          Visit Portal
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </motion.a>
                    ) : (
                      <Link to={product.link}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-full bg-gradient-to-r ${product.color} text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                          <span className="relative flex items-center justify-center gap-3">
                            Access Portal
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-24"
          >
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50/50 to-white/50 rounded-3xl p-12 border border-blue-100/50 shadow-xl shadow-blue-100/20">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30"
              >
                <Target className="w-10 h-10 text-white" />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-blue-950 mb-4">
                Need help choosing the right platform?
              </h3>
              <p className="text-blue-700/80 text-lg mb-8 max-w-xl mx-auto">
                Our team of experts is ready to guide you to the perfect solution for your needs
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(30, 64, 175, 0.15)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-blue-950 font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
                  >
                    <Users className="w-5 h-5" />
                    Contact Sales Team
                  </motion.button>
                </Link>
                <Link to="/demo">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(30, 64, 175, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-950 to-blue-800 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
                  >
                    <Play className="w-5 h-5" />
                    Request Live Demo
                  </motion.button>
                </Link>
              </div>
              
              <p className="mt-8 text-blue-600/70 text-sm">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Free consultation • No commitment • 24/7 support available
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-b from-blue-950 to-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8 mt-20 overflow-hidden">
        {/* Footer Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-white to-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <Rocket className="w-8 h-8 text-blue-950" />
                </div>
                <div>
                  <h2 className="font-bold text-3xl tracking-tight">CareerLaunch</h2>
                  <p className="text-blue-300/80 text-sm font-medium">Unified Recruitment Platform</p>
                </div>
              </motion.div>
              
              <p className="text-blue-300/70 max-w-md">
                Accelerating careers and revolutionizing recruitment with cutting-edge technology and personalized solutions.
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-blue-300/80 mb-4 font-medium">
                © 2024 CareerLaunch. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-6">
                <a href="#" className="text-blue-300/70 hover:text-white transition-colors font-medium hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="text-blue-300/70 hover:text-white transition-colors font-medium hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="text-blue-300/70 hover:text-white transition-colors font-medium hover:underline">
                  Support Center
                </a>
                <a href="#" className="text-blue-300/70 hover:text-white transition-colors font-medium hover:underline">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-blue-800/50 text-center">
            <p className="text-blue-400/60 text-sm">
              Built with ❤️ for recruiters, candidates, and organizations worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}