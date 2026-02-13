import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 md:pt-16 pb-6 md:pb-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 pb-8 md:pb-12">
          
          {/* Company Info - Logo & Description */}
          <div className="lg:col-span-4">
            <div 
              className="flex flex-col items-start cursor-pointer group"
              onClick={scrollToTop}
            >
              <img 
                src="/logo.png" 
                alt="Recruit_X" 
                className="h-14 md:h-16 w-auto mb-2 md:mb-3 group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-[10px] md:text-[11px] text-gray-500 font-medium -mt-5 md:-mt-6 mb-2 md:mb-3">
                Find Talent, All in One Place
              </span>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2 md:mt-4 max-w-sm">
                Revolutionizing recruitment with AI-powered solutions. Connecting exceptional talent with outstanding opportunities across the globe.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 md:gap-3 mt-4 md:mt-6 flex-wrap">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition-all duration-300"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition-all duration-300"
              >
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition-all duration-300"
              >
                <Youtube className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs md:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 md:mb-4">
              Company
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('resources')}
                  className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  Resources
                </button>
              </li>
              <li>
                <Link 
                  to="/careers"
                  className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* For Candidates & Clients */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 md:mb-4">
                  Candidates
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <Link to="/search-jobs" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      Search Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/upload-resume" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      Upload Resume
                    </Link>
                  </li>
                  <li>
                    <Link to="/career-advice" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      Career Advice
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 md:mb-4">
                  Clients
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <Link to="/post-job" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      Post a Job
                    </Link>
                  </li>
                  <li>
                    <Link to="/search-candidates" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      Search Candidates
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      View Plans
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-xs md:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 md:mb-4">
              Get in Touch
            </h3>
            
            {/* Contact Details */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex items-start gap-2 md:gap-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-600">
                  123 Innovation Street, Tech City
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                <a href="mailto:contact@Recruit_X.com" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors break-all">
                  contact@Recruit_X.com
                </a>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-2 md:mb-3">
                Subscribe
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-xs sm:text-sm"
                />
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 md:pt-8 mt-6 md:mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              <span>© {new Date().getFullYear()} Recruit_X.</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for better hiring
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <Link to="/privacy" className="text-xs text-gray-500 hover:text-purple-600 transition-colors whitespace-nowrap">
                Privacy
              </Link>
              <Link to="/terms" className="text-xs text-gray-500 hover:text-purple-600 transition-colors whitespace-nowrap">
                Terms
              </Link>
              <Link to="/cookies" className="text-xs text-gray-500 hover:text-purple-600 transition-colors whitespace-nowrap">
                Cookies
              </Link>
              <Link to="/sitemap" className="text-xs text-gray-500 hover:text-purple-600 transition-colors whitespace-nowrap">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}