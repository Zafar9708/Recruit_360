import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Award,
  Calendar,
  Building2,
  Globe,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Star,
  ExternalLink,
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';

export default function JobCandidateDetailPage() {
  const { jobId, candidateId } = useParams();
  const navigate = useNavigate();

  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('Applied');

  // Mock candidate data
  const candidate = {
    id: candidateId || '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Java Developer',
    experience: 8,
    skills: [
      'Java',
      'Spring Boot',
      'Microservices',
      'AWS',
      'Docker',
      'Kubernetes',
      'REST APIs',
      'SQL',
    ],
    location: 'San Francisco, CA',
    education: 'Master of Computer Science - Stanford University',
    certifications: [
      'AWS Solutions Architect',
      'Oracle Certified Java Professional',
      'Kubernetes Administrator',
    ],
    languages: ['English (Native)', 'Spanish (Intermediate)'],
    summary:
'Experienced Senior Java Developer with 8+ years of expertise in building scalable microservices architectures. Proven track record in leading teams and delivering enterprise-level applications. Strong background in cloud technologies, particularly AWS and containerization.',
    resumeUrl: '/sample-resume.pdf',
    appliedDate: '2024-01-16',
    vendorInfo: {
      vendorName: 'Michael Anderson',
      companyName: 'TechStaff Solutions Inc.',
      email: 'michael@techstaff.com',
      phone: '+1 (555) 987-6543',
      website: 'www.techstaff.com',
      location: 'New York, NY',
      rating: 4.8,
      establishedYear: 2015,
    },
    jobInfo: {
      jobId: 'JOB-2024-001',
      jobTitle: 'Senior Java Developer',
      company: 'Tech Solutions Inc.',
    },
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-700';
      case 'Shortlisted':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      case 'Interview':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleShortlist = () => setApplicationStatus('Shortlisted');
  const handleReject = () => setApplicationStatus('Rejected');
  const handleScheduleInterview = () => setApplicationStatus('Interview');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30">
      <VendorSidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white/80 border-b border-gray-200 sticky top-0 z-40 px-6 py-6">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/vendor/job/${jobId}`)}
              className="p-2 hover:bg-gray-100 rounded-xl"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold">Candidate Profile</h1>
              <p className="text-gray-600">
                Applied for: {candidate.jobInfo.jobTitle} (
                {candidate.jobInfo.jobId})
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile */}
           <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-white rounded-2xl border border-gray-200 p-8"
>
  {/* TOP SECTION */}
  <div className="flex items-start gap-6 mb-6">
    {/* Avatar */}
    <div className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
      {candidate.name.charAt(0)}
    </div>

    {/* Info */}
    <div className="flex-1">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {candidate.name}
        </h2>
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            applicationStatus
          )}`}
        >
          {applicationStatus}
        </span>
      </div>

      <p className="text-xl text-gray-700 mb-3">
        {candidate.title}
      </p>

      <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-3">
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {candidate.location}
        </span>
       
        </div>
        <div className='flex gap-6'>
          <span className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span className="text-blue-600">
            {candidate.email}
          </span>
        </span>

        <span className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span className="text-blue-600">
            {candidate.phone}
          </span>
        </span>
        </div>
        
     
    </div>
  </div>

  {/* STATS BAR */}
  <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-2 gap-6">
    <div className="flex items-center gap-4 justify-center">
      <Award className="w-6 h-6 text-blue-600" />
      <div>
        <p className="text-sm text-gray-600">Experience</p>
        <p className="text-lg font-bold text-gray-900">
          {candidate.experience} Years
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4 justify-center">
      <Calendar className="w-6 h-6 text-blue-600" />
      <div>
        <p className="text-sm text-gray-600">Applied Date</p>
        <p className="text-lg font-bold text-gray-900">
          {new Date(candidate.appliedDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>
</motion.div>


            {/* Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Professional Summary
              </h3>
              <p className="text-gray-700">{candidate.summary}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>


{/* education and certifications */}
           <div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Education & Certifications
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Education</p>
                    <p className="font-semibold text-gray-900">{candidate.education}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Certifications</p>
                    <div className="space-y-2">
                      {candidate.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-900">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.languages.map((lang, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            {/* Resume */}
            <div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Resume
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-900 font-semibold mb-2">Resume Available</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Submitted with application on {new Date(candidate.appliedDate).toLocaleDateString()}
                    </p>
                    <div className="flex gap-3 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowResumeViewer(true)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        View Resume
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download PDF
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Actions */}
             <div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>

                <div className="space-y-3">
                  {applicationStatus === 'Applied' && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleShortlist}
                        className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Shortlist Candidate
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleReject}
                        className="w-full px-6 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 hover:bg-red-700"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </motion.button>
                    </>
                  )}
                  {applicationStatus === 'Shortlisted' && (
                    <>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-3">
                        <div className="flex items-center gap-2 text-green-700 mb-2">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Shortlisted!</span>
                        </div>
                        <p className="text-sm text-green-600">
                          Candidate has been shortlisted for this position.
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleScheduleInterview}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-5 h-5" />
                        Schedule Interview
                      </motion.button>
                    </>
                  )}
                  {applicationStatus === 'Interview' && (
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-purple-700 mb-2">
                        <Calendar className="w-5 h-5" />
                        <span className="font-semibold">Interview Scheduled</span>
                      </div>
                      <p className="text-sm text-purple-600">
                        Interview has been scheduled for this candidate.
                      </p>
                    </div>
                  )}
                  {applicationStatus === 'Rejected' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-red-700 mb-2">
                        <XCircle className="w-5 h-5" />
                        <span className="font-semibold">Rejected</span>
                      </div>
                      <p className="text-sm text-red-600">
                        Candidate has been marked as rejected for this position.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            {/* Vendor Info */}
            <div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg border border-blue-200 p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Vendor Information</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {candidate.vendorInfo.companyName}
                      </h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">
                          {candidate.vendorInfo.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Est. {candidate.vendorInfo.establishedYear}
                    </p>
                  </div>

                  <div className="border-t border-blue-200 pt-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Contact Person</p>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <p className="font-semibold text-gray-900">
                          {candidate.vendorInfo.vendorName}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a
                          href={`mailto:${candidate.vendorInfo.email}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {candidate.vendorInfo.email}
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Phone</p>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a
                          href={`tel:${candidate.vendorInfo.phone}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {candidate.vendorInfo.phone}
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Location</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-900">{candidate.vendorInfo.location}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Website</p>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <a
                          href={`https://${candidate.vendorInfo.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {candidate.vendorInfo.website}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = `mailto:${candidate.vendorInfo.email}`}
                    className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Vendor
                  </motion.button>
                </div>
              </div>

               <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Application Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Job ID</span>
                    <span className="font-semibold text-gray-900">{candidate.jobInfo.jobId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Position</span>
                    <span className="font-semibold text-gray-900">{candidate.jobInfo.jobTitle}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Company</span>
                    <span className="font-semibold text-gray-900">{candidate.jobInfo.company}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-gray-600">Applied On</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(candidate.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
          </div>
        </div>
      </div>

      {/* Resume Viewer */}
      {showResumeViewer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[90%] h-[90%] p-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold text-xl">Resume</h2>
              <button onClick={() => setShowResumeViewer(false)}>
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center justify-center h-full text-gray-500">
              Resume PDF would render here
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
