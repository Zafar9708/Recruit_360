import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  Edit,
  PauseCircle,
  XCircle,
  Eye,
  TrendingUp,
  CheckCircle,
  Users,
  Award,
  Building2,
  Mail,
  Phone,
  ChevronRight,
  MoreVertical,
  Download,
  Filter,
  Star,
  ExternalLink,
  ChevronDown,
  FileText,
  Target,
  Zap,
  Shield,
  Globe,
  MessageSquare,
  Send,
  Bookmark,
  ThumbsUp,
  AlertCircle,
  Activity,
  BarChart
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';

export default function JobPostingDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [candidateFilter, setCandidateFilter] = useState('all');
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const job = {
    id: jobId || '1',
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
    postedBy: 'TechStaff Vendor Solutions',
    description:
      'We are seeking an experienced Senior Java Developer to join our dynamic team. The ideal candidate will have a strong background in Java development, microservices architecture, and cloud technologies. You will be responsible for designing, developing, and maintaining scalable applications that serve millions of users.',
    rolesResponsibilities: [
      'Design and develop high-quality, scalable Java applications',
      'Lead technical discussions and provide mentorship to junior developers',
      'Collaborate with cross-functional teams to define and implement new features',
      'Optimize application performance and ensure code quality',
      'Participate in code reviews and maintain technical documentation',
      'Troubleshoot and resolve production issues'
    ],
    requiredSkills: [
      'Java 11+', 'Spring Boot', 'Microservices', 'REST APIs',
      'AWS', 'Docker', 'Kubernetes', 'SQL/NoSQL'
    ],
    niceToHaveSkills: [
      'Apache Kafka', 'Redis', 'GraphQL', 'React', 'CI/CD pipelines'
    ],
    noticePeriod: 'Immediate to 30 days',
    applicants: [
      {
        id: '1',
        name: 'John Smith',
        title: 'Senior Java Developer',
        experience: 8,
        appliedDate: '2024-01-16',
        applicationStatus: 'Applied',
        skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
        vendorCompany: 'TechStaff Solutions Inc.',
        matchScore: 92,
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        lastActive: '2 hours ago'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        title: 'Java Backend Developer',
        experience: 6,
        appliedDate: '2024-01-17',
        applicationStatus: 'Shortlisted',
        skills: ['Java', 'Docker', 'Kubernetes', 'AWS'],
        vendorCompany: 'Elite IT Staffing',
        matchScore: 87,
        email: 'sarah.j@email.com',
        phone: '+1 (555) 987-6543',
        location: 'Austin, TX',
        lastActive: '1 day ago'
      },
      {
        id: '3',
        name: 'David Kumar',
        title: 'Full Stack Java Developer',
        experience: 7,
        appliedDate: '2024-01-18',
        applicationStatus: 'Interview',
        skills: ['Java', 'React', 'Node.js', 'AWS'],
        vendorCompany: 'Premier Tech',
        matchScore: 85,
        email: 'david.k@email.com',
        phone: '+1 (555) 456-7890',
        location: 'New York, NY',
        lastActive: '3 hours ago'
      },
      {
        id: '4',
        name: 'Emily Rodriguez',
        title: 'Senior Software Engineer',
        experience: 5,
        appliedDate: '2024-01-19',
        applicationStatus: 'Rejected',
        skills: ['Java', 'SQL', 'Spring Boot'],
        vendorCompany: 'Global Talent Hub',
        matchScore: 78,
        email: 'emily.r@email.com',
        phone: '+1 (555) 234-5678',
        location: 'Boston, MA',
        lastActive: '5 days ago'
      }
    ]
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Active':
        return 'bg-gradient-to-r from-green-500 to-emerald-400 text-white';
      case 'Closed':
        return 'bg-gradient-to-r from-red-500 to-rose-400 text-white';
      case 'On Hold':
        return 'bg-gradient-to-r from-orange-500 to-amber-400 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-400 text-white';
    }
  };

  const getApplicationStatusColor = status => {
    switch (status) {
      case 'Applied':
        return 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white';
      case 'Shortlisted':
        return 'bg-gradient-to-r from-green-500 to-emerald-400 text-white';
      case 'Interview':
        return 'bg-gradient-to-r from-purple-500 to-violet-400 text-white';
      case 'Rejected':
        return 'bg-gradient-to-r from-red-500 to-rose-400 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-400 text-white';
    }
  };

  const filteredApplicants =
    candidateFilter === 'all'
      ? job.applicants
      : job.applicants.filter(
          a => a.applicationStatus.toLowerCase() === candidateFilter
        );

  const applicantStats = {
    total: job.applicants.length,
    applied: job.applicants.filter(a => a.applicationStatus === 'Applied').length,
    shortlisted: job.applicants.filter(a => a.applicationStatus === 'Shortlisted').length,
    interview: job.applicants.filter(a => a.applicationStatus === 'Interview').length,
    rejected: job.applicants.filter(a => a.applicationStatus === 'Rejected').length
  };

  const jobStats = [
    { label: 'Applicants', value: job.applicants.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Match Rate', value: '85%', icon: Target, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Avg. Experience', value: '6.5 yrs', icon: Award, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Response Time', value: '24h', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30">
      <VendorSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="relative bg-white border-b border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-cyan-50/30" />
          
          <div className="relative max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/vendor/job-postings')}
                  className="group flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Back to Jobs</span>
                </button>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)} shadow-sm`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">#{job.jobId}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                    <Download className="w-4 h-4" />
                    Export Data
                  </button>
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowActionsMenu(!showActionsMenu)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-300"
                  >
                    <span className="text-sm font-medium text-gray-700">Actions</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showActionsMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showActionsMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Job
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center gap-2">
                        <PauseCircle className="w-4 h-4" />
                        Put On Hold
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Close Job
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-100">
              {['overview', 'applicants'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 text-sm font-medium transition-colors duration-300 ${
                    activeTab === tab
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'overview' ? 'Job Overview' : 'Applied Candidates'}
                  {activeTab === tab && (
                    <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          {activeTab === 'overview' ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Job Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Job Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {jobStats.map((stat, index) => (
                    <div key={index} className={`${stat.bg} rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors duration-300`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <span className="text-xs font-medium text-gray-500">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Job Description Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Job Description</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Posted:</span>
                      <span className="text-sm font-medium text-gray-900">{new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-8">{job.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Roles & Responsibilities</h4>
                      <div className="space-y-3">
                        {job.rolesResponsibilities.map((role, idx) => (
                          <div key={idx} className="flex items-start gap-3 group">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 group-hover:scale-125 transition-transform" />
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.requiredSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium rounded-xl border border-blue-200 hover:border-blue-300 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Nice-to-Have Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.niceToHaveSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Requirements Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Job Requirements</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Job Type</div>
                      <div className="text-lg font-semibold text-gray-900">{job.type}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Work Mode</div>
                      <div className="text-lg font-semibold text-gray-900">{job.workMode}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Experience</div>
                      <div className="text-lg font-semibold text-gray-900">{job.experienceMin}-{job.experienceMax} years</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Budget</div>
                      <div className="text-lg font-semibold text-gray-900">{job.budget}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="text-lg font-semibold text-gray-900">{job.location}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Expiry Date</div>
                      <div className="text-lg font-semibold text-gray-900">{new Date(job.expiryDate).toLocaleDateString()}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Notice Period</div>
                      <div className="text-lg font-semibold text-gray-900">{job.noticePeriod}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Posted By</div>
                      <div className="text-lg font-semibold text-gray-900">{job.postedBy}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Actions */}
              <div className="space-y-8">
                {/* Applicant Statistics Card */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Applicant Statistics</h3>
                    <button className="text-blue-600 hover:text-blue-700">
                      <BarChart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-gray-900 mb-2">{applicantStats.total}</div>
                    <div className="text-sm text-gray-600">Total Applicants</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        <span className="text-sm text-gray-700">Applied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">{applicantStats.applied}</span>
                        <span className="text-xs text-gray-500">candidates</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-700">Shortlisted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">{applicantStats.shortlisted}</span>
                        <span className="text-xs text-gray-500">candidates</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full" />
                        <span className="text-sm text-gray-700">Interview</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">{applicantStats.interview}</span>
                        <span className="text-xs text-gray-500">candidates</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="text-sm text-gray-700">Rejected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">{applicantStats.rejected}</span>
                        <span className="text-xs text-gray-500">candidates</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveTab('applicants')}
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-between group"
                    >
                      <span>View All Candidates</span>
                      <Users className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="w-full px-6 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:border-blue-300 hover:text-blue-700 hover:shadow-sm transition-all duration-300 flex items-center justify-between group">
                      <span>Export Applicant Data</span>
                      <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="w-full px-6 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:border-red-300 hover:text-red-700 hover:shadow-sm transition-all duration-300 flex items-center justify-between group">
                      <span>Close This Position</span>
                      <XCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Job Insights Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Job Insights</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-50 rounded-xl">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">High Demand Role</div>
                        <div className="text-sm text-gray-500">85% match rate across applicants</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Zap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Fast Response Time</div>
                        <div className="text-sm text-gray-500">Avg. 24h response to applicants</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-50 rounded-xl">
                        <Activity className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Active Candidates</div>
                        <div className="text-sm text-gray-500">Most applicants are currently active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Filter Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Candidates ({filteredApplicants.length})</h2>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all duration-300">
                      <Filter className="w-4 h-4" />
                      Filter & Sort
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all duration-300">
                      <Download className="w-4 h-4" />
                      Export List
                    </button>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100 w-fit">
                  {['all', 'applied', 'shortlisted', 'interview', 'rejected'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setCandidateFilter(filter)}
                      className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                        candidateFilter === filter
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        candidateFilter === filter ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {filter === 'all' ? applicantStats.total : 
                         filter === 'applied' ? applicantStats.applied :
                         filter === 'shortlisted' ? applicantStats.shortlisted :
                         filter === 'interview' ? applicantStats.interview :
                         applicantStats.rejected}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidates Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredApplicants.map((candidate) => (
                  <div key={candidate.id} className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-500">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl font-bold text-white">
                              {candidate.name.charAt(0)}
                            </span>
                          </div>
                          <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getApplicationStatusColor(candidate.applicationStatus)}`}>
                            {candidate.applicationStatus}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white text-xs font-semibold rounded-full">
                              {candidate.matchScore}% Match
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-1">{candidate.title} • {candidate.experience} years exp.</p>
                          
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {candidate.vendorCompany}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {candidate.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="p-2 hover:bg-gray-100 rounded-xl">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(candidate.skills || [])
                        .slice(0, 4)
                        .map((skill, skillIdx) => (
                          <span
                            key={skillIdx}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100 hover:border-blue-200 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      {candidate.skills?.length > 4 && (
                        <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-lg">
                          +{candidate.skills.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Applied Date</div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(candidate.appliedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Last Active</div>
                        <div className="text-sm font-medium text-gray-900">{candidate.lastActive}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/vendor/job/${job.id}/candidate/${candidate.id}`)}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <Eye className="w-4 h-4" />
                        View Full Profile
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <button className="p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all duration-300 group">
                          <Mail className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                        </button>
                        <button className="p-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all duration-300 group">
                          <Phone className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                        </button>
                      </div>
                    </div>

                    {/* Status Actions */}
                    {candidate.applicationStatus === 'Applied' && (
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                          Shortlist Candidate
                        </button>
                      </div>
                    )}
                    
                    {candidate.applicationStatus === 'Shortlisted' && (
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-violet-400 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                          Schedule Interview
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}