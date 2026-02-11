import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Plus, Search, Filter, MapPin, DollarSign,
  Clock, Users, ChevronDown, Building2,
  Globe, Zap, Shield, Laptop, Edit3, Trash2, Eye, ArrowRight
} from "lucide-react";
import EndClientSidebar from "../components/EndClientSidebar";

// Mock data
const jobs = [
  { id: "1", title: "Senior Full Stack Developer", department: "Engineering", location: "San Francisco, CA", type: "Full-time", workMode: "Hybrid", experience: "5-8 years", salary: "$140K - $180K", applicants: 45, status: "Active", skills: "React, Node.js, AWS", desc: "Lead our core platform architecture and scale our cloud infrastructure." },
  { id: "2", title: "Product Manager", department: "Product", location: "New York, NY", type: "Full-time", workMode: "Remote", experience: "4-6 years", salary: "$130K - $160K", applicants: 32, status: "Active", skills: "Agile, SQL, Roadmap", desc: "Drive product vision and coordinate between engineering and stakeholders." },
  { id: "3", title: "UX Designer", department: "Design", location: "Austin, TX", type: "Full-time", workMode: "On-site", experience: "3-5 years", salary: "$110K - $140K", applicants: 28, status: "Active", skills: "Figma, Research", desc: "Create beautiful, user-centric interfaces for our enterprise suite." },
  { id: "4", title: "DevOps Engineer", department: "Engineering", location: "Remote", type: "Contract", workMode: "Remote", experience: "5+ years", salary: "$90/hr - $110/hr", applicants: 15, status: "Active", skills: "Docker, Kubernetes, CI/CD", desc: "Optimize our deployment pipelines and manage multi-region clusters." },
  { id: "5", title: "Marketing Director", department: "Marketing", location: "Chicago, IL", type: "Full-time", workMode: "Hybrid", experience: "10+ years", salary: "$150K - $190K", applicants: 56, status: "Active", skills: "Strategy, SEO, Analytics", desc: "Oversee global marketing campaigns and brand positioning." },
];

export default function EndClientJobsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ jobType: "", workMode: "", status: "" });

  // Filtering logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !filters.jobType || job.type === filters.jobType;
      const matchesMode = !filters.workMode || job.workMode === filters.workMode;
      const matchesStatus = !filters.status || job.status === filters.status;

      return matchesSearch && matchesType && matchesMode && matchesStatus;
    });
  }, [searchTerm, filters]);

  const navigateToJobDetails = (jobId) => {
    navigate(`/end-client/jobs/${jobId}`);
  };

  const navigateToApplicants = (jobId) => {
    navigate(`/end-client/jobs/${jobId}/applicants`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-blue-950 font-sans">
      <EndClientSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/90 backdrop-blur-xl border-b border-blue-100 flex items-center shrink-0 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-blue-950">Job Requisitions</h1>
              <p className="text-sm text-blue-600 font-medium">{jobs.length} open positions</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-200"
            >
              <Plus size={18} /> New Job
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-2 mb-4 flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  placeholder="Search jobs by title, department..." 
                  className="w-full pl-12 pr-4 py-3 bg-transparent text-blue-950 placeholder-blue-300 outline-none font-medium" 
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
                  showFilters ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Filter size={18} /> Filters
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-4 p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                    <div>
                      <label className="block text-sm font-semibold text-blue-900 mb-2">Job Type</label>
                      <select 
                        value={filters.jobType} 
                        onChange={(e) => setFilters({...filters, jobType: e.target.value})} 
                        className="w-full p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-950 outline-none"
                      >
                        <option value="">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-blue-900 mb-2">Work Mode</label>
                      <select 
                        value={filters.workMode} 
                        onChange={(e) => setFilters({...filters, workMode: e.target.value})} 
                        className="w-full p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-950 outline-none"
                      >
                        <option value="">All Modes</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-blue-900 mb-2">Status</label>
                      <select 
                        value={filters.status} 
                        onChange={(e) => setFilters({...filters, status: e.target.value})} 
                        className="w-full p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-950 outline-none"
                      >
                        <option value="">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Jobs Grid */}
          <div className="grid gap-4">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-xl transition-all hover:border-blue-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                      <Briefcase className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-blue-950 group-hover:text-blue-700">{job.title}</h3>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-blue-600 font-medium">{job.department} • {job.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-blue-400">Applicants</p>
                      <p className="text-2xl font-black text-blue-950">{job.applicants}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToApplicants(job.id);
                      }}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View applicants →
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-6">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs font-semibold text-blue-600">Experience</p>
                    <p className="text-sm font-bold text-blue-950">{job.experience}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs font-semibold text-blue-600">Salary</p>
                    <p className="text-sm font-bold text-blue-950">{job.salary}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs font-semibold text-blue-600">Type</p>
                    <p className="text-sm font-bold text-blue-950">{job.type}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs font-semibold text-blue-600">Work Mode</p>
                    <p className="text-sm font-bold text-blue-950">{job.workMode}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-blue-100">
                  <div className="flex items-center gap-2 text-blue-600 text-sm">
                    <Eye className="w-4 h-4" />
                    <span>Click the button below to view complete details</span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => navigateToJobDetails(job.id)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-200/50"
                    >
                      <Eye size={16} />
                      View Job Details
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToApplicants(job.id);
                      }}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                    >
                      <Users size={16} />
                      View Applicants
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Create Job Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-blue-100">
                <h2 className="text-2xl font-black text-blue-950">Create New Job</h2>
                <p className="text-blue-600 mt-2">Post a new opening to your vendor network</p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">Job Title</label>
                    <input type="text" className="w-full p-3 bg-blue-50 border border-blue-100 rounded-xl outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">Department</label>
                    <select className="w-full p-3 bg-blue-50 border border-blue-100 rounded-xl outline-none">
                      <option>Engineering</option>
                      <option>Product</option>
                      <option>Design</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                </div>
                
                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all">
                  Create Job Posting
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}