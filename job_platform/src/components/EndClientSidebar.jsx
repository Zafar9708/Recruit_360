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
  BarChart3,
} from 'lucide-react';

export default function EndClientSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SIDEBAR_WIDTH = 280;
  const COLLAPSED_WIDTH = 80;

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/end-client/dashboard' },
    { label: 'Job Postings', icon: Briefcase, path: '/end-client/jobs' },
    { label: 'Candidates', icon: Users, path: '/end-client/candidates' },
    { label: 'Profile', icon: User, path: '/end-client/profile' },
    { label: 'Analytics', icon: BarChart3, path: '/end-client/analytics' },
    { label: 'Notifications', icon: Bell, path: '/end-client/notifications' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow border border-blue-100"
      >
        {isMobileOpen ? <X className="text-blue-950" /> : <Menu className="text-blue-950" />}
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

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-blue-950 text-white z-40"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Briefcase className="text-blue-950" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">End Client</h2>
                    <p className="text-xs text-blue-200">Portal</p>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <nav className="flex-1 p-4 space-y-2">
                {menuItems.map(({ label, icon: Icon, path }) => (
                  <button
                    key={path}
                    onClick={() => {
                      navigate(path);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                      isActive(path)
                        ? 'bg-white text-blue-950'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <Icon />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600/20 rounded-xl text-red-200"
                >
                  <LogOut />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? SIDEBAR_WIDTH : COLLAPSED_WIDTH,
        }}
        className="fixed left-0 top-0 h-screen bg-blue-950 text-white z-40 hidden lg:block"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Briefcase className="text-blue-950" />
                </div>
                {isOpen && (
                  <div>
                    <h2 className="font-bold text-lg">End Client</h2>
                    <p className="text-xs text-blue-200">Portal</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden lg:block p-2 hover:bg-white/10 rounded-lg"
              >
                <ChevronRight
                  className={`transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map(({ label, icon: Icon, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive(path)
                    ? 'bg-white text-blue-950 font-bold'
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon />
                {isOpen && <span className="text-sm">{label}</span>}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600/20 rounded-xl text-red-200 transition-colors ${
                !isOpen ? 'justify-center' : ''
              }`}
            >
              <LogOut />
              {isOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Desktop Spacer */}
      <div
        className={`hidden lg:block transition-all duration-300 ${
          isOpen ? 'w-[280px]' : 'w-20'
        }`}
      />
    </>
  );
}