import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, User, Briefcase, MapPin, Clock, Upload, Plus, Check,
  ChevronDown, Award, FileText, Link, CheckCircle, Trash2,
  Phone, Mail, Globe, Sparkles, Zap, AlertCircle, ArrowRight,
  Building2, Shield, Search
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════════ */

const STEPS = [
  { id: 1, label: "Upload CV",    sub: "Resume & auto-fill",      icon: Upload    },
  { id: 2, label: "Personal",     sub: "Basic info & contact",    icon: User      },
  { id: 3, label: "Professional", sub: "Role & experience",       icon: Briefcase },
  { id: 4, label: "Skills",       sub: "Tech stack & expertise",  icon: Award     },
  { id: 5, label: "Availability", sub: "Notice & preferences",    icon: Clock     },
];

const ALL_LOCATIONS = [
  "Remote",
  "New York, NY", "San Francisco, CA", "Austin, TX", "Chicago, IL",
  "Seattle, WA", "Los Angeles, CA", "Boston, MA",
  "London, UK", "Berlin, Germany", "Toronto, Canada",
  "Sydney, Australia", "Singapore",
  "Bangalore, India", "Noida, India", "Gurgaon, India",
  "Delhi, India", "Mumbai, India", "Hyderabad, India", "Pune, India",
  "Chennai, India",
];

const EXP_LEVELS = [
  "Fresher (0–1 yr)", "Junior (1–3 yrs)", "Mid-Level (3–5 yrs)",
  "Senior (5–8 yrs)", "Lead (8–12 yrs)", "Principal / Architect (12+ yrs)",
];

const JOB_TITLES = [
  "Full Stack Developer", "Frontend Developer", "Backend Developer",
  "React Developer", "Node.js Developer", "Java Developer", "Python Developer",
  "DevOps Engineer", "Cloud Architect", "Data Scientist", "Data Engineer",
  "ML Engineer", "Mobile Developer", "iOS Developer", "Android Developer",
  "QA Engineer", "Security Engineer", "Database Administrator",
  "Solution Architect", "Product Manager", "UX Designer", "Other",
];

const AVAILABILITY_OPTIONS = [
  "Immediate",
  "Within 15 Days",
  "Within 30 Days",
  "Within 60 Days",
  "60+ Days",
];

const WORK_PREFS = ["Remote", "Hybrid", "On-site", "Any"];

/* ═══════════════════════════════════════════════════════════════
   INITIAL FORM STATE
═══════════════════════════════════════════════════════════════ */
const INIT = {
  // Personal
  firstName: "", lastName: "", email: "", phone: "", linkedIn: "", portfolio: "",
  status: "Available",
  // Professional
  currentTitle: "", customTitle: "", experienceLevel: "",
  totalExperience: "", currentCompany: "",
  workPreference: "Remote",
  // Location — multi-select with custom-add
  selectedLocations: [],   // array of chosen location strings
  locationSearch: "",      // search filter inside the dropdown
  showLocationDrop: false, // dropdown open state
  customLocInput: "",      // typed custom location
  showCustomLocInput: false,
  // Skills
  primarySkills: [], primarySkillInput: "",
  secondarySkills: [], secondarySkillInput: "",
  certifications: [], certInput: "",
  // Availability
  availability: "",
  willingToRelocate: false,
  notes: "",
  // CV
  cvFile: null, cvFileName: "",
};

/* ═══════════════════════════════════════════════════════════════
   MOCK CV PARSER
   Replace body with real API call: POST /api/parse-cv (FormData)
═══════════════════════════════════════════════════════════════ */
async function parseCV(/* file */) {
  await new Promise(r => setTimeout(r, 2400));
  return {
    firstName: "Rahul",        lastName: "Sharma",
    email: "rahul.sharma@email.com", phone: "+91 98765 43210",
    linkedIn: "linkedin.com/in/rahulsharma",
    currentTitle: "Data Engineer",  totalExperience: "5",
    experienceLevel: "Mid-Level (3–5 yrs)",
    currentCompany: "Infosys Ltd.", workPreference: "Hybrid",
    selectedLocations: ["Noida, India", "Delhi, India"],
    primarySkills: ["Apache Spark", "Hadoop", "Python", "SQL", "Kafka"],
    secondarySkills: ["AWS", "Docker", "Airflow", "dbt"],
    certifications: ["AWS Certified Data Analytics"],
    availability: "Within 15 Days",
    status: "Available",
  };
}

/* ═══════════════════════════════════════════════════════════════
   DESIGN ATOMS — matching the app's existing template UI
═══════════════════════════════════════════════════════════════ */
const cx = (...a) => a.filter(Boolean).join(" ");

/* Field wrapper — same style as CreateJobModal */
function Field({ label, required, optional, children, className = "" }) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-500">
          {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
        </span>
        {optional && (
          <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            optional
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/* Input — matches CreateJobModal */
function Input({ icon: Icon, className = "", ...p }) {
  const base = cx(
    "w-full h-11 px-3.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900",
    "text-sm font-medium placeholder-gray-400 outline-none transition-all",
    "hover:border-gray-300 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
    Icon && "pl-9"
  );
  if (Icon) return (
    <div className="relative">
      <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input {...p} className={cx(base, className)} />
    </div>
  );
  return <input {...p} className={cx(base, className)} />;
}

/* Select — matches CreateJobModal */
function Sel({ children, className = "", ...p }) {
  return (
    <div className="relative">
      <select {...p} className={cx(
        "w-full h-11 px-3.5 pr-9 rounded-lg border border-gray-200 bg-gray-50 text-gray-900",
        "text-sm font-medium outline-none appearance-none transition-all cursor-pointer",
        "hover:border-gray-300 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
        className
      )}>
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

/* Textarea */
function Textarea({ className = "", ...p }) {
  return (
    <textarea {...p} rows={p.rows || 3} className={cx(
      "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900",
      "text-sm font-medium placeholder-gray-400 outline-none resize-none transition-all",
      "hover:border-gray-300 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
      className
    )} />
  );
}

/* Toggle — identical to CreateJobModal */
function Toggle({ label, hint, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 py-2.5 px-3.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 cursor-pointer transition-all group">
      <div>
        <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{label}</p>
        {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
      </div>
      <div onClick={() => onChange(!checked)}
        className={cx("relative w-10 h-[22px] rounded-full transition-all duration-300 flex-shrink-0 cursor-pointer",
          checked ? "bg-blue-500" : "bg-gray-300")}>
        <span className={cx("absolute top-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300",
          checked ? "left-[22px]" : "left-[3px]")} />
      </div>
    </label>
  );
}

/* Chip — same as CreateJobModal */
function Chip({ label, selected, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={cx(
        "flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all",
        selected
          ? "bg-blue-500 text-white border-blue-500 shadow-sm shadow-blue-200"
          : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
      )}>
      {selected && <Check size={11} />}{label}
    </button>
  );
}

/* Tag pill */
function Tag({ label, onRemove, color = "blue" }) {
  const c = {
    blue:  "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    violet:"bg-violet-50 text-violet-700 border-violet-200",
  };
  return (
    <span className={cx("inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-md border text-[11px] font-semibold", c[color])}>
      {label}
      <button type="button" onClick={() => onRemove(label)}
        className="w-3.5 h-3.5 flex items-center justify-center rounded-full hover:bg-black/10 opacity-60 hover:opacity-100 transition-all">
        <X size={8} />
      </button>
    </span>
  );
}

/* Tag Input (skills / certs) */
function TagInput({ tags, onAdd, onRemove, val, onChange, placeholder, color = "blue" }) {
  return (
    <div>
      <div className="flex gap-2">
        <Input value={val} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); onAdd(); } }} />
        <button type="button" onClick={onAdd}
          className="w-11 h-11 flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0 transition-all">
          <Plus size={15} />
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {tags.map(t => <Tag key={t} label={t} onRemove={onRemove} color={color} />)}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOCATION MULTI-SELECT DROPDOWN
═══════════════════════════════════════════════════════════════ */
function LocationSelector({ f, s }) {
  const dropRef = useRef(null);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        s("showLocationDrop", false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = ALL_LOCATIONS.filter(l =>
    l.toLowerCase().includes(f.locationSearch.toLowerCase())
  );

  const toggle = (loc) => {
    if (f.selectedLocations.includes(loc)) {
      s("selectedLocations", f.selectedLocations.filter(x => x !== loc));
    } else {
      s("selectedLocations", [...f.selectedLocations, loc]);
    }
  };

  const addCustom = () => {
    const v = f.customLocInput.trim();
    if (v && !f.selectedLocations.includes(v)) {
      s("selectedLocations", [...f.selectedLocations, v]);
    }
    s("customLocInput", "");
    s("showCustomLocInput", false);
  };

  return (
    <div className="relative" ref={dropRef}>
      {/* Trigger */}
      <button type="button"
        onClick={() => s("showLocationDrop", !f.showLocationDrop)}
        className={cx(
          "w-full h-11 px-3.5 pr-9 rounded-lg border text-sm font-medium text-left transition-all flex items-center",
          f.showLocationDrop
            ? "border-blue-500 bg-white ring-2 ring-blue-100"
            : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white text-gray-400"
        )}>
        {f.selectedLocations.length > 0 ? (
          <span className="text-gray-900 truncate">
            {f.selectedLocations.length === 1
              ? f.selectedLocations[0]
              : `${f.selectedLocations[0]} +${f.selectedLocations.length - 1} more`}
          </span>
        ) : (
          <span className="text-gray-400">Select locations…</span>
        )}
        <ChevronDown size={14} className={cx(
          "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform",
          f.showLocationDrop && "rotate-180"
        )} />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {f.showLocationDrop && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ transformOrigin: "top" }}
            className="absolute z-50 top-12 left-0 right-0 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden"
          >
            {/* Search inside dropdown */}
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  value={f.locationSearch}
                  onChange={e => s("locationSearch", e.target.value)}
                  placeholder="Search locations…"
                  className="w-full h-9 pl-8 pr-3 text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-48 overflow-y-auto py-1">
              {filtered.map(loc => {
                const selected = f.selectedLocations.includes(loc);
                return (
                  <button key={loc} type="button" onClick={() => toggle(loc)}
                    className={cx(
                      "w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-left transition-colors",
                      selected ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    )}>
                    <span>{loc}</span>
                    {selected && <Check size={13} className="text-blue-500 flex-shrink-0" />}
                  </button>
                );
              })}
              {filtered.length === 0 && !f.locationSearch && (
                <p className="px-3.5 py-3 text-xs text-gray-400 text-center">No locations found</p>
              )}
              {/* "Add custom" option when search has text not in list */}
              {f.locationSearch && !ALL_LOCATIONS.some(l => l.toLowerCase() === f.locationSearch.toLowerCase()) && (
                <button type="button"
                  onClick={() => {
                    const v = f.locationSearch.trim();
                    if (v && !f.selectedLocations.includes(v)) s("selectedLocations", [...f.selectedLocations, v]);
                    s("locationSearch", "");
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100">
                  <Plus size={13} />Add "{f.locationSearch}"
                </button>
              )}
            </div>

            {/* Footer: manual add */}
            <div className="border-t border-gray-100 p-2">
              {!f.showCustomLocInput ? (
                <button type="button"
                  onClick={() => s("showCustomLocInput", true)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Plus size={12} />Add custom location
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    autoFocus
                    value={f.customLocInput}
                    onChange={e => s("customLocInput", e.target.value)}
                    placeholder="Type location & press Enter…"
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }}
                    className="flex-1 h-9 px-3 text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:bg-white transition-all"
                  />
                  <button type="button" onClick={addCustom}
                    className="px-3 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all flex-shrink-0">
                    Add
                  </button>
                  <button type="button" onClick={() => { s("showCustomLocInput", false); s("customLocInput", ""); }}
                    className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                    <X size={13} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected tags shown below */}
      {f.selectedLocations.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {f.selectedLocations.map(l => (
            <Tag key={l} label={l} color="violet"
              onRemove={loc => s("selectedLocations", f.selectedLocations.filter(x => x !== loc))} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 1 — UPLOAD CV
═══════════════════════════════════════════════════════════════ */
function StepUpload({ f, s, onExtracted, extracting, setExtracting, extractDone, setExtractDone }) {
  const fileRef  = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error,    setError]    = useState("");

  const ALLOWED = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFile = async (file) => {
    if (!file) return;
    if (!ALLOWED.includes(file.type)) { setError("Please upload a PDF or Word (.doc / .docx) file."); return; }
    setError("");
    s("cvFile", file);
    s("cvFileName", file.name);
    setExtracting(true);
    setExtractDone(false);
    try {
      const data = await parseCV(file);
      onExtracted(data);
      setExtractDone(true);
    } catch {
      setError("Could not auto-parse CV. You can still fill the form manually.");
    } finally {
      setExtracting(false);
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    s("cvFile", null); s("cvFileName", "");
    setExtractDone(false); setError("");
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => !f.cvFile && fileRef.current?.click()}
        className={cx(
          "relative rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden",
          f.cvFile
            ? "border-emerald-300 bg-emerald-50/60 cursor-default"
            : dragOver
              ? "border-blue-500 bg-blue-50 cursor-copy"
              : "border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer"
        )}>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
          onChange={e => handleFile(e.target.files[0])} />

        {!f.cvFile ? (
          <div className="flex flex-col items-center justify-center py-14 px-8 text-center">
            <motion.div
              animate={dragOver ? { scale: 1.12, rotate: 4 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-5 shadow-lg shadow-blue-200">
              <Upload size={34} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-2">
              {dragOver ? "Release to upload!" : "Upload Candidate CV"}
            </h3>
            <p className="text-sm text-gray-500 mb-5 max-w-sm leading-relaxed">
              Drop a PDF or Word document here. Our{" "}
              <span className="font-bold text-blue-600 inline-flex items-center gap-1">
                <Sparkles size={12} />AI parser
              </span>{" "}
              will auto-fill every form field instantly.
            </p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {["PDF", "DOC", "DOCX"].map(fmt => (
                <span key={fmt} className="px-3.5 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs font-bold rounded-lg shadow-sm">{fmt}</span>
              ))}
              <span className="text-xs text-gray-400 font-medium">· up to 10 MB</span>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* File row */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white border-2 border-emerald-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <FileText size={24} className="text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-extrabold text-gray-800 truncate">{f.cvFileName}</p>
                {f.cvFile?.size && <p className="text-xs text-gray-400 mt-0.5 font-medium">{(f.cvFile.size / 1024).toFixed(0)} KB</p>}
              </div>
              <button type="button" onClick={removeFile}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-red-200 text-red-400 hover:bg-red-50 hover:border-red-300 transition-all flex-shrink-0">
                <Trash2 size={15} />
              </button>
            </div>

            {/* Parsing progress */}
            {extracting && (
              <div className="bg-white rounded-xl border border-blue-100 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={16} className="text-white animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">AI is reading your CV…</p>
                    <p className="text-xs text-gray-400">Extracting name, skills, experience & more</p>
                  </div>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden mb-3">
                  <motion.div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    initial={{ width: "0%" }} animate={{ width: "88%" }}
                    transition={{ duration: 2.2, ease: "easeOut" }} />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["Personal info", "Work history", "Skills", "Availability"].map((item, i) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }} />
                      <span className="text-[10px] text-gray-400 font-semibold truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Success */}
            {extractDone && !extracting && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-emerald-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-extrabold text-emerald-700">CV parsed successfully!</p>
                    <p className="text-xs text-gray-500 mt-0.5">Fields have been auto-filled. Review on the next steps.</p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {["Name", "Email", "Phone", "Title", "Company", "Skills", "Location", "Availability"].map(f => (
                        <span key={f} className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold rounded-md">
                          <Check size={8} />{f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-semibold">
          <AlertCircle size={15} className="flex-shrink-0" />{error}
        </motion.div>
      )}

      {!f.cvFile && (
        <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg">
          <Zap size={15} className="text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-700 font-semibold">
            No CV? Click <strong>Continue</strong> below to fill the form manually.
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 2 — PERSONAL
═══════════════════════════════════════════════════════════════ */
function StepPersonal({ f, s }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name" required>
          <Input icon={User} value={f.firstName} onChange={e => s("firstName", e.target.value)} placeholder="e.g. John" />
        </Field>
        <Field label="Last Name" required>
          <Input value={f.lastName} onChange={e => s("lastName", e.target.value)} placeholder="e.g. Smith" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Email Address" required>
          <Input icon={Mail} type="email" value={f.email} onChange={e => s("email", e.target.value)} placeholder="john@example.com" />
        </Field>
        <Field label="Phone Number" required>
          <Input icon={Phone} type="tel" value={f.phone} onChange={e => s("phone", e.target.value)} placeholder="+91 98765 43210" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="LinkedIn Profile" optional>
          <Input icon={Link} value={f.linkedIn} onChange={e => s("linkedIn", e.target.value)} placeholder="linkedin.com/in/username" />
        </Field>
        <Field label="Portfolio / GitHub" optional>
          <Input icon={Globe} value={f.portfolio} onChange={e => s("portfolio", e.target.value)} placeholder="github.com/username" />
        </Field>
      </div>

      <Field label="Bench Status">
        <div className="flex gap-2 flex-wrap">
          {[
            { v: "Available",  dot: "bg-emerald-400" },
            { v: "In Process", dot: "bg-amber-400" },
            { v: "Placed",     dot: "bg-blue-400" },
          ].map(({ v, dot }) => (
            <button key={v} type="button" onClick={() => s("status", v)}
              className={cx(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all",
                f.status === v
                  ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}>
              <span className={cx("w-2 h-2 rounded-full flex-shrink-0", f.status === v ? "bg-white" : dot)} />
              {v}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 3 — PROFESSIONAL
═══════════════════════════════════════════════════════════════ */
function StepProfessional({ f, s }) {
  return (
    <div className="space-y-5">
      <Field label="Current Job Title" required>
        <Sel value={f.currentTitle} onChange={e => { s("currentTitle", e.target.value); if (e.target.value !== "Other") s("customTitle", ""); }}>
          <option value="">Select a title…</option>
          {JOB_TITLES.map(t => <option key={t}>{t}</option>)}
        </Sel>
      </Field>

      <AnimatePresence>
        {f.currentTitle === "Other" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <Field label="Custom Title" required>
              <Input value={f.customTitle} onChange={e => s("customTitle", e.target.value)} placeholder="Enter exact job title…" autoFocus />
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Experience Level" required>
          <Sel value={f.experienceLevel} onChange={e => s("experienceLevel", e.target.value)}>
            <option value="">Select level…</option>
            {EXP_LEVELS.map(l => <option key={l}>{l}</option>)}
          </Sel>
        </Field>
        <Field label="Total Experience" required>
          <div className="relative">
            <Input type="number" min="0" max="50" value={f.totalExperience}
              onChange={e => s("totalExperience", e.target.value)} placeholder="e.g. 5" className="pr-14" />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold pointer-events-none">years</span>
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Current / Last Company" optional>
          <Input icon={Building2} value={f.currentCompany} onChange={e => s("currentCompany", e.target.value)} placeholder="e.g. Infosys, TCS" />
        </Field>
        <Field label="Work Preference">
          <Sel value={f.workPreference} onChange={e => s("workPreference", e.target.value)}>
            {WORK_PREFS.map(p => <option key={p}>{p}</option>)}
          </Sel>
        </Field>
      </div>

      <Field label="Current Location(s)" required>
        <LocationSelector f={f} s={s} />
      </Field>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 4 — SKILLS
═══════════════════════════════════════════════════════════════ */
function StepSkills({ f, s }) {
  const addPrimary   = () => { const v = f.primarySkillInput.trim();   if (v && !f.primarySkills.includes(v))   s("primarySkills",   [...f.primarySkills, v]);   s("primarySkillInput", ""); };
  const addSecondary = () => { const v = f.secondarySkillInput.trim(); if (v && !f.secondarySkills.includes(v)) s("secondarySkills", [...f.secondarySkills, v]); s("secondarySkillInput", ""); };
  const addCert      = () => { const v = f.certInput.trim();           if (v && !f.certifications.includes(v))  s("certifications",  [...f.certifications, v]);   s("certInput", ""); };

  return (
    <div className="space-y-6">
      {/* Primary skills */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
            <Zap size={13} className="text-white" />
          </div>
          <p className="text-sm font-bold text-blue-900">Primary / Core Skills</p>
          <span className="ml-auto text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Required</span>
        </div>
        <p className="text-xs text-blue-600/70 mb-3">Main technologies the candidate specialises in</p>
        <TagInput tags={f.primarySkills} onAdd={addPrimary}
          onRemove={sk => s("primarySkills", f.primarySkills.filter(x => x !== sk))}
          val={f.primarySkillInput} onChange={v => s("primarySkillInput", v)}
          placeholder="React, Java, Python, AWS… press Enter" color="blue" />
      </div>

      {/* Secondary skills */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Award size={13} className="text-white" />
          </div>
          <p className="text-sm font-bold text-emerald-900">Secondary / Supporting Skills</p>
          <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Optional</span>
        </div>
        <p className="text-xs text-emerald-600/70 mb-3">Frameworks, tools, methodologies</p>
        <TagInput tags={f.secondarySkills} onAdd={addSecondary}
          onRemove={sk => s("secondarySkills", f.secondarySkills.filter(x => x !== sk))}
          val={f.secondarySkillInput} onChange={v => s("secondarySkillInput", v)}
          placeholder="Docker, Agile, SQL, Jira… press Enter" color="green" />
      </div>

      {/* Certifications */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
            <Shield size={13} className="text-white" />
          </div>
          <p className="text-sm font-bold text-amber-900">Certifications</p>
          <span className="ml-auto text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Optional</span>
        </div>
        <p className="text-xs text-amber-600/70 mb-3">AWS, Azure, PMP, Scrum Master, etc.</p>
        <TagInput tags={f.certifications} onAdd={addCert}
          onRemove={c => s("certifications", f.certifications.filter(x => x !== c))}
          val={f.certInput} onChange={v => s("certInput", v)}
          placeholder="AWS Solutions Architect, PMP… press Enter" color="amber" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 5 — AVAILABILITY
═══════════════════════════════════════════════════════════════ */
function StepAvailability({ f, s }) {
  return (
    <div className="space-y-5">
      {/* Availability dropdown */}
      <Field label="Availability / Notice Period" required>
        <Sel value={f.availability} onChange={e => s("availability", e.target.value)}>
          <option value="">Select availability…</option>
          {AVAILABILITY_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
        </Sel>
      </Field>

      {/* Willing to relocate */}
      <Toggle
        label="Willing to Relocate"
        hint="Candidate is open to relocating for the right opportunity"
        checked={f.willingToRelocate}
        onChange={v => s("willingToRelocate", v)}
      />

      {/* Internal notes */}
      <Field label="Internal Notes" optional>
        <Textarea rows={4} value={f.notes} onChange={e => s("notes", e.target.value)}
          placeholder="Preferred timezone, interview availability, referral source, bench since date, any special requirements…" />
      </Field>

      {/* Summary preview */}
      <div>
        <p className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5">
          <Sparkles size={11} className="text-amber-400" /> Candidate summary
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          {[
            ["Name",         [f.firstName, f.lastName].filter(Boolean).join(" ") || "—"],
            ["Title",        f.currentTitle === "Other" ? (f.customTitle || "—") : (f.currentTitle || "—")],
            ["Experience",   f.totalExperience ? `${f.totalExperience} years` : "—"],
            ["Location",     f.selectedLocations.length ? f.selectedLocations.slice(0, 2).join(", ") + (f.selectedLocations.length > 2 ? ` +${f.selectedLocations.length - 2}` : "") : "—"],
            ["Availability", f.availability || "—"],
            ["Skills",       f.primarySkills.length ? `${f.primarySkills.length} listed` : "—"],
            ["Status",       f.status || "—"],
            ["CV",           f.cvFileName || "Not uploaded"],
          ].map(([k, v], i) => (
            <div key={k} className={cx("flex items-center px-4 py-2.5 gap-3", i % 2 === 0 ? "bg-gray-50" : "bg-white")}>
              <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider w-24 flex-shrink-0">{k}</span>
              <span className="text-sm font-semibold text-gray-800 truncate">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN MODAL
═══════════════════════════════════════════════════════════════ */
const PANELS = { 2: StepPersonal, 3: StepProfessional, 4: StepSkills, 5: StepAvailability };

export default function AddCandidateModal({ isOpen, onClose, onSubmit }) {
  const [step,        setStep]        = useState(1);
  const [form,        setForm]        = useState(INIT);
  const [dir,         setDir]         = useState(1);
  const [submitting,  setSubmitting]  = useState(false);
  const [extracting,  setExtracting]  = useState(false);
  const [extractDone, setExtractDone] = useState(false);

  const s  = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const go = (next) => { setDir(next > step ? 1 : -1); setStep(next); };

  const handleClose = () => {
    if (submitting || extracting) return;
    setStep(1); setDir(1); setForm(INIT);
    setExtracting(false); setExtractDone(false);
    onClose();
  };

  const onExtracted = (data) => {
    setForm(prev => ({
      ...prev,
      firstName:         data.firstName         || prev.firstName,
      lastName:          data.lastName          || prev.lastName,
      email:             data.email             || prev.email,
      phone:             data.phone             || prev.phone,
      linkedIn:          data.linkedIn          || prev.linkedIn,
      currentTitle:      JOB_TITLES.includes(data.currentTitle) ? data.currentTitle : (data.currentTitle ? "Other" : prev.currentTitle),
      customTitle:       !JOB_TITLES.includes(data.currentTitle) ? (data.currentTitle || "") : "",
      totalExperience:   data.totalExperience   || prev.totalExperience,
      experienceLevel:   data.experienceLevel   || prev.experienceLevel,
      currentCompany:    data.currentCompany    || prev.currentCompany,
      workPreference:    data.workPreference     || prev.workPreference,
      selectedLocations: data.selectedLocations?.length ? data.selectedLocations : prev.selectedLocations,
      primarySkills:     data.primarySkills?.length     ? data.primarySkills     : prev.primarySkills,
      secondarySkills:   data.secondarySkills?.length   ? data.secondarySkills   : prev.secondarySkills,
      certifications:    data.certifications?.length    ? data.certifications    : prev.certifications,
      availability:      data.availability      || prev.availability,
      status:            data.status            || prev.status,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const candidate = {
        id:             String(Date.now()),
        name:           `${form.firstName} ${form.lastName}`.trim(),
        title:          form.currentTitle === "Other" ? form.customTitle : form.currentTitle,
        skills:         [...form.primarySkills, ...form.secondarySkills],
        experience:     Number(form.totalExperience) || 0,
        location:       form.selectedLocations.length ? form.selectedLocations[0] : "—",
        rate:           "Negotiable",
        availability:   form.availability,
        lastUpdated:    new Date().toISOString().split("T")[0],
        status:         form.status,
        isVerified:     false,
        isActive:       true,
        rating:         0,
        email:          form.email,
        phone:          form.phone,
        linkedIn:       form.linkedIn,
        certifications: form.certifications,
        workPreference: form.workPreference,
        notes:          form.notes,
        cvFile:         form.cvFile,
        cvFileName:     form.cvFileName,
      };
      await new Promise(r => setTimeout(r, 500));
      if (onSubmit) onSubmit(candidate);
      handleClose();
    } finally {
      setSubmitting(false);
    }
  };

  const current = STEPS[step - 1];
  const pct     = ((step - 1) / (STEPS.length - 1)) * 100;
  const Panel   = PANELS[step];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative flex w-full max-w-[900px] rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxHeight: "92vh" }}
          >

            {/* ══ LEFT SIDEBAR — identical style to CreateJobModal ══ */}
            <div className="w-[220px] flex-shrink-0 bg-[#0f172a] flex flex-col">
              {/* Brand */}
              <div className="px-6 pt-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-extrabold text-white tracking-tight">Add Candidate</span>
                </div>
                <p className="text-[11px] text-white/40 mt-1 font-medium">{step} of {STEPS.length} steps</p>
              </div>

              {/* Steps */}
              <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {STEPS.map(st => {
                  const Icon   = st.icon;
                  const done   = step > st.id;
                  const active = step === st.id;
                  return (
                    <button key={st.id} type="button" onClick={() => go(st.id)}
                      className={cx(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group",
                        active  ? "bg-white/10 text-white"
                          : done ? "text-white/60 hover:bg-white/5 hover:text-white"
                            :      "text-white/30 hover:bg-white/5 hover:text-white/60"
                      )}>
                      <div className={cx(
                        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                        active ? "bg-blue-500" : done ? "bg-emerald-500/20" : "bg-white/5"
                      )}>
                        {done
                          ? <Check size={13} className="text-emerald-400" />
                          : <Icon  size={13} className={active ? "text-white" : "text-current"} />
                        }
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-bold leading-none truncate">{st.label}</p>
                        <p className={cx("text-[10px] mt-0.5 truncate", active ? "text-white/50" : "text-current opacity-70")}>{st.sub}</p>
                      </div>
                      {active && <div className="ml-auto w-1 h-6 bg-blue-400 rounded-full flex-shrink-0" />}
                    </button>
                  );
                })}
              </nav>

              {/* Progress */}
              <div className="px-6 pb-6">
                <div className="flex justify-between text-[10px] text-white/30 font-semibold mb-1.5">
                  <span>Progress</span>
                  <span>{Math.round(pct)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    animate={{ width: `${pct}%` }} transition={{ type: "spring", damping: 20 }} />
                </div>
              </div>
            </div>

            {/* ══ RIGHT CONTENT ══ */}
            <div className="flex-1 flex flex-col bg-white min-w-0">

              {/* Header */}
              <div className="flex items-start justify-between px-8 pt-7 pb-5 border-b border-gray-100 flex-shrink-0">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 leading-tight">{current.label}</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{current.sub}</p>
                </div>
                <button onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-all flex-shrink-0 mt-0.5">
                  <X size={15} />
                </button>
              </div>

              {/* Scrollable form */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div key={step} custom={dir}
                    initial={d => ({ opacity: 0, x: d * 20 })}
                    animate={{ opacity: 1, x: 0 }}
                    exit={d => ({ opacity: 0, x: d * -20 })}
                    transition={{ duration: 0.2, ease: "easeInOut" }}>
                    {step === 1 ? (
                      <StepUpload
                        f={form} s={s}
                        onExtracted={onExtracted}
                        extracting={extracting}   setExtracting={setExtracting}
                        extractDone={extractDone} setExtractDone={setExtractDone}
                      />
                    ) : (
                      <Panel f={form} s={s} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between flex-shrink-0 bg-gray-50/70">
                <button type="button"
                  onClick={() => step === 1 ? handleClose() : go(step - 1)}
                  disabled={submitting || extracting}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-40">
                  {step === 1 ? "Cancel" : "← Back"}
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5">
                  {STEPS.map(st => (
                    <button key={st.id} type="button" onClick={() => go(st.id)}
                      className={cx("rounded-full transition-all duration-300",
                        st.id === step  ? "w-5 h-2 bg-gray-800"
                          : st.id < step ? "w-2 h-2 bg-emerald-400"
                            :              "w-2 h-2 bg-gray-300")} />
                  ))}
                </div>

                {step < STEPS.length ? (
                  <button type="button" onClick={() => go(step + 1)}
                    disabled={extracting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 transition-all shadow-sm disabled:opacity-40">
                    {step === 1 && extractDone && <Sparkles size={13} className="text-cyan-400" />}
                    Continue <ArrowRight size={14} />
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} disabled={submitting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-md shadow-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>Saving…
                      </>
                    ) : (
                      <><CheckCircle size={15} /> Add to Bench</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}