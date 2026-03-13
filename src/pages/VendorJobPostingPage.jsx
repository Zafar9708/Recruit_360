// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Briefcase,
//   Search,
//   Plus,
//   MapPin,
//   DollarSign,
//   Calendar,
//   Clock,
//   CheckCircle,
//   XCircle,
//   PauseCircle,
//   FileText,
//   Eye,
//   Users,
//   TrendingUp,
//   MoreVertical,
//   Download,
//   Filter,
//   ChevronDown,
//   X,
//   Building,
//   Target,
//   Award,
//   Layers,
//   Star,
//   CheckSquare,
// } from 'lucide-react';
// import VendorSidebar from '../components/VendorSidebar';
// import CreateJobModal from '../components/Jobs/CreateJobModal';

// const API_BASE = "http://localhost:8000";

// /* ── Dummy fallback data ─────────────────────────────────────────── */
// const DUMMY_JOBS = [
//   {
//     id: '1',
//     jobId: 'JOB-2024-001',
//     title: 'Senior Java Developer',
//     company: 'Tech Solutions Inc.',
//     type: 'Full-time',
//     location: 'San Francisco, CA',
//     workMode: 'Hybrid',
//     experience: '5-8 years',
//     budget: '$120k - $150k',
//     postedDate: 'Jan 15, 2024',
//     expiryDate: 'Mar 15, 2024',
//     status: 'Active',
//     applicantsCount: 24,
//     shortlisted: 8,
//     interviews: 5,
//     skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'],
//   },
//   {
//     id: '2',
//     jobId: 'JOB-2024-002',
//     title: 'React Frontend Developer',
//     company: 'Digital Ventures',
//     type: 'Contract',
//     location: 'Austin, TX',
//     workMode: 'Remote',
//     experience: '3-6 years',
//     budget: '$85/hr',
//     postedDate: 'Jan 20, 2024',
//     expiryDate: 'Feb 20, 2024',
//     status: 'Active',
//     applicantsCount: 18,
//     shortlisted: 5,
//     interviews: 3,
//     skills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL'],
//   },
//   {
//     id: '3',
//     jobId: 'JOB-2024-003',
//     title: 'DevOps Engineer',
//     company: 'Cloud Systems Corp',
//     type: 'C2C',
//     location: 'Seattle, WA',
//     workMode: 'Onsite',
//     experience: '4-7 years',
//     budget: '$90/hr',
//     postedDate: 'Jan 10, 2024',
//     expiryDate: 'Jan 28, 2024',
//     status: 'Closed',
//     applicantsCount: 32,
//     shortlisted: 12,
//     interviews: 8,
//     skills: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD'],
//   },
//   {
//     id: '4',
//     jobId: 'JOB-2024-004',
//     title: 'Data Scientist',
//     company: 'Analytics Pro',
//     type: 'Full-time',
//     location: 'Boston, MA',
//     workMode: 'Hybrid',
//     experience: '5-10 years',
//     budget: '$130k - $180k',
//     postedDate: 'Jan 12, 2024',
//     expiryDate: 'Mar 12, 2024',
//     status: 'On Hold',
//     applicantsCount: 15,
//     shortlisted: 3,
//     interviews: 1,
//     skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'PyTorch'],
//   },
// ];

// /* ── Normalize API job → UI shape ───────────────────────────────── */
// function normalizeApiJob(job) {
//   const parseArr = (val) => {
//     if (Array.isArray(val)) return val;
//     try { return JSON.parse(val); } catch { return []; }
//   };

//   const skills    = parseArr(job.skills);
//   const locations = parseArr(job.locations);
//   const boards    = parseArr(job.external_boards);

//   const locationStr = locations.length
//     ? locations.join(", ")
//     : job.work_mode === "Remote" ? "Remote" : "—";

//   const budget = job.min_salary && job.max_salary
//     ? `${job.currency} ${Number(job.min_salary).toLocaleString()} – ${Number(job.max_salary).toLocaleString()}`
//     : "Not disclosed";

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "—";
//     try {
//       return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//     } catch { return dateStr; }
//   };

//   return {
//     id:             String(job.id),
//     jobId:          `JOB-${String(job.id).padStart(4, '0')}`,
//     title:          job.title      || "Untitled Position",
//     company:        job.department || "General",   // API has no company field; use department as fallback
//     type:           job.job_type   || "Full-time",
//     location:       locationStr,
//     workMode:       job.work_mode  || "Remote",
//     experience:     job.experience_level || "Not specified",
//     budget,
//     postedDate:     formatDate(job.target_start_date),
//     expiryDate:     formatDate(job.closing_date),
//     status:         job.status     ?? "Active",
//     applicantsCount:job.applicants ?? 0,
//     shortlisted:    job.shortlisted ?? 0,
//     interviews:     job.interviews  ?? 0,
//     skills,
//   };
// }

// /* ── Normalize CreateJobModal form → API payload ─────────────────── */
// function formToApiPayload(formData) {
//   return {
//     title:                     formData.title,
//     department:                formData.department,
//     headcount:                 Number(formData.headcount) || 1,
//     priority:                  formData.priority,
//     job_type:                  formData.jobType,
//     target_start_date:         formData.targetStartDate  || null,
//     closing_date:              formData.closingDate      || null,
//     work_mode:                 formData.workMode,
//     locations:                 JSON.stringify(formData.locations),
//     travel_required:           formData.travelRequired   || false,
//     currency:                  formData.currency,
//     pay_period:                formData.payPeriod,
//     min_salary:                Number(formData.minSalary)  || 0,
//     max_salary:                Number(formData.maxSalary)  || 0,
//     salary_negotiable:         formData.salaryNegotiable  || false,
//     equity_offered:            formData.equityOffered     || false,
//     equity_details:            formData.equityDetails     || "",
//     bonus_structure:           formData.bonusStructure    || "",
//     benefits:                  formData.benefits          || "",
//     experience_level:          formData.experienceLevel,
//     skills:                    JSON.stringify(formData.skills),
//     education_required:        formData.educationRequired || "",
//     languages_required:        formData.languagesRequired || "",
//     certifications:            formData.certifications    || "",
//     visa_sponsorship:          formData.visaSponsorship   || "",
//     background_check_required: formData.backgroundCheckRequired || false,
//     summary:                   formData.summary           || "",
//     responsibilities:          formData.responsibilities  || "",
//     requirements:              formData.requirements      || "",
//     nice_to_have:              formData.niceToHave        || "",
//     publish_internally:        formData.publishInternally ?? true,
//     publish_externally:        formData.publishExternally ?? true,
//     external_boards:           JSON.stringify(formData.externalBoards || []),
//   };
// }

// export default function VendorJobPostingsPage() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm]       = useState('');
//   const [activeFilter, setActiveFilter]   = useState('all');
//   const [showPostJobModal, setShowPostJobModal] = useState(false);

//   /* ── API state ───────────────────────────────────────────────── */
//   const [jobPostings, setJobPostings] = useState([]);
//   const [loading,     setLoading]     = useState(true);
//   const [apiOnline,   setApiOnline]   = useState(true);

//   const fetchJobs = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/jobs/`, {
//         signal: AbortSignal.timeout(5000),
//       });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       setJobPostings(data.map(normalizeApiJob));
//       setApiOnline(true);
//     } catch {
//       setJobPostings(DUMMY_JOBS);
//       setApiOnline(false);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchJobs(); }, [fetchJobs]);

//   /* ── Create job handler ──────────────────────────────────────── */
//   const handleCreateJob = async (formData) => {
//     // Optimistic entry
//     const optimistic = normalizeApiJob({
//       id:               `temp-${Date.now()}`,
//       title:            formData.title       || "Untitled Position",
//       department:       formData.department  || "General",
//       job_type:         formData.jobType,
//       work_mode:        formData.workMode,
//       locations:        JSON.stringify(formData.locations || []),
//       experience_level: formData.experienceLevel || "",
//       min_salary:       formData.minSalary,
//       max_salary:       formData.maxSalary,
//       currency:         formData.currency,
//       pay_period:       formData.payPeriod,
//       target_start_date:formData.targetStartDate || null,
//       closing_date:     formData.closingDate     || null,
//       skills:           JSON.stringify(formData.skills || []),
//       status:           "Active",
//     });

//     setJobPostings(prev => [optimistic, ...prev]);
//     setShowPostJobModal(false);

//     if (apiOnline) {
//       try {
//         const res = await fetch(`${API_BASE}/jobs/`, {
//           method:  "POST",
//           headers: { "Content-Type": "application/json" },
//           body:    JSON.stringify(formToApiPayload(formData)),
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const created = await res.json();
//         setJobPostings(prev =>
//           prev.map(j => j.id === optimistic.id ? normalizeApiJob(created) : j)
//         );
//       } catch {
//         setApiOnline(false);
//       }
//     }
//   };

//   /* ── Derived stats (always reflect current jobPostings) ──────── */
//   const stats = {
//     total:  jobPostings.length,
//     active: jobPostings.filter(j => j.status === 'Active').length,
//     closed: jobPostings.filter(j => j.status === 'Closed').length,
//     onHold: jobPostings.filter(j => j.status === 'On Hold').length,
//   };

//   const filteredJobs = jobPostings
//     .filter(job => activeFilter === 'all' || job.status === activeFilter)
//     .filter(job =>
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//   const getStatusConfig = (status) => {
//     switch (status) {
//       case 'Active':  return { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  icon: CheckCircle  };
//       case 'Closed':  return { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    icon: XCircle      };
//       case 'On Hold': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: PauseCircle  };
//       default:        return { bg: 'bg-gray-50',   text: 'text-gray-700',   border: 'border-gray-200',   icon: FileText     };
//     }
//   };

//   /* ══════════════════════════════════════════════════════════════
//      RENDER — UI completely unchanged from original
//   ══════════════════════════════════════════════════════════════ */
//   return (
//     <div className="flex min-h-screen bg-white">
//       <VendorSidebar />
      
//       <div className="flex-1">
//         {/* Header */}
//         <div className="border-b border-gray-200">
//           <div className="px-8 py-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
//                 <p className="text-gray-600 mt-1">Manage and track all job listings</p>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   <Download className="w-4 h-4" />
//                   Export
//                 </button>
//                 <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   <Filter className="w-4 h-4" />
//                   Filter
//                 </button>
//                 <button
//                   onClick={() => setShowPostJobModal(true)}
//                   className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Post Job
//                 </button>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search jobs by title, company, or skills..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Stats Summary */}
//         <div className="px-8 py-6">
//           <div className="grid grid-cols-4 gap-4 mb-8">
//             <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="text-blue-700 text-sm font-medium">Total Jobs</div>
//                 <Briefcase className="w-5 h-5 text-blue-600" />
//               </div>
//               <div className="text-2xl font-bold text-gray-900">
//                 {loading ? <span className="animate-pulse">…</span> : stats.total}
//               </div>
//             </div>
            
//             <div className="bg-green-50 border border-green-100 rounded-xl p-5">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="text-green-700 text-sm font-medium">Active Jobs</div>
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//               </div>
//               <div className="text-2xl font-bold text-gray-900">
//                 {loading ? <span className="animate-pulse">…</span> : stats.active}
//               </div>
//             </div>
            
//             <div className="bg-red-50 border border-red-100 rounded-xl p-5">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="text-red-700 text-sm font-medium">Closed Jobs</div>
//                 <XCircle className="w-5 h-5 text-red-600" />
//               </div>
//               <div className="text-2xl font-bold text-gray-900">
//                 {loading ? <span className="animate-pulse">…</span> : stats.closed}
//               </div>
//             </div>
            
//             <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="text-orange-700 text-sm font-medium">On Hold</div>
//                 <PauseCircle className="w-5 h-5 text-orange-600" />
//               </div>
//               <div className="text-2xl font-bold text-gray-900">
//                 {loading ? <span className="animate-pulse">…</span> : stats.onHold}
//               </div>
//             </div>
//           </div>

//           {/* Filter Tabs */}
//           <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
//             {[
//               { key: 'all',      label: 'All Jobs', count: stats.total  },
//               { key: 'Active',   label: 'Active',   count: stats.active },
//               { key: 'Closed',   label: 'Closed',   count: stats.closed },
//               { key: 'On Hold',  label: 'On Hold',  count: stats.onHold },
//             ].map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveFilter(tab.key)}
//                 className={`px-4 py-3 text-sm font-medium border-b-2 ${
//                   activeFilter === tab.key
//                     ? 'border-blue-600 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 {tab.label}
//                 <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
//                   activeFilter === tab.key
//                     ? 'bg-blue-100 text-blue-600'
//                     : 'bg-gray-100 text-gray-600'
//                 }`}>
//                   {loading ? '…' : tab.count}
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* Results Count */}
//           <div className="mb-6">
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-medium text-gray-900">{filteredJobs.length}</span> jobs
//               {searchTerm && (
//                 <span> for "<span className="font-medium text-gray-900">{searchTerm}</span>"</span>
//               )}
//               {!apiOnline && (
//                 <span className="ml-2 text-xs text-amber-600 font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
//                   Demo data
//                 </span>
//               )}
//             </p>
//           </div>

//           {/* Loading skeleton */}
//           {loading && (
//             <div className="space-y-4">
//               {[1,2,3].map(i => (
//                 <div key={i} className="border border-gray-200 rounded-xl p-6 animate-pulse">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"/>
//                     <div className="flex-1 space-y-3">
//                       <div className="h-5 bg-gray-100 rounded w-1/3"/>
//                       <div className="h-4 bg-gray-50 rounded w-1/2"/>
//                       <div className="flex gap-2">
//                         {[1,2,3,4].map(j => <div key={j} className="h-6 w-16 bg-gray-100 rounded-full"/>)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Jobs List */}
//           {!loading && (
//             <div className="space-y-4">
//               {filteredJobs.length === 0 ? (
//                 <div className="text-center py-16 text-gray-400">
//                   <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40"/>
//                   <p className="font-medium">No jobs found matching your criteria.</p>
//                 </div>
//               ) : filteredJobs.map((job) => {
//                 const statusConfig = getStatusConfig(job.status);
//                 const StatusIcon   = statusConfig.icon;

//                 return (
//                   <div key={job.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
//                     <div className="p-6">
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex items-start gap-4">
//                           <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <Briefcase className="w-6 h-6 text-blue-600" />
//                           </div>
                          
//                           <div>
//                             <div className="flex items-center gap-3 mb-1">
//                               <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
//                               <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
//                                 <StatusIcon className="w-3 h-3" />
//                                 {job.status}
//                               </span>
//                               <span className="text-sm text-gray-500">#{job.jobId}</span>
//                             </div>
                            
//                             <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
//                               <div className="flex items-center gap-1">
//                                 <Building className="w-4 h-4" />
//                                 {job.company}
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <MapPin className="w-4 h-4" />
//                                 {job.location}
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <TrendingUp className="w-4 h-4" />
//                                 {job.experience}
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <DollarSign className="w-4 h-4" />
//                                 {job.budget}
//                               </div>
//                             </div>
                            
//                             <div className="flex flex-wrap gap-2 mb-4">
//                               {job.skills.map((skill) => (
//                                 <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
//                                   {skill}
//                                 </span>
//                               ))}
//                             </div>
                            
//                             <div className="flex items-center gap-6 text-sm">
//                               <div>
//                                 <div className="text-gray-500">Posted</div>
//                                 <div className="font-medium text-gray-900">{job.postedDate}</div>
//                               </div>
//                               <div>
//                                 <div className="text-gray-500">Expires</div>
//                                 <div className="font-medium text-gray-900">{job.expiryDate}</div>
//                               </div>
//                               <div>
//                                 <div className="text-gray-500">Work Mode</div>
//                                 <div className="font-medium text-gray-900">{job.workMode}</div>
//                               </div>
//                               <div>
//                                 <div className="text-gray-500">Job Type</div>
//                                 <div className="font-medium text-gray-900">{job.type}</div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex flex-col items-end gap-4">
//                           <button className="p-2 hover:bg-gray-100 rounded-lg">
//                             <MoreVertical className="w-5 h-5 text-gray-400" />
//                           </button>
                          
//                           <div className="flex items-center gap-6">
//                             <div className="text-center">
//                               <div className="text-2xl font-bold text-gray-900">{job.applicantsCount}</div>
//                               <div className="text-xs text-gray-500">Applicants</div>
//                             </div>
//                             <div className="text-center">
//                               <div className="text-2xl font-bold text-green-600">{job.shortlisted}</div>
//                               <div className="text-xs text-gray-500">Shortlisted</div>
//                             </div>
//                             <div className="text-center">
//                               <div className="text-2xl font-bold text-blue-600">{job.interviews}</div>
//                               <div className="text-xs text-gray-500">Interviews</div>
//                             </div>
//                           </div>
                          
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => navigate(`/vendor/job/${job.id}`)}
//                               className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
//                             >
//                               View Details
//                             </button>
//                             <button
//                               onClick={() => navigate(`/vendor/job/${job.id}#applicants`)}
//                               className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
//                             >
//                               Manage Applicants
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* CreateJobModal — replaces old inline Post Job Modal */}
//       <CreateJobModal
//         isOpen={showPostJobModal}
//         onClose={() => setShowPostJobModal(false)}
//         onSubmit={handleCreateJob}
//       />
//     </div>
//   );
// }


import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Search,
  Plus,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  PauseCircle,
  FileText,
  Eye,
  Users,
  TrendingUp,
  MoreVertical,
  Download,
  Filter,
  ChevronDown,
  X,
  Building,
  Target,
  Award,
  Layers,
  Star,
  CheckSquare,
  UserCircle,
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';
import CreateJobModal from '../components/Jobs/CreateJobModal';

const API_BASE = "http://localhost:8000";

/* ── Dummy fallback data — 15 jobs for "All Jobs" ───────────────── */
const DUMMY_JOBS = [
  {
    id: '1', jobId: 'JOB-2024-001', title: 'Senior Java Developer',
    company: 'Tech Solutions Inc.', type: 'Full-time', location: 'San Francisco, CA',
    workMode: 'Hybrid', experience: '5-8 years', budget: '$120k - $150k',
    postedDate: 'Jan 15, 2024', expiryDate: 'Mar 15, 2024', status: 'Active',
    applicantsCount: 24, shortlisted: 8, interviews: 5,
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'],
  },
  {
    id: '2', jobId: 'JOB-2024-002', title: 'React Frontend Developer',
    company: 'Digital Ventures', type: 'Contract', location: 'Austin, TX',
    workMode: 'Remote', experience: '3-6 years', budget: '$85/hr',
    postedDate: 'Jan 20, 2024', expiryDate: 'Feb 20, 2024', status: 'Active',
    applicantsCount: 18, shortlisted: 5, interviews: 3,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL'],
  },
  {
    id: '3', jobId: 'JOB-2024-003', title: 'DevOps Engineer',
    company: 'Cloud Systems Corp', type: 'C2C', location: 'Seattle, WA',
    workMode: 'Onsite', experience: '4-7 years', budget: '$90/hr',
    postedDate: 'Jan 10, 2024', expiryDate: 'Jan 28, 2024', status: 'Closed',
    applicantsCount: 32, shortlisted: 12, interviews: 8,
    skills: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD'],
  },
  {
    id: '4', jobId: 'JOB-2024-004', title: 'Data Scientist',
    company: 'Analytics Pro', type: 'Full-time', location: 'Boston, MA',
    workMode: 'Hybrid', experience: '5-10 years', budget: '$130k - $180k',
    postedDate: 'Jan 12, 2024', expiryDate: 'Mar 12, 2024', status: 'On Hold',
    applicantsCount: 15, shortlisted: 3, interviews: 1,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'PyTorch'],
  },
  {
    id: '5', jobId: 'JOB-2024-005', title: 'Product Manager',
    company: 'Innovate Labs', type: 'Full-time', location: 'New York, NY',
    workMode: 'Hybrid', experience: '4-8 years', budget: '$110k - $140k',
    postedDate: 'Jan 18, 2024', expiryDate: 'Mar 18, 2024', status: 'Active',
    applicantsCount: 21, shortlisted: 6, interviews: 4,
    skills: ['Product Strategy', 'Agile', 'JIRA', 'Roadmapping', 'Analytics'],
  },
  {
    id: '6', jobId: 'JOB-2024-006', title: 'iOS Developer',
    company: 'MobileFirst Co.', type: 'Full-time', location: 'Los Angeles, CA',
    workMode: 'Remote', experience: '3-5 years', budget: '$100k - $130k',
    postedDate: 'Jan 22, 2024', expiryDate: 'Mar 22, 2024', status: 'Active',
    applicantsCount: 14, shortlisted: 4, interviews: 2,
    skills: ['Swift', 'Xcode', 'UIKit', 'SwiftUI', 'CoreData'],
  },
  {
    id: '7', jobId: 'JOB-2024-007', title: 'UX Designer',
    company: 'Creative Agency', type: 'Contract', location: 'Chicago, IL',
    workMode: 'Hybrid', experience: '2-5 years', budget: '$70/hr',
    postedDate: 'Jan 25, 2024', expiryDate: 'Feb 25, 2024', status: 'Active',
    applicantsCount: 29, shortlisted: 9, interviews: 6,
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Sketch'],
  },
  {
    id: '8', jobId: 'JOB-2024-008', title: 'Backend Node.js Engineer',
    company: 'FinTech Startup', type: 'Full-time', location: 'Miami, FL',
    workMode: 'Remote', experience: '3-6 years', budget: '$95k - $120k',
    postedDate: 'Feb 01, 2024', expiryDate: 'Apr 01, 2024', status: 'Active',
    applicantsCount: 11, shortlisted: 3, interviews: 2,
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST APIs'],
  },
  {
    id: '9', jobId: 'JOB-2024-009', title: 'Cloud Architect',
    company: 'Enterprise Corp', type: 'C2C', location: 'Dallas, TX',
    workMode: 'Onsite', experience: '8-12 years', budget: '$120/hr',
    postedDate: 'Dec 20, 2023', expiryDate: 'Jan 20, 2024', status: 'Closed',
    applicantsCount: 8, shortlisted: 2, interviews: 2,
    skills: ['AWS', 'Azure', 'GCP', 'Solution Design', 'Security'],
  },
  {
    id: '10', jobId: 'JOB-2024-010', title: 'Android Developer',
    company: 'Consumer Apps Ltd.', type: 'Full-time', location: 'Atlanta, GA',
    workMode: 'Hybrid', experience: '3-6 years', budget: '$95k - $120k',
    postedDate: 'Feb 05, 2024', expiryDate: 'Apr 05, 2024', status: 'Active',
    applicantsCount: 17, shortlisted: 5, interviews: 3,
    skills: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'MVVM', 'Firebase'],
  },
  {
    id: '11', jobId: 'JOB-2024-011', title: 'QA Automation Engineer',
    company: 'Quality First Inc.', type: 'Contract', location: 'Phoenix, AZ',
    workMode: 'Remote', experience: '3-5 years', budget: '$65/hr',
    postedDate: 'Feb 08, 2024', expiryDate: 'Mar 08, 2024', status: 'On Hold',
    applicantsCount: 9, shortlisted: 2, interviews: 0,
    skills: ['Selenium', 'Cypress', 'Jest', 'Postman', 'CI/CD'],
  },
  {
    id: '12', jobId: 'JOB-2024-012', title: 'Salesforce Developer',
    company: 'CRM Solutions', type: 'C2C', location: 'Denver, CO',
    workMode: 'Remote', experience: '4-7 years', budget: '$85/hr',
    postedDate: 'Feb 10, 2024', expiryDate: 'Apr 10, 2024', status: 'Active',
    applicantsCount: 13, shortlisted: 4, interviews: 2,
    skills: ['Salesforce', 'Apex', 'LWC', 'Visualforce', 'SOQL'],
  },
  {
    id: '13', jobId: 'JOB-2024-013', title: 'Machine Learning Engineer',
    company: 'AI Innovations', type: 'Full-time', location: 'San Jose, CA',
    workMode: 'Hybrid', experience: '4-8 years', budget: '$140k - $180k',
    postedDate: 'Feb 12, 2024', expiryDate: 'Apr 12, 2024', status: 'Active',
    applicantsCount: 22, shortlisted: 7, interviews: 4,
    skills: ['Python', 'PyTorch', 'Transformers', 'MLOps', 'LLMs'],
  },
  {
    id: '14', jobId: 'JOB-2024-014', title: 'Scrum Master',
    company: 'Agile Corp', type: 'Full-time', location: 'Portland, OR',
    workMode: 'Onsite', experience: '3-6 years', budget: '$90k - $115k',
    postedDate: 'Jan 28, 2024', expiryDate: 'Mar 28, 2024', status: 'Closed',
    applicantsCount: 19, shortlisted: 6, interviews: 4,
    skills: ['Scrum', 'Kanban', 'JIRA', 'Confluence', 'SAFe'],
  },
  {
    id: '15', jobId: 'JOB-2024-015', title: 'Cybersecurity Analyst',
    company: 'SecureIT Solutions', type: 'Full-time', location: 'Washington, DC',
    workMode: 'Hybrid', experience: '4-7 years', budget: '$100k - $130k',
    postedDate: 'Feb 14, 2024', expiryDate: 'Apr 14, 2024', status: 'Active',
    applicantsCount: 16, shortlisted: 5, interviews: 3,
    skills: ['SIEM', 'Penetration Testing', 'SOC', 'Incident Response', 'CISSP'],
  },
];

/* ── My Jobs dummy data — 15 jobs posted by this recruiter (no company field) ── */
const MY_DUMMY_JOBS = [
  {
    id: 'm1', jobId: 'MY-2024-001', title: 'Full Stack Developer',
    type: 'Full-time', location: 'Remote', workMode: 'Remote',
    experience: '3-6 years', budget: '$95k - $125k',
    postedDate: 'Jan 16, 2024', expiryDate: 'Mar 16, 2024', status: 'Active',
    applicantsCount: 20, shortlisted: 7, interviews: 4,
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
  },
  {
    id: 'm2', jobId: 'MY-2024-002', title: 'Python Backend Developer',
    type: 'Contract', location: 'Austin, TX', workMode: 'Hybrid',
    experience: '4-7 years', budget: '$80/hr',
    postedDate: 'Jan 21, 2024', expiryDate: 'Feb 21, 2024', status: 'Active',
    applicantsCount: 15, shortlisted: 5, interviews: 3,
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'm3', jobId: 'MY-2024-003', title: 'Cloud Infrastructure Engineer',
    type: 'C2C', location: 'Chicago, IL', workMode: 'Onsite',
    experience: '5-9 years', budget: '$100/hr',
    postedDate: 'Jan 05, 2024', expiryDate: 'Jan 30, 2024', status: 'Closed',
    applicantsCount: 10, shortlisted: 3, interviews: 2,
    skills: ['AWS', 'Terraform', 'Ansible', 'Linux', 'Networking'],
  },
  {
    id: 'm4', jobId: 'MY-2024-004', title: 'Data Engineer',
    type: 'Full-time', location: 'Seattle, WA', workMode: 'Hybrid',
    experience: '3-6 years', budget: '$110k - $140k',
    postedDate: 'Jan 14, 2024', expiryDate: 'Mar 14, 2024', status: 'On Hold',
    applicantsCount: 12, shortlisted: 3, interviews: 1,
    skills: ['Spark', 'Kafka', 'Airflow', 'Python', 'Snowflake'],
  },
  {
    id: 'm5', jobId: 'MY-2024-005', title: 'Angular Developer',
    type: 'Contract', location: 'New York, NY', workMode: 'Remote',
    experience: '3-5 years', budget: '$75/hr',
    postedDate: 'Feb 02, 2024', expiryDate: 'Mar 02, 2024', status: 'Active',
    applicantsCount: 18, shortlisted: 6, interviews: 3,
    skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'REST APIs'],
  },
  {
    id: 'm6', jobId: 'MY-2024-006', title: 'Go Developer',
    type: 'Full-time', location: 'San Francisco, CA', workMode: 'Hybrid',
    experience: '3-6 years', budget: '$120k - $150k',
    postedDate: 'Feb 03, 2024', expiryDate: 'Apr 03, 2024', status: 'Active',
    applicantsCount: 9, shortlisted: 3, interviews: 2,
    skills: ['Go', 'gRPC', 'Microservices', 'Docker', 'Kubernetes'],
  },
  {
    id: 'm7', jobId: 'MY-2024-007', title: 'Business Analyst',
    type: 'Full-time', location: 'Boston, MA', workMode: 'Onsite',
    experience: '4-7 years', budget: '$85k - $110k',
    postedDate: 'Jan 29, 2024', expiryDate: 'Mar 29, 2024', status: 'Active',
    applicantsCount: 23, shortlisted: 8, interviews: 5,
    skills: ['Requirements Gathering', 'SQL', 'JIRA', 'Visio', 'Agile'],
  },
  {
    id: 'm8', jobId: 'MY-2024-008', title: 'Site Reliability Engineer',
    type: 'Full-time', location: 'Denver, CO', workMode: 'Remote',
    experience: '5-8 years', budget: '$130k - $160k',
    postedDate: 'Feb 06, 2024', expiryDate: 'Apr 06, 2024', status: 'Active',
    applicantsCount: 11, shortlisted: 4, interviews: 2,
    skills: ['SRE', 'Prometheus', 'Grafana', 'Kubernetes', 'Python'],
  },
  {
    id: 'm9', jobId: 'MY-2024-009', title: 'Oracle DBA',
    type: 'C2C', location: 'Dallas, TX', workMode: 'Onsite',
    experience: '6-10 years', budget: '$95/hr',
    postedDate: 'Dec 18, 2023', expiryDate: 'Jan 18, 2024', status: 'Closed',
    applicantsCount: 7, shortlisted: 2, interviews: 1,
    skills: ['Oracle', 'PL/SQL', 'RAC', 'Performance Tuning', 'RMAN'],
  },
  {
    id: 'm10', jobId: 'MY-2024-010', title: 'Embedded Systems Engineer',
    type: 'Full-time', location: 'Detroit, MI', workMode: 'Onsite',
    experience: '4-8 years', budget: '$100k - $130k',
    postedDate: 'Feb 07, 2024', expiryDate: 'Apr 07, 2024', status: 'Active',
    applicantsCount: 8, shortlisted: 2, interviews: 1,
    skills: ['C', 'C++', 'RTOS', 'CAN Bus', 'AUTOSAR'],
  },
  {
    id: 'm11', jobId: 'MY-2024-011', title: 'Blockchain Developer',
    type: 'Contract', location: 'Miami, FL', workMode: 'Remote',
    experience: '3-6 years', budget: '$90/hr',
    postedDate: 'Feb 09, 2024', expiryDate: 'Mar 09, 2024', status: 'On Hold',
    applicantsCount: 6, shortlisted: 1, interviews: 0,
    skills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'DeFi'],
  },
  {
    id: 'm12', jobId: 'MY-2024-012', title: 'Network Engineer',
    type: 'Full-time', location: 'Atlanta, GA', workMode: 'Onsite',
    experience: '5-8 years', budget: '$90k - $115k',
    postedDate: 'Feb 11, 2024', expiryDate: 'Apr 11, 2024', status: 'Active',
    applicantsCount: 13, shortlisted: 4, interviews: 2,
    skills: ['Cisco', 'BGP', 'OSPF', 'Firewalls', 'SD-WAN'],
  },
  {
    id: 'm13', jobId: 'MY-2024-013', title: 'Tableau Developer',
    type: 'Contract', location: 'Phoenix, AZ', workMode: 'Remote',
    experience: '3-5 years', budget: '$70/hr',
    postedDate: 'Feb 13, 2024', expiryDate: 'Mar 13, 2024', status: 'Active',
    applicantsCount: 16, shortlisted: 5, interviews: 3,
    skills: ['Tableau', 'Power BI', 'SQL', 'Data Visualization', 'Excel'],
  },
  {
    id: 'm14', jobId: 'MY-2024-014', title: 'Technical Writer',
    type: 'Full-time', location: 'Portland, OR', workMode: 'Hybrid',
    experience: '2-5 years', budget: '$70k - $90k',
    postedDate: 'Jan 31, 2024', expiryDate: 'Mar 31, 2024', status: 'Active',
    applicantsCount: 25, shortlisted: 9, interviews: 5,
    skills: ['Technical Writing', 'API Documentation', 'Confluence', 'Markdown', 'DITA'],
  },
  {
    id: 'm15', jobId: 'MY-2024-015', title: 'SAP ABAP Developer',
    type: 'C2C', location: 'Houston, TX', workMode: 'Hybrid',
    experience: '5-9 years', budget: '$85/hr',
    postedDate: 'Feb 15, 2024', expiryDate: 'Apr 15, 2024', status: 'Active',
    applicantsCount: 10, shortlisted: 3, interviews: 2,
    skills: ['SAP', 'ABAP', 'S/4HANA', 'BAPI', 'ALV Reports'],
  },
];

/* ── Normalize API job → UI shape ───────────────────────────────── */
function normalizeApiJob(job) {
  const parseArr = (val) => {
    if (Array.isArray(val)) return val;
    try { return JSON.parse(val); } catch { return []; }
  };

  const skills    = parseArr(job.skills);
  const locations = parseArr(job.locations);

  const locationStr = locations.length
    ? locations.join(", ")
    : job.work_mode === "Remote" ? "Remote" : "—";

  const budget = job.min_salary && job.max_salary
    ? `${job.currency} ${Number(job.min_salary).toLocaleString()} – ${Number(job.max_salary).toLocaleString()}`
    : "Not disclosed";

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return dateStr; }
  };

  return {
    id:              String(job.id),
    jobId:           `JOB-${String(job.id).padStart(4, '0')}`,
    title:           job.title      || "Untitled Position",
    company:         job.department || "General",
    type:            job.job_type   || "Full-time",
    location:        locationStr,
    workMode:        job.work_mode  || "Remote",
    experience:      job.experience_level || "Not specified",
    budget,
    postedDate:      formatDate(job.target_start_date),
    expiryDate:      formatDate(job.closing_date),
    status:          job.status     ?? "Active",
    applicantsCount: job.applicants ?? 0,
    shortlisted:     job.shortlisted ?? 0,
    interviews:      job.interviews  ?? 0,
    skills,
  };
}

/* ── Normalize CreateJobModal form → API payload ─────────────────── */
function formToApiPayload(formData) {
  return {
    title:                     formData.title,
    department:                formData.department,
    headcount:                 Number(formData.headcount) || 1,
    priority:                  formData.priority,
    job_type:                  formData.jobType,
    target_start_date:         formData.targetStartDate  || null,
    closing_date:              formData.closingDate      || null,
    work_mode:                 formData.workMode,
    locations:                 JSON.stringify(formData.locations),
    travel_required:           formData.travelRequired   || false,
    currency:                  formData.currency,
    pay_period:                formData.payPeriod,
    min_salary:                Number(formData.minSalary)  || 0,
    max_salary:                Number(formData.maxSalary)  || 0,
    salary_negotiable:         formData.salaryNegotiable  || false,
    equity_offered:            formData.equityOffered     || false,
    equity_details:            formData.equityDetails     || "",
    bonus_structure:           formData.bonusStructure    || "",
    benefits:                  formData.benefits          || "",
    experience_level:          formData.experienceLevel,
    skills:                    JSON.stringify(formData.skills),
    education_required:        formData.educationRequired || "",
    languages_required:        formData.languagesRequired || "",
    certifications:            formData.certifications    || "",
    visa_sponsorship:          formData.visaSponsorship   || "",
    background_check_required: formData.backgroundCheckRequired || false,
    summary:                   formData.summary           || "",
    responsibilities:          formData.responsibilities  || "",
    requirements:              formData.requirements      || "",
    nice_to_have:              formData.niceToHave        || "",
    publish_internally:        formData.publishInternally ?? true,
    publish_externally:        formData.publishExternally ?? true,
    external_boards:           JSON.stringify(formData.externalBoards || []),
  };
}

export default function VendorJobPostingsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm]       = useState('');
  const [activeFilter, setActiveFilter]   = useState('all');
  const [activeSection, setActiveSection] = useState('total'); // 'total' | 'myJobs'
  const [showPostJobModal, setShowPostJobModal] = useState(false);

  /* ── API state ───────────────────────────────────────────────── */
  const [jobPostings, setJobPostings] = useState([]);
  const [myJobPostings, setMyJobPostings] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [apiOnline,   setApiOnline]   = useState(true);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/jobs/`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setJobPostings(data.map(normalizeApiJob));
      setApiOnline(true);
    } catch {
      setJobPostings(DUMMY_JOBS);
      setMyJobPostings(MY_DUMMY_JOBS);
      setApiOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  /* ── Create job handler ──────────────────────────────────────── */
  const handleCreateJob = async (formData) => {
    const optimistic = normalizeApiJob({
      id:               `temp-${Date.now()}`,
      title:            formData.title       || "Untitled Position",
      department:       formData.department  || "General",
      job_type:         formData.jobType,
      work_mode:        formData.workMode,
      locations:        JSON.stringify(formData.locations || []),
      experience_level: formData.experienceLevel || "",
      min_salary:       formData.minSalary,
      max_salary:       formData.maxSalary,
      currency:         formData.currency,
      pay_period:       formData.payPeriod,
      target_start_date:formData.targetStartDate || null,
      closing_date:     formData.closingDate     || null,
      skills:           JSON.stringify(formData.skills || []),
      status:           "Active",
    });

    // New job created by recruiter goes into both lists
    setJobPostings(prev => [optimistic, ...prev]);
    // Strip company from myJob entry
    const myOptimistic = { ...optimistic, company: undefined };
    setMyJobPostings(prev => [myOptimistic, ...prev]);
    setShowPostJobModal(false);

    if (apiOnline) {
      try {
        const res = await fetch(`${API_BASE}/jobs/`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(formToApiPayload(formData)),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const created = await res.json();
        setJobPostings(prev =>
          prev.map(j => j.id === optimistic.id ? normalizeApiJob(created) : j)
        );
        setMyJobPostings(prev =>
          prev.map(j => j.id === optimistic.id ? { ...normalizeApiJob(created), company: undefined } : j)
        );
      } catch {
        setApiOnline(false);
      }
    }
  };

  /* ── Active dataset based on section ────────────────────────── */
  const currentJobs = activeSection === 'myJobs' ? myJobPostings : jobPostings;

  /* ── Derived stats ───────────────────────────────────────────── */
  const stats = {
    total:  currentJobs.length,
    active: currentJobs.filter(j => j.status === 'Active').length,
    closed: currentJobs.filter(j => j.status === 'Closed').length,
    onHold: currentJobs.filter(j => j.status === 'On Hold').length,
  };

  const filteredJobs = currentJobs
    .filter(job => activeFilter === 'all' || job.status === activeFilter)
    .filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Active':  return { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  icon: CheckCircle  };
      case 'Closed':  return { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    icon: XCircle      };
      case 'On Hold': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: PauseCircle  };
      default:        return { bg: 'bg-gray-50',   text: 'text-gray-700',   border: 'border-gray-200',   icon: FileText     };
    }
  };

  /* ── Section switcher helper ─────────────────────────────────── */
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setActiveFilter('all');
    setSearchTerm('');
  };

  /* ══════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════ */
  return (
    <div className="flex min-h-screen bg-white">
      <VendorSidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
                <p className="text-gray-600 mt-1">Manage and track all job listings</p>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button
                  onClick={() => setShowPostJobModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Post Job
                </button>
              </div>
            </div>

            {/* Section Toggle — Total Jobs / My Jobs */}
            <div className="flex items-center gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
              <button
                onClick={() => handleSectionChange('total')}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeSection === 'total'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Total Jobs
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  activeSection === 'total' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                }`}>
                  {jobPostings.length}
                </span>
              </button>
              <button
                onClick={() => handleSectionChange('myJobs')}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeSection === 'myJobs'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <UserCircle className="w-4 h-4" />
                My Jobs
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  activeSection === 'myJobs' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                }`}>
                  {myJobPostings.length}
                </span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={
                  activeSection === 'myJobs'
                    ? "Search my jobs by title or skills..."
                    : "Search jobs by title, company, or skills..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-700 text-sm font-medium">
                  {activeSection === 'myJobs' ? 'My Jobs' : 'Total Jobs'}
                </div>
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? <span className="animate-pulse">…</span> : stats.total}
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-green-700 text-sm font-medium">Active Jobs</div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? <span className="animate-pulse">…</span> : stats.active}
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-red-700 text-sm font-medium">Closed Jobs</div>
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? <span className="animate-pulse">…</span> : stats.closed}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-orange-700 text-sm font-medium">On Hold</div>
                <PauseCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? <span className="animate-pulse">…</span> : stats.onHold}
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
            {[
              { key: 'all',     label: 'All Jobs', count: stats.total  },
              { key: 'Active',  label: 'Active',   count: stats.active },
              { key: 'Closed',  label: 'Closed',   count: stats.closed },
              { key: 'On Hold', label: 'On Hold',  count: stats.onHold },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeFilter === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeFilter === tab.key
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {loading ? '…' : tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-900">{filteredJobs.length}</span> jobs
              {searchTerm && (
                <span> for "<span className="font-medium text-gray-900">{searchTerm}</span>"</span>
              )}
              {activeSection === 'myJobs' && (
                <span className="ml-2 text-xs text-blue-600 font-semibold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  Posted by me
                </span>
              )}
              {!apiOnline && (
                <span className="">
                  
                </span>
              )}
            </p>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-gray-200 rounded-xl p-6 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-100 rounded w-1/3" />
                      <div className="h-4 bg-gray-50 rounded w-1/2" />
                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map(j => <div key={j} className="h-6 w-16 bg-gray-100 rounded-full" />)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Jobs List */}
          {!loading && (
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No jobs found matching your criteria.</p>
                </div>
              ) : filteredJobs.map((job) => {
                const statusConfig = getStatusConfig(job.status);
                const StatusIcon   = statusConfig.icon;

                return (
                  <div key={job.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            activeSection === 'myJobs' ? 'bg-purple-50' : 'bg-blue-50'
                          }`}>
                            {activeSection === 'myJobs'
                              ? <UserCircle className="w-6 h-6 text-purple-600" />
                              : <Briefcase className="w-6 h-6 text-blue-600" />
                            }
                          </div>

                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                <StatusIcon className="w-3 h-3" />
                                {job.status}
                              </span>
                              <span className="text-sm text-gray-500">#{job.jobId}</span>
                            </div>

                            {/* Meta row — company is hidden for My Jobs */}
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                              {activeSection !== 'myJobs' && job.company && (
                                <div className="flex items-center gap-1">
                                  <Building className="w-4 h-4" />
                                  {job.company}
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {job.experience}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {job.budget}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.skills.map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                                  {skill}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-6 text-sm">
                              <div>
                                <div className="text-gray-500">Posted</div>
                                <div className="font-medium text-gray-900">{job.postedDate}</div>
                              </div>
                              <div>
                                <div className="text-gray-500">Expires</div>
                                <div className="font-medium text-gray-900">{job.expiryDate}</div>
                              </div>
                              <div>
                                <div className="text-gray-500">Work Mode</div>
                                <div className="font-medium text-gray-900">{job.workMode}</div>
                              </div>
                              <div>
                                <div className="text-gray-500">Job Type</div>
                                <div className="font-medium text-gray-900">{job.type}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                          </button>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{job.applicantsCount}</div>
                              <div className="text-xs text-gray-500">Applicants</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{job.shortlisted}</div>
                              <div className="text-xs text-gray-500">Shortlisted</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{job.interviews}</div>
                              <div className="text-xs text-gray-500">Interviews</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/vendor/job/${job.id}`)}
                              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => navigate(`/vendor/job/${job.id}#applicants`)}
                              className={`px-4 py-2 text-white text-sm font-medium rounded-lg ${
                                activeSection === 'myJobs'
                                  ? 'bg-purple-600 hover:bg-purple-700'
                                  : 'bg-blue-600 hover:bg-blue-700'
                              }`}
                            >
                              Manage Applicants
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* CreateJobModal */}
      <CreateJobModal
        isOpen={showPostJobModal}
        onClose={() => setShowPostJobModal(false)}
        onSubmit={handleCreateJob}
      />
    </div>
  );
}