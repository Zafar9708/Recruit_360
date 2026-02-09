import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, ChevronLeft, Search, Filter, Download, Mail, Phone, MapPin,
  Calendar, CheckCircle, XCircle, Clock, Star, FileText, Eye, MoreHorizontal,
  ChevronDown, UserCheck, MessageSquare, Award, Briefcase, Building2,
  BookOpen, Code, Trophy, Target, Brain, Database, Cloud, BarChart
} from 'lucide-react';
import CandidateDetails from './CandidateDetails'; // We'll create this component

export default function ApplicantsView({ job, onBack }) {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showCandidateDetails, setShowCandidateDetails] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Applicants data
  const applicants = [
    {
      id: 1,
      name: 'Kuldeep Singh',
      email: 'knitkuldeep@gmail.com',
      phone: '+91 9540667575',
      location: 'Delhi, Union Territories',
      experience: '13 years',
      status: 'Shortlisted',
      matchScore: 100,
      appliedDate: '2024-02-10',
      lastActive: '2 hours ago',
      skills: ['Python', 'Java', 'PHP', 'C Programming', 'Backend Development', 'AI', 'IoT', 'Blockchain'],
      resumeUrl: '#',
      notes: 'Strong competitive programming background with multiple achievements. Ideal for backend developer role.',
      isVerified: true,
      rating: 4.9,
      // Additional data for Kuldeep based on PDF
      candidateData: {
        currentPosition: 'Senior Software Engineer at Times Internet Limited',
        codingProficiency: {
          python: 85,
          php: 90,
          java: 95,
          cProgramming: 88
        },
        achievements: [
          'First position in Artificial Intelligence',
          'First position in Fintech',
          'First position in Internet Of Things',
          'Won Rs. 2000 Voucher in Open Contest - Code Gladiators 2020',
          'Won Rs. 1000 Voucher in Open Contest Code Gladiators 2019'
        ],
        certifications: [
          'Agile Software Development - IIT Kanpur (Jan 2022)',
          'IBM Data Science Professional Certificate (Sep 2020)',
          'Python Programming - IIT Kanpur (Jun 2020)'
        ],
        contestPerformance: {
          totalContests: 101,
          companiesAttempted: ['Google Cloud Platform', 'Times Internet Limited', 'CTS', 'HCL', 'HERE', 'CA Technologies'],
          cutoffsCleared: {
            cProgramming: 10,
            java: 17,
            php: 14,
            python: 3
          }
        },
        experience: [
          {
            role: 'Senior Software Engineer',
            company: 'Times Internet Limited',
            duration: 'Jan 2015 to Present'
          },
          {
            role: 'Senior Software Engineer',
            company: 'HushBabies',
            duration: 'Dec 2012 to Dec 2014'
          },
          {
            role: 'Application Developer',
            company: 'Bedi Creative',
            duration: 'Nov 2010 to Nov 2012'
          }
        ],
        education: [
          {
            degree: 'MCA/PGDCA - Computer Science',
            institution: 'KNIT Sultanpur',
            year: '2008'
          },
          {
            degree: 'B.Sc - Mathematics',
            institution: 'C.L. Jain College, Firozabad',
            year: '2005'
          }
        ],
        learningHours: {
          total: 80,
          handsOnCoding: 62,
          videoLearning: 18,
          sessions: 19
        },
        skillsClusterRank: '95.19% | 30950/643283 Developer participants'
      }
    },
    // ... rest of your applicants data (keep existing)
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      experience: '6 years',
      status: 'Interview Scheduled',
      matchScore: 92,
      appliedDate: '2024-02-12',
      lastActive: '1 day ago',
      skills: ['Product Management', 'SQL', 'Agile', 'Roadmapping'],
      resumeUrl: '#',
      notes: 'Previous experience at FAANG companies',
      isVerified: true,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Remote',
      experience: '10 years',
      status: 'Applied',
      matchScore: 85,
      appliedDate: '2024-02-09',
      lastActive: '3 hours ago',
      skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
      resumeUrl: '#',
      notes: 'Award-winning designer',
      isVerified: false,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      phone: '+1 (555) 321-0987',
      location: 'Austin, TX',
      experience: '5 years',
      status: 'Rejected',
      matchScore: 72,
      appliedDate: '2024-02-08',
      lastActive: '2 days ago',
      skills: ['Python', 'Data Analysis', 'Tableau', 'SQL'],
      resumeUrl: '#',
      notes: 'Needs more experience with cloud platforms',
      isVerified: true,
      rating: 4.2
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david.kim@example.com',
      phone: '+1 (555) 654-3210',
      location: 'Seattle, WA',
      experience: '7 years',
      status: 'Offer Sent',
      matchScore: 95,
      appliedDate: '2024-02-11',
      lastActive: '5 hours ago',
      skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Terraform'],
      resumeUrl: '#',
      notes: 'Excellent technical interview performance',
      isVerified: true,
      rating: 4.7
    },
  ];

  // Filter applicants
  const filteredApplicants = applicants.filter(applicant => {
    if (filterStatus !== 'All' && applicant.status !== filterStatus) {
      return false;
    }
    if (searchQuery && !applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !applicant.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    return true;
  });

  const statusColors = {
    'Shortlisted': 'bg-blue-100 text-blue-700',
    'Interview Scheduled': 'bg-green-100 text-green-700',
    'Applied': 'bg-blue-50 text-blue-600',
    'Rejected': 'bg-red-100 text-red-700',
    'Offer Sent': 'bg-emerald-100 text-emerald-700'
  };

  const handleViewCandidateDetails = (applicant) => {
    setSelectedCandidate(applicant);
    setShowCandidateDetails(true);
  };

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
              <h1 className="text-2xl font-bold text-blue-950">Applicants for {job.title}</h1>
              <p className="text-blue-600 text-sm">{job.id} • {job.applicants} total applicants</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 bg-blue-950 text-white rounded-lg font-bold text-sm hover:bg-blue-900 transition-colors flex items-center gap-2">
              <Download size={18} /> Export List
            </button>
            <button className="px-5 py-2.5 border border-blue-200 text-blue-700 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Filter size={18} /> Advanced Filter
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total" value={job.applicants} icon={Users} color="blue" />
          <StatCard label="Shortlisted" value="18" icon={UserCheck} color="blue" />
          <StatCard label="Interview" value="12" icon={Calendar} color="blue" />
          <StatCard label="Rejected" value="8" icon={XCircle} color="blue" />
          <StatCard label="Hired" value="7" icon={Award} color="blue" />
        </div>

        {/* Filters */}
        <div className="bg-white border border-blue-100 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700">Search Applicants</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by name or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700">Status Filter</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600"
              >
                <option>All</option>
                <option>Shortlisted</option>
                <option>Interview Scheduled</option>
                <option>Applied</option>
                <option>Rejected</option>
                <option>Offer Sent</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-700">Sort By</label>
              <select className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600">
                <option>Match Score (High to Low)</option>
                <option>Recently Applied</option>
                <option>Experience (High to Low)</option>
                <option>Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applicants Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredApplicants.map((applicant) => (
            <ApplicantCard 
              key={applicant.id} 
              applicant={applicant} 
              statusColors={statusColors}
              onSelect={() => setSelectedApplicant(applicant)}
              onViewDetails={() => handleViewCandidateDetails(applicant)}
            />
          ))}
        </div>
      </main>

      {/* Applicant Details Modal */}
      {selectedApplicant && (
        <ApplicantDetailsModal 
          applicant={selectedApplicant} 
          onClose={() => setSelectedApplicant(null)}
          onViewDetails={() => {
            setSelectedApplicant(null);
            handleViewCandidateDetails(selectedApplicant);
          }}
        />
      )}

      {/* Candidate Details Component */}
      {showCandidateDetails && selectedCandidate && (
        <CandidateDetails
          candidate={selectedCandidate}
          onClose={() => {
            setShowCandidateDetails(false);
            setSelectedCandidate(null);
          }}
          onBack={() => {
            setShowCandidateDetails(false);
            setSelectedCandidate(null);
          }}
        />
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white border border-blue-100 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-blue-950 mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

// Applicant Card Component
function ApplicantCard({ applicant, statusColors, onSelect, onViewDetails }) {
  return (
    <motion.div 
      whileHover={{ y: -3 }}
      className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative"
      onClick={onSelect}
    >
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails();
        }}
        className="absolute top-4 right-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="View detailed profile"
      >
        <Eye size={16} />
      </button>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
            {applicant.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-blue-950">{applicant.name}</h3>
              {applicant.isVerified && (
                <CheckCircle className="text-blue-600" size={14} />
              )}
            </div>
            <p className="text-sm text-blue-600">{applicant.experience} experience</p>
            {applicant.candidateData?.currentPosition && (
              <p className="text-xs text-blue-500 mt-1">{applicant.candidateData.currentPosition}</p>
            )}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[applicant.status]}`}>
          {applicant.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="text-blue-400" size={14} />
          <span className="text-blue-700">{applicant.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="text-blue-400" size={14} />
          <span className="text-blue-700">{applicant.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="text-blue-400" size={14} />
          <span className="text-blue-700">Applied: {applicant.appliedDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-blue-600 mb-1">Match Score</p>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${applicant.matchScore}%` }}
              />
            </div>
            <span className="text-sm font-bold text-blue-950">{applicant.matchScore}%</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="text-blue-500 fill-blue-500" size={14} />
          <span className="text-sm font-bold text-blue-950">{applicant.rating}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Applicant Details Modal Component
function ApplicantDetailsModal({ applicant, onClose, onViewDetails }) {
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
              <h2 className="text-xl font-bold text-blue-950">{applicant.name}</h2>
              <p className="text-blue-600 text-sm">{applicant.experience} • {applicant.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onViewDetails}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100 flex items-center gap-2"
            >
              <Eye size={16} />
              View Full Profile
            </button>
            <button className="px-4 py-2 bg-blue-950 text-white rounded-lg text-sm font-bold hover:bg-blue-900 flex items-center gap-2">
              <MessageSquare size={16} />
              Contact
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Basic Info */}
            <div className="md:col-span-2 space-y-8">
              {/* Contact Info */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h4 className="text-sm font-bold text-blue-950 mb-4">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-blue-600 font-bold">Email</p>
                    <p className="text-sm text-blue-950">{applicant.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-blue-600 font-bold">Phone</p>
                    <p className="text-sm text-blue-950">{applicant.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-blue-600 font-bold">Location</p>
                    <p className="text-sm text-blue-950">{applicant.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-blue-600 font-bold">Applied Date</p>
                    <p className="text-sm text-blue-950">{applicant.appliedDate}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-bold text-blue-950 mb-4">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-sm font-bold text-blue-950 mb-4">Notes</h4>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-sm text-blue-700">{applicant.notes}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Actions */}
            <div className="space-y-6">
              {/* Match Score */}
              <div className="bg-white border border-blue-100 rounded-xl p-6">
                <h4 className="text-sm font-bold text-blue-950 mb-4">Match Analysis</h4>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-950 mb-2">{applicant.matchScore}%</div>
                  <p className="text-sm text-blue-600">Job Fit Score</p>
                  <div className="mt-4 w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${applicant.matchScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-white border border-blue-100 rounded-xl p-6">
                <h4 className="text-sm font-bold text-blue-950 mb-4">Rating</h4>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1,2,3,4,5].map((star) => (
                    <Star 
                      key={star} 
                      className={`${star <= Math.floor(applicant.rating) ? 'text-blue-500 fill-blue-500' : 'text-blue-200'}`} 
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-center text-2xl font-bold text-blue-950">{applicant.rating}/5.0</p>
              </div>

              {/* Actions */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h4 className="text-sm font-bold text-blue-950 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">
                    Schedule Interview
                  </button>
                  <button className="w-full py-2.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-50">
                    Send Assessment
                  </button>
                  <button className="w-full py-2.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-50">
                    Request Documents
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-blue-100 bg-blue-50/50 flex justify-between items-center">
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-50 flex items-center gap-2">
              <Download size={16} />
              Download CV
            </button>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-red-50 text-red-700 rounded-lg text-sm font-bold hover:bg-red-100">
              Reject
            </button>
            <button className="px-6 py-2.5 bg-blue-950 text-white rounded-lg text-sm font-bold hover:bg-blue-900">
              Shortlist
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}