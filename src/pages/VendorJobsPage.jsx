import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase, Search, Filter, MapPin, DollarSign, Clock, 
  ChevronDown, Eye, Building2, Users, LayoutGrid, List,
  Calendar, ArrowRight, Tag, Globe, CheckCircle2, Plus, Minus
} from "lucide-react";
import VendorSidebar from "../components/VendorSidebar";

export default function VendorJobsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("table"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  
  // State to track which job's skills are expanded
  const [expandedSkills, setExpandedSkills] = useState({});

  const toggleSkills = (e, id) => {
    e.stopPropagation(); // Prevents the card/row click from navigating
    setExpandedSkills(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  /* ================= 10 PROFESSIONAL DUMMY DATA ENTRIES ================= */
  const jobs = [
    { id: "1", title: "Senior Full Stack Developer", client: "TechCorp Inc.", location: "San Francisco, CA", type: "Full-time", workMode: "Hybrid", experience: "5-8 years", salary: "$120K - $160K", submissions: 12, skills: ["React", "Node.js", "AWS", "TypeScript", "Docker", "Redis", "PostgreSQL"] },
    { id: "2", title: "Lead Product Manager", client: "InnovateLabs", location: "New York, NY", type: "Full-time", workMode: "Remote", experience: "6-10 years", salary: "$140K - $185K", submissions: 8, skills: ["Product Strategy", "Agile", "SaaS", "Jira", "Mixpanel", "Roadmapping"] },
    { id: "3", title: "UX/UI Designer", client: "CloudSystems", location: "Austin, TX", type: "Full-time", workMode: "On-site", experience: "3-5 years", salary: "$95K - $130K", submissions: 6, skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Adobe XD"] },
    { id: "4", title: "Data Scientist", client: "DataVision", location: "Boston, MA", type: "Contract", workMode: "Remote", experience: "4-7 years", salary: "$100 - $120/hr", submissions: 5, skills: ["Python", "PyTorch", "SQL", "TensorFlow", "Pandas", "Scikit-Learn"] },
    { id: "5", title: "DevOps Engineer", client: "SecureNet", location: "Seattle, WA", type: "Full-time", workMode: "Hybrid", experience: "4-7 years", salary: "$130K - $175K", submissions: 15, skills: ["Kubernetes", "Terraform", "CI/CD", "Jenkins", "Azure", "GCP"] },
    { id: "6", title: "Backend Architect", client: "FinStream", location: "Chicago, IL", type: "Full-time", workMode: "Remote", experience: "10+ years", salary: "$180K - $220K", submissions: 4, skills: ["Java", "Microservices", "Kafka", "Spring Boot", "Elasticsearch", "gRPC"] },
    { id: "7", title: "Mobile App Developer", client: "Appify", location: "Los Angeles, CA", type: "Full-time", workMode: "On-site", experience: "3-6 years", salary: "$110K - $150K", submissions: 9, skills: ["Flutter", "Dart", "Firebase", "Kotlin", "Swift", "GraphQL"] },
    { id: "8", title: "QA Automation Engineer", client: "QualityFirst", location: "Denver, CO", type: "Contract", workMode: "Remote", experience: "2-5 years", salary: "$80 - $95/hr", submissions: 11, skills: ["Selenium", "Javascript", "Cypress", "Appium", "Mocha", "Git"] },
    { id: "9", title: "Cybersecurity Analyst", client: "SafeGuard", location: "Washington, DC", type: "Full-time", workMode: "Hybrid", experience: "5-8 years", salary: "$140K - $170K", submissions: 7, skills: ["SIEM", "Pentesting", "CISSP", "Wireshark", "Nmap", "Firewalls"] },
    { id: "10", title: "Solutions Architect", client: "Global Cloud", location: "Atlanta, GA", type: "Full-time", workMode: "Remote", experience: "8-12 years", salary: "$165K - $200K", submissions: 3, skills: ["Azure", "Enterprise Architecture", "Cloud Migration", "NoSQL", "Event-Driven"] },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || job.workMode === activeFilter || job.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <VendorSidebar />

      <div className="flex-1 flex flex-col">
        {/* PROFESSIONAL TOP NAV */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-30 px-10 py-6">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 max-w-[1600px] mx-auto">
            <div>
              <h1 className="text-2xl font-extrabold text-[#020617] tracking-tight">Requirement Pipeline</h1>
              <p className="text-sm text-slate-500 font-medium">Monitoring {jobs.length} active requisitions across your portfolio</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title or company..."
                  className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#020617]/5 focus:border-[#020617] w-72 transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button 
                  onClick={() => setViewMode("table")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "table" ? "bg-white shadow-sm text-[#020617]" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <List className="w-4 h-4" /> Table
                </button>
                <button 
                  onClick={() => setViewMode("kanban")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === "kanban" ? "bg-white shadow-sm text-[#020617]" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <LayoutGrid className="w-4 h-4" /> Cards
                </button>
              </div>
            </div>
          </div>

          {/* QUICK FILTERS BAR */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-slate-400 mr-2" />
            {["All", "Remote", "Hybrid", "On-site", "Full-time", "Contract"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all border ${
                  activeFilter === f 
                  ? "bg-[#020617] text-white border-[#020617]" 
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        <main className="p-10 max-w-[1600px] mx-auto w-full">
          {/* TABLE VIEW */}
          {viewMode === "table" && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Role & Skills</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Client Name</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Logistics</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Submission Volume</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="font-bold text-[#020617] group-hover:text-blue-700 transition-colors">{job.title}</div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.skills.slice(0, 3).map(s => (
                            <span key={s} className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-black uppercase border border-blue-100">{s}</span>
                          ))}
                          {job.skills.length > 3 && (
                            <button 
                              onClick={(e) => toggleSkills(e, job.id)}
                              className="text-[9px] font-black text-blue-600 hover:underline"
                            >
                              {expandedSkills[job.id] ? "Show Less" : `+${job.skills.length - 3} more`}
                            </button>
                          )}
                          {expandedSkills[job.id] && job.skills.slice(3).map(s => (
                            <span key={s} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black uppercase border border-slate-200 animate-in fade-in zoom-in-95">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2.5 text-sm text-slate-700 font-semibold">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 uppercase">
                            {job.client.charAt(0)}
                          </div>
                          {job.client}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-600">
                        <div className="flex items-center gap-2 mb-1"><MapPin className="w-3.5 h-3.5 text-slate-300"/> {job.location}</div>
                        <div className="text-[11px] font-bold text-slate-400 ml-5 uppercase">{job.workMode}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#020617] h-full" style={{width: `${(job.submissions/20)*100}%`}} />
                          </div>
                          <span className="text-sm font-black text-slate-800">{job.submissions}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => navigate(`/vendor/jobs/${job.id}`)} className="bg-slate-50 text-[#020617] hover:bg-[#020617] hover:text-white p-2.5 rounded-xl transition-all shadow-sm">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CARD VIEW (3 PER LINE) */}
          {viewMode === "kanban" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  onClick={() => navigate(`/vendor/jobs/${job.id}`)} 
                  className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#020617] cursor-pointer transition-all flex flex-col group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#020617] opacity-0 group-hover:opacity-100 transition-all" />
                  
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter border border-blue-100">
                      {job.type}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-400">
                      <Clock className="w-3.5 h-3.5" /> {job.experience}
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-[#020617] mb-1 group-hover:text-blue-800 transition-colors leading-snug">{job.title}</h4>
                  <p className="text-sm text-slate-500 font-medium mb-4 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" /> {job.client}
                  </p>

                  {/* SKILLS SECTION IN CARD */}
                  <div className="flex flex-wrap gap-1.5 mb-6 min-h-[32px]">
                    {job.skills.slice(0, 3).map(s => (
                      <span key={s} className="text-[9px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded font-bold uppercase border border-slate-100">{s}</span>
                    ))}
                    {job.skills.length > 3 && (
                      <button 
                        onClick={(e) => toggleSkills(e, job.id)}
                        className="text-[9px] font-black text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded transition-colors"
                      >
                        {expandedSkills[job.id] ? "Less" : `+${job.skills.length - 3} more`}
                      </button>
                    )}
                    {expandedSkills[job.id] && job.skills.slice(3).map(s => (
                      <span key={s} className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase border border-blue-100 animate-in slide-in-from-top-1">{s}</span>
                    ))}
                  </div>
                  
                  <div className="space-y-3 mb-8 bg-slate-50/50 p-4 rounded-2xl">
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-bold">
                      <MapPin className="w-4 h-4 text-slate-300" /> {job.location} • {job.workMode}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#020617] font-black uppercase tracking-wide">
                      <DollarSign className="w-4 h-4 text-slate-300" /> {job.salary}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-3">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-black uppercase">U{i}</div>)}
                      </div>
                      <span className="text-[11px] font-black text-slate-400 ml-2">+{job.submissions} Candidates</span>
                    </div>
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#020617] group-hover:bg-[#020617] group-hover:text-white transition-all shadow-inner">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {filteredJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 bg-white border border-dashed border-slate-200 rounded-3xl">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-[#020617]">No requirements found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search keywords.</p>
              <button onClick={() => setActiveFilter("All")} className="mt-6 text-sm font-black text-blue-700 uppercase tracking-widest hover:underline">Clear all filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}