import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Briefcase, MapPin, DollarSign, Clock, Users, 
  Globe, Building2, Calendar, Edit3, Share2, 
  ArrowLeft, Mail, Phone, Download
} from 'lucide-react';
import EndClientSidebar from '../components/EndClientSidebar';

// Mock job data
const jobs = {
  "1": {
    id: "1", 
    title: "Senior Full Stack Developer", 
    department: "Engineering", 
    location: "San Francisco, CA", 
    type: "Full-time", 
    workMode: "Hybrid", 
    experience: "5-8 years", 
    salary: "$140K - $180K", 
    applicants: 45, 
    status: "Active", 
    skills: ["React", "Node.js", "AWS", "TypeScript", "GraphQL"], 
    desc: "Lead our core platform architecture and scale our cloud infrastructure. You will be responsible for building scalable web applications and mentoring junior developers.",
    responsibilities: [
      "Design and develop scalable web applications",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with product and design teams",
      "Implement best practices for code quality"
    ],
    requirements: [
      "5+ years of experience with React and Node.js",
      "Strong understanding of cloud services (AWS/Azure)",
      "Experience with TypeScript and GraphQL",
      "Excellent problem-solving skills"
    ],
    postedDate: "2024-02-15"
  }
};

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = jobs[jobId];

  if (!job) {
    return (
      <div className="flex min-h-screen bg-blue-50">
        <EndClientSidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <p className="text-blue-600">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <EndClientSidebar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-blue-100 px-8 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/end-client/jobs')}
                className="p-2 hover:bg-blue-50 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 text-blue-600" />
              </button>
              <div>
                <h1 className="text-xl font-black text-blue-950">Job Details</h1>
                <p className="text-sm text-blue-600">Manage job posting and applicants</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-blue-50 rounded-xl text-blue-600">
                <Edit3 size={20} />
              </button>
              <button className="p-2 hover:bg-blue-50 rounded-xl text-blue-600">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Header */}
              <div className="bg-white rounded-2xl border border-blue-100 p-8 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {job.status}
                      </span>
                      <span className="text-xs font-semibold text-blue-600">
                        Posted on {job.postedDate}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-blue-950 mb-3">{job.title}</h2>
                    <div className="flex items-center gap-4 text-blue-600 font-medium">
                      <span className="flex items-center gap-2">
                        <Building2 size={18} /> {job.department}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={18} /> {job.location}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/end-client/jobs/${jobId}/applicants`)}
                    className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <div className="text-center mb-2">
                      <p className="text-xs font-semibold text-blue-600">Applicants</p>
                      <p className="text-2xl font-black text-blue-950">{job.applicants}</p>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">View all →</span>
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-xs font-semibold text-blue-600 mb-1">Experience</p>
                    <p className="text-lg font-bold text-blue-950">{job.experience}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-xs font-semibold text-blue-600 mb-1">Salary</p>
                    <p className="text-lg font-bold text-blue-950">{job.salary}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-xs font-semibold text-blue-600 mb-1">Type</p>
                    <p className="text-lg font-bold text-blue-950">{job.type}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-xs font-semibold text-blue-600 mb-1">Work Mode</p>
                    <p className="text-lg font-bold text-blue-950">{job.workMode}</p>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-2xl border border-blue-100 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-blue-950 mb-6">Job Description</h3>
                <p className="text-blue-700 mb-6 leading-relaxed">{job.desc}</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">Responsibilities</h4>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-blue-700">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-blue-700">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Info */}
            <div className="space-y-6">
              {/* Actions Card */}
              <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-blue-950 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-blue-950 text-white rounded-xl font-semibold hover:bg-blue-900 transition-colors">
                    Edit Job Posting
                  </button>
                  <button className="w-full py-3 border-2 border-blue-200 text-blue-950 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                    View Analytics
                  </button>
                  <button className="w-full py-3 border-2 border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors">
                    Close Position
                  </button>
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-blue-950 mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Applicants Preview */}
              <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-blue-950">Top Applicants</h3>
                  <span className="text-sm text-blue-600 font-semibold">3 of {job.applicants}</span>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 bg-blue-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-blue-950">Candidate {i}</p>
                        <span className="text-xs font-bold text-green-600">92% Match</span>
                      </div>
                      <button 
                        onClick={() => navigate(`/end-client/jobs/${jobId}/applicants/${i}`)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View profile →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}