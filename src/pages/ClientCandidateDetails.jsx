import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Award,
  Calendar,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Trophy,
  BookOpen,
  Target,
  BarChart3,
  Briefcase,
  GraduationCap,
  Code,
  Check,
  Star,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  Database,
  Cpu,
  Globe,
  Building2,
  ExternalLink,
  Grid,
  Table,
  ChevronRight,
  Brain,
  Video,
} from 'lucide-react';
import EndClientSidebar from '../components/EndClientSidebar';

export default function JobCandidateDetailPage() {
  const { jobId, candidateId } = useParams();
  const navigate = useNavigate();

  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const [showAIScoreModal, setShowAIScoreModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('Applied');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'kanban'

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

  // Table view data
  const tableData = [
    { skill: 'PHP', strength: '90%', codingIQ: '85', speed: '92', optimization: '88' },
    { skill: 'Java', strength: '85%', codingIQ: '88', speed: '89', optimization: '86' },
    { skill: 'C Programming', strength: '80%', codingIQ: '82', speed: '85', optimization: '84' },
    { skill: 'Python', strength: '75%', codingIQ: '78', speed: '80', optimization: '82' },
    { skill: 'Backend Developer', strength: '95%', codingIQ: '90', speed: '94', optimization: '92' },
  ];

  // Kanban view data
  const kanbanColumns = [
    {
      title: 'Core Skills',
      skills: ['Backend Developer', 'PHP', 'Java', 'C Programming', 'Python']
    },
    {
      title: 'Advanced',
      skills: ['System Design', 'Microservices', 'API Architecture', 'Database Design']
    },
    {
      title: 'Tools',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD']
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EndClientSidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/end-client/jobs/${jobId}/applicants`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Candidate Profile</h1>
              <p className="text-sm text-gray-600">
                Applied for: Backend Developer (JOB-2024-001)
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Profile Header */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-t-lg p-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">100% Profile Match</h2>
                  <p className="text-blue-200 text-sm">Based on following search criteria Skills (80%) Years of work experience (10%) Location (10%)</p>
                </div>
                <div className="bg-white/10 p-2 rounded-lg">
                  <Check className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-b-lg p-6 shadow-sm">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                    KS
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    VERIFIED
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-xl font-bold text-gray-900">Kuldeep Singh</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(applicationStatus)}`}>
                      {applicationStatus}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">Senior Software Engineer at Times Internet Limited</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">knitkuldeep@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">9540667575</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">DELHI, UNION TERRITORIES</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">13 years of experience</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Interview Score & Take Interview Button */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div 
                  onClick={() => setShowAIScoreModal(true)}
                  className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-100 transition-colors"
                >
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-purple-700">AI Interview Score: 85/100</span>
                  <ChevronRight className="w-4 h-4 text-purple-600" />
                </div>
                
                <button
                  onClick={() => navigate('/ai-interview')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
                >
                  <Video className="w-4 h-4" />
                  Take AI Interview
                </button>
              </div>

              {/* First Position Badge */}
              <div className="mt-3">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-700">First position in Artificial Intelligence</span>
                </div>
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Skills Overview</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <Table className="w-4 h-4" />
                    Table View
                  </button>
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${viewMode === 'kanban' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <Grid className="w-4 h-4" />
                    Kanban View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* View Mode Content */}
              {viewMode === 'table' ? (
                /* Table View */
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-blue-900 border-b border-blue-100">Skill</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-blue-900 border-b border-blue-100">Strength</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-blue-900 border-b border-blue-100">Coding IQ</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-blue-900 border-b border-blue-100">Speed</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-blue-900 border-b border-blue-100">Optimization</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 border-b border-gray-100">
                              <span className="font-medium text-gray-900">{row.skill}</span>
                            </td>
                            <td className="py-3 px-4 border-b border-gray-100">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-900 h-2 rounded-full" 
                                    style={{ width: row.strength }}
                                  ></div>
                                </div>
                                <span className="font-semibold text-blue-900">{row.strength}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 border-b border-gray-100">
                              <span className="font-semibold text-blue-900">{row.codingIQ}</span>
                            </td>
                            <td className="py-3 px-4 border-b border-gray-100">
                              <span className="font-semibold text-blue-900">{row.speed}</span>
                            </td>
                            <td className="py-3 px-4 border-b border-gray-100">
                              <span className="font-semibold text-blue-900">{row.optimization}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Kanban View */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {kanbanColumns.map((column, colIndex) => (
                    <div key={colIndex} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-bold text-blue-900 mb-4 pb-2 border-b border-gray-100">{column.title}</h3>
                      <div className="space-y-3">
                        {column.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="bg-blue-50 border border-blue-100 rounded-lg p-3 hover:bg-blue-100 transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-blue-900">{skill}</span>
                              <ChevronRight className="w-4 h-4 text-blue-600" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Topic Strength */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Topic Strength</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">PHP</span>
                      <span className="font-bold text-blue-900">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-900 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Java</span>
                      <span className="font-bold text-blue-900">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-800 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">C Programming</span>
                      <span className="font-bold text-blue-900">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-700 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Python</span>
                      <span className="font-bold text-blue-900">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidate Performance */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Candidate Performance</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                    <Building2 className="w-8 h-8 text-blue-900 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Google Cloud Platform</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                    <Database className="w-8 h-8 text-blue-800 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">CTS</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                    <Globe className="w-8 h-8 text-blue-700 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">HERE</div>
                  </div>
                </div>
              </div>

              {/* Companies Cutoff Cleared */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Companies for which cutoff cleared</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-lg font-medium">Google Cloud Platform</span>
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-lg font-medium">CTS</span>
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-lg font-medium">HCL</span>
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-lg font-medium">CA Technologies</span>
                </div>
              </div>

              {/* Performance Insights */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Insights</h3>
                <p className="text-gray-700 mb-4">
                  The Candidate has cleared cutoff 10 times for C Programming, 17 times for Java, 14 times for PHP, 3 times for Python out of above 6 companies contest.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-900" />
                    <span className="font-semibold text-blue-900">The Candidate is fit for the role of Backend Developer.</span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Won A Voucher in Geek Goddess Open Round.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Won Rs. 2000 Voucher in Open Contest - Code Gladiators 2020.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Won Rs. 500 Voucher in Blockchain.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Won Rs. 1000 Voucher in Open Contest Code Gladiators 2019.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Won Rs. 2000 Voucher in Open Contest Code Gladiators 2018.</span>
                  </div>
                </div>
              </div>

              {/* Learning Sessions */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">Total Learning Hours</span>
                    </div>
                    <span className="font-bold text-blue-900">80 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">Hands-on Coding Practice</span>
                    </div>
                    <span className="font-bold text-blue-900">62 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">Skills Covered</span>
                    </div>
                    <span className="font-bold text-blue-900">28 skills</span>
                  </div>
                </div>
                
                {/* Time Distribution */}
                <div className="mt-6">
                  <div className="text-sm text-gray-600 mb-2">Time Distribution</div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full flex">
                      <div className="bg-blue-900" style={{ width: '40%' }}></div>
                      <div className="bg-blue-800" style={{ width: '30%' }}></div>
                      <div className="bg-blue-700" style={{ width: '20%' }}></div>
                      <div className="bg-blue-600" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Coding</span>
                    <span>Learning</span>
                    <span>Projects</span>
                    <span>Tests</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Actions Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  {applicationStatus === 'Applied' && (
                    <>
                      <button
                        onClick={handleShortlist}
                        className="w-full px-4 py-3 bg-blue-900 hover:bg-blue-950 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Shortlist Candidate
                      </button>
                      <button
                        onClick={handleReject}
                        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </button>
                    </>
                  )}
                  {applicationStatus === 'Shortlisted' && (
                    <>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 text-blue-900 mb-1">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-semibold">Shortlisted!</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Candidate has been shortlisted for this position.
                        </p>
                      </div>
                      <button
                        onClick={handleScheduleInterview}
                        className="w-full px-4 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <Calendar className="w-5 h-5" />
                        Schedule Interview
                      </button>
                    </>
                  )}
                  {applicationStatus === 'Interview' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-blue-900 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold">Interview Scheduled</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Interview has been scheduled for this candidate.
                      </p>
                    </div>
                  )}
                  {applicationStatus === 'Rejected' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-red-700 mb-1">
                        <XCircle className="w-4 h-4" />
                        <span className="font-semibold">Rejected</span>
                      </div>
                      <p className="text-sm text-red-600">
                        Candidate has been marked as rejected for this position.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Resume Actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-900" />
                  Resume
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowResumeViewer(true)}
                    className="w-full px-4 py-3 bg-blue-900 hover:bg-blue-950 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    View Resume
                  </button>
                  <button className="w-full px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                </div>
              </div>

              {/* Vendor Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-blue-900" />
                  <h3 className="text-lg font-bold text-gray-900">Vendor Information</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">TechStaff Solutions Inc.</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">4.8</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Est. 2015</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Contact Person</p>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <p className="font-semibold text-gray-900">Michael Anderson</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a href="mailto:michael@techstaff.com" className="text-sm text-blue-900 hover:underline">
                          michael@techstaff.com
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Phone</p>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href="tel:+15559876543" className="text-sm text-blue-900 hover:underline">
                          +1 (555) 987-6543
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Location</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-900">New York, NY</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Website</p>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <a
                          href="https://www.techstaff.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-900 hover:underline flex items-center gap-1"
                        >
                          www.techstaff.com
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => window.location.href = 'mailto:michael@techstaff.com'}
                    className="w-full mt-4 px-4 py-3 bg-blue-900 hover:bg-blue-950 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Vendor
                  </button>
                </div>
              </div>

              {/* Application Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Application Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Job ID</span>
                    <span className="font-semibold text-blue-900">JOB-2024-001</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Position</span>
                    <span className="font-semibold text-blue-900">Backend Developer</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Company</span>
                    <span className="font-semibold text-blue-900">Tech Solutions Inc.</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-gray-600">Applied On</span>
                    <span className="font-semibold text-blue-900">
                      {new Date('2024-01-16').toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-900 mb-1">101</div>
                    <div className="text-xs text-gray-600">Contests</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-900 mb-1">95.19%</div>
                    <div className="text-xs text-gray-600">Backend Rank</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-900 mb-1">28</div>
                    <div className="text-xs text-gray-600">Skills</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-900 mb-1">13</div>
                    <div className="text-xs text-gray-600">Years Exp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Viewer Modal */}
      {showResumeViewer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl h-[80vh] flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">Resume - Kuldeep Singh</h2>
              <button 
                onClick={() => setShowResumeViewer(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-semibold text-gray-900">Resume PDF Preview</p>
                  <p className="text-sm text-gray-600 mt-1">PDF content would be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Interview Score Modal - SCROLLABLE & FULL CONTENT */}
      {showAIScoreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
            {/* Modal Header - Fixed */}
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">AI Interview Score</h2>
                    <p className="text-sm text-gray-600">Kuldeep Singh • Backend Developer</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAIScoreModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Overall Score */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 mb-4">
                  <span className="text-4xl font-bold text-white">85</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Overall Score: 85/100</h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Top 15%</span>
                  <span className="text-purple-600 font-semibold">Strong Candidate</span>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Score Breakdown
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Technical Knowledge</span>
                      <span className="text-sm font-bold text-purple-700">88/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Strong understanding of backend concepts, databases, and APIs</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Problem Solving</span>
                      <span className="text-sm font-bold text-purple-700">92/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Excellent analytical thinking and algorithmic approach</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Communication</span>
                      <span className="text-sm font-bold text-purple-700">78/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Clear but could improve on technical articulation</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Cultural Fit</span>
                      <span className="text-sm font-bold text-purple-700">82/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Aligned with company values, collaborative mindset</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Coding Speed</span>
                      <span className="text-sm font-bold text-purple-700">85/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Average coding speed, writes clean code</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Code Optimization</span>
                      <span className="text-sm font-bold text-purple-700">83/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '83%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Writes efficient code, good understanding of time complexity</p>
                  </div>
                </div>
              </div>

              {/* Skill Proficiency */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Skill Proficiency
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <span className="font-semibold text-purple-900">PHP</span>
                    <span className="text-xs text-purple-700 block mt-1">Advanced</span>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <span className="font-semibold text-purple-900">Java</span>
                    <span className="text-xs text-purple-700 block mt-1">Intermediate</span>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <span className="font-semibold text-purple-900">Python</span>
                    <span className="text-xs text-purple-700 block mt-1">Intermediate</span>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <span className="font-semibold text-purple-900">C Programming</span>
                    <span className="text-xs text-purple-700 block mt-1">Advanced</span>
                  </div>
                </div>
              </div>

              {/* AI Feedback */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Feedback
                </h4>
                <p className="text-sm text-purple-800 leading-relaxed">
                  Strong technical background with excellent problem-solving skills. 
                  Candidate demonstrates good understanding of backend development concepts 
                  and has a proven track record of delivering quality code. 
                  Communication could be improved. Overall, highly recommended for technical interview.
                </p>
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900">Recommendations</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm text-gray-700">Schedule a technical interview focusing on system design</li>
                  <li className="text-sm text-gray-700">Assess practical coding skills with a pair programming session</li>
                  <li className="text-sm text-gray-700">Discuss past projects and architectural decisions</li>
                </ul>
              </div>
            </div>
            
            {/* Modal Footer - Fixed */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setShowAIScoreModal(false);
                    navigate('/ai-interview');
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Video className="w-5 h-5" />
                  Take AI Interview
                </button>
                <button
                  onClick={() => setShowAIScoreModal(false)}
                  className="px-4 py-3 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}