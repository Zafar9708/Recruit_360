import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, Bell, Plus } from 'lucide-react';

export default function PortalNav({
  title,
  subtitle,
  navigationItems,
  primaryColor,
  gradientFrom,
  gradientTo,
  icon: IconComponent,
  actionButton
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-12 h-12 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl flex items-center justify-center shadow-lg cursor-pointer`}
                onClick={() => navigate(navigationItems[0]?.path)}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </motion.div>

              <div>
                <h1 className="font-bold text-gray-900 text-xl">{title}</h1>
                <p className="text-xs text-gray-500">{subtitle}</p>
              </div>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    location.pathname === item.path
                      ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-lg`
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">

            {/* ACTION BUTTON */}
            {actionButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={actionButton.onClick}
                className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl`}
              >
                <Plus className="w-5 h-5" />
                <span className="hidden md:inline">{actionButton.label}</span>
              </motion.button>
            )}

            {/* NOTIFICATIONS */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>

            {/* USER INFO */}
            <div
              className={`hidden md:flex items-center gap-3 px-3 py-2 bg-gradient-to-r ${primaryColor}-50 rounded-xl`}
            >
              <div
                className={`w-10 h-10 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-lg flex items-center justify-center`}
              >
                <span className="text-white font-bold text-sm">
                  {(localStorage.getItem('userName') || 'U').charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {localStorage.getItem('userName') || 'User'}
                </p>
                <p className="text-xs text-gray-500">
                  {title.split(' ')[0]}
                </p>
              </div>
            </div>

            {/* LOGOUT */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Logout</span>
            </motion.button>

          </div>
        </div>
      </div>
    </motion.nav>
  );
}
