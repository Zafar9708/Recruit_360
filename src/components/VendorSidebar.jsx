import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  Users,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  BookmarkCheck,
} from 'lucide-react';

export default function VendorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/vendor/dashboard' },
    { label: 'Career Opportunities', icon: Briefcase, path: '/vendor/jobs' },
    { label: 'Bench Resources', icon: BookmarkCheck, path: '/vendor/benchlist' },
    { label: 'Independent Candidates', icon: Users, path: '/vendor/candidates' },
    { label: 'My Info', icon: User, path: '/vendor/profile' },
    { label: 'Business Insights', icon: Settings, path: '/vendor/settings' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 280 : 80,
          x: isMobileOpen || window.innerWidth >= 1024 ? 0 : -280,
        }}
        className={`fixed left-0 top-0 h-screen bg-gradient-to-br from-blue-600 to-cyan-600 text-white z-40 transition-all duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <motion.div
                animate={{ opacity: isOpen ? 1 : 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>

                {isOpen && (
                  <div>
                    <h2 className="font-bold text-lg">Vendor</h2>
                    <p className="text-xs text-green-100">Portal</p>
                  </div>
                )}
              </motion.div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <motion.button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileOpen(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? 'bg-white text-blue-500 shadow-lg'
                      : 'hover:bg-white/10 text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />

                  {isOpen && (
                    <span className="font-medium truncate">
                      {item.label}
                    </span>
                  )}

                  {active && isOpen && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => navigate('/vendor/profile')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors"
            >
              <Bell className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="font-medium truncate">
                  Notifications
                </span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-700 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="font-medium truncate">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Spacer */}
      <div
        className={`hidden lg:block transition-all duration-300 ${
          isOpen ? 'w-[280px]' : 'w-[80px]'
        }`}
      />
    </>
  );
}
