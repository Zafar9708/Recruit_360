import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Download,
  Calendar,
  Building,
  Star,
  CheckCircle,
  User,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function CandidateDetailPage() {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const candidateData = {
    id: candidateId || '1',
    name: 'Ankit Sharma',
    role: 'MERN Stack Developer',
    experience: '5 years',
    location: 'Bangalore, Karnataka',
    email: 'ankit.sharma@email.com',
    phone: '+91 98765 43210',
    photo: null,
    skills: [
      'React',
      'Node.js',
      'MongoDB',
      'Express',
      'TypeScript',
      'Redux',
      'AWS',
      'Docker',
    ],
    summary:
      'Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications using MERN stack.',
    certifications: [
      'AWS Certified Developer - Associate',
      'MongoDB Certified Developer',
      'React Developer Certification',
    ],
    education: [
      {
        degree: 'B.Tech in Computer Science',
        institution: 'VIT University',
        year: '2019',
      },
    ],
    workHistory: [
      {
        company: 'TechCorp Solutions',
        role: 'Senior Full Stack Developer',
        duration: '2021 - Present',
        description: 'Leading development of enterprise web applications',
      },
      {
        company: 'InnovateLabs',
        role: 'Full Stack Developer',
        duration: '2019 - 2021',
        description: 'Built and maintained multiple client projects',
      },
    ],
    vendor: {
      name: 'CodeBench Solutions',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@codebench.com',
      phone: '+91 98765 11111',
      rating: 4.8,
      totalPlacements: 156,
    },
    bench: {
      status: 'Available',
      availabilityDate: '15 Feb 2024',
      expectedRate: '₹25-30 LPA',
      currentAssignment: 'None',
      noticePeriod: 'Immediate',
    },
    applications: [
      {
        jobTitle: 'Senior React Developer',
        company: 'TechNova Pvt Ltd',
        appliedDate: '5 days ago',
        status: 'Interview Scheduled',
      },
      {
        jobTitle: 'Full Stack Developer',
        company: 'CloudSystems Inc',
        appliedDate: '1 week ago',
        status: 'Under Review',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border p-8"
            >
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                  {candidateData.name.charAt(0)}
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold">{candidateData.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">
                    {candidateData.role}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-gray-600">
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      {candidateData.experience}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      {candidateData.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-600" />
                      {candidateData.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-orange-600" />
                      {candidateData.phone}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border">
              <div className="border-b px-6 flex gap-6">
                {['overview', 'resume', 'applications'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 font-semibold capitalize ${
                      activeTab === tab
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {activeTab === 'overview' && (
                  <>
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Summary
                    </h3>
                    <p className="text-gray-700 mb-6">
                      {candidateData.summary}
                    </p>

                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {candidateData.skills.map((s, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'resume' && (
                  <div className="text-center">
                    <Download className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                      Download Resume
                    </button>
                  </div>
                )}

                {activeTab === 'applications' && (
                  <div className="space-y-4">
                    {candidateData.applications.map((app, i) => (
                      <div
                        key={i}
                        className="p-4 border rounded-xl"
                      >
                        <h4 className="font-bold">{app.jobTitle}</h4>
                        <p className="text-sm text-gray-600">
                          {app.company}
                        </p>
                        <span className="text-xs text-gray-500">
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Vendor
              </h3>
              <p className="font-semibold">{candidateData.vendor.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {candidateData.vendor.rating}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Bench Info
              </h3>
              <p>Status: {candidateData.bench.status}</p>
              <p>Available: {candidateData.bench.availabilityDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
