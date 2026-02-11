import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, ArrowLeft, Mail, Phone, Calendar, 
  MapPin, Briefcase, Award, CheckCircle, XCircle,
  Filter, Search, Download
} from 'lucide-react';
import EndClientSidebar from '../components/EndClientSidebar';

const mockApplicants = [
  { 
    id: 1, 
    name: 'Jonathan Reeves', 
    status: 'Interview', 
    match: 98, 
    location: 'San Francisco, CA', 
    experience: '8 years',
    skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
    appliedDate: '2024-02-14',
    email: 'jonathan@example.com',
    phone: '+1 (555) 123-4567'
  },
  { 
    id: 2, 
    name: 'Sasha Petrova', 
    status: 'Review', 
    match: 92, 
    location: 'Austin, TX', 
    experience: '7 years',
    skills: ['React', 'Python', 'Django', 'PostgreSQL'],
    appliedDate: '2024-02-13',
    email: 'sasha@example.com',
    phone: '+1 (555) 987-6543'
  },
  { 
    id: 3, 
    name: 'Marcus Miller', 
    status: 'Shortlisted', 
    match: 88, 
    location: 'Remote', 
    experience: '10 years',
    skills: ['React', 'AWS', 'DevOps', 'Kubernetes'],
    appliedDate: '2024-02-12',
    email: 'marcus@example.com',
    phone: '+1 (555) 456-7890'
  },
];

export default function endClientJobApplicantsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <EndClientSidebar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-blue-100 px-8 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(`/end-client/jobs/${jobId}`)}
                className="p-2 hover:bg-blue-50 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 text-blue-600" />
              </button>
              <div>
                <h1 className="text-xl font-black text-blue-950">Applicants</h1>
                <p className="text-sm text-blue-600">Senior Full Stack Developer • {mockApplicants.length} candidates</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-blue-200 text-blue-700 rounded-xl font-medium hover:bg-blue-50">
                <Download size={18} className="inline mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-8">
          {/* Filters */}
          <div className="bg-white rounded-2xl border border-blue-100 p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input 
                  placeholder="Search applicants by name or skills..." 
                  className="w-full pl-12 pr-4 py-3 bg-blue-50 border border-blue-100 rounded-xl outline-none text-blue-950"
                />
              </div>
              <select className="px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-950 outline-none">
                <option>All Status</option>
                <option>Review</option>
                <option>Shortlisted</option>
                <option>Interview</option>
                <option>Rejected</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 text-blue-700 font-medium hover:bg-blue-50 rounded-xl">
                <Filter size={18} /> More Filters
              </button>
            </div>
          </div>

          {/* Applicants List */}
          <div className="grid gap-4">
            {mockApplicants.map((applicant) => (
              <div 
                key={applicant.id} 
                className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate(`/end-client/jobs/${jobId}/applicants/${applicant.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-blue-950">{applicant.name}</h3>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          applicant.status === 'Interview' ? 'bg-blue-100 text-blue-700' :
                          applicant.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {applicant.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-blue-600 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin size={16} /> {applicant.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={16} /> {applicant.experience} experience
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={16} /> Applied {applicant.appliedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-blue-600">Match Score</p>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                            style={{ width: `${applicant.match}%` }}
                          />
                        </div>
                        <span className="text-lg font-black text-blue-950">{applicant.match}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-blue-100">
                  <div className="flex items-center gap-4 text-blue-600">
                    <button className="flex items-center gap-2 hover:text-blue-800">
                      <Mail size={18} /> Email
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-800">
                      <Phone size={18} /> Call
                    </button>
                  </div>
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                    View full profile →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}