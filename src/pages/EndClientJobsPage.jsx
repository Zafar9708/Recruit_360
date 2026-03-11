import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Plus, Search, Filter,
  Users, Eye, ArrowRight, RefreshCw, WifiOff
} from "lucide-react";
import EndClientSidebar from "../components/EndClientSidebar";
import CreateJobModal from '../components/Jobs/CreateJobModal';

const API_BASE = "http://localhost:8000";

/* ── Dummy fallback data ─────────────────────────────────────────── */
const DUMMY_JOBS = [
  { id: "d1", title: "Senior Full Stack Developer", department: "Engineering", location: "San Francisco, CA", type: "Full-time", workMode: "Hybrid", experience: "5-8 years", salary: "$140K - $180K", applicants: 45, status: "Active", skills: "React, Node.js, AWS", desc: "Lead our core platform architecture and scale our cloud infrastructure." },
  { id: "d2", title: "Product Manager", department: "Product", location: "New York, NY", type: "Full-time", workMode: "Remote", experience: "4-6 years", salary: "$130K - $160K", applicants: 32, status: "Active", skills: "Agile, SQL, Roadmap", desc: "Drive product vision and coordinate between engineering and stakeholders." },
  { id: "d3", title: "UX Designer", department: "Design", location: "Austin, TX", type: "Full-time", workMode: "On-site", experience: "3-5 years", salary: "$110K - $140K", applicants: 28, status: "Active", skills: "Figma, Research", desc: "Create beautiful, user-centric interfaces for our enterprise suite." },
  { id: "d4", title: "DevOps Engineer", department: "Engineering", location: "Remote", type: "Contract", workMode: "Remote", experience: "5+ years", salary: "$90/hr - $110/hr", applicants: 15, status: "Active", skills: "Docker, Kubernetes, CI/CD", desc: "Optimize our deployment pipelines and manage multi-region clusters." },
  { id: "d5", title: "Marketing Director", department: "Marketing", location: "Chicago, IL", type: "Full-time", workMode: "Hybrid", experience: "10+ years", salary: "$150K - $190K", applicants: 56, status: "Active", skills: "Strategy, SEO, Analytics", desc: "Oversee global marketing campaigns and brand positioning." },
];

/* ── Normalize an API job object → UI shape ──────────────────────── */
function normalizeApiJob(job) {
  // Parse JSON-stringified arrays safely
  const parseArr = (val) => {
    if (Array.isArray(val)) return val;
    try { return JSON.parse(val); } catch { return []; }
  };

  const locations = parseArr(job.locations);
  const skills    = parseArr(job.skills);

  const locationStr = locations.length ? locations.join(", ") : job.work_mode === "Remote" ? "Remote" : "—";

  const salary = (job.min_salary && job.max_salary)
    ? `${job.currency} ${Number(job.min_salary).toLocaleString()} – ${Number(job.max_salary).toLocaleString()} ${job.pay_period ?? ""}`
    : "Not disclosed";

  return {
    id:         String(job.id),
    title:      job.title      || "Untitled Position",
    department: job.department || "General",
    location:   locationStr,
    type:       job.job_type   || "Full-time",
    workMode:   job.work_mode  || "Remote",
    experience: job.experience_level || "Not specified",
    salary,
    applicants: job.applicants  ?? 0,
    status:     job.status      ?? "Active",
    skills:     skills.join(", ") || "See job description",
    desc:       job.summary     || "No summary provided.",
    _raw: job, // keep original for debugging
  };
}

/* ── Normalize CreateJobModal form → API payload ─────────────────── */
function formToApiPayload(formData) {
  return {
    title:                    formData.title,
    department:               formData.department,
    headcount:                Number(formData.headcount) || 1,
    priority:                 formData.priority,
    job_type:                 formData.jobType,
    target_start_date:        formData.targetStartDate  || null,
    closing_date:             formData.closingDate      || null,
    work_mode:                formData.workMode,
    locations:                JSON.stringify(formData.locations),
    travel_required:          formData.travelRequired   || false,
    currency:                 formData.currency,
    pay_period:               formData.payPeriod,
    min_salary:               Number(formData.minSalary)  || 0,
    max_salary:               Number(formData.maxSalary)  || 0,
    salary_negotiable:        formData.salaryNegotiable  || false,
    equity_offered:           formData.equityOffered     || false,
    equity_details:           formData.equityDetails     || "",
    bonus_structure:          formData.bonusStructure    || "",
    benefits:                 formData.benefits          || "",
    experience_level:         formData.experienceLevel,
    skills:                   JSON.stringify(formData.skills),
    education_required:       formData.educationRequired || "",
    languages_required:       formData.languagesRequired || "",
    certifications:           formData.certifications    || "",
    visa_sponsorship:         formData.visaSponsorship   || "",
    background_check_required:formData.backgroundCheckRequired || false,
    summary:                  formData.summary           || "",
    responsibilities:         formData.responsibilities  || "",
    requirements:             formData.requirements      || "",
    nice_to_have:             formData.niceToHave        || "",
    publish_internally:       formData.publishInternally ?? true,
    publish_externally:       formData.publishExternally ?? true,
    external_boards:          JSON.stringify(formData.externalBoards || []),
  };
}

/* ══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function EndClientJobsPage() {
  const navigate = useNavigate();

  // Data state
  const [jobs,       setJobs]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [apiOnline,  setApiOnline]  = useState(true);   // false → showing dummy data
  const [retrying,   setRetrying]   = useState(false);

  // UI state
  const [searchTerm,   setSearchTerm]   = useState("");
  const [showFilters,  setShowFilters]  = useState(false);
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [filters,      setFilters]      = useState({ jobType: "", workMode: "", status: "" });

  /* ── Fetch jobs from API ──────────────────────────────────────── */
  const fetchJobs = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else         setRetrying(true);
    try {
      const res = await fetch(`${API_BASE}/jobs/`, {
        signal: AbortSignal.timeout(5000), // 5-second timeout
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const normalized = data.map(normalizeApiJob);
      setJobs(normalized);
      setApiOnline(true);
    } catch {
      // API unavailable → fall back to dummy data
      setJobs(DUMMY_JOBS);
      setApiOnline(false);
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  /* ── Create job ───────────────────────────────────────────────── */
  const handleCreateJob = async (formData) => {
    const optimistic = {
      id:         `temp-${Date.now()}`,
      title:      formData.title       || "Untitled Position",
      department: formData.department  || "General",
      location:   formData.locations?.join(", ") || (formData.workMode === "Remote" ? "Remote" : "TBD"),
      type:       formData.jobType,
      workMode:   formData.workMode,
      experience: formData.experienceLevel || "Not specified",
      salary:     formData.minSalary && formData.maxSalary
                    ? `${formData.currency} ${Number(formData.minSalary).toLocaleString()} – ${Number(formData.maxSalary).toLocaleString()} ${formData.payPeriod}`
                    : "Not disclosed",
      applicants: 0,
      status:     "Active",
      skills:     (formData.skills || []).join(", ") || "See job description",
      desc:       formData.summary || "No summary provided.",
    };

    // Optimistically add to list
    setJobs(prev => [optimistic, ...prev]);

    if (apiOnline) {
      try {
        const res = await fetch(`${API_BASE}/jobs/`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(formToApiPayload(formData)),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const created = await res.json();
        // Replace optimistic entry with real API response
        setJobs(prev => prev.map(j => j.id === optimistic.id ? normalizeApiJob(created) : j));
      } catch {
        // Keep optimistic entry but mark API offline
        setApiOnline(false);
      }
    }
  };

  /* ── Filtering ────────────────────────────────────────────────── */
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType   = !filters.jobType   || job.type     === filters.jobType;
      const matchesMode   = !filters.workMode  || job.workMode === filters.workMode;
      const matchesStatus = !filters.status    || job.status   === filters.status;
      return matchesSearch && matchesType && matchesMode && matchesStatus;
    });
  }, [searchTerm, filters, jobs]);

  const navigateToJobDetails = (jobId) => navigate(`/end-client/jobs/${jobId}`);
  const navigateToApplicants = (jobId) => navigate(`/end-client/jobs/${jobId}/applicants`);

  /* ══════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════ */
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-blue-950 font-sans">
      <EndClientSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ── Header ── */}
        <header className="h-20 bg-white/90 backdrop-blur-xl border-b border-blue-100 flex items-center shrink-0 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-blue-950">Job Requisitions</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-blue-600 font-medium">{jobs.length} open positions</p>
                {/* API status pill */}
                {!apiOnline && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    <WifiOff size={10}/> Demo data
                  </span>
                )}
                {apiOnline && !loading && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"/> Live
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Retry button when offline */}
              {!apiOnline && (
                <button onClick={() => fetchJobs(true)} disabled={retrying}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-sm font-semibold hover:bg-amber-100 transition-all disabled:opacity-50">
                  <RefreshCw size={14} className={retrying ? "animate-spin" : ""}/>
                  {retrying ? "Retrying…" : "Retry"}
                </button>
              )}
              <button onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-200">
                <Plus size={18}/> New Job
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">

          {/* ── Search & Filters ── */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-2 mb-4 flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400"/>
                <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search jobs by title, department..."
                  className="w-full pl-12 pr-4 py-3 bg-transparent text-blue-950 placeholder-blue-300 outline-none font-medium"/>
              </div>
              <button onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
                  showFilters ? "bg-blue-50 text-blue-600 border border-blue-200" : "text-blue-600 hover:bg-blue-50"
                }`}>
                <Filter size={18}/> Filters
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-4 p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                    {[
                      { label:"Job Type",  key:"jobType",  opts:[["","All Types"],["Full-time","Full-time"],["Contract","Contract"],["Part-time","Part-time"],["Freelance","Freelance"]] },
                      { label:"Work Mode", key:"workMode", opts:[["","All Modes"],["Remote","Remote"],["Hybrid","Hybrid"],["On-site","On-site"]] },
                      { label:"Status",    key:"status",   opts:[["","All Statuses"],["Active","Active"],["Closed","Closed"]] },
                    ].map(({label,key,opts}) => (
                      <div key={key}>
                        <label className="block text-sm font-semibold text-blue-900 mb-2">{label}</label>
                        <select value={filters[key]} onChange={e => setFilters(f=>({...f,[key]:e.target.value}))}
                          className="w-full p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-950 outline-none">
                          {opts.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Loading skeleton ── */}
          {loading && (
            <div className="grid gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm animate-pulse">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl"/>
                    <div className="space-y-2 flex-1">
                      <div className="h-5 bg-blue-100 rounded-lg w-1/3"/>
                      <div className="h-3.5 bg-blue-50 rounded-lg w-1/4"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1,2,3,4].map(j => <div key={j} className="h-14 bg-blue-50 rounded-xl"/>)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Jobs grid ── */}
          {!loading && (
            <div className="grid gap-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-20">
                  <Briefcase className="w-12 h-12 text-blue-200 mx-auto mb-3"/>
                  <p className="text-blue-400 font-semibold">No jobs found matching your filters.</p>
                </div>
              ) : filteredJobs.map(job => (
                <div key={job.id}
                  className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-xl transition-all hover:border-blue-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                        <Briefcase className="w-7 h-7 text-blue-600"/>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-blue-950 group-hover:text-blue-700">{job.title}</h3>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            job.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                          }`}>{job.status}</span>
                        </div>
                        <p className="text-blue-600 font-medium">{job.department} • {job.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">
                        <p className="text-xs font-semibold text-blue-400">Applicants</p>
                        <p className="text-2xl font-black text-blue-950">{job.applicants}</p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); navigateToApplicants(job.id); }}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                        View applicants →
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-6">
                    {[
                      ["Experience", job.experience],
                      ["Salary",     job.salary],
                      ["Type",       job.type],
                      ["Work Mode",  job.workMode],
                    ].map(([label,value]) => (
                      <div key={label} className="p-3 bg-blue-50 rounded-xl">
                        <p className="text-xs font-semibold text-blue-600">{label}</p>
                        <p className="text-sm font-bold text-blue-950 truncate">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-blue-100">
                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                      <Eye className="w-4 h-4"/>
                      <span>Click the button below to view complete details</span>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => navigateToJobDetails(job.id)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-200/50">
                        <Eye size={16}/>
                        View Job Details
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                      </button>
                      <button onClick={e => { e.stopPropagation(); navigateToApplicants(job.id); }}
                        className="flex items-center gap-2 px-6 py-3 border-2 border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                        <Users size={16}/>
                        View Applicants
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateJob}
      />
    </div>
  );
}