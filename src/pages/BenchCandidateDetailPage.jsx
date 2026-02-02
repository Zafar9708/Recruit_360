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
  DollarSign,
  Briefcase,
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';

export default function JobCandidateDetailPage() {
  const { jobId, candidateId } = useParams();
  const navigate = useNavigate();

  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('Applied');
  const [shortlistStatus, setShortlistStatus] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  /* ====================== CANDIDATE DATA ====================== */
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
   '  Experienced Senior Java Developer with 8+ years of expertise in building scalable microservices architectures. Proven track record in leading teams and delivering enterprise-level applications. Strong background in cloud technologies, particularly AWS and containerization.',
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

  /* ====================== INTERESTED VENDORS ====================== */
  const interestedVendors = [
    {
      id: 'v1',
      companyName: 'NextGen IT Services',
      description: 'Global IT staffing and consulting firm.',
      services: ['IT Staffing', 'Cloud Solutions', 'DevOps'],
      contactPerson: 'Sarah Williams',
      email: 'sarah@nextgenit.com',
      phone: '+1 (555) 222-3344',
      location: 'Chicago, IL',
      website: 'https://www.nextgenit.com',
      establishedYear: 2012,
      rating: 4.6,
      offeredRate: '$98/hr',
      status: 'Interested',
    },
    {
      id: 'v2',
      companyName: 'CloudEdge Solutions',
      description: 'Cloud migration and staff augmentation.',
      services: ['Digital Transformation', 'Staff Augmentation'],
      contactPerson: 'David Miller',
      email: 'david@cloudedge.io',
      phone: '+1 (555) 777-8899',
      location: 'Dallas, TX',
      website: 'https://www.cloudedge.io',
      establishedYear: 2016,
      rating: 4.8,
      offeredRate: '$100/hr',
      status: 'In Discussion',
    },
  ];

  /* ====================== HELPERS ====================== */
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

  const handleShortlist = () => {
    setApplicationStatus('Shortlisted');
    setShortlistStatus('shortlisted');
  };

  const handleReject = () => {
    setApplicationStatus('Rejected');
    setShortlistStatus('rejected');
  };

  const handleScheduleInterview = () => {
    setApplicationStatus('Interview');
    navigate(`/end-client/interview/${candidate.id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar />

      <div className="flex-1">
        {/* HEADER */}
        <div className="bg-white border-b px-6 py-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/vendor/job/${jobId}`)}
              className="p-2 rounded-xl hover:bg-gray-100"
            >
              <ArrowLeft />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Candidate Profile</h1>
              <p className="text-gray-600">
                Applied for {candidate.jobInfo?.jobTitle} ({candidate.jobInfo?.jobId})
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* PROFILE */}
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


            {/* SUMMARY */}
           <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Professional Summary
              </h3>
              <p className="text-gray-700">{candidate.summary}</p>
            </div>


            {/* SKILLS */}
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

         {/*   Education and cert */}
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

          {/* RIGHT */}
          <div className="space-y-6">
  {/* INTERESTED VENDORS */}
<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
  <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
    <Briefcase className="w-5 h-5 text-green-600" />
    Interested Vendors
  </h3>

  <div className="space-y-4">
    {interestedVendors.map(v => (
      <motion.div
        key={v.id}
        whileHover={{ scale: 1.02 }}
        onClick={() => setSelectedVendor(v)}
        className="cursor-pointer border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-900">
              {v.companyName}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <User className="w-4 h-4" />
              {v.contactPerson}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            {v.status}
          </span>
        </div>

        {/* Divider */}
        <div className="my-3 border-t" />

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-gray-900">
              {v.offeredRate}
            </span>
          </div>

          <div className="flex items-center gap-1 text-blue-600 font-semibold">
            View Details
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </div>
        </div>
      </motion.div>
    ))}
  </div>

  {interestedVendors.length === 0 && (
    <p className="text-sm text-gray-500 text-center py-6">
      No vendors have shown interest yet.
    </p>
  )}
</div>

          </div>
        </div>
      </div>

      {/* VENDOR MODAL */}
    {selectedVendor && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl w-full max-w-2xl p-8 relative shadow-2xl"
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedVendor(null)}
        className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full"
      >
        <XCircle className="w-6 h-6 text-gray-500" />
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedVendor.companyName}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {selectedVendor.description}
        </p>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-600" />
          {selectedVendor.location}
        </div>

        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          {selectedVendor.rating} Rating
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          Offered Rate: {selectedVendor.offeredRate}
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          Established: {selectedVendor.establishedYear}
        </div>
      </div>

      {/* Services */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Services</p>
        <div className="flex flex-wrap gap-2">
          {selectedVendor.services.map((service, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-semibold"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-t pt-4 space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          {selectedVendor.contactPerson}
        </p>
        <p className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          {selectedVendor.email}
        </p>
        <p className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          {selectedVendor.phone}
        </p>

        <a
          href={selectedVendor.website}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-blue-600 font-semibold mt-2"
        >
          <Globe className="w-4 h-4" />
          Visit Website
        </a>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg"
          onClick={() => {
            console.log('Interested in vendor:', selectedVendor.id);
            setSelectedVendor(null);
          }}
        >
          👍 I’m Interested
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
          onClick={() => {
            console.log('Not interested in vendor:', selectedVendor.id);
            setSelectedVendor(null);
          }}
        >
          👎 Not Interested
        </motion.button>
      </div>
    </motion.div>
  </div>
)}

    </div>
  );
}
