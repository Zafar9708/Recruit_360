import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Filter, MapPin, Briefcase, Star,
  ChevronDown, FileText, Calendar, DollarSign,
  Award, X, Mail, Phone, ExternalLink, Download,
  CheckCircle2, Clock, Building2, Zap, ArrowUpRight
} from "lucide-react";
import EndClientSidebar from "../components/EndClientSidebar";
import InterviewScheduler from "../components/Interview";
export default function EndClientCandidatesPage() {
  const navigate = useNavigate();

  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState("1");
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [filters, setFilters] = useState({ jobType: "", workMode: "", minExp: "" });

  const allCandidates = [
    { id: "1", name: "Alex Johnson", title: "Senior Full Stack Developer", location: "San Francisco, CA", experience: 7, skills: ["React", "Node.js", "TypeScript", "AWS"], rating: 4.8, availability: "Immediate", jobType: "Full-time", workMode: "Hybrid", expectedSalary: "$140K", status: "Under Review", vendor: "TechRecruit Pro", email: "alex.j@example.com", matchScore: 98 },
    { id: "2", name: "Sarah Williams", title: "Product Manager", location: "New York, NY", experience: 5, skills: ["Product Strategy", "Agile", "Data Analysis"], rating: 4.9, availability: "2 weeks", jobType: "Full-time", workMode: "Remote", expectedSalary: "$125K", status: "Interviewing", vendor: "TalentHub", email: "sarah.w@example.com", matchScore: 94 },
    { id: "3", name: "Emily Davis", title: "Data Analyst", location: "Boston, MA", experience: 3, skills: ["SQL", "Python", "Tableau"], rating: 4.6, availability: "Immediate", jobType: "Contract", workMode: "Remote", expectedSalary: "$90K", status: "Shortlisted", vendor: "DataExperts", email: "emily.d@example.com", matchScore: 88 },
    { id: "4", name: "Michael Chen", title: "DevOps Engineer", location: "Seattle, WA", experience: 6, skills: ["Docker", "Kubernetes", "Terraform"], rating: 4.7, availability: "1 month", jobType: "Full-time", workMode: "On-site", expectedSalary: "$155K", status: "Under Review", vendor: "CloudTalent", email: "m.chen@example.com", matchScore: 92 },
    { id: "5", name: "Jessica Lee", title: "UX Designer", location: "Austin, TX", experience: 4, skills: ["Figma", "Adobe XD", "Prototyping"], rating: 4.8, availability: "Immediate", jobType: "Full-time", workMode: "Hybrid", expectedSalary: "$115K", status: "New", vendor: "CreativePool", email: "jess.lee@example.com", matchScore: 96 },
    { id: "6", name: "David Miller", title: "Backend Architect", location: "Remote", experience: 12, skills: ["Go", "Microservices", "PostgreSQL"], rating: 5.0, availability: "3 weeks", jobType: "Contract", workMode: "Remote", expectedSalary: "$110/hr", status: "Interviewing", vendor: "NexusStaff", email: "d.miller@example.com", matchScore: 99 },
    { id: "7", name: "Sofia Garcia", title: "Marketing Lead", location: "Miami, FL", experience: 8, skills: ["SEO", "Growth Hacking", "PPC"], rating: 4.5, availability: "Immediate", jobType: "Full-time", workMode: "On-site", expectedSalary: "$130K", status: "Rejected", vendor: "MarketForce", email: "s.garcia@example.com", matchScore: 75 },
    { id: "8", name: "James Wilson", title: "Frontend Developer", location: "Denver, CO", experience: 2, skills: ["JavaScript", "Tailwind", "Next.js"], rating: 4.3, availability: "1 week", jobType: "Full-time", workMode: "Hybrid", expectedSalary: "$95K", status: "Under Review", vendor: "DevHire", email: "j.wilson@example.com", matchScore: 82 },
    { id: "9", name: "Rachel Adams", title: "HR Business Partner", location: "Chicago, IL", experience: 9, skills: ["Employee Relations", "Payroll"], rating: 4.7, availability: "2 weeks", jobType: "Full-time", workMode: "Hybrid", expectedSalary: "$110K", status: "Shortlisted", vendor: "PeopleFirst", email: "r.adams@example.com", matchScore: 91 },
    { id: "10", name: "Kevin Park", title: "QA Automation Lead", location: "Remote", experience: 6, skills: ["Cypress", "Selenium", "Java"], rating: 4.6, availability: "Immediate", jobType: "Contract", workMode: "Remote", expectedSalary: "$95/hr", status: "New", vendor: "QualityConnect", email: "k.park@example.com", matchScore: 89 },
  ];

  const filteredCandidates = useMemo(() => {
    return allCandidates.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesJobType = !filters.jobType || c.jobType === filters.jobType;
      const matchesWorkMode = !filters.workMode || c.workMode === filters.workMode;
      const matchesExp = !filters.minExp || c.experience >= parseInt(filters.minExp);
      return matchesSearch && matchesJobType && matchesWorkMode && matchesExp;
    });
  }, [searchTerm, filters]);

  const activeCandidate = allCandidates.find(c => c.id === selectedCandidateId);

  return (
    <div className="flex h-screen bg-gray-50/50 text-slate-950 font-sans overflow-hidden">
      <EndClientSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center shrink-0">
          <div className="px-8 w-full flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-blue-950">Candidate Pipeline</h1>
              <p className="text-xs text-gray-400 font-medium">Review and manage talent submissions</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />)}
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 text-[10px] text-white flex items-center justify-center font-bold">+12</div>
               </div>
            </div>
          </div>
        </header>

        {/* SEARCH & FILTERS */}
        <div className="bg-white border-b border-gray-200 p-4 shrink-0">
          <div className="max-w-7xl mx-auto flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600/10 transition-all" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all ${showFilters ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>
              <Filter size={18} /> Filters <ChevronDown size={14} className={showFilters ? "rotate-180" : ""} />
            </button>
          </div>
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <div className="grid grid-cols-3 gap-4 mt-4 max-w-7xl mx-auto pb-2">
                  <select value={filters.jobType} onChange={(e) => setFilters({...filters, jobType: e.target.value})} className="bg-gray-50 border-none p-2.5 rounded-lg text-xs font-bold text-blue-950 outline-none"><option value="">Job Type: All</option><option value="Full-time">Full-time</option><option value="Contract">Contract</option></select>
                  <select value={filters.workMode} onChange={(e) => setFilters({...filters, workMode: e.target.value})} className="bg-gray-50 border-none p-2.5 rounded-lg text-xs font-bold text-blue-950 outline-none"><option value="">Work Mode: All</option><option value="Remote">Remote</option><option value="Hybrid">Hybrid</option><option value="On-site">On-site</option></select>
                  <select value={filters.minExp} onChange={(e) => setFilters({...filters, minExp: e.target.value})} className="bg-gray-50 border-none p-2.5 rounded-lg text-xs font-bold text-blue-950 outline-none"><option value="">Exp: Any</option><option value="3">3+ Years</option><option value="5">5+ Years</option></select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 border-r border-gray-200 bg-white overflow-y-auto">
            {filteredCandidates.map((c) => (
              <div key={c.id} onClick={() => setSelectedCandidateId(c.id)} className={`p-5 cursor-pointer border-b border-gray-50 transition-all relative ${selectedCandidateId === c.id ? "bg-blue-50/50" : "hover:bg-gray-50"}`}>
                {selectedCandidateId === c.id && <motion.div layoutId="active" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />}
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-sm ${selectedCandidateId === c.id ? 'text-blue-600' : 'text-blue-950'}`}>{c.name}</h3>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{c.matchScore}%</span>
                </div>
                <p className="text-xs font-medium text-gray-500 truncate">{c.title}</p>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50/30">
            {activeCandidate ? (
              <motion.div key={activeCandidate.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="p-10 max-w-4xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mb-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-6">
                      <div className="w-20 h-20 bg-blue-950 rounded-2xl flex items-center justify-center text-white text-2xl font-black">{activeCandidate.name.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <div className="flex items-center gap-3"><h2 className="text-2xl font-bold text-blue-950">{activeCandidate.name}</h2><span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full">{activeCandidate.status}</span></div>
                        <p className="text-gray-500 font-medium mt-1">{activeCandidate.title}</p>
                        <p className="text-xs text-blue-600 font-bold mt-2 flex items-center gap-1.5 hover:underline cursor-pointer"><Building2 size={12}/> Provided by {activeCandidate.vendor}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => setIsSchedulerOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"><Calendar size={18} /> Schedule Interview</button>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all"><Mail size={14} /> Email</button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all"><Download size={14} /> Resume</button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-10">
                    <InfoCard label="Location" value={activeCandidate.location} icon={<MapPin size={16}/>} />
                    <InfoCard label="Work Mode" value={activeCandidate.workMode} icon={<Zap size={16}/>} />
                    <InfoCard label="Expectation" value={activeCandidate.expectedSalary} icon={<DollarSign size={16}/>} />
                    <InfoCard label="Availability" value={activeCandidate.availability} icon={<Clock size={16}/>} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-6 flex items-center gap-2"><Award size={14} className="text-blue-600"/> Core Competencies</h3>
                    <div className="flex flex-wrap gap-2">{activeCandidate.skills.map((s, i) => <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-blue-950 font-bold rounded-lg text-xs">{s}</span>)}</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-6 flex items-center gap-2"><Star size={14} className="text-yellow-500"/> Rating</h3>
                    <div className="flex items-center gap-4"><div className="text-4xl font-black text-blue-950">{activeCandidate.rating}</div><div><div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= Math.floor(activeCandidate.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />)}</div><p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Top 5% Talent</p></div></div>
                  </div>
                </div>

                <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                   <div className="flex justify-between items-center mb-6"><h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Resume Preview</h3><button className="text-blue-600 text-xs font-bold flex items-center gap-1">Open <ExternalLink size={12}/></button></div>
                   <div className="aspect-[4/3] bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400"><FileText size={48} strokeWidth={1} className="mb-4" /><p className="text-sm font-medium">Candidate_Resume_{activeCandidate.name.replace(' ','_')}.pdf</p></div>
                </div>
              </motion.div>
            ) : <div className="h-full flex flex-col items-center justify-center text-gray-400"><Users size={64} className="mb-4 opacity-20" /><p className="text-sm font-medium">Select a candidate</p></div>}
          </div>
        </div>
      </div>
      <AnimatePresence>{isSchedulerOpen && <InterviewScheduler candidate={activeCandidate} onClose={() => setIsSchedulerOpen(false)} />}</AnimatePresence>
    </div>
  );
}

function InfoCard({ label, value, icon }) {
  return (
    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
      <div className="text-blue-600 mb-2">{icon}</div>
      <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">{label}</p>
      <p className="text-sm font-bold text-blue-950 mt-0.5">{value}</p>
    </div>
  );
}