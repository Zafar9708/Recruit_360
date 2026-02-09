import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  MoreVertical,
  Download,
  Filter,
  ChevronDown,
  X,
  Building,
  Target,
  Award,
  Layers,
  Star,
  CheckSquare,
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';

export default function VendorJobPostingsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showPostJobModal, setShowPostJobModal] = useState(false);

  const jobPostings = [
    {
      id: '1',
      jobId: 'JOB-2024-001',
      title: 'Senior Java Developer',
      company: 'Tech Solutions Inc.',
      type: 'Full-time',
      location: 'San Francisco, CA',
      workMode: 'Hybrid',
      experience: '5-8 years',
      budget: '$120k - $150k',
      postedDate: 'Jan 15, 2024',
      expiryDate: 'Mar 15, 2024',
      status: 'Active',
      applicantsCount: 24,
      shortlisted: 8,
      interviews: 5,
      skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'],
    },
    {
      id: '2',
      jobId: 'JOB-2024-002',
      title: 'React Frontend Developer',
      company: 'Digital Ventures',
      type: 'Contract',
      location: 'Austin, TX',
      workMode: 'Remote',
      experience: '3-6 years',
      budget: '$85/hr',
      postedDate: 'Jan 20, 2024',
      expiryDate: 'Feb 20, 2024',
      status: 'Active',
      applicantsCount: 18,
      shortlisted: 5,
      interviews: 3,
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL'],
    },
    {
      id: '3',
      jobId: 'JOB-2024-003',
      title: 'DevOps Engineer',
      company: 'Cloud Systems Corp',
      type: 'C2C',
      location: 'Seattle, WA',
      workMode: 'Onsite',
      experience: '4-7 years',
      budget: '$90/hr',
      postedDate: 'Jan 10, 2024',
      expiryDate: 'Jan 28, 2024',
      status: 'Closed',
      applicantsCount: 32,
      shortlisted: 12,
      interviews: 8,
      skills: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD'],
    },
    {
      id: '4',
      jobId: 'JOB-2024-004',
      title: 'Data Scientist',
      company: 'Analytics Pro',
      type: 'Full-time',
      location: 'Boston, MA',
      workMode: 'Hybrid',
      experience: '5-10 years',
      budget: '$130k - $180k',
      postedDate: 'Jan 12, 2024',
      expiryDate: 'Mar 12, 2024',
      status: 'On Hold',
      applicantsCount: 15,
      shortlisted: 3,
      interviews: 1,
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'PyTorch'],
    },
  ];

  const stats = {
    total: jobPostings.length,
    active: jobPostings.filter(j => j.status === 'Active').length,
    closed: jobPostings.filter(j => j.status === 'Closed').length,
    onHold: jobPostings.filter(j => j.status === 'On Hold').length,
  };

  const filteredJobs = jobPostings.filter(job => {
    if (activeFilter === 'all') return true;
    return job.status === activeFilter;
  }).filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Active':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          icon: CheckCircle,
        };
      case 'Closed':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: XCircle,
        };
      case 'On Hold':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          border: 'border-orange-200',
          icon: PauseCircle,
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: FileText,
        };
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <VendorSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
                <p className="text-gray-600 mt-1">Manage and track all job listings</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button 
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button
                  onClick={() => setShowPostJobModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Post Job
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs by title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-700 text-sm font-medium">Total Jobs</div>
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-green-700 text-sm font-medium">Active Jobs</div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
            </div>
            
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-red-700 text-sm font-medium">Closed Jobs</div>
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.closed}</div>
            </div>
            
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-orange-700 text-sm font-medium">On Hold</div>
                <PauseCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.onHold}</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
            {[
              { key: 'all', label: 'All Jobs', count: stats.total },
              { key: 'Active', label: 'Active', count: stats.active },
              { key: 'Closed', label: 'Closed', count: stats.closed },
              { key: 'On Hold', label: 'On Hold', count: stats.onHold },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key === 'all' ? 'all' : tab.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  (activeFilter === tab.key || (tab.key === 'all' && activeFilter === 'all'))
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  (activeFilter === tab.key || (tab.key === 'all' && activeFilter === 'all'))
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-900">{filteredJobs.length}</span> jobs
              {searchTerm && (
                <span>
                  {' '}for "<span className="font-medium text-gray-900">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const statusConfig = getStatusConfig(job.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div key={job.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                              <StatusIcon className="w-3 h-3" />
                              {job.status}
                            </span>
                            <span className="text-sm text-gray-500">#{job.jobId}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {job.company}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {job.experience}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.budget}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <div className="text-gray-500">Posted</div>
                              <div className="font-medium text-gray-900">{job.postedDate}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Expires</div>
                              <div className="font-medium text-gray-900">{job.expiryDate}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Work Mode</div>
                              <div className="font-medium text-gray-900">{job.workMode}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Job Type</div>
                              <div className="font-medium text-gray-900">{job.type}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{job.applicantsCount}</div>
                            <div className="text-xs text-gray-500">Applicants</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{job.shortlisted}</div>
                            <div className="text-xs text-gray-500">Shortlisted</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{job.interviews}</div>
                            <div className="text-xs text-gray-500">Interviews</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/vendor/job/${job.id}`)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => navigate(`/vendor/job/${job.id}#applicants`)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                          >
                            Manage Applicants
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Post New Job</h2>
                  <p className="text-sm text-gray-500 mt-1">Fill in the job details to create a new posting</p>
                </div>
                <button
                  onClick={() => setShowPostJobModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Senior Frontend Developer"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      placeholder="Your company name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location & Work Mode *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City, State"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                      <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                        <option>Select work mode</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>On-site</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Full-time', 'Contract', 'Part-time'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          className="py-3 border border-gray-300 rounded-lg text-sm font-medium hover:border-blue-500 hover:text-blue-600"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Skills *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., React, TypeScript, Node.js"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">Separate skills with commas</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                      <option>Select experience level</option>
                      <option>0-2 years</option>
                      <option>2-5 years</option>
                      <option>5-8 years</option>
                      <option>8+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Range *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Minimum salary"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Maximum salary"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe the role, responsibilities, and requirements..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowPostJobModal(false)}
                  className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                  Post Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}