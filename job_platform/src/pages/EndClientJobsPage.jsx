import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Plus, Search, Filter, MapPin, DollarSign,
  Clock, Users, ChevronDown, X, Send, Building2,
  Calendar, ArrowRight, ArrowLeft, Mail, Download, Share2, Edit3,
  Globe, Zap, Shield, Laptop
} from "lucide-react";
import EndClientSidebar from "../components/EndClientSidebar";

export default function EndClientJobsPage() {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicants, setShowApplicants] = useState(false);
  const [filters, setFilters] = useState({ jobType: "", workMode: "", status: "" });

  // --- 10 DUMMY JOBS ---
  const jobs = [
    { id: "1", title: "Senior Full Stack Developer", department: "Engineering", location: "San Francisco, CA", type: "Full-time", workMode: "Hybrid", experience: "5-8 years", salary: "$140K - $180K", applicants: 45, status: "Active", skills: "React, Node.js, AWS", desc: "Lead our core platform architecture and scale our cloud infrastructure." },
    { id: "2", title: "Product Manager", department: "Product", location: "New York, NY", type: "Full-time", workMode: "Remote", experience: "4-6 years", salary: "$130K - $160K", applicants: 32, status: "Active", skills: "Agile, SQL, Roadmap", desc: "Drive product vision and coordinate between engineering and stakeholders." },
    { id: "3", title: "UX Designer", department: "Design", location: "Austin, TX", type: "Full-time", workMode: "On-site", experience: "3-5 years", salary: "$110K - $140K", applicants: 28, status: "Active", skills: "Figma, Research", desc: "Create beautiful, user-centric interfaces for our enterprise suite." },
    { id: "4", title: "DevOps Engineer", department: "Engineering", location: "Remote", type: "Contract", workMode: "Remote", experience: "5+ years", salary: "$90/hr - $110/hr", applicants: 15, status: "Active", skills: "Docker, Kubernetes, CI/CD", desc: "Optimize our deployment pipelines and manage multi-region clusters." },
    { id: "5", title: "Marketing Director", department: "Marketing", location: "Chicago, IL", type: "Full-time", workMode: "Hybrid", experience: "10+ years", salary: "$150K - $190K", applicants: 56, status: "Active", skills: "Strategy, SEO, Analytics", desc: "Oversee global marketing campaigns and brand positioning." },
    { id: "6", title: "Data Scientist", department: "Analytics", location: "Seattle, WA", type: "Full-time", workMode: "Remote", experience: "3-5 years", salary: "$145K - $175K", applicants: 89, status: "Active", skills: "Python, PyTorch, SQL", desc: "Build predictive models to enhance user engagement and retention." },
    { id: "7", title: "QA Automation Lead", department: "Engineering", location: "Boston, MA", type: "Full-time", workMode: "On-site", experience: "6-8 years", salary: "$120K - $150K", applicants: 22, status: "Active", skills: "Selenium, Jest, Cypress", desc: "Define testing standards and lead the automation transformation." },
    { id: "8", title: "HR Business Partner", department: "HR", location: "Atlanta, GA", type: "Full-time", workMode: "Hybrid", experience: "5+ years", salary: "$100K - $130K", applicants: 41, status: "Closed", skills: "Recruiting, Compliance", desc: "Support departmental growth and manage talent relations." },
    { id: "9", title: "Cybersecurity Analyst", department: "IT", location: "Remote", type: "Full-time", workMode: "Remote", experience: "4-7 years", salary: "$135K - $165K", applicants: 19, status: "Active", skills: "SOC, Penetration Testing", desc: "Secure our infrastructure against emerging threats and manage audits." },
    { id: "10", title: "Customer Success Manager", department: "Sales", location: "Denver, CO", type: "Full-time", workMode: "Hybrid", experience: "2-4 years", salary: "$85K - $115K", applicants: 67, status: "Draft", skills: "CRM, Presentation", desc: "Manage key accounts and ensure high customer satisfaction scores." },
  ];

  const mockApplicants = [
    { id: 1, name: 'Jonathan Reeves', status: 'Interview', match: 98, location: 'San Francisco', exp: '8 yrs' },
    { id: 2, name: 'Sasha Petrova', status: 'Review', match: 92, location: 'Austin, TX', exp: '7 yrs' },
    { id: 3, name: 'Marcus Miller', status: 'Shortlisted', match: 88, location: 'Remote', exp: '10 yrs' },
  ];

  // --- FILTERING LOGIC ---
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.skills.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !filters.jobType || job.type === filters.jobType;
      const matchesMode = !filters.workMode || job.workMode === filters.workMode;
      const matchesStatus = !filters.status || job.status === filters.status;

      return matchesSearch && matchesType && matchesMode && matchesStatus;
    });
  }, [searchTerm, filters]);

  return (
    <div className="flex min-h-screen bg-gray-50/50 text-slate-900 font-sans">
      <EndClientSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 sticky top-0 z-40 flex items-center shrink-0">
          <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-blue-950">Job Requisitions</h1>
              <p className="text-xs text-gray-400 font-medium">Manage {jobs.length} open positions</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-all shadow-md"
            >
              <Plus size={18} /> Post New Job
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-6">
          
          {/* SEARCH & FILTERS BAR */}
          <div className="space-y-4">
            <div className="bg-white p-2 border border-gray-200 rounded-xl shadow-sm flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  placeholder="Search by title, department, or skills..." 
                  className="w-full pl-12 pr-4 py-2.5 bg-transparent text-sm outline-none font-medium" 
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all ${showFilters ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Filter size={18} /> Filters <ChevronDown size={16} className={showFilters ? "rotate-180" : ""} />
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-inner">
                    <select value={filters.jobType} onChange={(e) => setFilters({...filters, jobType: e.target.value})} className="bg-gray-50 border-none p-2.5 rounded-lg text-sm font-bold text-blue-950 outline-none">
                      <option value="">All Job Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                    <select value={filters.workMode} onChange={(e) => setFilters({...filters, workMode: e.target.value})} className="bg-gray-50 border-none p-2.5 rounded-lg text-sm font-bold text-blue-950 outline-none">
                      <option value="">All Work Modes</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                    <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="bg-gray-50 border-none p-2.5 rounded-lg text-sm font-bold text-blue-950 outline-none">
                      <option value="">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* JOB LIST GRID */}
          <div className="grid gap-4 pb-10">
            {filteredJobs.length > 0 ? filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ y: -2 }}
                onClick={() => { setSelectedJob(job); setShowApplicants(false); }}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-blue-950 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md tracking-wider ${job.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>{job.status}</span>
                      </div>
                      <p className="text-gray-400 font-medium text-sm mt-1">{job.department} • {job.location}</p>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400"><Clock size={14} /> {job.experience}</span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400"><DollarSign size={14} /> {job.salary}</span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400"><Globe size={14} /> {job.workMode}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col justify-between items-end md:border-l border-gray-100 md:pl-8 min-w-[120px]">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Applicants</p>
                      <p className="text-2xl font-black text-blue-600">{job.applicants}</p>
                    </div>
                    <button className="text-sm font-black text-blue-950 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">View Details <ArrowRight size={16}/></button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                <Search size={40} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500 font-bold">No jobs matching your criteria</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* DUAL-LAYER SIDE PANEL */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-blue-950/20 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="relative w-full max-w-xl bg-white shadow-2xl h-full flex flex-col">
              
              <div className="relative flex-1 overflow-hidden">
                {/* LAYER 1: JOB DETAILS */}
                <div className={`absolute inset-0 flex flex-col bg-white transition-transform duration-500 ${showApplicants ? '-translate-x-full' : 'translate-x-0'}`}>
                  <div className="p-8 border-b flex justify-between items-center sticky top-0 bg-white">
                    <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={20}/></button>
                    <div className="flex gap-2"><Share2 size={18} className="text-gray-400"/><Edit3 size={18} className="text-gray-400"/></div>
                  </div>
                  <div className="p-10 space-y-8 overflow-y-auto flex-1">
                    <div>
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase">{selectedJob.status}</span>
                      <h2 className="text-3xl font-bold text-blue-950 mt-4 leading-tight">{selectedJob.title}</h2>
                      <p className="text-gray-500 font-medium mt-2">{selectedJob.department} • {selectedJob.location}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[{l: 'Experience', v: selectedJob.experience}, {l: 'Salary', v: selectedJob.salary}, {l: 'Type', v: selectedJob.type}, {l: 'Mode', v: selectedJob.workMode}].map((item, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.l}</p>
                          <p className="text-sm font-bold text-blue-950 mt-1">{item.v}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase text-gray-400">Description</h4>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">{selectedJob.desc}</p>
                    </div>
                    <div className="pt-8 border-t">
                      <button onClick={() => setShowApplicants(true)} className="w-full py-4 bg-blue-950 text-white rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg flex items-center justify-center gap-2">
                        <Users size={18}/> View All Applicants ({selectedJob.applicants})
                      </button>
                    </div>
                  </div>
                </div>

                {/* LAYER 2: APPLICANTS */}
                <div className={`absolute inset-0 flex flex-col bg-white transition-transform duration-500 ${showApplicants ? 'translate-x-0' : 'translate-x-full'}`}>
                  <div className="p-8 border-b flex items-center gap-4 sticky top-0 bg-white">
                    <button onClick={() => setShowApplicants(false)} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={20}/></button>
                    <div><h3 className="font-bold text-blue-950">Applicant Ledger</h3><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{selectedJob.title}</p></div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50 border-b border-gray-100"><tr className="text-[10px] uppercase font-black text-gray-400"><th className="px-8 py-4 font-black">Candidate</th><th className="px-8 py-4 font-black">Match</th><th className="px-8 py-4 text-right font-black">Actions</th></tr></thead>
                      <tbody className="divide-y divide-gray-50">
                        {mockApplicants.map((app) => (
                          <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-8 py-5"><p className="text-sm font-bold text-blue-950">{app.name}</p><p className="text-[10px] text-gray-400 font-medium">{app.exp} • {app.location}</p></td>
                            <td className="px-8 py-5"><div className="flex items-center gap-2"><div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600" style={{ width: `${app.match}%` }} /></div><span className="text-[10px] font-black text-blue-600">{app.match}%</span></div></td>
                            <td className="px-8 py-5 text-right"><button className="p-2 text-gray-400 hover:text-blue-600"><Mail size={16}/></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE JOB MODAL - FULL FIELDS */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
              <div className="px-10 py-8 border-b flex justify-between items-center bg-white sticky top-0">
                <div><h2 className="text-2xl font-black text-blue-950 tracking-tight">Create Requisition</h2><p className="text-gray-400 text-sm font-medium">Post a new opening to your vendor network</p></div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} className="text-gray-400" /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-10 py-10 space-y-10">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase text-blue-600 tracking-widest border-l-4 border-blue-600 pl-3">Job Details</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2"><label className="text-xs font-black text-gray-500 uppercase">Position Title</label><input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-600" /></div>
                    <div className="space-y-2"><label className="text-xs font-black text-gray-500 uppercase">Department</label><select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none"><option>Engineering</option><option>Sales</option><option>Marketing</option></select></div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2"><label className="text-xs font-black text-gray-500 uppercase">Experience Level</label><select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold"><option>Mid-Level</option><option>Senior</option></select></div>
                    <div className="space-y-2"><label className="text-xs font-black text-gray-500 uppercase">Work Mode</label><select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold"><option>Remote</option><option>Hybrid</option></select></div>
                    <div className="space-y-2"><label className="text-xs font-black text-gray-500 uppercase">Job Type</label><select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold"><option>Full-time</option><option>Contract</option></select></div>
                  </div>
                </div>
                <div className="space-y-2"><label className="text-xs font-black text-gray-500 uppercase">Description</label><textarea rows="5" className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600" /></div>
              </div>
              <div className="px-10 py-8 border-t bg-gray-50/50 flex justify-end gap-4">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-sm font-black text-gray-400">Discard</button>
                <button className="px-10 py-3 bg-blue-950 text-white rounded-xl font-black text-sm shadow-lg"><Send size={18} className="inline mr-2"/> Publish Posting</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}