import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Info,
  Clock,
  ChevronRight,
  Filter,
  Trash2,
  Archive,
  Eye,
  Mail,
  Calendar,
  UserCheck,
  FileText
} from 'lucide-react';
import EndClientSidebar from '../components/EndClientSidebar';

export default function EndClientNotificationsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Candidate Applied',
      message: 'John Smith applied for the Senior Developer position',
      time: '2 minutes ago',
      type: 'application',
      read: false,
      important: true
    },
    {
      id: 2,
      title: 'Interview Scheduled',
      message: 'Interview with Sarah Johnson scheduled for tomorrow at 2:00 PM',
      time: '1 hour ago',
      type: 'interview',
      read: false,
      important: true
    },
    {
      id: 3,
      title: 'Job Posting Approved',
      message: 'Your "Frontend Developer" job posting has been approved',
      time: '3 hours ago',
      type: 'approval',
      read: true,
      important: false
    },
    {
      id: 4,
      title: 'Profile Update Required',
      message: 'Please update your company profile information',
      time: '1 day ago',
      type: 'reminder',
      read: true,
      important: false
    },
    {
      id: 5,
      title: 'Weekly Analytics Report',
      message: 'Your weekly hiring analytics report is ready',
      time: '2 days ago',
      type: 'report',
      read: true,
      important: false
    },
    {
      id: 6,
      title: 'Subscription Renewal',
      message: 'Your subscription will renew in 7 days',
      time: '3 days ago',
      type: 'billing',
      read: true,
      important: true
    }
  ]);

  const filterOptions = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'important', label: 'Important', count: notifications.filter(n => n.important).length },
    { id: 'application', label: 'Applications', count: notifications.filter(n => n.type === 'application').length },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application':
        return <UserCheck className="text-blue-600" size={20} />;
      case 'interview':
        return <Calendar className="text-green-600" size={20} />;
      case 'approval':
        return <CheckCircle className="text-emerald-600" size={20} />;
      case 'reminder':
        return <AlertCircle className="text-amber-600" size={20} />;
      case 'report':
        return <FileText className="text-indigo-600" size={20} />;
      case 'billing':
        return <Mail className="text-purple-600" size={20} />;
      default:
        return <Info className="text-blue-600" size={20} />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'application': return 'Application';
      case 'interview': return 'Interview';
      case 'approval': return 'Approval';
      case 'reminder': return 'Reminder';
      case 'report': return 'Report';
      case 'billing': return 'Billing';
      default: return 'General';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : filter === 'important'
    ? notifications.filter(n => n.important)
    : notifications.filter(n => n.type === filter);

  return (
    <div className="flex min-h-screen bg-white text-blue-950 font-sans">
      <EndClientSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-16 lg:h-20 bg-blue-950 flex items-center justify-between px-4 lg:px-8 shrink-0 border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-800 rounded-lg flex items-center justify-center">
              <Bell className="text-white" size={14} />
            </div>
            <div>
              <h1 className="text-white text-sm lg:text-lg font-black uppercase tracking-wider">Notifications</h1>
              <p className="text-blue-400 text-[10px] lg:text-xs font-medium">Manage your alerts and updates</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <p className="text-white text-xs font-bold">Alexander Sterling</p>
              <p className="text-blue-400 text-[10px] uppercase">Admin</p>
            </div>
            <div className="relative">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-sm border border-blue-700">
                AS
              </div>
              {notifications.filter(n => !n.read).length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8 max-w-[1200px] mx-auto">
            {/* HEADER CONTROLS */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-black text-blue-950">Notification Center</h2>
                <p className="text-blue-600 text-sm mt-2">
                  {notifications.filter(n => !n.read).length} unread • {notifications.length} total
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                  <Check size={16} /> Mark All Read
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} /> Clear All
                </button>
              </div>
            </div>

            {/* FILTER BAR */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="text-blue-600" size={18} />
                <span className="text-blue-950 text-sm font-bold">Filter by:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFilter(option.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      filter === option.id
                        ? 'bg-blue-950 text-white'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    {option.label}
                    {option.count > 0 && (
                      <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                        filter === option.id ? 'bg-white/20' : 'bg-blue-200'
                      }`}>
                        {option.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* NOTIFICATIONS LIST */}
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="text-blue-400" size={24} />
                  </div>
                  <h3 className="text-blue-950 text-lg font-bold mb-2">No notifications</h3>
                  <p className="text-blue-600">You're all caught up!</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white border ${
                      notification.read ? 'border-blue-100' : 'border-blue-200'
                    } rounded-xl p-4 hover:shadow-md transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      {/* ICON */}
                      <div className={`p-3 rounded-lg ${
                        notification.read ? 'bg-blue-50' : 'bg-blue-100'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`text-sm font-bold ${
                                notification.read ? 'text-blue-900' : 'text-blue-950'
                              }`}>
                                {notification.title}
                              </h3>
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                                {getTypeLabel(notification.type)}
                              </span>
                              {notification.important && !notification.read && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
                                  Important
                                </span>
                              )}
                            </div>
                            <p className="text-blue-600 text-sm">{notification.message}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-blue-400 text-xs whitespace-nowrap">
                              <Clock size={12} className="inline mr-1" />
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-3 mt-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1"
                            >
                              <Check size={14} /> Mark as Read
                            </button>
                          )}
                          <button
                            onClick={() => navigate('/end-client/profile')}
                            className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1"
                          >
                            <Eye size={14} /> View Details
                          </button>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1 ml-auto"
                          >
                            <X size={14} /> Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* STATS */}
            <div className="mt-12 pt-8 border-t border-blue-100">
              <h3 className="text-lg font-black text-blue-950 mb-4">Notification Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  label="Total Notifications"
                  value={notifications.length}
                  icon={<Bell className="text-blue-600" size={20} />}
                  color="blue"
                />
                <StatCard
                  label="Unread"
                  value={notifications.filter(n => !n.read).length}
                  icon={<AlertCircle className="text-red-600" size={20} />}
                  color="red"
                />
                <StatCard
                  label="Important"
                  value={notifications.filter(n => n.important).length}
                  icon={<Info className="text-amber-600" size={20} />}
                  color="amber"
                />
                <StatCard
                  label="This Week"
                  value="12"
                  icon={<Calendar className="text-emerald-600" size={20} />}
                  color="emerald"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SUB-COMPONENTS
function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-white rounded-lg border border-blue-100">
          {icon}
        </div>
        <span className="text-2xl font-black text-blue-950">{value}</span>
      </div>
      <p className="text-blue-600 text-sm font-bold">{label}</p>
    </div>
  );
}