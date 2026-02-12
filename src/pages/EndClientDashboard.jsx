import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Users, Clock, TrendingUp, Plus, Eye, Award, 
  X, ChevronRight, MapPin, DollarSign, FileText, Send,
  Filter, MoreHorizontal, Building2, Calendar, Target,
  CheckCircle2, AlertCircle, ArrowLeft, Share2, Edit3, Mail, Download
} from 'lucide-react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import EndClientSidebar from '../components/EndClientSidebar';
import JobCardsView from '../components/JobCardsView';

export default function EndClientDashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showJobsPage, setShowJobsPage] = useState(false);

  // --- DATA MODELS ---
  const stats = [
    { 
      label: 'Active Jobs', 
      value: '24', 
      change: '+6 this week', 
      icon: Briefcase, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      clickable: true,
      onClick: () => setShowJobsPage(true)
    },
    { label: 'Total Applications', value: '186', change: '+42 new', icon: Users, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { label: 'Pending Interviews', value: '38', change: '12 for today', icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { label: 'Successful Hires', value: '15', change: '+3 this month', icon: CheckCircle2, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  ];

  const hiringTrends = [
    { month: 'Jan', applications: 120, hired: 8 },
    { month: 'Feb', applications: 145, hired: 10 },
    { month: 'Mar', applications: 165, hired: 12 },
    { month: 'Apr', applications: 178, hired: 14 },
    { month: 'May', applications: 195, hired: 16 },
    { month: 'Jun', applications: 210, hired: 18 },
  ];

  const openPositions = [
    { 
      id: 1,
      title: 'Senior Full Stack Developer', 
      department: 'Engineering', 
      applicants: 45, 
      status: 'Active', 
      urgency: 'High', 
      location: 'San Francisco, CA', 
      exp: '5-8 years', 
      salary: '$140k - $180k', 
      type: 'Full-Time', 
      workMode: 'Hybrid',
      skills: 'React, Node.js, AWS, TypeScript, GraphQL', 
      desc: 'We are looking for a high-level architect to lead our core platform migration. You will be responsible for designing scalable systems, mentoring junior developers, and driving technical decisions across the organization.',
      jobId: 'JOB-001',
      postedDate: '2024-02-15'
    },
    { 
      id: 2,
      title: 'Product Manager', 
      department: 'Product', 
      applicants: 32, 
      status: 'Active', 
      urgency: 'Medium', 
      location: 'New York, NY', 
      exp: '5+ Years', 
      salary: '$130k - $160k', 
      type: 'Full-Time',
      workMode: 'Hybrid',
      skills: 'Agile, Roadmap, SQL, JIRA, User Research', 
      desc: 'Drive the product vision for our next-gen fintech application. Lead cross-functional teams, define product requirements, and deliver exceptional user experiences.',
      jobId: 'JOB-002',
      postedDate: '2024-02-03'
    },
    { 
      id: 3,
      title: 'UX Designer', 
      department: 'Design', 
      applicants: 28, 
      status: 'Active', 
      urgency: 'High', 
      location: 'London, UK', 
      exp: '3-5 Years', 
      salary: '£70k - £90k', 
      type: 'Contract',
      workMode: 'Remote',
      skills: 'Figma, Prototyping, User Research, Wireframing', 
      desc: 'Transform complex workflows into elegant user experiences. Create intuitive interfaces and conduct user testing to validate design decisions.',
      jobId: 'JOB-003',
      postedDate: '2024-01-28'
    },
    { 
      id: 4,
      title: 'Data Analyst', 
      department: 'Analytics', 
      applicants: 19, 
      status: 'Draft', 
      urgency: 'Low', 
      location: 'Austin, TX', 
      exp: '2-4 Years', 
      salary: '$90k - $110k', 
      type: 'Full-Time',
      workMode: 'Hybrid',
      skills: 'Python, Tableau, R, SQL, Excel', 
      desc: 'Analyze user behavior data to provide actionable business insights. Build dashboards and reports to support data-driven decision making.',
      jobId: 'JOB-004',
      postedDate: '2024-02-02'
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/50 text-slate-900 font-sans">
      <EndClientSidebar />
      
      <AnimatePresence>
        {showJobsPage ? (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="flex-1"
          >
            <JobCardsView onBack={() => setShowJobsPage(false)} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col min-w-0 overflow-hidden"
          >
            {/* TOP NAVBAR */}
            <header className="h-20 bg-white border-b border-blue-100 flex items-center justify-between px-8 sticky top-0 z-40">
              <div>
                <h1 className="text-xl font-bold text-blue-950 flex items-center gap-2">
                    Recruit_360 Talent Suite <span className="text-gray-300 font-light"></span> 
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-950 flex items-center justify-center text-white font-bold text-xs">
                  {localStorage.getItem('userName')?.charAt(0) || 'A'}
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all shadow-sm"
                >
                  <Plus size={18} /> Create Job
                </button>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8 max-w-[1600px] mx-auto w-full space-y-8">
              
              {/* WELCOME SECTION */}
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-blue-950">Good morning, {localStorage.getItem('userName')?.split(' ')[0] || 'Client'}</h2>
                  <p className="text-blue-700 text-sm mt-1">Here is what's happening with your recruitment pipeline today.</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white border border-transparent hover:border-blue-200 rounded-lg transition-all text-blue-600"><Filter size={20}/></button>
                  <button className="p-2 hover:bg-white border border-transparent hover:border-blue-200 rounded-lg transition-all text-blue-600"><Calendar size={20}/></button>
                </div>
              </div>

              {/* STATS STRIP */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={stat.clickable ? stat.onClick : undefined}
                    className={`bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer ${stat.clickable ? 'hover:border-blue-300' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-3xl font-bold text-blue-950 mt-1">{stat.value}</p>
                      </div>
                      <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                        <stat.icon size={20} />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 font-bold">
                      <TrendingUp size={14} /> <span>{stat.change}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CHART & ALERTS SECTION */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white border border-blue-100 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-blue-950">Recruitment Velocity</h3>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hiringTrends}>
                        <defs>
                          <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: 'white' }} />
                        <Area type="monotone" dataKey="applications" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorBlue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-950 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold mb-2">Hire Smarter</h3>
                      <p className="text-blue-200 text-sm mb-6">Review the latest candidate briefings for today's interviews.</p>
                      <button className="w-full py-3 bg-white text-blue-950 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">View Schedule</button>
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-10"><Target size={120} /></div>
                  </div>
                  
                  <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-blue-950 mb-4 text-sm uppercase tracking-wider">System Alerts</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <AlertCircle className="text-amber-500 shrink-0" size={18} />
                        <p className="text-xs text-blue-700 font-medium leading-relaxed">3 Job postings are expiring soon. Please review for extension.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPEN POSITIONS CARDS */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-blue-950 text-lg">Live Job Postings</h3>
                  <button 
                    onClick={() => setShowJobsPage(true)}
                    className="text-sm text-blue-600 font-bold hover:text-blue-800"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {openPositions.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE JOB MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Job Card Component - FIXED title overflow and navigation
function JobCard({ job }) {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/end-client/jobs/${job.id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Briefcase size={16} />
            </div>
            <span className="font-bold text-blue-950 text-sm truncate max-w-[180px]" title={job.title}>
              {job.title}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold whitespace-nowrap">
              {job.department}
            </span>
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
              job.urgency === 'High' ? 'bg-red-50 text-red-600' : 
              job.urgency === 'Medium' ? 'bg-amber-50 text-amber-600' : 
              'bg-blue-50 text-blue-600'
            }`}>
              {job.urgency}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 flex-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-blue-600 font-bold">Applicants</span>
          <span className="font-bold text-blue-950">{job.applicants}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-blue-600 font-bold">Location</span>
          <span className="font-medium text-blue-700 truncate max-w-[120px]" title={job.location}>
            {job.location}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-blue-600 font-bold">Type</span>
          <span className="font-medium text-blue-700">{job.type}</span>
        </div>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/end-client/jobs/${job.id}`);
        }}
        className="w-full mt-6 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-bold text-sm transition-colors"
      >
        View Details
      </button>
    </motion.div>
  );
}

// Create Job Modal Component
function CreateJobModal({ isOpen, onClose }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="px-10 py-6 border-b border-blue-100 flex justify-between items-center bg-white sticky top-0">
          <div>
            <h2 className="text-xl font-bold text-blue-950">Create New Job Posting</h2>
            <p className="text-blue-600 text-xs font-medium">Fill in the details to broadcast to your vendor network.</p>
          </div>
          <button onClick={onClose} className="text-blue-600 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8">
          {/* BASIC INFO SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-blue-600 tracking-widest border-l-4 border-blue-600 pl-3">
              Basic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-700">Job Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Senior Java Developer" 
                  className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm font-medium text-blue-950 outline-none focus:border-blue-600 focus:bg-white transition-all" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-700">Department</label>
                <select className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm font-medium text-blue-950 outline-none focus:border-blue-600">
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
            </div>
          </div>

          {/* SPECIFICATIONS SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-blue-600 tracking-widest border-l-4 border-blue-600 pl-3">
              Specifications
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-700">Experience</label>
                <select className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm font-medium text-blue-950">
                  <option>Entry Level</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                  <option>Lead</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-700">Work Mode</label>
                <select className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm font-medium text-blue-950">
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-700">Type</label>
                <select className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm font-medium text-blue-950">
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
              </div>
            </div>
          </div>

          {/* COMPENSATION SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-blue-600 tracking-widest border-l-4 border-blue-600 pl-3">
              Compensation
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-700">Salary Range</label>
                <input 
                  type="text" 
                  placeholder="e.g. $100k - $130k" 
                  className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm font-medium text-blue-950 outline-none focus:border-blue-600" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-700">Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Remote, New York" 
                  className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm font-medium text-blue-950 outline-none focus:border-blue-600" 
                />
              </div>
            </div>
          </div>

          {/* SKILLS SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-blue-600 tracking-widest border-l-4 border-blue-600 pl-3">
              Required Skills
            </h3>
            <div className="space-y-1.5">
              <input 
                type="text" 
                placeholder="e.g. React, Node.js, AWS (comma separated)" 
                className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm font-medium text-blue-950 outline-none focus:border-blue-600" 
              />
            </div>
          </div>

          {/* DESCRIPTION SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-blue-600 tracking-widest border-l-4 border-blue-600 pl-3">
              Job Description
            </h3>
            <div className="space-y-1.5">
              <textarea 
                rows="6" 
                placeholder="Outline the key responsibilities, requirements, and benefits..." 
                className="w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm font-medium text-blue-950 outline-none focus:border-blue-600 focus:bg-white resize-none"
              />
            </div>
          </div>
        </div>

        <div className="px-10 py-6 border-t border-blue-100 bg-blue-50/50 flex justify-end gap-3 shrink-0 rounded-b-2xl">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Discard
          </button>
          <button 
            className="px-8 py-2.5 bg-blue-950 text-white rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-900 shadow-md transition-all"
          >
            <Send size={16} /> Publish Requisition
          </button>
        </div>
      </motion.div>
    </div>
  );
}