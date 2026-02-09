import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft, Mail, Phone, MapPin, Calendar, CheckCircle,
  Star, FileText, Award, Briefcase, Building2, BookOpen,
  Code, Trophy, Target, Brain, Database, Cloud, BarChart,
  Download, MessageSquare, X, CheckCircle2, Clock, Users,
  TrendingUp, Zap, Shield, Cpu, Wifi, Lock, Video
} from 'lucide-react';
import AIInterview from './AIInterview';
import ScheduleInterview from './ScheduleInterview';

const CandidateDetails = ({ candidate, onClose, onBack, sidebarWidth = 280 }) => {
  const candidateData = candidate.candidateData;
  const [showAIInterview, setShowAIInterview] = React.useState(false);
  const [showScheduleInterview, setShowScheduleInterview] = React.useState(false);

  if (showAIInterview) {
    return (
      <AIInterview 
        candidate={candidate}
        onClose={() => setShowAIInterview(false)}
        onBack={() => setShowAIInterview(false)}
        sidebarWidth={sidebarWidth}
      />
    );
  }

  if (showScheduleInterview) {
    return (
      <ScheduleInterview
        candidate={candidate}
        onClose={() => setShowScheduleInterview(false)}
        onBack={() => setShowScheduleInterview(false)}
        sidebarWidth={sidebarWidth}
      />
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[130] flex flex-col bg-blue-50"
      style={{ left: `${sidebarWidth}px` }}
    >
      {/* Header */}
      <header className="bg-white border-b border-blue-100 px-8 py-4 flex items-center justify-between sticky top-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-blue-950">Candidate Profile</h1>
            <p className="text-blue-600 text-sm">Detailed analysis and performance metrics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-blue-200 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-50 flex items-center gap-2">
            <Download size={16} />
            Export Profile
          </button>
          <button className="px-4 py-2 bg-blue-950 text-white rounded-lg text-sm font-bold hover:bg-blue-900 flex items-center gap-2">
            <MessageSquare size={16} />
            Contact Candidate
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white border border-blue-100 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-3xl">
                {candidate.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold text-blue-950">{candidate.name}</h2>
                      {candidate.isVerified && (
                        <CheckCircle2 className="text-blue-600" size={20} />
                      )}
                    </div>
                    <p className="text-lg text-blue-600 mb-2">{candidateData?.currentPosition || candidate.experience}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-blue-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {candidate.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {candidate.experience} experience
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {candidate.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        {candidate.phone}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-blue-950 mb-2">{candidate.matchScore}%</div>
                    <p className="text-sm text-blue-600">Profile Match Score</p>
                    <div className="mt-2 flex items-center justify-end gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star
                          key={star}
                          className={`${star <= Math.floor(candidate.rating) ? 'text-blue-500 fill-blue-500' : 'text-blue-200'}`}
                          size={16}
                        />
                      ))}
                      <span className="text-sm font-bold text-blue-950 ml-2">{candidate.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Coding Proficiency */}
              {candidateData?.codingProficiency && (
                <div className="bg-white border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Code size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-950">Coding Proficiency</h3>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(candidateData.codingProficiency).map(([language, score]) => (
                      <div key={language} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-blue-700 capitalize">{language}</span>
                          <span className="font-bold text-blue-950">{score}%</span>
                        </div>
                        <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {candidateData?.achievements && (
                <div className="bg-white border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Trophy size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-950">Achievements & Awards</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {candidateData.achievements.map((achievement, index) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3">
                          <Award className="text-blue-600" size={16} />
                          <span className="text-sm text-blue-700">{achievement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contest Performance */}
              {candidateData?.contestPerformance && (
                <div className="bg-white border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Target size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-950">Contest Performance</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <p className="text-2xl font-bold text-blue-950">{candidateData.contestPerformance.totalContests}</p>
                        <p className="text-xs text-blue-600">Total Contests</p>
                      </div>
                      {Object.entries(candidateData.contestPerformance.cutoffsCleared || {}).map(([language, count]) => (
                        <div key={language} className="p-4 bg-blue-50 rounded-xl">
                          <p className="text-2xl font-bold text-blue-950">{count}</p>
                          <p className="text-xs text-blue-600">{language} Cutoffs</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-blue-950 mb-3">Companies Attempted</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidateData.contestPerformance.companiesAttempted?.map((company, index) => (
                          <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-lg">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience */}
              {candidateData?.experience && (
                <div className="bg-white border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Briefcase size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-950">Work Experience</h3>
                  </div>
                  <div className="space-y-4">
                    {candidateData.experience.map((exp, index) => (
                      <div key={index} className="p-4 border border-blue-100 rounded-xl hover:bg-blue-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-blue-950">{exp.role}</h4>
                          <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">{exp.duration}</span>
                        </div>
                        <p className="text-blue-700 flex items-center gap-2">
                          <Building2 size={14} />
                          {exp.company}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Certifications */}
              {candidateData?.certifications && (
                <div className="bg-white border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <BookOpen size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-950">Certifications</h3>
                  </div>
                  <div className="space-y-3">
                    {candidateData.certifications.map((cert, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">{cert}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Hours */}
              {candidateData?.learningHours && (
                <div className="bg-white border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Clock size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-950">Learning Activity</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <p className="text-2xl font-bold text-blue-950">{candidateData.learningHours.total}</p>
                        <p className="text-xs text-blue-600">Total Hours</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <p className="text-2xl font-bold text-blue-950">{candidateData.learningHours.handsOnCoding}</p>
                        <p className="text-xs text-blue-600">Coding Practice</p>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-blue-600 mb-2">Skills Covered</p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 5).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-white text-blue-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 5 && (
                          <span className="px-2 py-1 bg-white text-blue-600 text-xs rounded">
                            +{candidate.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills Cluster Rank */}
              {candidateData?.skillsClusterRank && (
                <div className="bg-white border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <TrendingUp size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-950">Skills Ranking</h3>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-950 mb-2">
                      {candidateData.skillsClusterRank.split('|')[0].trim()}
                    </div>
                    <p className="text-sm text-blue-600">Backend Developer Rank</p>
                    <p className="text-xs text-blue-500 mt-2">
                      {candidateData.skillsClusterRank.split('|')[1].trim()}
                    </p>
                  </div>
                </div>
              )}

              {/* Specializations */}
              <div className="bg-white border border-blue-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Brain size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-blue-950">Specializations</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="p-1.5 bg-blue-100 rounded text-blue-600">
                      <Cpu size={16} />
                    </div>
                    <span className="text-sm font-bold text-blue-700">Artificial Intelligence</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="p-1.5 bg-blue-100 rounded text-blue-600">
                      <Wifi size={16} />
                    </div>
                    <span className="text-sm font-bold text-blue-700">Internet of Things (IoT)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="p-1.5 bg-blue-100 rounded text-blue-600">
                      <Lock size={16} />
                    </div>
                    <span className="text-sm font-bold text-blue-700">Blockchain</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="p-1.5 bg-blue-100 rounded text-blue-600">
                      <BarChart size={16} />
                    </div>
                    <span className="text-sm font-bold text-blue-700">Fintech</span>
                  </div>
                </div>
              </div>

              {/* Quick Assessment */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-blue-950 mb-6">Interview Actions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-bold text-blue-700 mb-2">Recommendation</p>
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <p className="text-sm font-bold text-emerald-700">Strongly Recommended</p>
                      <p className="text-xs text-emerald-600 mt-1">
                        Candidate is fit for Backend Developer role with strong competitive programming background.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAIInterview(true)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Video size={18} />
                    Start AI Interview
                  </button>
                  <button 
                    onClick={() => setShowScheduleInterview(true)}
                    className="w-full py-3 bg-white border border-blue-200 text-blue-700 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                  >
                    Schedule Interview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDetails;