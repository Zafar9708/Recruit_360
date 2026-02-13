import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  X, Mail, Building2, User, Briefcase, 
  ChevronDown, Calendar, Phone, UserCircle,
  LogIn
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="w-full flex justify-center mt-5">
        <div className="w-[90%] max-w-7xl bg-white rounded-full shadow-md px-6 py-2 flex items-center justify-between">
          
          {/* LOGO WITH IMAGE - BIGGER LOGO WITH TAGLINE BELOW */}
          <div 
            className="flex flex-col items-start cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/logo.png" 
              alt="RecruitX360" 
              className="h-20 w-auto"
            />
            <span className="text-[10px] text-gray-500 font-medium ml-6 -mt-8">
             All in One Place
            </span>
          </div>

          {/* NAV LINKS - WITH SCROLL TO SECTIONS */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <li 
              className="hover:text-black cursor-pointer transition-colors"
              onClick={() => scrollToSection('about')}
            >
              About Us
            </li>
            <li 
              className="hover:text-black cursor-pointer transition-colors"
              onClick={() => scrollToSection('features')}
            >
              Features
            </li>
            <li 
              className="hover:text-black cursor-pointer transition-colors"
              onClick={() => scrollToSection('pricing')}
            >
              Pricing
            </li>
            <li 
              className="hover:text-black cursor-pointer transition-colors"
              onClick={() => scrollToSection('products')}
            >
              Products
            </li>

            {/* ORGANIZATION DROPDOWN */}
            <li className="relative group">
              <span className="hover:text-black cursor-pointer flex items-center gap-1">
                Organization
                <ChevronDown className="w-4 h-4" />
              </span>
              <ul className="absolute top-8 left-0 w-40 bg-white shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50 border border-gray-100">
                <li>
                  <Link
                    to="/plans"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    View Plans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/org/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-4">
            {/* SIMPLE SIGN IN DROPDOWN - FIXED POSITION */}
            <div className="relative">
              <button
                onClick={() => setIsSignInOpen(!isSignInOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                <UserCircle className="w-4 h-4" />
                <span>Sign in</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSignInOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isSignInOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                    style={{ right: '-20px' }}
                  >
                    <div className="py-1">
                      <Link
                        to="/candidate/login"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Candidate</span>
                      </Link>
                      <Link
                        to="/client/login"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Client</span>
                      </Link>
                      <Link
                        to="/vendor/login"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        <Briefcase className="w-4 h-4" />
                        <span>Vendor</span>
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link
                        to="/register"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-purple-600 hover:bg-purple-50 transition-colors"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Create account</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SIMPLE DEMO BUTTON */}
            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="bg-purple-600 text-white text-sm px-5 py-2 rounded-full hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Request a Demo
            </button>
          </div>
        </div>
      </nav>

      {/* SIMPLE & BEAUTIFUL DEMO MODAL */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <DemoModal onClose={() => setIsDemoModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

// Simple & Beautiful Demo Modal
function DemoModal({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Demo request:', formData);
    alert('Thank you! We\'ll contact you within 24 hours.');
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
      >
        {/* Simple Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-white">Request a Demo</h2>
          <p className="text-white/80 text-sm mt-1">See RecruitX360 in action</p>
        </div>

        {/* Simple Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm"
                placeholder="hello@company.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Company
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm"
                placeholder="Acme Inc."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Phone (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg mt-2"
          >
            Schedule Demo
          </button>

          <p className="text-xs text-gray-400 text-center pt-2">
            We'll get back to you within 24 hours
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}