import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  Users,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  BookmarkCheck,
  BarChart3,
  ClipboardList,
} from 'lucide-react';

export default function VendorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SIDEBAR_WIDTH = 280;
  const COLLAPSED_WIDTH = 80;

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/vendor/dashboard' },
    { label: 'Job Posting', icon: ClipboardList, path: '/vendor/job-postings' },
    { label: 'Find Clients', icon: Briefcase, path: '/vendor/jobs' },
    { label: 'Benchlist', icon: BookmarkCheck, path: '/vendor/benchlist' },
    { label: 'Independent Candidates', icon: Users, path: '/vendor/candidates' },
    { label: 'My Profile', icon: User, path: '/vendor/profile' },
    { label: 'Business Analytics', icon: BarChart3, path: '/vendor/analytics' },
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
        {isMobileOpen ? (
          <X className="text-blue-950 w-6 h-6" />
        ) : (
          <Menu className="text-blue-950 w-6 h-6" />
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
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
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
            className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-blue-950 text-white z-50"
          >
            <div className="flex flex-col h-full overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <Briefcase className="text-blue-950 w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg leading-none">Vendor</h2>
                    <p className="text-xs text-blue-300 mt-1">Recruitment Hub</p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {menuItems.map(({ label, icon: Icon, path }) => (
                  <button
                    key={path}
                    onClick={() => {
                      navigate(path);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive(path)
                        ? 'bg-white text-blue-950 font-bold'
                        : 'hover:bg-white/10 text-white/80 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600/20 rounded-xl text-red-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">Logout</span>
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
        className="fixed left-0 top-0 h-screen bg-blue-950 text-white z-40 hidden lg:block border-r border-white/5 shadow-2xl"
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                  <Briefcase className="text-blue-950 w-6 h-6" />
                </div>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-nowrap"
                  >
                    <h2 className="font-bold text-lg leading-none text-white">Vendor</h2>
                    <p className="text-[11px] text-blue-400 font-medium uppercase tracking-wider mt-1">Portal</p>
                  </motion.div>
                )}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors ml-2"
              >
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Navigation - Content Fixed, No Scroll */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map(({ label, icon: Icon, path }) => {
              const active = isActive(path);
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                    active
                      ? 'bg-white text-blue-950 font-bold shadow-lg shadow-blue-950/40'
                      : 'hover:bg-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-blue-600' : ''}`} />
                  
                  {isOpen && (
                    <span className="text-sm truncate font-medium">{label}</span>
                  )}

                  {!isOpen && (
                    <div className="absolute left-16 px-3 py-2 bg-blue-900 text-white text-[11px] font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 uppercase tracking-widest shadow-2xl border border-white/10">
                      {label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-white/10 flex-shrink-0">
            <button
              onClick={() => navigate('/vendor/notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white mb-1 ${
                !isOpen ? 'justify-center' : ''
              }`}
            >
              <Bell className="w-5 h-5" />
              {isOpen && <span className="text-sm font-medium">Notifications</span>}
            </button>

            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 rounded-xl text-red-400 transition-colors ${
                !isOpen ? 'justify-center' : ''
              }`}
            >
              <LogOut className="w-5 h-5" />
              {isOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Desktop Layout Spacer */}
      <div
        className={`hidden lg:block transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[280px]' : 'w-[80px]'
        }`}
      />
    </>
  );
}