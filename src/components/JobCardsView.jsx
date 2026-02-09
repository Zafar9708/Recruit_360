import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, Users, Filter, Search, Grid, Layout, Plus,
  MapPin, DollarSign, Clock, Eye, Edit, Trash2, MoreHorizontal,
  ChevronLeft, Building2, CheckCircle, XCircle,
  FileText, ChevronDown, Calendar, Download, Share2,
  Mail, UserCheck, X, ChevronRight, Target, Activity,
  Power, PowerOff
} from 'lucide-react';
import ApplicantsView from './ApplicantsView';

export default function JobCardsView({ onBack }) {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'kanban'
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicants, setShowApplicants] = useState(false);
  const [activeJobForApplicants, setActiveJobForApplicants] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState({});
  const [jobs, setJobs] = useState([
    {
      id: 'JOB-001',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      type: 'Full-Time',
      location: 'Remote',
      salary: '$140k - $180k',
      experience: '7-10 Years',
      status: 'Active',
      verified: true,
      applicants: 45,
      skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'MongoDB', 'Docker', 'GraphQL', 'Redis'],
      description: 'Lead the development of our next-generation platform using modern technologies.',
      postedDate: '2024-02-01',
      deadline: '2024-03-01',
      isHidden: false
    },
    {
      id: 'JOB-002',
      title: 'Product Manager',
      department: 'Product',
      type: 'Full-Time',
      location: 'New York',
      salary: '$130k - $160k',
      experience: '5+ Years',
      status: 'Active',
      verified: true,
      applicants: 32,
      skills: ['Product Strategy', 'Roadmapping', 'SQL', 'Agile', 'JIRA', 'Figma', 'User Research'],
      description: 'Drive product vision and strategy for our fintech solutions.',
      postedDate: '2024-02-03',
      deadline: '2024-03-10',
      isHidden: false
    },
    {
      id: 'JOB-003',
      title: 'UX Designer',
      department: 'Design',
      type: 'Contract',
      location: 'London',
      salary: '£70k - £90k',
      experience: '3-5 Years',
      status: 'Active',
      verified: true,
      applicants: 28,
      skills: ['Figma', 'Prototyping', 'User Research', 'UI/UX', 'Wireframing', 'Adobe Creative Suite'],
      description: 'Create beautiful and functional user experiences for enterprise applications.',
      postedDate: '2024-01-28',
      deadline: '2024-02-28',
      isHidden: false
    },
    {
      id: 'JOB-004',
      title: 'Data Analyst',
      department: 'Analytics',
      type: 'Full-Time',
      location: 'Hybrid',
      salary: '$90k - $110k',
      experience: '2-4 Years',
      status: 'Active',
      verified: false,
      applicants: 19,
      skills: ['Python', 'Tableau', 'SQL', 'Data Visualization', 'Excel', 'Statistics', 'Machine Learning'],
      description: 'Analyze user behavior and provide actionable insights to product teams.',
      postedDate: '2024-02-02',
      deadline: '2024-03-15',
      isHidden: false
    },
    {
      id: 'JOB-005',
      title: 'DevOps Engineer',
      department: 'Engineering',
      type: 'Full-Time',
      location: 'Remote',
      salary: '$120k - $150k',
      experience: '4-6 Years',
      status: 'Inactive',
      verified: true,
      applicants: 12,
      skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Terraform', 'Ansible', 'Linux', 'Networking'],
      description: 'Build and maintain our cloud infrastructure and deployment pipelines.',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      isHidden: false
    },
    {
      id: 'JOB-006',
      title: 'Marketing Manager',
      department: 'Marketing',
      type: 'Full-Time',
      location: 'San Francisco',
      salary: '$110k - $140k',
      experience: '6+ Years',
      status: 'Active',
      verified: true,
      applicants: 8,
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Social Media', 'CRM', 'PPC'],
      description: 'Lead our marketing initiatives and drive customer acquisition.',
      postedDate: '2024-02-05',
      deadline: '2024-03-20',
      isHidden: false
    },
  ]);

  // Stats data
  const stats = [
    { label: 'Total Jobs', value: jobs.length.toString(), color: 'blue', icon: Briefcase },
    { label: 'Verified', value: jobs.filter(j => j.verified).length.toString(), color: 'blue', icon: CheckCircle },
    { label: 'Not Verified', value: jobs.filter(j => !j.verified).length.toString(), color: 'blue', icon: XCircle },
    { label: 'Active', value: jobs.filter(j => j.status === 'Active').length.toString(), color: 'blue', icon: Target },
    { label: 'Inactive', value: jobs.filter(j => j.status === 'Inactive').length.toString(), color: 'blue', icon: XCircle },
  ];

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    skills: '',
    jobType: 'All',
    status: 'All'
  });

  // Filtered jobs
  const filteredJobs = jobs.filter(job => {
    if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !job.department.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.skills && !job.skills.some(skill => skill.toLowerCase().includes(filters.skills.toLowerCase()))) {
      return false;
    }
    if (filters.jobType !== 'All' && job.type !== filters.jobType) {
      return false;
    }
    if (filters.status !== 'All' && job.status !== filters.status) {
      return false;
    }
    return true;
  });

  const handleViewApplicants = (job) => {
    setActiveJobForApplicants(job);
    setShowApplicants(true);
  };

  const toggleJobStatus = (jobId) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: job.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return job;
    }));
  };

  const toggleShowAllSkills = (jobId) => {
    setShowAllSkills(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  if (showApplicants && activeJobForApplicants) {
    return (
      <ApplicantsView 
        job={activeJobForApplicants}
        onBack={() => {
          setShowApplicants(false);
          setActiveJobForApplicants(null);
        }}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-blue-950">Active Requisitions</h1>
              <p className="text-blue-600 text-sm">Manage and track all your job postings in one place</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 bg-blue-950 text-white rounded-lg font-bold text-sm hover:bg-blue-900 transition-colors flex items-center gap-2">
              <Plus size={18} /> Post New Job
            </button>
            <button className="px-5 py-2.5 border border-blue-200 text-blue-700 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Users size={18} /> View All Applicants
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-blue-950 mt-1">{stat.value}</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <stat.icon size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <div className="bg-white border border-blue-100 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-blue-950">Filter & Search</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-blue-600 text-sm font-bold"
            >
              <Filter size={16} /> {showFilters ? 'Hide Filters' : 'Show Filters'}
              <ChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700">Search by Job Title</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                <input
                  type="text"
                  placeholder="e.g. Senior Developer"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700">Search for Skills</label>
              <input
                type="text"
                placeholder="e.g. React, Node.js"
                value={filters.skills}
                onChange={(e) => setFilters({...filters, skills: e.target.value})}
                className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700">Job Type</label>
              <select
                value={filters.jobType}
                onChange={(e) => setFilters({...filters, jobType: e.target.value})}
                className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
              >
                <option>All</option>
                <option>Full-Time</option>
                <option>Contract</option>
                <option>Part-Time</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-6 border-t border-blue-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-700">Department</label>
                  <select className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-700">Location</label>
                  <select className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm">
                    <option>All Locations</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-700">Verified Status</label>
                  <select className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm">
                    <option>All</option>
                    <option>Verified</option>
                    <option>Not Verified</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-blue-950">
            {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg ${viewMode === 'kanban' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200'}`}
            >
              <Layout size={20} />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200'}`}
            >
              <Grid size={20} />
            </button>
          </div>
        </div>

        {/* Jobs Cards Grid */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onViewDetails={() => setSelectedJob(job)}
                onViewApplicants={() => handleViewApplicants(job)}
                onToggleStatus={() => toggleJobStatus(job.id)}
                showAllSkills={showAllSkills[job.id] || false}
                onToggleShowAllSkills={() => toggleShowAllSkills(job.id)}
              />
            ))}
          </div>
        ) : (
          <KanbanView jobs={filteredJobs} onToggleStatus={toggleJobStatus} />
        )}
      </main>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
          onToggleStatus={toggleJobStatus}
        />
      )}
    </div>
  );
}

// Job Card Component with More Dropdown
function JobCard({ job, onViewDetails, onViewApplicants, onToggleStatus, showAllSkills, onToggleShowAllSkills }) {
  const [showMore, setShowMore] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const displayedSkills = showAllSkills ? job.skills : job.skills.slice(0, 3);
  const remainingSkills = job.skills.length - 3;

  return (
    <>
      <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden relative"
      >
        {/* Card Header */}
        <div className="p-6 border-b border-blue-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold">
                  {job.id}
                </span>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                  job.status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-blue-100 text-blue-700'
                }`}>
                  {job.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                  job.verified ? 'bg-blue-50 text-blue-600' : 'bg-blue-100 text-blue-700'
                }`}>
                  {job.verified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-1 truncate">{job.title}</h3>
              <p className="text-sm text-blue-600 flex items-center gap-2">
                <Building2 size={14} /> {job.department}
              </p>
            </div>
            
            {/* More Button with Dropdown */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMore(!showMore);
                }}
                className="p-1 hover:bg-blue-50 rounded-lg text-blue-600"
              >
                <MoreHorizontal size={20} />
              </button>
              
              {showMore && (
                <div className="absolute right-0 top-8 w-48 bg-white border border-blue-200 rounded-lg shadow-lg z-10">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEditModal(true);
                      setShowMore(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-blue-700 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <Edit size={14} /> Edit Job
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus();
                      setShowMore(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-blue-700 hover:bg-blue-50 flex items-center gap-2"
                  >
                    {job.status === 'Active' ? <PowerOff size={14} /> : <Power size={14} />}
                    {job.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMore(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-blue-700 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <Share2 size={14} /> Share
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMore(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs mr-2 text-blue-600 font-bold">Applicants</p>
              <p className="text-lg font-bold text-blue-950">{job.applicants}</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewApplicants();
                }}
                className="px-1 py-1 bg-blue-50 text-blue-700 rounded-sm text-sm font-bold hover:bg-blue-100 flex items-center gap-1"
              >
                <Users size={14} /> View Applicants
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStatus();
                }}
                className={`py-2 rounded-lg text-sm font-bold flex items-center gap-1 ${
                  job.status === 'Active' 
                    ? 'bg-red-50 text-red-700 hover:bg-red-100'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                {job.status === 'Active' ? <PowerOff size={14} /> : <Power size={14} />}
                {job.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600">Type</span>
              <span className="font-bold text-blue-950">{job.type}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600">Location</span>
              <span className="font-bold text-blue-950 flex items-center gap-1">
                <MapPin size={14} /> {job.location}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600">Salary</span>
              <span className="font-bold text-blue-950 flex items-center gap-1">
                <DollarSign size={14} /> {job.salary}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600">Experience</span>
              <span className="font-bold text-blue-950 flex items-center gap-1">
                <Clock size={14} /> {job.experience}
              </span>
            </div>
          </div>

          {/* Skills Section with Expandable */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-blue-600">Skills Required</p>
              {job.skills.length > 3 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleShowAllSkills();
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                >
                  {showAllSkills ? 'Show Less' : `+${remainingSkills} more`}
                  <ChevronDown className={`transition-transform ${showAllSkills ? 'rotate-180' : ''}`} size={12} />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {displayedSkills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onViewDetails}
              className="py-2.5 bg-blue-950 text-white rounded-lg font-bold text-sm hover:bg-blue-900 transition-colors flex items-center justify-center gap-1"
            >
              <Eye size={16} /> View Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
              className="py-2.5 bg-white border border-blue-200 text-blue-700 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-1"
            >
              <Edit size={16} /> Edit
            </button>
          </div>
        </div>
      </motion.div>

      {/* Edit Job Modal */}
      {showEditModal && (
        <EditJobModal 
          job={job}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedJob) => {
            // In a real app, you would update the job in state here
            console.log('Updated job:', updatedJob);
            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
}

// Edit Job Modal Component
function EditJobModal({ job, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: job.title,
    department: job.department,
    type: job.type,
    location: job.location,
    salary: job.salary,
    experience: job.experience,
    skills: job.skills.join(', '),
    description: job.description,
    deadline: job.deadline,
    verified: job.verified,
    status: job.status
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...job,
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
    });
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-blue-100 flex justify-between items-center bg-white sticky top-0">
          <div>
            <h2 className="text-xl font-bold text-blue-950">Edit Job: {job.id}</h2>
            <p className="text-blue-600 text-sm">Update job details and requirements</p>
          </div>
          <button onClick={onClose} className="text-blue-600 hover:text-blue-800">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-blue-950 border-l-4 border-blue-600 pl-3">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-700">Job Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-700">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-blue-950 border-l-4 border-blue-600 pl-3">Job Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-700">Job Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                  >
                    <option>Full-Time</option>
                    <option>Contract</option>
                    <option>Part-Time</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-700">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Salary & Experience */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-700">Salary Range</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-700">Experience Required</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700">Required Skills (comma separated)</label>
              <textarea
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                rows="3"
                className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600 resize-none"
                placeholder="e.g. React, Node.js, AWS, TypeScript"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700">Job Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
                className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600 resize-none"
              />
            </div>

            {/* Verification & Deadline */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-700 flex items-center gap-2">
                  <CheckCircle size={14} />
                  Verification Status
                </label>
                <select
                  value={formData.verified.toString()}
                  onChange={(e) => setFormData({...formData, verified: e.target.value === 'true'})}
                  className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                >
                  <option value="true">Verified</option>
                  <option value="false">Not Verified</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-700 flex items-center gap-2">
                  <Calendar size={14} />
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="px-8 py-6 border-t border-blue-100 bg-blue-50/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-blue-600 hover:text-blue-800">
            Cancel
          </button>
          <button 
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-blue-950 text-white rounded-lg font-bold text-sm hover:bg-blue-900"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Kanban View Component
function KanbanView({ jobs, onToggleStatus }) {
  const columns = [
    { id: 'active', title: 'Active', color: 'blue', jobs: jobs.filter(j => j.status === 'Active') },
    { id: 'inactive', title: 'Inactive', color: 'blue', jobs: jobs.filter(j => j.status === 'Inactive') },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="bg-white border border-blue-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <h4 className="font-bold text-blue-950">{column.title}</h4>
            </div>
            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
              {column.jobs.length}
            </span>
          </div>
          
          <div className="space-y-4">
            {column.jobs.map((job) => (
              <div key={job.id} className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-bold text-blue-950 text-sm">{job.title}</h5>
                  <button
                    onClick={() => onToggleStatus(job.id)}
                    className={`p-1 rounded ${
                      job.status === 'Active' 
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {job.status === 'Active' ? <PowerOff size={14} /> : <Power size={14} />}
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-600">{job.applicants} applicants</span>
                  <span className="font-bold text-blue-950">{job.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Job Details Modal Component
function JobDetailsModal({ job, onClose, onToggleStatus }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-blue-100 flex justify-between items-center bg-white sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-blue-50 rounded-full text-blue-600">
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-blue-950">{job.title}</h2>
              <p className="text-blue-600 text-sm">{job.id} • {job.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
              <Edit size={18} />
            </button>
            <button 
              onClick={onToggleStatus}
              className={`p-2 rounded-lg flex items-center gap-1 ${
                job.status === 'Active' 
                  ? 'text-red-600 hover:bg-red-50' 
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              {job.status === 'Active' ? <PowerOff size={18} /> : <Power size={18} />}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 py-4 border-b border-blue-100 bg-blue-50/50">
          <div className="flex gap-6">
            {['overview', 'applicants', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-700 hover:text-blue-950'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Job Details */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DetailItem label="Job Type" value={job.type} icon={Briefcase} />
                <DetailItem label="Location" value={job.location} icon={MapPin} />
                <DetailItem label="Salary" value={job.salary} icon={DollarSign} />
                <DetailItem label="Experience" value={job.experience} icon={Clock} />
              </div>

              {/* Status & Verification */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-xs font-bold text-blue-600 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${job.status === 'Active' ? 'bg-blue-500' : 'bg-blue-300'}`} />
                    <p className="text-lg font-bold text-blue-950">{job.status}</p>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-xs font-bold text-blue-600 mb-1">Verification</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${job.verified ? 'bg-blue-500' : 'bg-blue-300'}`} />
                    <p className="text-lg font-bold text-blue-950">{job.verified ? 'Verified' : 'Not Verified'}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-bold text-blue-950 mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-bold text-blue-950 mb-3">Job Description</h4>
                <p className="text-blue-700 leading-relaxed">{job.description}</p>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-sm font-bold text-blue-950 mb-3">Timeline</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-xs text-blue-600 font-bold">Posted Date</p>
                    <p className="text-sm font-bold text-blue-950">{job.postedDate}</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-xs text-blue-600 font-bold">Application Deadline</p>
                    <p className="text-sm font-bold text-blue-950">{job.deadline}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applicants' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-blue-950">{job.applicants} Applicants</h4>
                <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100">
                  <Download size={16} className="inline mr-2" />
                  Export List
                </button>
              </div>
              <p className="text-blue-600">Applicants view would be displayed here</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="text-blue-600" size={24} />
                  <h4 className="font-bold text-blue-950">Job Settings</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700 font-bold">Toggle Job Status</p>
                      <p className="text-xs text-blue-600">Activate or deactivate this job posting</p>
                    </div>
                    <button 
                      onClick={onToggleStatus}
                      className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 ${
                        job.status === 'Active' 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {job.status === 'Active' ? <PowerOff size={16} /> : <Power size={16} />}
                      {job.status === 'Active' ? 'Deactivate Job' : 'Activate Job'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-blue-100 bg-blue-50/50 flex justify-between items-center">
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white border border-blue-200 text-blue-700 rounded-lg font-bold text-sm hover:bg-blue-50">
              <FileText size={16} className="inline mr-2" />
              Generate Report
            </button>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-blue-950 text-white rounded-lg font-bold text-sm hover:bg-blue-900">
              Update Job
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Detail Item Component
function DetailItem({ label, value, icon: Icon }) {
  return (
    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="text-blue-600" size={16} />
        <p className="text-xs font-bold text-blue-600">{label}</p>
      </div>
      <p className="text-sm font-bold text-blue-950">{value}</p>
    </div>
  );
}