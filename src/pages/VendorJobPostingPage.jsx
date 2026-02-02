import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Search,
  Plus,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  PauseCircle,
  FileText,
  Eye,
  Users,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';

export default function VendorJobPostingsPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showPostJobModal, setShowPostJobModal] = useState(false);

  // Mock job postings data
  const jobPostings = [
    {
      id: '1',
      jobId: 'JOB-2024-001',
      title: 'Senior Java Developer',
      company: 'Tech Solutions Inc.',
      type: 'Full-time',
      location: 'San Francisco, CA',
      workMode: 'Hybrid',
      experienceMin: 5,
      experienceMax: 8,
      budget: '$120k - $150k/year',
      postedDate: '2024-01-15',
      expiryDate: '2024-03-15',
      status: 'Active',
      applicantsCount: 24,
      skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
    },
    {
      id: '2',
      jobId: 'JOB-2024-002',
      title: 'React Frontend Developer',
      company: 'Digital Ventures',
      type: 'Contract',
      location: 'Austin, TX',
      workMode: 'Remote',
      experienceMin: 3,
      experienceMax: 6,
      budget: '$85/hr',
      postedDate: '2024-01-20',
      expiryDate: '2024-02-20',
      status: 'Active',
      applicantsCount: 18,
      skills: ['React', 'TypeScript', 'Redux', 'CSS'],
    },
    {
      id: '3',
      jobId: 'JOB-2024-003',
      title: 'DevOps Engineer',
      company: 'Cloud Systems Corp',
      type: 'C2C',
      location: 'Seattle, WA',
      workMode: 'Onsite',
      experienceMin: 4,
      experienceMax: 7,
      budget: '$90/hr',
      postedDate: '2024-01-10',
      expiryDate: '2024-01-28',
      status: 'Closed',
      applicantsCount: 32,
      skills: ['Kubernetes', 'Docker', 'Terraform', 'AWS'],
    },
    {
      id: '4',
      jobId: 'JOB-2024-004',
      title: 'Data Scientist',
      company: 'Analytics Pro',
      type: 'Full-time',
      location: 'Boston, MA',
      workMode: 'Hybrid',
      experienceMin: 5,
      experienceMax: 10,
      budget: '$130k - $180k/year',
      postedDate: '2024-01-12',
      expiryDate: '2024-03-12',
      status: 'On Hold',
      applicantsCount: 15,
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    },
    {
      id: '5',
      jobId: 'JOB-2024-005',
      title: 'Full Stack Developer',
      company: 'Startup Innovations',
      type: 'W2',
      location: 'New York, NY',
      workMode: 'Remote',
      experienceMin: 2,
      experienceMax: 5,
      budget: '$100k - $130k/year',
      postedDate: '2024-01-25',
      expiryDate: '2024-02-10',
      status: 'Draft',
      applicantsCount: 0,
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    },
    {
      id: '6',
      jobId: 'JOB-2023-045',
      title: 'QA Automation Engineer',
      company: 'Quality First Inc.',
      type: 'Contract',
      location: 'Chicago, IL',
      workMode: 'Hybrid',
      experienceMin: 3,
      experienceMax: 6,
      budget: '$75/hr',
      postedDate: '2023-12-01',
      expiryDate: '2024-01-01',
      status: 'Expired',
      applicantsCount: 12,
      skills: ['Selenium', 'Java', 'TestNG', 'CI/CD'],
    },
  ];

  const stats = {
    total: jobPostings.length,
    active: jobPostings.filter(j => j.status === 'Active').length,
    closed: jobPostings.filter(j => j.status === 'Closed').length,
    onHold: jobPostings.filter(j => j.status === 'On Hold').length,
    draft: jobPostings.filter(j => j.status === 'Draft').length,
    expired: jobPostings.filter(j => j.status === 'Expired').length,
  };

  const getFilteredJobs = () => {
    let filtered = jobPostings;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    switch (activeFilter) {
      case 'active':
        return filtered.filter(j => j.status === 'Active');
      case 'closed':
        return filtered.filter(j => j.status === 'Closed');
      case 'onHold':
        return filtered.filter(j => j.status === 'On Hold');
      case 'draft':
        return filtered.filter(j => j.status === 'Draft');
      case 'expired':
        return filtered.filter(j => j.status === 'Expired');
      default:
        return filtered;
    }
  };

  const filteredJobs = getFilteredJobs();

  const getStatusColor = status => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Closed':
        return 'bg-red-100 text-red-700';
      case 'On Hold':
        return 'bg-orange-100 text-orange-700';
      case 'Draft':
        return 'bg-gray-100 text-gray-700';
      case 'Expired':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = status => {
    switch (status) {
      case 'Active':
        return CheckCircle;
      case 'Closed':
        return XCircle;
      case 'On Hold':
        return PauseCircle;
      case 'Draft':
        return FileText;
      default:
        return FileText;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30">
      <VendorSidebar />

      <div className="flex-1">
        {/* HEADER */}
<div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex items-center justify-between mb-6">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Job Postings
        </h1>
        <p className="text-gray-600">
          Manage and track your job postings
        </p>
      </div>

      {/* Post Job Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPostJobModal(true)}
        className="flex items-center gap-2 px-6 py-3 
                   bg-gradient-to-r from-blue-600 to-cyan-600 
                   text-white rounded-xl font-semibold 
                   shadow-lg hover:shadow-xl transition-all"
      >
        <Plus className="w-5 h-5" />
        Post a Job
      </motion.button>

    </div>

      <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, company, ID, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
              />
            </div>
  </div>
</div>



{/* Main Content */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-2">

    {/* TOTAL JOBS */}
    <div
      onClick={() => setActiveFilter('all')}
      className={`cursor-pointer rounded-2xl p-6 text-center shadow-md transition-all
        ${activeFilter === 'all'
          ? 'bg-gradient-to-br from-blue-500 to-cyan-700 text-white'
          : 'bg-white hover:shadow-lg'
        }`}
    >
      <div className="flex justify-center mb-3">
        <Briefcase className={`w-10 h-10 ${
          activeFilter === 'all' ? 'text-white' : 'text-blue-500'
        }`} />
      </div>
      <p className={`text-sm ${
        activeFilter === 'all' ? 'text-blue-100' : 'text-gray-600'
      }`}>
        Total Jobs
      </p>
      <p className="text-3xl font-bold mt-2">
        {stats.total}
      </p>
    </div>

    {/* ACTIVE JOBS */}
    <div
      onClick={() => setActiveFilter('active')}
      className={`cursor-pointer rounded-2xl p-6 text-center shadow-md transition-all
        ${activeFilter === 'active'
          ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white'
          : 'bg-white hover:shadow-lg'
        }`}
    >
      <div className="flex justify-center mb-3">
        <CheckCircle className={`w-10 h-10 ${
          activeFilter === 'active' ? 'text-white' : 'text-green-600'
        }`} />
      </div>
      <p className={`text-sm ${
        activeFilter === 'active' ? 'text-green-100' : 'text-gray-600'
      }`}>
        Active Jobs
      </p>
      <p className="text-3xl font-bold mt-2">
        {stats.active}
      </p>
    </div>

    {/* CLOSED JOBS */}
    <div
      onClick={() => setActiveFilter('closed')}
      className={`cursor-pointer rounded-2xl p-6 text-center shadow-md transition-all
        ${activeFilter === 'closed'
          ? 'bg-gradient-to-br from-red-600 to-red-700 text-white'
          : 'bg-white hover:shadow-lg'
        }`}
    >
      <div className="flex justify-center mb-3">
        <XCircle className={`w-10 h-10 ${
          activeFilter === 'closed' ? 'text-white' : 'text-red-600'
        }`} />
      </div>
      <p className={`text-sm ${
        activeFilter === 'closed' ? 'text-red-100' : 'text-gray-600'
      }`}>
        Closed Jobs
      </p>
      <p className="text-3xl font-bold mt-2">
        {stats.closed}
      </p>
    </div>

    {/* ON HOLD */}
    <div
      onClick={() => setActiveFilter('onHold')}
      className={`cursor-pointer rounded-2xl p-6 text-center shadow-md transition-all
        ${activeFilter === 'onHold'
          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
          : 'bg-white hover:shadow-lg'
        }`}
    >
      <div className="flex justify-center mb-3">
        <PauseCircle className={`w-10 h-10 ${
          activeFilter === 'onHold' ? 'text-white' : 'text-orange-500'
        }`} />
      </div>
      <p className={`text-sm ${
        activeFilter === 'onHold' ? 'text-orange-100' : 'text-gray-600'
      }`}>
        On Hold
      </p>
      <p className="text-3xl font-bold mt-2">
        {stats.onHold}
      </p>
    </div>

    {/* DRAFT */}
    <div
      onClick={() => setActiveFilter('draft')}
      className={`cursor-pointer rounded-2xl p-6 text-center shadow-md transition-all
        ${activeFilter === 'draft'
          ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white'
          : 'bg-white hover:shadow-lg'
        }`}
    >
      <div className="flex justify-center mb-3">
        <FileText className={`w-10 h-10 ${
          activeFilter === 'draft' ? 'text-white' : 'text-gray-600'
        }`} />
      </div>
      <p className={`text-sm ${
        activeFilter === 'draft' ? 'text-gray-200' : 'text-gray-600'
      }`}>
        Draft Jobs
      </p>
      <p className="text-3xl font-bold mt-2">
        {stats.draft}
      </p>
    </div>

  </div>
</div>

{/* Job Listing */}
  <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  {/* Left text */}
  <p className="text-sm text-gray-600 ml-7 ">
    Showing{' '}
    <span className="font-semibold text-gray-900">
      {filteredJobs.length}
    </span>{' '}
    of{' '}
    <span className="font-semibold text-gray-900">
      {stats.total}
    </span>{' '}
    jobs
  </p>

  {/* Clear filter */}
  {activeFilter !== 'all' && (
    <button
      onClick={() => setActiveFilter('all')}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                 bg-blue-50 text-blue-700 hover:bg-blue-100 transition mr-6"
    >
      ✕ Clear filter
    </button>
  )}
</div>

        {/* JOB LIST */}
<div className="grid gap-4 m-4.5">
  {filteredJobs.map((job, index) => {
    const StatusIcon = getStatusIcon(job.status);

    return (
      <motion.div
        key={job.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900 leading-tight m-0">
                {job.title}
              </h3>

              <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
                {job.jobId}
              </span>

              <span
                className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(
                  job.status
                )}`}
              >
                <StatusIcon className="w-4 h-4" />
                {job.status}
              </span>
            </div>

            {/* Reduced spacing here */}
            <p className="text-gray-600 mt-0 text-sm">
              {job.company}
            </p>
          </div>

          {/* APPLICANTS */}
          <div className="bg-gray-50 rounded-2xl px-4 py-2 text-center min-w-[30px]">
            <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-900">
              {job.applicantsCount}
            </p>
            <p className="text-sm text-gray-600">Applicants</p>
          </div>
        </div>

        {/* META INFO */}
        <div className="grid grid-cols-2 md:grid-cols-4  text-sm">
          <div className="flex items-start gap-2">
            <Briefcase className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Job Type</p>
              <p className="font-semibold text-gray-900">{job.type}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">
                {job.workMode}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Experience</p>
              <p className="font-semibold text-gray-900">
                {job.experienceMin}–{job.experienceMax} yrs
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <DollarSign className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Budget</p>
              <p className="font-semibold text-gray-900">{job.budget}</p>
            </div>
          </div>
        </div>

        {/* DATES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 text-sm">
          <div className="flex items-start gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Posted Date</p>
              <p className="font-semibold text-gray-900">
                {new Date(job.postedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Expiry Date</p>
              <p className="font-semibold text-gray-900">
                {new Date(job.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills.map(skill => (
            <span
              key={skill}
              className="px-4 py-1.5 rounded-full text-sm bg-blue-50 text-blue-700 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        <hr className="my-6" />

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate(`/vendor/job/${job.id}`)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
          >
            <Eye className="w-5 h-5" />
            View Details
          </button>

          <button
            onClick={() => navigate(`/vendor/job/${job.id}#applicants`)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
          >
            <Users className="w-5 h-5" />
            View Applicants ({job.applicantsCount})
          </button>

          {job.status === 'Active' && (
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700">
              <XCircle className="w-5 h-5" />
              Close Job
            </button>
          )}
        </div>
      </motion.div>
    );
  })}
</div>


      </div>

      {/* MODAL */}
{showPostJobModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white w-full max-w-2xl rounded-2xl shadow-xl m-4 flex flex-col max-h-[90vh]"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Post a job
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Add role details to publish a new opening
        </p>
      </div>

      {/* Body (SCROLLABLE) */}
      <div className="px-6 py-5 space-y-6 overflow-y-auto">
        {/* Section: Role */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
            Role details
          </h3>

          <input
            type="text"
            placeholder="Job title"
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Company"
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="Location (Remote / City)"
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-600">
              <option>Job type</option>
              <option>Full Time</option>
              <option>Contract</option>
              <option>Part Time</option>
              <option>Remote</option>
            </select>

            <select className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-600">
              <option>Experience level</option>
              <option>0–2 years</option>
              <option>2–5 years</option>
              <option>5–8 years</option>
              <option>8+ years</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Salary range (₹ / $)"
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Skills */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
            Skills
          </h3>

          <input
            type="text"
            placeholder="Java, Spring Boot, AWS"
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
            Job description
          </h3>

          <textarea
            rows={3}
            placeholder="Responsibilities, requirements, expectations…"
            className="w-full px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-600"
          />

          {/* AND */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[11px] text-gray-400">AND</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Upload JD */}
          <div className="flex items-center justify-between px-3 py-2.5 border border-dashed rounded-md">
            <span className="text-xs text-gray-500">
              Upload job description (PDF, DOC)
            </span>
            <label className="text-xs font-medium text-blue-600 cursor-pointer hover:text-blue-700">
              Upload
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
        <button
          onClick={() => setShowPostJobModal(false)}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Post job
        </button>
      </div>
    </motion.div>
  </div>
)}
  </div>
  );
}
