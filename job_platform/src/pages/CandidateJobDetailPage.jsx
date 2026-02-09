import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase, MapPin, DollarSign, Clock, Building, Award, Users as UsersIcon,
  Globe, Mail, Phone, CheckCircle, ChevronRight, FileText, Target, Share2,
  Bookmark, Download, ExternalLink, AlertCircle, X
} from 'lucide-react';
import CandidateSidebar from './CandidateSidebar';
import JobApplicationModal from './JobApplicationModal';

const JobDetailPage = ({ job }) => {
  const navigate = useNavigate();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!job) {
    return (
      <div className="flex min-h-screen">
        <CandidateSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 lg:ml-72 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
            <button
              onClick={() => navigate('/candidate/jobs')}
              className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Back to Jobs
            </button>
          </div>
        </main>
      </div>
    );
  }

  const getMatchColor = (score) => {
    if (score >= 90) return 'from-emerald-500 to-emerald-600';
    if (score >= 80) return 'from-blue-500 to-blue-600';
    if (score >= 70) return 'from-amber-500 to-amber-600';
    return 'from-gray-500 to-gray-600';
  };

  const handleApply = (jobId) => {
    // Handle job application
    console.log(`Applied for job: ${jobId}`);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <CandidateSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 lg:ml-72">
        {/* Back Button */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={() => navigate('/candidate/jobs')}
              className="flex items-center gap-2 text-blue-900 hover:text-blue-950 font-medium"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back to Jobs
            </button>
          </div>
        </div>

        {/* Job Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-blue-200" />
                        <span className="text-lg">Wrocus</span>
                      </div>
                      <div className="text-blue-200">•</div>
                      <div className="px-3 py-1 bg-white/20 rounded-lg text-sm">
                        Client: {job.client}
                      </div>
                      <div className="text-blue-200">•</div>
                      <span className="text-sm bg-white/20 px-3 py-1 rounded-lg">ID: {job.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className={`px-4 py-2 bg-gradient-to-r ${getMatchColor(job.matchScore)} text-white rounded-xl font-bold`}>
                    {job.matchScore}% Match
                  </div>
                  {job.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-lg">
                      Featured Role
                    </span>
                  )}
                  {job.urgency && (
                    <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-lg">
                      Urgent Hiring
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Experience</p>
                  <p className="font-bold text-gray-900 text-lg">{job.experience}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-bold text-gray-900 text-lg">{job.location}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                  <p className="font-bold text-gray-900 text-lg">{job.salary}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Job Type</p>
                  <p className="font-bold text-gray-900 text-lg">{job.jobType}</p>
                </div>
              </div>

              {/* About Wrocus */}
              <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-900" />
                  About Wrocus
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Wrocus is a premier staffing and recruitment platform connecting top talent with leading companies. 
                  We specialize in technology roles and have successfully placed thousands of professionals in their dream jobs.
                </p>
              </section>

              {/* Job Description */}
              <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-900" />
                  Job Description
                </h3>
                <div className="prose max-w-none">
                  <pre className="text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {job.fullJD}
                  </pre>
                </div>
              </section>

              {/* Requirements */}
              <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements & Qualifications</h3>
                <div className="grid gap-3">
                  {job.requirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Benefits */}
              <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits & Perks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Client Info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  About the Client
                </h3>
                <p className="text-gray-600 text-sm mb-4">{job.companyDetails}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <UsersIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">500-1000 employees</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Technology · SaaS · Enterprise</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-900" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{job.contact.name}</p>
                      <p className="text-xs text-gray-500">{job.contact.title}</p>
                      <p className="text-sm text-blue-900">{job.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Phone className="w-4 h-4 text-blue-900" />
                    <span className="text-sm text-blue-900">{job.contact.phone}</span>
                  </div>
                </div>
              </div>

              {/* Match Analysis */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Your Match Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Technical Skills</span>
                      <span className="text-sm font-bold text-blue-900">92%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Experience Match</span>
                      <span className="text-sm font-bold text-blue-900">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Culture Fit</span>
                      <span className="text-sm font-bold text-blue-900">78%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="sticky top-6 space-y-3">
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="w-full py-4 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-xl font-bold hover:shadow-xl transition-all text-lg shadow-lg"
                >
                  Apply Now
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 border border-blue-900 text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                    Save Job
                  </button>
                  <button className="py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Modal */}
        <JobApplicationModal
          job={job}
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          onApply={handleApply}
        />
      </main>
    </div>
  );
};

export default JobDetailPage;