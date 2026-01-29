import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  FileText,
  Calendar,
  Award,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

export default function CandidateSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'Browse Jobs', icon: Briefcase, path: '/jobs' },
    { label: 'My Applications', icon: FileText, path: '/applications' },
    { label: 'Interviews', icon: Calendar, path: '/interviews' },
    { label: 'Skills Assessment', icon: Award, path: '/skills-assessment' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/candidate-settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-60 p-3 bg-white text-blue-600 rounded-xl shadow-lg border border-gray-200 hover:bg-blue-50 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-200
          z-50 flex flex-col shadow-xl transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-linear-to-br from-blue-50 to-cyan-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">
                  {localStorage.getItem('userName') || 'Candidate'}
                </h2>
                <p className="text-xs text-blue-600 font-medium">Job Seeker</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-white/80 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-blue-600">15</div>
              <div className="text-[10px] text-gray-600">Applied</div>
            </div>
            <div className="bg-white/80 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-green-600">5</div>
              <div className="text-[10px] text-gray-600">Interviews</div>
            </div>
            <div className="bg-white/80 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-orange-600">95%</div>
              <div className="text-[10px] text-gray-600">Profile</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${
                    active
                      ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'
                    }`}
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Quick Action */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-6 p-4 bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
          >
            <div className="flex gap-3 mb-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Boost Your Profile</h4>
                <p className="text-xs text-gray-600">
                  Complete your profile to get better matches
                </p>
              </div>
            </div>
            <button className="w-full py-2 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-xs font-semibold">
              Complete Now
            </button>
          </motion.div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>
      </aside>

      {/* Desktop Spacer */}
      <div className="hidden lg:block w-72" />
    </>
  );
}
