import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Building2
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';

export default function JobPostingDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [candidateFilter, setCandidateFilter] = useState('all');

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
        vendorCompany: 'TechStaff Solutions Inc.'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        title: 'Java Backend Developer',
        experience: 6,
        appliedDate: '2024-01-17',
        applicationStatus: 'Shortlisted',
        skills: ['Java', 'Docker'],
        vendorCompany: 'Elite IT Staffing'
      },
      {
        id: '3',
        name: 'David Kumar',
        title: 'Full Stack Java Developer',
        experience: 7,
        appliedDate: '2024-01-18',
        applicationStatus: 'Interview',
        skills: ['Java', 'React'],
        vendorCompany: 'Premier Tech'
      },
      {
        id: '4',
        name: 'Emily Rodriguez',
        title: 'Senior Software Engineer',
        experience: 5,
        appliedDate: '2024-01-19',
        applicationStatus: 'Rejected',
        skills: ['Java', 'SQL'],
        vendorCompany: 'Global Talent Hub'
      }
    ]
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Closed':
        return 'bg-red-100 text-red-700';
      case 'On Hold':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getApplicationStatusColor = status => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-700';
      case 'Shortlisted':
        return 'bg-green-100 text-green-700';
      case 'Interview':
        return 'bg-purple-100 text-purple-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30">
      <VendorSidebar />

      <div className="flex-1">
        {/* HEADER */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/vendor/job-postings')}
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-extrabold text-gray-900">
                    {job.title}
                  </h1>
                  <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {job.jobId}
                  </span>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </div>
                <p className="text-gray-600">{job.company}</p>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 border rounded-xl flex items-center gap-2 font-semibold">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-xl flex items-center gap-2 font-semibold">
                  <PauseCircle className="w-4 h-4" />
                  Put On Hold
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-xl flex items-center gap-2 font-semibold">
                  <XCircle className="w-4 h-4" />
                  Close Job
                </button>
              </div>
            </div>

            {/* TABS */}
            <div className="flex gap-8 border-b border-gray-200 mt-6">
              {['overview', 'applicants'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 font-semibold relative ${
                    activeTab === tab
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab === 'overview' ? 'Job Overview' : 'Applied Candidates'}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'overview' ? (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Job Overview */}
                <div className="bg-white rounded-2xl shadow-md border-gray-400 p-6">
                  <h3 className="text-lg font-bold mb-4">Job Overview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Info icon={Briefcase} label="Job Type" value={job.type} />
                    <Info icon={MapPin} label="Work Mode" value={job.workMode} />
                    <Info
                      icon={TrendingUp}
                      label="Experience"
                      value={`${job.experienceMin}-${job.experienceMax} years`}
                    />
                    <Info icon={DollarSign} label="Budget" value={job.budget} />
                    <Info
                      icon={Calendar}
                      label="Posted Date"
                      value={new Date(job.postedDate).toLocaleDateString()}
                    />
                    <Info
                      icon={Clock}
                      label="Expiry Date"
                      value={new Date(job.expiryDate).toLocaleDateString()}
                    />
                  </div>
                </div>

                {/* Job Description */}
                <div className="bg-white rounded-2xl shadow-md border-gray-300 p-6">
                  <h3 className="text-lg font-bold mb-3">Job Description</h3>
                  <p className="text-gray-700">{job.description}</p>
                </div>

                {/* Roles */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-bold mb-4">
                    Roles & Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {job.rolesResponsibilities.map((role, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <span className="text-gray-700">{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required Skills */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-bold mb-4">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nice to have */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-bold mb-4">
                    Nice-to-Have Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.niceToHaveSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md border-gray-300 p-6">
                  <h3 className="text-lg font-bold mb-4">Additional Details</h3>
                  <p className="text-sm text-gray-600">Posted By</p>
                  <p className="font-semibold mb-3">{job.postedBy}</p>
                  <p className="text-sm text-gray-600">Notice Period</p>
                  <p className="font-semibold mb-4">{job.noticePeriod}</p>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{job.location}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg border border-blue-200 p-6">
                  <h3 className="text-lg font-bold mb-4">
                    Applicant Statistics
                  </h3>
                  <div className="text-center mb-4">
                    <Users className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-4xl font-bold text-gray-900">
                      {job.applicants.length}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total Applicants
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shortlisted</span>
                      <span className="font-semibold text-green-700">
                        {applicantStats.shortlisted}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Interview</span>
                      <span className="font-semibold text-blue-700">
                        {applicantStats.interview}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <motion.div
                  onClick={() => setCandidateFilter('all')}
                  className={`cursor-pointer rounded-xl shadow-lg border p-4 transition-all ${
                    candidateFilter === 'all' ? 'bg-blue-600 border-blue-700' : 'bg-white border-gray-100'
                  }`}
                >
                  <p className={`text-xs mb-1 ${candidateFilter === 'all' ? 'text-blue-100' : 'text-gray-600'}`}>Total</p>
                  <p className={`text-2xl font-bold ${candidateFilter === 'all' ? 'text-white' : 'text-gray-900'}`}>
                    {applicantStats.total}
                  </p>
                </motion.div>
                <motion.div
                  onClick={() => setCandidateFilter('applied')}
                  className={`cursor-pointer rounded-xl shadow-lg border p-4 transition-all ${
                    candidateFilter === 'applied' ? 'bg-blue-600 border-blue-700' : 'bg-white border-gray-100'
                  }`}
                >
                  <p className={`text-xs mb-1 ${candidateFilter === 'applied' ? 'text-blue-100' : 'text-gray-600'}`}>Applied</p>
                  <p className={`text-2xl font-bold ${candidateFilter === 'applied' ? 'text-white' : 'text-gray-900'}`}>
                    {applicantStats.applied}
                  </p>
                </motion.div>
                <motion.div
                  onClick={() => setCandidateFilter('shortlisted')}
                  className={`cursor-pointer rounded-xl shadow-lg border p-4 transition-all ${
                    candidateFilter === 'shortlisted' ? 'bg-green-600 border-green-700' : 'bg-white border-gray-100'
                  }`}
                >
                  <p className={`text-xs mb-1 ${candidateFilter === 'shortlisted' ? 'text-green-100' : 'text-gray-600'}`}>Shortlisted</p>
                  <p className={`text-2xl font-bold ${candidateFilter === 'shortlisted' ? 'text-white' : 'text-gray-900'}`}>
                    {applicantStats.shortlisted}
                  </p>
                </motion.div>
                <motion.div
                  onClick={() => setCandidateFilter('interview')}
                  className={`cursor-pointer rounded-xl shadow-lg border p-4 transition-all ${
                    candidateFilter === 'interview' ? 'bg-purple-600 border-purple-700' : 'bg-white border-gray-100'
                  }`}
                >
                  <p className={`text-xs mb-1 ${candidateFilter === 'interview' ? 'text-purple-100' : 'text-gray-600'}`}>Interview</p>
                  <p className={`text-2xl font-bold ${candidateFilter === 'interview' ? 'text-white' : 'text-gray-900'}`}>
                    {applicantStats.interview}
                  </p>
                </motion.div>
                <motion.div
                  onClick={() => setCandidateFilter('rejected')}
                  className={`cursor-pointer rounded-xl shadow-lg border p-4 transition-all ${
                    candidateFilter === 'rejected' ? 'bg-red-600 border-red-700' : 'bg-white border-gray-100'
                  }`}
                >
                  <p className={`text-xs mb-1 ${candidateFilter === 'rejected' ? 'text-red-100' : 'text-gray-600'}`}>Rejected</p>
                  <p className={`text-2xl font-bold ${candidateFilter === 'rejected' ? 'text-white' : 'text-gray-900'}`}>
                    {applicantStats.rejected}
                  </p>
                </motion.div>
              </div>

    {filteredApplicants.map((candidate, idx) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {candidate.name.charAt(0)}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold">
                            {candidate.name}
                          </h4>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getApplicationStatusColor(
                              candidate.applicationStatus
                            )}`}
                          >
                            {candidate.applicationStatus}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-3">
                          {candidate.title}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="w-4 h-4 text-gray-400" />
                            <span>
                              {candidate.experience} years exp.
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span>
                              {candidate.vendorCompany}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>
                              Applied{' '}
                              {new Date(
                                candidate.appliedDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {(candidate.skills || [])
                            .slice(0, 4)
                            .map((skill, skillIdx) => (
                              <span
                                key={skillIdx}
                                className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          {candidate.skills?.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                              +{candidate.skills.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              navigate(
                                `/vendor/job/${job.id}/candidate/${candidate.id}`
                              )
                            }
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-sm flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Profile
                          </button>

                          {candidate.applicationStatus ===
                            'Applied' && (
                            <button className="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold text-sm">
                              Shortlist
                            </button>
                          )}

                          {candidate.applicationStatus ===
                            'Shortlisted' && (
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold text-sm">
                              Schedule Interview
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* REUSABLE INFO COMPONENT */
function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-gray-400" />
      <div>
        <p className="text-xs text-gray-600">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
