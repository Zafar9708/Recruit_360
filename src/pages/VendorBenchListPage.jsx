// import { useState, useMemo } from 'react';
// import {
//   Users, Search, Upload, Download, Check, Calendar,
//   MapPin, DollarSign, Award, X, FileText, CheckCircle, XCircle,
//   UserCheck, UserX, Clock, Eye, LayoutGrid, List, Table as TableIcon,
//   Filter, MoreVertical, ChevronRight, ArrowUpDown, Plus, Share2,
//   BarChart3, FilterIcon, ChevronDown, Star, Shield, Zap
// } from 'lucide-react';
// import VendorSidebar from '../components/VendorSidebar';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import AddCandidateModal from '../components/Candidate/AddCandidateModal';
// /* ─────────────────────────────────────────────────────────────
//    SEED DATA  (unchanged from original)
// ───────────────────────────────────────────────────────────── */
// const SEED_CANDIDATES = [
//   { id: '1', name: 'John Smith',title: 'Senior Java Developer',skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],          experience: 8,  location: 'San Francisco, CA', rate: '$95/hr',  availability: 'Immediate', lastUpdated: '2024-12-20', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.8 },
//   { id: '2', name: 'Emily Rodriguez',title: 'React Developer',skills: ['React', 'TypeScript', 'Redux', 'Node.js'],              experience: 5,  location: 'Austin, TX',        rate: '$85/hr',  availability: '2 weeks',   lastUpdated: '2024-12-18', status: 'Available',  isVerified: false, isActive: true,  rating: 4.5 },
//   { id: '3', name: 'Michael Chang',title: 'DevOps Engineer',skills: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD'],           experience: 6,  location: 'Seattle, WA',       rate: '$90/hr',  availability: 'Immediate', lastUpdated: '2024-12-15', status: 'In Process', isVerified: true,  isActive: false, rating: 4.9 },
//   { id: '4', name: 'Sarah Johnson',title: 'Data Scientist',skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],      experience: 7,  location: 'Boston, MA',        rate: '$100/hr', availability: '1 month',   lastUpdated: '2024-12-12', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.7 },
//   { id: '5', name: 'David Kumar',title: 'Full Stack Developer',skills: ['React', 'Node.js', 'MongoDB', 'Express'],               experience: 4,  location: 'New York, NY',      rate: '$80/hr',  availability: 'Immediate', lastUpdated: '2024-12-10', status: 'Placed',     isVerified: false, isActive: false, rating: 4.3 },
//   { id: '6', name: 'Lisa Wang',title: 'Mobile Developer',skills: ['React Native', 'iOS', 'Android', 'Firebase'],           experience: 5,  location: 'Chicago, IL',       rate: '$88/hr',  availability: '3 weeks',   lastUpdated: '2024-12-08', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.6 },
//   { id: '7', name: 'Robert Chen',title: 'Cloud Architect',skills: ['AWS', 'Azure', 'GCP', 'DevOps'],                        experience: 10, location: 'Remote',            rate: '$120/hr', availability: '1 week',    lastUpdated: '2024-12-05', status: 'In Process', isVerified: true,  isActive: true,  rating: 4.9 },
//   { id: '8', name: 'Jessica Martinez',title: 'UX Designer',skills: ['Figma', 'Sketch', 'UI/UX', 'Prototyping'],              experience: 6,  location: 'Los Angeles, CA',   rate: '$92/hr',  availability: 'Immediate', lastUpdated: '2024-12-03', status: 'Available',  isVerified: false, isActive: true,  rating: 4.4 },
// ];

// export default function VendorBenchListPage() {
//   /* ─── state ─── */
//   const [candidates,        setCandidates]        = useState(SEED_CANDIDATES);
//   const [searchTerm,        setSearchTerm]        = useState('');
//   const [activeFilter,      setActiveFilter]      = useState('all');
//   const [viewMode,          setViewMode]          = useState('list');
//   const [showFilters,       setShowFilters]       = useState(false);
//   const [showAddModal,      setShowAddModal]      = useState(false);   // ← NEW: controls AddCandidateModal
//   const navigate = useNavigate();

//   /* ─── job context (unchanged) ─── */
//   const currentJob = { id: 'bench-job', title: 'Bench Candidates', company: 'TechStaff Solutions' };

//   /* ─── stats (derived from live `candidates`) ─── */
//   const stats = useMemo(() => {
//     const parseRate = r => parseFloat((r || '$0').replace(/[^0-9.]/g, '')) || 0;
//     return {
//       total:       candidates.length,
//       verified:    candidates.filter(c => c.isVerified).length,
//       notVerified: candidates.filter(c => !c.isVerified).length,
//       active:      candidates.filter(c => c.isActive).length,
//       inactive:    candidates.filter(c => !c.isActive).length,
//       onHold:      candidates.filter(c => c.status === 'In Process').length,
//       available:   candidates.filter(c => c.status === 'Available').length,
//       placed:      candidates.filter(c => c.status === 'Placed').length,
//       avgRate:     candidates.length
//         ? `$${Math.round(candidates.reduce((a, c) => a + parseRate(c.rate), 0) / candidates.length)}/hr`
//         : '$0/hr',
//     };
//   }, [candidates]);

//   /* ─── filtering ─── */
//   const filteredCandidates = candidates
//     .filter(c =>
//       c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (c.skills || []).some(sk => sk.toLowerCase().includes(searchTerm.toLowerCase()))
//     )
//     .filter(c => {
//       if (activeFilter === 'verified')    return c.isVerified;
//       if (activeFilter === 'notVerified') return !c.isVerified;
//       if (activeFilter === 'active')      return c.isActive;
//       if (activeFilter === 'inactive')    return !c.isActive;
//       if (activeFilter === 'onHold')      return c.status === 'In Process';
//       if (activeFilter === 'available')   return c.status === 'Available';
//       if (activeFilter === 'placed')      return c.status === 'Placed';
//       return true;
//     });

//   /* ─── handle new candidate from AddCandidateModal ─── */
//   const handleAddCandidate = (newCandidate) => {
//     // newCandidate comes from AddCandidateModal.handleSubmit — already shaped correctly
//     setCandidates(prev => [newCandidate, ...prev]);
//   };

//   /* ─────────────────────────────────────────────────────────────
//      SUB-COMPONENTS  (completely unchanged from original)
//   ───────────────────────────────────────────────────────────── */

//   const StatusBadge = ({ status }) => {
//     const styles = {
//       'Available':  'bg-green-50 text-green-700 border border-green-200',
//       'In Process': 'bg-amber-50 text-amber-700 border border-amber-200',
//       'Placed':     'bg-blue-50 text-blue-700 border border-blue-200',
//     };
//     return (
//       <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${styles[status] || 'bg-gray-50 text-gray-600'}`}>
//         {status}
//       </span>
//     );
//   };

//   const RatingStars = ({ rating }) => (
//     <div className="flex items-center gap-1">
//       <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
//       <span className="text-xs font-semibold text-gray-700">{rating || '—'}</span>
//     </div>
//   );

//   /* ── LIST VIEW ── */
//   const ListView = () => (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//       {filteredCandidates.map((candidate) => (
//         <motion.div
//           key={candidate.id}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="group bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 overflow-hidden"
//         >
//           <div className="p-5">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-start gap-4">
//                 <div className="relative">
//                   <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-lg uppercase">
//                     {candidate.name.substring(0, 2)}
//                   </div>
//                   {candidate.isVerified && (
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
//                       <Check className="w-3 h-3 text-white" />
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <h3 className="font-bold text-gray-900">{candidate.name}</h3>
//                     <RatingStars rating={candidate.rating} />
//                   </div>
//                   <p className="text-sm text-gray-600 mb-2">{candidate.title}</p>
//                   <div className="flex items-center gap-4 text-sm text-gray-500">
//                     <span className="flex items-center gap-1">
//                       <MapPin className="w-3 h-3" />
//                       {candidate.location}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Clock className="w-3 h-3" />
//                       {candidate.experience}y
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-lg font-bold text-blue-700">{candidate.rate}</div>
//                 <StatusBadge status={candidate.status} />
//               </div>
//             </div>

//             <div className="mb-4">
//               <div className="flex flex-wrap gap-2">
//                 {(candidate.skills || []).map((skill, idx) => (
//                   <span key={idx} className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200">
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//               <div className="text-xs text-gray-500">Updated {candidate.lastUpdated}</div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => navigate(`/vendor/job/${currentJob.id}/candidate/${candidate.id}`)}
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
//                 >
//                   <Eye className="w-4 h-4" />
//                   View Profile
//                 </button>
//                 <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <MoreVertical className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );

//   /* ── TABLE VIEW ── */
//   const TableView = () => (
//     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
//             <tr>
//               {['Candidate','Status','Skills','Experience','Rate','Location','Actions'].map(h => (
//                 <th key={h} className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filteredCandidates.map(candidate => (
//               <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors">
//                 <td className="py-4 px-6">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm uppercase">
//                       {candidate.name.substring(0, 2)}
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-2">
//                         <p className="font-semibold text-gray-900">{candidate.name}</p>
//                         {candidate.isVerified && <Shield className="w-4 h-4 text-blue-500" />}
//                       </div>
//                       <p className="text-sm text-gray-500">{candidate.title}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="py-4 px-6"><StatusBadge status={candidate.status} /></td>
//                 <td className="py-4 px-6">
//                   <div className="flex flex-wrap gap-1 max-w-[200px]">
//                     {(candidate.skills || []).slice(0, 3).map((skill, idx) => (
//                       <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded border border-gray-200">{skill}</span>
//                     ))}
//                     {(candidate.skills || []).length > 3 && (
//                       <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded">+{candidate.skills.length - 3}</span>
//                     )}
//                   </div>
//                 </td>
//                 <td className="py-4 px-6 text-center">
//                   <span className="font-semibold text-gray-900">{candidate.experience}y</span>
//                 </td>
//                 <td className="py-4 px-6">
//                   <span className="font-bold text-blue-700">{candidate.rate}</span>
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">{candidate.location}</td>
//                 <td className="py-4 px-6">
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => navigate(`/vendor/job/${currentJob.id}/candidate/${candidate.id}`)}
//                       className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium rounded-lg transition-colors"
//                     >
//                       View
//                     </button>
//                     <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
//                       <MoreVertical className="w-4 h-4 text-gray-400" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   /* ── KANBAN VIEW ── */
//   const KanbanView = () => {
//     const columns = [
//       { id: 'Available',  title: 'Available',  color: 'green', count: filteredCandidates.filter(c => c.status === 'Available').length  },
//       { id: 'In Process', title: 'In Process', color: 'amber', count: filteredCandidates.filter(c => c.status === 'In Process').length },
//       { id: 'Placed',     title: 'Placed',     color: 'blue',  count: filteredCandidates.filter(c => c.status === 'Placed').length     },
//     ];
//     return (
//       <div className="flex gap-6 overflow-x-auto pb-6">
//         {columns.map(column => (
//           <div key={column.id} className="flex-1 min-w-[320px]">
//             <div className="bg-white rounded-xl border border-gray-200 mb-4">
//               <div className={`flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-${column.color}-50 to-${column.color}-50/50`}>
//                 <div className="flex items-center gap-2">
//                   <div className={`w-3 h-3 rounded-full bg-${column.color}-500`}></div>
//                   <h3 className="font-semibold text-gray-900">{column.title}</h3>
//                 </div>
//                 <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 border border-gray-200">{column.count}</span>
//               </div>
//               <div className="p-4 space-y-4">
//                 {filteredCandidates.filter(c => c.status === column.id).map(candidate => (
//                   <div key={candidate.id}
//                     className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-move"
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex items-start gap-3">
//                         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm uppercase">
//                           {candidate.name.substring(0, 2)}
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
//                           <p className="text-sm text-gray-500">{candidate.title}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-lg font-bold text-blue-700 mb-1">{candidate.rate}</div>
//                         <RatingStars rating={candidate.rating} />
//                       </div>
//                     </div>
//                     <div className="mb-3 flex flex-wrap gap-2">
//                       {(candidate.skills || []).slice(0, 2).map((skill, idx) => (
//                         <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded border border-gray-200">{skill}</span>
//                       ))}
//                     </div>
//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                       <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{candidate.location}</span>
//                       <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{candidate.experience}y exp</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ─────────────────────────────────────────────────────────────
//      RENDER
//   ───────────────────────────────────────────────────────────── */
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <VendorSidebar />

//       <main className="flex-1 overflow-y-auto">

//         {/* ── MAIN HEADER (unchanged) ── */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//           <div className="max-w-7xl mx-auto px-6 py-8">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <h1 className="text-3xl font-bold">Talent Bench</h1>
//                   <span className="bg-white/20 text-white/90 text-xs font-medium px-3 py-1 rounded-full">
//                     {stats.total} Candidates
//                   </span>
//                 </div>
//                 <p className="text-blue-100">Manage your bench candidates efficiently with advanced filtering and views</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-800 bg-white hover:bg-blue-50 rounded-lg transition-colors">
//                   <Download className="w-4 h-4" />
//                   Export
//                 </button>
//                 {/* ↓ NOW opens AddCandidateModal instead of old upload modal */}
//                 <button
//                   onClick={() => setShowAddModal(true)}
//                   className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg shadow-lg transition-all"
//                 >
//                   <Plus className="w-5 h-5" />
//                   Add Candidate
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-6 py-6">

//           {/* ── STATS OVERVIEW (unchanged, counts now live) ── */}
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
//             {[
//               { id: 'all',         label: 'All',        count: stats.total,       icon: Users,     color: 'blue'   },
//               { id: 'verified',    label: 'Verified',   count: stats.verified,    icon: Shield,    color: 'green'  },
//               { id: 'available',   label: 'Available',  count: stats.available,   icon: UserCheck, color: 'emerald'},
//               { id: 'active',      label: 'Active',     count: stats.active,      icon: Zap,       color: 'amber'  },
//               { id: 'onHold',      label: 'In Process', count: stats.onHold,      icon: Clock,     color: 'orange' },
//               { id: 'placed',      label: 'Placed',     count: stats.placed,      icon: Award,     color: 'purple' },
//               { id: 'notVerified', label: 'Unverified', count: stats.notVerified, icon: XCircle,   color: 'red'    },
//               { id: 'inactive',    label: 'Inactive',   count: stats.inactive,    icon: UserX,     color: 'gray'   },
//             ].map(stat => {
//               const active = activeFilter === stat.id;
//               return (
//                 <button key={stat.id} onClick={() => setActiveFilter(stat.id)}
//                   className={`p-3 rounded-xl border transition-all ${active
//                     ? `bg-white border-${stat.color}-500 shadow-md ring-2 ring-${stat.color}-100`
//                     : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                   }`}>
//                   <div className="flex items-center gap-2 mb-2">
//                     <div className={`p-2 rounded-lg ${active ? `bg-${stat.color}-100 text-${stat.color}-700` : 'bg-gray-100 text-gray-500'}`}>
//                       <stat.icon className="w-4 h-4" />
//                     </div>
//                     <span className={`text-xs font-semibold ${active ? `text-${stat.color}-700` : 'text-gray-500'}`}>{stat.label}</span>
//                   </div>
//                   <div className={`text-lg font-bold ${active ? 'text-gray-900' : 'text-gray-700'}`}>{stat.count}</div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* ── ACTION BAR (unchanged) ── */}
//           <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
//             <div className="flex flex-col md:flex-row md:items-center gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     placeholder="Search candidates by name, skills, or location..."
//                     className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={searchTerm}
//                     onChange={e => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors"
//                 >
//                   <FilterIcon className="w-4 h-4" />
//                   Filters
//                   <ChevronDown className="w-4 h-4" />
//                 </button>
//                 <div className="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-200">
//                   {[
//                     { id: 'list',   icon: List,       label: 'List'   },
//                     { id: 'table',  icon: TableIcon,  label: 'Table'  },
//                     { id: 'kanban', icon: LayoutGrid, label: 'Kanban' },
//                   ].map(mode => (
//                     <button key={mode.id} onClick={() => setViewMode(mode.id)}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
//                         viewMode === mode.id
//                           ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
//                           : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
//                       }`}>
//                       <mode.icon className="w-4 h-4" />
//                       {mode.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Advanced filters (unchanged) */}
//             {showFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mt-4 pt-4 border-t border-gray-200"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Experience Range</label>
//                     <div className="flex gap-2">
//                       <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
//                       <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Rate Range</label>
//                     <div className="flex gap-2">
//                       <input type="text" placeholder="Min $" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
//                       <input type="text" placeholder="Max $" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
//                     <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
//                       <option value="">Any Availability</option>
//                       <option value="immediate">Immediate</option>
//                       <option value="2weeks">Within 2 Weeks</option>
//                       <option value="1month">Within 1 Month</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex justify-end gap-3 mt-4">
//                   <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Clear All</button>
//                   <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">Apply Filters</button>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           {/* ── RESULTS HEADER (unchanged) ── */}
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h2 className="text-lg font-semibold text-gray-900">{filteredCandidates.length} Candidates Found</h2>
//               <p className="text-sm text-gray-500">{activeFilter !== 'all' && `Filtered by: ${activeFilter}`}</p>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <span className="hidden md:inline">Avg. Rate:</span>
//               <span className="font-semibold text-blue-700">{stats.avgRate}</span>
//             </div>
//           </div>

//           {/* ── DYNAMIC CONTENT (unchanged) ── */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={viewMode + activeFilter}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//               className="mb-8"
//             >
//               {viewMode === 'list'   && <ListView />}
//               {viewMode === 'table'  && <TableView />}
//               {viewMode === 'kanban' && <KanbanView />}

//               {filteredCandidates.length === 0 && (
//                 <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
//                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <Search className="w-10 h-10 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h3>
//                   <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                     Try adjusting your search terms or filters to find what you're looking for.
//                   </p>
//                   <button
//                     onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
//                     className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Reset Filters
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>

//           {/* ── PAGINATION (unchanged) ── */}
//           {filteredCandidates.length > 0 && (
//             <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
//               <div className="text-sm text-gray-500">
//                 Showing <span className="font-semibold">1-{filteredCandidates.length}</span> of{' '}
//                 <span className="font-semibold">{filteredCandidates.length}</span> results
//               </div>
//               <div className="flex items-center gap-2">
//                 <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Previous</button>
//                 <button className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">1</button>
//                 <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">2</button>
//                 <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Next</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* ── ADD CANDIDATE MODAL (replaces old upload modal entirely) ── */}
//       <AddCandidateModal
//         isOpen={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSubmit={handleAddCandidate}
//       />
//     </div>
//   );
// }

import { useState, useMemo } from 'react';
import {
  Users, Search, Upload, Download, Check, Calendar,
  MapPin, DollarSign, Award, X, FileText, CheckCircle, XCircle,
  UserCheck, UserX, Clock, Eye, LayoutGrid, List, Table as TableIcon,
  Filter, MoreVertical, ChevronRight, ArrowUpDown, Plus, Share2,
  BarChart3, FilterIcon, ChevronDown, Star, Shield, Zap, UserCircle, Briefcase
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AddCandidateModal from '../components/Candidate/AddCandidateModal';

/* ─────────────────────────────────────────────────────────────
   ALL BENCH DATA — 15 candidates (includes client name)
───────────────────────────────────────────────────────────── */
const ALL_BENCH_CANDIDATES = [
  { id: '1',  name: 'John Smith',        title: 'Senior Java Developer',    client: 'Tech Solutions Inc.',  skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],       experience: 8,  location: 'San Francisco, CA', rate: '$95/hr',  availability: 'Immediate', lastUpdated: '2024-12-20', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.8 },
  { id: '2',  name: 'Emily Rodriguez',   title: 'React Developer',          client: 'Digital Ventures',     skills: ['React', 'TypeScript', 'Redux', 'Node.js'],           experience: 5,  location: 'Austin, TX',        rate: '$85/hr',  availability: '2 weeks',   lastUpdated: '2024-12-18', status: 'Available',  isVerified: false, isActive: true,  rating: 4.5 },
  { id: '3',  name: 'Michael Chang',     title: 'DevOps Engineer',          client: 'Cloud Systems Corp',   skills: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD'],        experience: 6,  location: 'Seattle, WA',       rate: '$90/hr',  availability: 'Immediate', lastUpdated: '2024-12-15', status: 'In Process', isVerified: true,  isActive: false, rating: 4.9 },
  { id: '4',  name: 'Sarah Johnson',     title: 'Data Scientist',           client: 'Analytics Pro',        skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],   experience: 7,  location: 'Boston, MA',        rate: '$100/hr', availability: '1 month',   lastUpdated: '2024-12-12', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.7 },
  { id: '5',  name: 'David Kumar',       title: 'Full Stack Developer',     client: 'Innovate Labs',        skills: ['React', 'Node.js', 'MongoDB', 'Express'],            experience: 4,  location: 'New York, NY',      rate: '$80/hr',  availability: 'Immediate', lastUpdated: '2024-12-10', status: 'Placed',     isVerified: false, isActive: false, rating: 4.3 },
  { id: '6',  name: 'Lisa Wang',         title: 'Mobile Developer',         client: 'MobileFirst Co.',      skills: ['React Native', 'iOS', 'Android', 'Firebase'],        experience: 5,  location: 'Chicago, IL',       rate: '$88/hr',  availability: '3 weeks',   lastUpdated: '2024-12-08', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.6 },
  { id: '7',  name: 'Robert Chen',       title: 'Cloud Architect',          client: 'Enterprise Corp',      skills: ['AWS', 'Azure', 'GCP', 'DevOps'],                    experience: 10, location: 'Remote',            rate: '$120/hr', availability: '1 week',    lastUpdated: '2024-12-05', status: 'In Process', isVerified: true,  isActive: true,  rating: 4.9 },
  { id: '8',  name: 'Jessica Martinez',  title: 'UX Designer',              client: 'Creative Agency',      skills: ['Figma', 'Sketch', 'UI/UX', 'Prototyping'],           experience: 6,  location: 'Los Angeles, CA',   rate: '$92/hr',  availability: 'Immediate', lastUpdated: '2024-12-03', status: 'Available',  isVerified: false, isActive: true,  rating: 4.4 },
  { id: '9',  name: 'Kevin Patel',       title: 'Android Developer',        client: 'Consumer Apps Ltd.',   skills: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'MVVM'],  experience: 4,  location: 'Atlanta, GA',       rate: '$82/hr',  availability: 'Immediate', lastUpdated: '2024-12-01', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.4 },
  { id: '10', name: 'Priya Sharma',      title: 'Machine Learning Engineer',client: 'AI Innovations',       skills: ['Python', 'PyTorch', 'Transformers', 'MLOps'],        experience: 5,  location: 'San Jose, CA',      rate: '$105/hr', availability: '2 weeks',   lastUpdated: '2024-11-28', status: 'In Process', isVerified: true,  isActive: true,  rating: 4.8 },
  { id: '11', name: 'Tom Harris',        title: 'Salesforce Developer',     client: 'CRM Solutions',        skills: ['Salesforce', 'Apex', 'LWC', 'SOQL'],                experience: 6,  location: 'Denver, CO',        rate: '$88/hr',  availability: '1 month',   lastUpdated: '2024-11-25', status: 'Available',  isVerified: false, isActive: true,  rating: 4.2 },
  { id: '12', name: 'Anita Desai',       title: 'QA Automation Engineer',   client: 'Quality First Inc.',   skills: ['Selenium', 'Cypress', 'Jest', 'Postman'],            experience: 4,  location: 'Phoenix, AZ',       rate: '$72/hr',  availability: 'Immediate', lastUpdated: '2024-11-22', status: 'Available',  isVerified: true,  isActive: false, rating: 4.5 },
  { id: '13', name: 'Carlos Rivera',     title: 'Backend Go Developer',     client: 'FinTech Startup',      skills: ['Go', 'gRPC', 'Microservices', 'Docker'],             experience: 5,  location: 'Miami, FL',         rate: '$95/hr',  availability: '1 week',    lastUpdated: '2024-11-20', status: 'Placed',     isVerified: true,  isActive: false, rating: 4.6 },
  { id: '14', name: 'Nina Volkov',       title: 'Data Engineer',            client: 'Analytics Pro',        skills: ['Spark', 'Kafka', 'Airflow', 'Snowflake'],            experience: 6,  location: 'Seattle, WA',       rate: '$98/hr',  availability: '2 weeks',   lastUpdated: '2024-11-18', status: 'Available',  isVerified: false, isActive: true,  rating: 4.3 },
  { id: '15', name: 'Omar Farooq',       title: 'Cybersecurity Analyst',    client: 'SecureIT Solutions',   skills: ['SIEM', 'Penetration Testing', 'SOC', 'CISSP'],       experience: 7,  location: 'Washington, DC',    rate: '$102/hr', availability: 'Immediate', lastUpdated: '2024-11-15', status: 'In Process', isVerified: true,  isActive: true,  rating: 4.7 },
];

/* ─────────────────────────────────────────────────────────────
   MY BENCH DATA — 15 candidates (no client field)
───────────────────────────────────────────────────────────── */
const MY_BENCH_CANDIDATES = [
  { id: 'm1',  name: 'Arjun Mehta',      title: 'Full Stack Developer',     skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],       experience: 4,  location: 'Remote',            rate: '$78/hr',  availability: 'Immediate', lastUpdated: '2024-12-19', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.6 },
  { id: 'm2',  name: 'Sophie Turner',    title: 'Python Backend Developer', skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL'],       experience: 5,  location: 'Austin, TX',        rate: '$82/hr',  availability: '2 weeks',   lastUpdated: '2024-12-17', status: 'Available',  isVerified: false, isActive: true,  rating: 4.4 },
  { id: 'm3',  name: 'James O\'Brien',   title: 'Cloud Infrastructure Eng.',skills: ['AWS', 'Terraform', 'Ansible', 'Linux'],            experience: 7,  location: 'Chicago, IL',       rate: '$98/hr',  availability: 'Immediate', lastUpdated: '2024-12-14', status: 'In Process', isVerified: true,  isActive: true,  rating: 4.8 },
  { id: 'm4',  name: 'Meera Nair',       title: 'Data Engineer',            skills: ['Spark', 'Kafka', 'Airflow', 'Python'],             experience: 5,  location: 'Seattle, WA',       rate: '$92/hr',  availability: '1 month',   lastUpdated: '2024-12-11', status: 'Available',  isVerified: true,  isActive: false, rating: 4.5 },
  { id: 'm5',  name: 'Lucas Blanc',      title: 'Angular Developer',        skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx'],           experience: 4,  location: 'New York, NY',      rate: '$80/hr',  availability: 'Immediate', lastUpdated: '2024-12-09', status: 'Placed',     isVerified: false, isActive: false, rating: 4.2 },
  { id: 'm6',  name: 'Fatima Al-Sayed',  title: 'iOS Developer',            skills: ['Swift', 'Xcode', 'UIKit', 'SwiftUI'],              experience: 5,  location: 'Los Angeles, CA',   rate: '$88/hr',  availability: '3 weeks',   lastUpdated: '2024-12-06', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.7 },
  { id: 'm7',  name: 'Raj Krishnan',     title: 'Site Reliability Engineer',skills: ['SRE', 'Prometheus', 'Grafana', 'Kubernetes'],      experience: 8,  location: 'Denver, CO',        rate: '$110/hr', availability: '1 week',    lastUpdated: '2024-12-04', status: 'In Process', isVerified: true,  isActive: true,  rating: 4.9 },
  { id: 'm8',  name: 'Elena Petrova',    title: 'UX Researcher',            skills: ['User Research', 'Figma', 'Usability Testing'],     experience: 5,  location: 'Boston, MA',        rate: '$85/hr',  availability: 'Immediate', lastUpdated: '2024-12-02', status: 'Available',  isVerified: false, isActive: true,  rating: 4.3 },
  { id: 'm9',  name: 'Hassan Malik',     title: 'Network Engineer',         skills: ['Cisco', 'BGP', 'OSPF', 'Firewalls'],              experience: 6,  location: 'Dallas, TX',        rate: '$86/hr',  availability: '2 weeks',   lastUpdated: '2024-11-29', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.5 },
  { id: 'm10', name: 'Yuki Tanaka',      title: 'Tableau Developer',        skills: ['Tableau', 'Power BI', 'SQL', 'Data Visualization'],experience: 4,  location: 'Phoenix, AZ',       rate: '$74/hr',  availability: 'Immediate', lastUpdated: '2024-11-27', status: 'In Process', isVerified: false, isActive: true,  rating: 4.1 },
  { id: 'm11', name: 'Diego Morales',    title: 'Embedded Systems Eng.',    skills: ['C', 'C++', 'RTOS', 'CAN Bus'],                    experience: 7,  location: 'Detroit, MI',       rate: '$94/hr',  availability: '1 month',   lastUpdated: '2024-11-24', status: 'Available',  isVerified: true,  isActive: false, rating: 4.6 },
  { id: 'm12', name: 'Aisha Okonkwo',    title: 'Scrum Master',             skills: ['Scrum', 'Kanban', 'JIRA', 'SAFe'],                experience: 5,  location: 'Atlanta, GA',       rate: '$82/hr',  availability: 'Immediate', lastUpdated: '2024-11-21', status: 'Placed',     isVerified: true,  isActive: false, rating: 4.4 },
  { id: 'm13', name: 'Pavel Novak',      title: 'Blockchain Developer',     skills: ['Solidity', 'Ethereum', 'Web3.js', 'DeFi'],        experience: 4,  location: 'Miami, FL',         rate: '$96/hr',  availability: '2 weeks',   lastUpdated: '2024-11-19', status: 'Available',  isVerified: false, isActive: true,  rating: 4.3 },
  { id: 'm14', name: 'Nora Johansson',   title: 'Technical Writer',         skills: ['Technical Writing', 'API Docs', 'Markdown'],      experience: 3,  location: 'Portland, OR',      rate: '$68/hr',  availability: 'Immediate', lastUpdated: '2024-11-17', status: 'Available',  isVerified: true,  isActive: true,  rating: 4.5 },
  { id: 'm15', name: 'Vikram Singh',     title: 'SAP ABAP Developer',       skills: ['SAP', 'ABAP', 'S/4HANA', 'BAPI'],                 experience: 8,  location: 'Houston, TX',       rate: '$90/hr',  availability: '1 week',    lastUpdated: '2024-11-14', status: 'In Process', isVerified: true,  isActive: true,  rating: 4.7 },
];

export default function VendorBenchListPage() {
  const [searchTerm,   setSearchTerm]   = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode,     setViewMode]     = useState('list');
  const [showFilters,  setShowFilters]  = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeSection, setActiveSection] = useState('allBench'); // 'allBench' | 'myBench'

  const [allCandidates, setAllCandidates] = useState(ALL_BENCH_CANDIDATES);
  const [myCandidates,  setMyCandidates]  = useState(MY_BENCH_CANDIDATES);

  const navigate = useNavigate();

  const currentJob = { id: 'bench-job', title: 'Bench Candidates', company: 'TechStaff Solutions' };

  /* ── active dataset ── */
  const candidates = activeSection === 'myBench' ? myCandidates : allCandidates;

  /* ── stats ── */
  const stats = useMemo(() => {
    const parseRate = r => parseFloat((r || '$0').replace(/[^0-9.]/g, '')) || 0;
    return {
      total:       candidates.length,
      verified:    candidates.filter(c => c.isVerified).length,
      notVerified: candidates.filter(c => !c.isVerified).length,
      active:      candidates.filter(c => c.isActive).length,
      inactive:    candidates.filter(c => !c.isActive).length,
      onHold:      candidates.filter(c => c.status === 'In Process').length,
      available:   candidates.filter(c => c.status === 'Available').length,
      placed:      candidates.filter(c => c.status === 'Placed').length,
      avgRate:     candidates.length
        ? `$${Math.round(candidates.reduce((a, c) => a + parseRate(c.rate), 0) / candidates.length)}/hr`
        : '$0/hr',
    };
  }, [candidates]);

  /* ── filtering ── */
  const filteredCandidates = candidates
    .filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.skills || []).some(sk => sk.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(c => {
      if (activeFilter === 'verified')    return c.isVerified;
      if (activeFilter === 'notVerified') return !c.isVerified;
      if (activeFilter === 'active')      return c.isActive;
      if (activeFilter === 'inactive')    return !c.isActive;
      if (activeFilter === 'onHold')      return c.status === 'In Process';
      if (activeFilter === 'available')   return c.status === 'Available';
      if (activeFilter === 'placed')      return c.status === 'Placed';
      return true;
    });

  /* ── add candidate ── */
  const handleAddCandidate = (newCandidate) => {
    if (activeSection === 'myBench') {
      setMyCandidates(prev => [newCandidate, ...prev]);
    } else {
      setAllCandidates(prev => [newCandidate, ...prev]);
    }
  };

  /* ── section switch ── */
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setActiveFilter('all');
    setSearchTerm('');
  };

  /* ─────────────────────────────────────────────────────────────
     SUB-COMPONENTS
  ───────────────────────────────────────────────────────────── */
  const StatusBadge = ({ status }) => {
    const styles = {
      'Available':  'bg-green-50 text-green-700 border border-green-200',
      'In Process': 'bg-amber-50 text-amber-700 border border-amber-200',
      'Placed':     'bg-blue-50 text-blue-700 border border-blue-200',
    };
    return (
      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${styles[status] || 'bg-gray-50 text-gray-600'}`}>
        {status}
      </span>
    );
  };

  const RatingStars = ({ rating }) => (
    <div className="flex items-center gap-1">
      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
      <span className="text-xs font-semibold text-gray-700">{rating || '—'}</span>
    </div>
  );

  /* ── LIST VIEW ── */
  const ListView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {filteredCandidates.map((candidate) => (
        <motion.div
          key={candidate.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="group bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 overflow-hidden"
        >
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg uppercase ${
                    activeSection === 'myBench'
                      ? 'bg-gradient-to-br from-purple-600 to-purple-800'
                      : 'bg-gradient-to-br from-blue-600 to-blue-800'
                  }`}>
                    {candidate.name.substring(0, 2)}
                  </div>
                  {candidate.isVerified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{candidate.name}</h3>
                    <RatingStars rating={candidate.rating} />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{candidate.title}</p>
                  {/* Client name shown only in All Bench */}
                  {activeSection === 'allBench' && candidate.client && (
                    <p className="text-xs text-blue-600 font-medium mb-2">{candidate.client}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {candidate.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {candidate.experience}y
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold mb-1 ${activeSection === 'myBench' ? 'text-purple-700' : 'text-blue-700'}`}>
                  {candidate.rate}
                </div>
                <StatusBadge status={candidate.status} />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {(candidate.skills || []).map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500">Updated {candidate.lastUpdated}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/vendor/job/${currentJob.id}/candidate/${candidate.id}`)}
                  className={`px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                    activeSection === 'myBench'
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  View Profile
                </button>
                <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  /* ── TABLE VIEW ── */
  const TableView = () => (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
            <tr>
              {['Candidate', ...(activeSection === 'allBench' ? ['Client'] : []), 'Status', 'Skills', 'Experience', 'Rate', 'Location', 'Actions'].map(h => (
                <th key={h} className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCandidates.map(candidate => (
              <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm uppercase ${
                      activeSection === 'myBench'
                        ? 'bg-gradient-to-br from-purple-600 to-purple-800'
                        : 'bg-gradient-to-br from-blue-600 to-blue-800'
                    }`}>
                      {candidate.name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{candidate.name}</p>
                        {candidate.isVerified && <Shield className="w-4 h-4 text-blue-500" />}
                      </div>
                      <p className="text-sm text-gray-500">{candidate.title}</p>
                    </div>
                  </div>
                </td>
                {activeSection === 'allBench' && (
                  <td className="py-4 px-6 text-sm text-blue-600 font-medium">{candidate.client || '—'}</td>
                )}
                <td className="py-4 px-6"><StatusBadge status={candidate.status} /></td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {(candidate.skills || []).slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded border border-gray-200">{skill}</span>
                    ))}
                    {(candidate.skills || []).length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded">+{candidate.skills.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="font-semibold text-gray-900">{candidate.experience}y</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`font-bold ${activeSection === 'myBench' ? 'text-purple-700' : 'text-blue-700'}`}>{candidate.rate}</span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">{candidate.location}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/vendor/job/${currentJob.id}/candidate/${candidate.id}`)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === 'myBench'
                          ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      View
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ── KANBAN VIEW ── */
  const KanbanView = () => {
    const columns = [
      { id: 'Available',  title: 'Available',  color: 'green', count: filteredCandidates.filter(c => c.status === 'Available').length  },
      { id: 'In Process', title: 'In Process', color: 'amber', count: filteredCandidates.filter(c => c.status === 'In Process').length },
      { id: 'Placed',     title: 'Placed',     color: 'blue',  count: filteredCandidates.filter(c => c.status === 'Placed').length     },
    ];
    return (
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map(column => (
          <div key={column.id} className="flex-1 min-w-[320px]">
            <div className="bg-white rounded-xl border border-gray-200 mb-4">
              <div className={`flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-${column.color}-50 to-${column.color}-50/50`}>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${column.color}-500`}></div>
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                </div>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 border border-gray-200">{column.count}</span>
              </div>
              <div className="p-4 space-y-4">
                {filteredCandidates.filter(c => c.status === column.id).map(candidate => (
                  <div key={candidate.id}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-move"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm uppercase ${
                          activeSection === 'myBench'
                            ? 'bg-gradient-to-br from-purple-600 to-purple-800'
                            : 'bg-gradient-to-br from-blue-600 to-blue-800'
                        }`}>
                          {candidate.name.substring(0, 2)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                          <p className="text-sm text-gray-500">{candidate.title}</p>
                          {activeSection === 'allBench' && candidate.client && (
                            <p className="text-xs text-blue-600 font-medium mt-0.5">{candidate.client}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold mb-1 ${activeSection === 'myBench' ? 'text-purple-700' : 'text-blue-700'}`}>
                          {candidate.rate}
                        </div>
                        <RatingStars rating={candidate.rating} />
                      </div>
                    </div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {(candidate.skills || []).slice(0, 2).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded border border-gray-200">{skill}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{candidate.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{candidate.experience}y exp</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* ─────────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────────── */
  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar />

      <main className="flex-1 overflow-y-auto">

        {/* ── MAIN HEADER ── */}
        <div className={`text-white ${activeSection === 'myBench' ? 'bg-gradient-to-r from-purple-600 to-purple-800' : 'bg-gradient-to-r from-blue-600 to-blue-800'}`}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">Talent Bench</h1>
                  <span className="bg-white/20 text-white/90 text-xs font-medium px-3 py-1 rounded-full">
                    {stats.total} Candidates
                  </span>
                </div>
                <p className={`${activeSection === 'myBench' ? 'text-purple-100' : 'text-blue-100'}`}>
                  Manage your bench candidates efficiently with advanced filtering and views
                </p>

                {/* Section Toggle */}
                <div className="flex items-center gap-1 mt-4 bg-white/10 p-1 rounded-xl w-fit">
                  <button
                    onClick={() => handleSectionChange('allBench')}
                    className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                      activeSection === 'allBench'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    All Bench
                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                      activeSection === 'allBench' ? 'bg-blue-100 text-blue-700' : 'bg-white/20 text-white'
                    }`}>
                      {ALL_BENCH_CANDIDATES.length}
                    </span>
                  </button>
                  <button
                    onClick={() => handleSectionChange('myBench')}
                    className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                      activeSection === 'myBench'
                        ? 'bg-white text-purple-700 shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <UserCircle className="w-4 h-4" />
                    My Bench
                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                      activeSection === 'myBench' ? 'bg-purple-100 text-purple-700' : 'bg-white/20 text-white'
                    }`}>
                      {MY_BENCH_CANDIDATES.length}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === 'myBench'
                    ? 'text-purple-800 bg-white hover:bg-purple-50'
                    : 'text-blue-800 bg-white hover:bg-blue-50'
                }`}>
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add Candidate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">

          {/* ── STATS OVERVIEW ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
            {[
              { id: 'all',         label: 'All',        count: stats.total,       icon: Users,     color: 'blue'   },
              { id: 'verified',    label: 'Verified',   count: stats.verified,    icon: Shield,    color: 'green'  },
              { id: 'available',   label: 'Available',  count: stats.available,   icon: UserCheck, color: 'emerald'},
              { id: 'active',      label: 'Active',     count: stats.active,      icon: Zap,       color: 'amber'  },
              { id: 'onHold',      label: 'In Process', count: stats.onHold,      icon: Clock,     color: 'orange' },
              { id: 'placed',      label: 'Placed',     count: stats.placed,      icon: Award,     color: 'purple' },
              { id: 'notVerified', label: 'Unverified', count: stats.notVerified, icon: XCircle,   color: 'red'    },
              { id: 'inactive',    label: 'Inactive',   count: stats.inactive,    icon: UserX,     color: 'gray'   },
            ].map(stat => {
              const active = activeFilter === stat.id;
              return (
                <button key={stat.id} onClick={() => setActiveFilter(stat.id)}
                  className={`p-3 rounded-xl border transition-all ${active
                    ? `bg-white border-${stat.color}-500 shadow-md ring-2 ring-${stat.color}-100`
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-2 rounded-lg ${active ? `bg-${stat.color}-100 text-${stat.color}-700` : 'bg-gray-100 text-gray-500'}`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-semibold ${active ? `text-${stat.color}-700` : 'text-gray-500'}`}>{stat.label}</span>
                  </div>
                  <div className={`text-lg font-bold ${active ? 'text-gray-900' : 'text-gray-700'}`}>{stat.count}</div>
                </button>
              );
            })}
          </div>

          {/* ── ACTION BAR ── */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={activeSection === 'myBench' ? "Search my bench by name or skills..." : "Search candidates by name, skills, or location..."}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors"
                >
                  <FilterIcon className="w-4 h-4" />
                  Filters
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-200">
                  {[
                    { id: 'list',   icon: List,       label: 'List'   },
                    { id: 'table',  icon: TableIcon,  label: 'Table'  },
                    { id: 'kanban', icon: LayoutGrid, label: 'Kanban' },
                  ].map(mode => (
                    <button key={mode.id} onClick={() => setViewMode(mode.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        viewMode === mode.id
                          ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}>
                      <mode.icon className="w-4 h-4" />
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Range</label>
                    <div className="flex gap-2">
                      <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rate Range</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Min $" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="text" placeholder="Max $" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option value="">Any Availability</option>
                      <option value="immediate">Immediate</option>
                      <option value="2weeks">Within 2 Weeks</option>
                      <option value="1month">Within 1 Month</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Clear All</button>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">Apply Filters</button>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RESULTS HEADER ── */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{filteredCandidates.length} Candidates Found</h2>
              <div className="flex items-center gap-2 mt-1">
                {activeSection === 'myBench' && (
                  <span className="text-xs text-purple-600 font-semibold bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                    My Bench
                  </span>
                )}
                {activeFilter !== 'all' && (
                  <p className="text-sm text-gray-500">Filtered by: {activeFilter}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="hidden md:inline">Avg. Rate:</span>
              <span className={`font-semibold ${activeSection === 'myBench' ? 'text-purple-700' : 'text-blue-700'}`}>{stats.avgRate}</span>
            </div>
          </div>

          {/* ── DYNAMIC CONTENT ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode + activeFilter + activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-8"
            >
              {viewMode === 'list'   && <ListView />}
              {viewMode === 'table'  && <TableView />}
              {viewMode === 'kanban' && <KanbanView />}

              {filteredCandidates.length === 0 && (
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── PAGINATION ── */}
          {filteredCandidates.length > 0 && (
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold">1-{filteredCandidates.length}</span> of{' '}
                <span className="font-semibold">{filteredCandidates.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Previous</button>
                <button className={`px-3 py-2 text-white text-sm font-medium rounded-lg ${activeSection === 'myBench' ? 'bg-purple-600' : 'bg-blue-600'}`}>1</button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Next</button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── ADD CANDIDATE MODAL ── */}
      <AddCandidateModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCandidate}
      />
    </div>
  );
}