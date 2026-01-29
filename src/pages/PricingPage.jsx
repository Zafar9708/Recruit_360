import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, CheckCircle, Rocket, Menu, X, ChevronRight, Building2, Users, BarChart, Upload, Target
} from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);

  const plans = [
    {
      name: 'Hiring Plan',
      subtitle: 'For End Clients',
      description: 'Perfect for organizations looking to hire top talent',
      icon: Building2,
      color: 'from-blue-600 to-cyan-600',
      borderColor: 'border-blue-200 hover:border-blue-400',
      features: [
        'Post job requirements',
        'Manage job postings',
        'View candidate profiles',
        'Hire candidates',
        'Basic hiring analytics',
      ],
      restrictions: [
        'Bench list upload not allowed'
      ],
      purpose: 'Hiring Only',
      popular: false
    },
    {
      name: 'Staffing & Hiring Plan',
      subtitle: 'For Vendors / Advanced Organizations',
      description: 'Complete solution for staffing agencies and advanced hiring needs',
      icon: Rocket,
      color: 'from-purple-600 to-pink-600',
      borderColor: 'border-purple-200 hover:border-purple-400',
      features: [
        'Post job requirements',
        'Hire candidates',
        'Upload and manage bench list',
        'Apply bench candidates to job requirements',
        'Advanced analytics',
      ],
      restrictions: [],
      purpose: 'Hiring + Bench Management',
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-xl">CareerLaunch</h1>
                  <p className="text-xs text-gray-500">Your Career, Accelerated</p>
                </div>
              </motion.div>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</Link>
              <Link to="/#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</Link>
              <Link to="/#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Success Stories</Link>
              <Link to="/#stats" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Stats</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
              
              {/* For Organizations Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
                >
                  For Organizations
                  <ChevronRight className={`w-4 h-4 transition-transform ${orgDropdownOpen ? 'rotate-90' : ''}`} />
                </button>
                
                {orgDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                  >
                    <Link 
                      to="/pricing" 
                      className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setOrgDropdownOpen(false)}
                    >
                      View Plans
                    </Link>
                    <Link 
                      to="/login" 
                      className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setOrgDropdownOpen(false)}
                    >
                      Login
                    </Link>
                  </motion.div>
                )}
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
              <Link to="/register">
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
                <Link to="/#features" className="px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg">Features</Link>
                <Link to="/#how-it-works" className="px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg">How It Works</Link>
                <Link to="/#testimonials" className="px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg">Success Stories</Link>
                <Link to="/#stats" className="px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg">Stats</Link>
                <Link to="/pricing" className="px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg">Pricing</Link>
                <Link to="/login" className="px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg">Sign In</Link>
                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center">Get Started</Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Enterprise Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Perfect Plan</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Tailored solutions for organizations of all sizes. Whether you're hiring or managing a bench, we have the right plan for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl border-2 ${plan.borderColor} p-8 hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'md:scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">{plan.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-8">{plan.description}</p>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Key Features:
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {plan.restrictions.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500 italic">
                          Note: {plan.restrictions[0]}
                        </p>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/enquiry', { state: { purpose: plan.purpose, planName: plan.name } })}
                    className={`w-full py-4 bg-gradient-to-r ${plan.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                  >
                    Request Demo
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    Our team will contact you within 24 hours
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">500+ Companies</h3>
              <p className="text-gray-600">Trusted by leading organizations worldwide</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">50,000+ Placements</h3>
              <p className="text-gray-600">Successfully placed candidates across industries</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">95% Success Rate</h3>
              <p className="text-gray-600">Industry-leading placement success metrics</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-xl">CareerLaunch</h3>
          </div>
          <p className="text-gray-400 mb-6">Your Career, Accelerated</p>
          <p className="text-sm text-gray-500">© 2024 CareerLaunch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
