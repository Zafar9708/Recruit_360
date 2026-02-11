import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  Calendar,
  Award,
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
  ChevronRight,
  MessageSquare,
  Bell,
  BarChart3
} from 'lucide-react';

export default function CandidateSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SIDEBAR_WIDTH = 280;
  const COLLAPSED_WIDTH = 80;

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
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-blue-100"
      >
        {isMobileOpen ? <X className="text-blue-950" /> : <Menu className="text-blue-950" />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
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
                    onClick={() => { navigate(path); setIsMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive(path) ? 'bg-white text-blue-950 shadow-lg font-semibold' : 'hover:bg-white/10'}`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
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
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? SIDEBAR_WIDTH : COLLAPSED_WIDTH }}
        className="fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white z-40 hidden lg:flex flex-col shadow-xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="h-20 p-5 border-b border-white/10 flex items-center shrink-0">
          <div className="flex items-center justify-between w-full min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shrink-0 text-lg font-bold">
                {candidateName.charAt(0).toUpperCase()}
              </div>
              {isOpen && (
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-base truncate leading-none mb-1">{candidateName}</h2>
                  <p className="text-[10px] text-blue-200 truncate">{candidateEmail}</p>
                </div>
              )}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors shrink-0 ml-1">
              <ChevronRight className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={16} />
            </button>
          </div>
        </div>

        {/* Navigation Area */}
        <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden">
          <div className="space-y-0.5">
            {menuItems.map(({ label, icon: Icon, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive(path) ? 'bg-white text-blue-950 shadow-lg font-semibold' : 'hover:bg-white/10'} ${!isOpen ? 'justify-center' : ''}`}
              >
                <Icon size={isOpen ? 18 : 22} />
                {isOpen && <span className="text-sm">{label}</span>}
              </button>
            ))}
          </div>

          {/* Compact Profile Boost Section */}
          {isOpen && (
            <div className="mt-auto mb-2 p-2.5 bg-white/5 border border-white/10 rounded-xl shrink-0">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-[11px] font-bold text-white truncate">Profile Boost</h4>
                  <button 
                    onClick={() => navigate('/profile-setup')}
                    className="text-[10px] text-blue-400 font-bold hover:text-white transition-colors cursor-pointer"
                  >
                    Update Now →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Logout - Fixed to Bottom */}
        <div className="p-4 border-t border-white/10 bg-blue-950 shrink-0">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${!isOpen ? 'justify-center' : 'gap-3'} px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 rounded-lg text-red-200 transition-colors shadow-inner`}
          >
            <LogOut size={isOpen ? 18 : 22} />
            {isOpen && <span className="text-sm font-semibold">Logout</span>}
          </button>
          
          {isOpen && (
            <p className="text-center text-[9px] text-blue-500/50 mt-2 uppercase tracking-widest font-bold">
              v2.4.0
            </p>
          )}
        </div>
      </motion.aside>

      {/* Desktop Spacer */}
      <div className={`hidden lg:block transition-all duration-300 flex-shrink-0 ${isOpen ? 'w-[280px]' : 'w-[80px]'}`} />
    </>
  );
}