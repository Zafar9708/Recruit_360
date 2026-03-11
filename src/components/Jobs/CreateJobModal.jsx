import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Briefcase, MapPin, DollarSign, Award,
  FileText, Globe, Plus, ChevronDown,
  CheckCircle, Sparkles, Building2,
  Star, Shield, ArrowRight, Check
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════════════ */

const DEPARTMENTS = ["Engineering","Product","Design","Marketing","Sales","Operations","Finance","HR","Legal","Customer Success"];
const JOB_TYPES   = ["Full-time","Part-time","Contract","Freelance","Internship","Temporary"];
const WORK_MODES  = ["Remote","Hybrid","On-site"];
const EXP_LEVELS  = ["Entry Level (0–2 yrs)","Mid Level (2–5 yrs)","Senior (5–8 yrs)","Lead (8–12 yrs)","Principal / Staff (12+ yrs)","Executive"];
const CURRENCIES  = ["USD","EUR","GBP","INR","CAD","AUD"];
const PAY_PERIODS = ["per year","per month","per hour"];
const PRIORITIES  = ["Low","Medium","High","Urgent"];
const EDUCATION   = ["No specific requirement","High School Diploma","Associate Degree","Bachelor's Degree","Master's Degree","PhD"];
const PRESET_LOCS = ["Remote","New York, NY","San Francisco, CA","Austin, TX","Chicago, IL","Seattle, WA","Los Angeles, CA","Boston, MA","London, UK","Berlin, Germany","Toronto, Canada","Sydney, Australia","Singapore","Bangalore, India","Other"];

const STEPS = [
  { id:1, key:"basics",       label:"Basics",       sub:"Role & schedule",        icon: Briefcase  },
  { id:2, key:"location",     label:"Location",     sub:"Where & work mode",      icon: MapPin     },
  { id:3, key:"compensation", label:"Compensation", sub:"Salary & perks",         icon: DollarSign },
  { id:4, key:"requirements", label:"Requirements", sub:"Skills & qualifications", icon: Award      },
  { id:5, key:"description",  label:"Description",  sub:"Job content",            icon: FileText   },
  { id:6, key:"publish",      label:"Publish",      sub:"Review & go live",       icon: Globe      },
];

const INIT = {
  title:"", department:"", headcount:"1", priority:"Medium",
  jobType:"Full-time", targetStartDate:"", closingDate:"",
  workMode:"Hybrid", locations:[], customLocation:"", showCustom:false, travelRequired:false,
  currency:"USD", payPeriod:"per year", minSalary:"", maxSalary:"",
  salaryNegotiable:false, equityOffered:false, equityDetails:"", bonusStructure:"", benefits:"",
  experienceLevel:"", skills:[], skillInput:"",
  educationRequired:"No specific requirement", languagesRequired:"",
  certifications:"", visaSponsorship:"", backgroundCheckRequired:false,
  summary:"", responsibilities:"", requirements:"", niceToHave:"",
  publishInternally:true, publishExternally:true, externalBoards:[], boardInput:"",
};

/* ── API payload mapper ─────────────────────────────────────────── */
function toApiPayload(f) {
  return {
    title:                     f.title,
    department:                f.department,
    headcount:                 Number(f.headcount) || 1,
    priority:                  f.priority,
    job_type:                  f.jobType,
    target_start_date:         f.targetStartDate  || null,
    closing_date:              f.closingDate      || null,
    work_mode:                 f.workMode,
    locations:                 f.locations,                        // array — API expects array
    travel_required:           f.travelRequired   || false,
    currency:                  f.currency,
    pay_period:                f.payPeriod,
    min_salary:                Number(f.minSalary) || 0,
    max_salary:                Number(f.maxSalary) || 0,
    salary_negotiable:         f.salaryNegotiable  || false,
    equity_offered:            f.equityOffered     || false,
    equity_details:            f.equityDetails     || "",
    bonus_structure:           f.bonusStructure    || "",
    benefits:                  f.benefits          || "",
    experience_level:          f.experienceLevel   || "",
    skills:                    f.skills,                           // array — API expects array
    education_required:        f.educationRequired || "",
    languages_required:        f.languagesRequired || "",
    certifications:            f.certifications    || "",
    visa_sponsorship:          f.visaSponsorship   || "",
    background_check_required: f.backgroundCheckRequired || false,
    summary:                   f.summary           || "",
    responsibilities:          f.responsibilities  || "",
    requirements:              f.requirements      || "",
    nice_to_have:              f.niceToHave        || "",
    publish_internally:        f.publishInternally ?? true,
    publish_externally:        f.publishExternally ?? true,
    external_boards:           f.externalBoards    || [],          // array — API expects array
  };
}

/* ══════════════════════════════════════════════════════════════════
   PRIMITIVE ATOMS  (unchanged)
══════════════════════════════════════════════════════════════════ */

const cx = (...a) => a.filter(Boolean).join(" ");

function Field({ label, required, optional, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-500">
          {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
        </span>
        {optional && (
          <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">optional</span>
        )}
      </div>
      {children}
    </div>
  );
}

function Input({ className="", ...p }) {
  return (
    <input {...p} className={cx(
      "w-full h-11 px-3.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900",
      "text-sm font-medium placeholder-gray-400 outline-none transition-all",
      "hover:border-gray-300 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
      className
    )}/>
  );
}

function Select({ children, className="", ...p }) {
  return (
    <div className="relative">
      <select {...p} className={cx(
        "w-full h-11 px-3.5 pr-9 rounded-lg border border-gray-200 bg-gray-50 text-gray-900",
        "text-sm font-medium outline-none appearance-none transition-all",
        "hover:border-gray-300 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
        className
      )}>
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
    </div>
  );
}

function Textarea({ className="", ...p }) {
  return (
    <textarea {...p} rows={p.rows||4} className={cx(
      "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900",
      "text-sm font-medium placeholder-gray-400 outline-none resize-none transition-all",
      "hover:border-gray-300 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
      className
    )}/>
  );
}

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
          checked ? "left-[22px]" : "left-[3px]")}/>
      </div>
    </label>
  );
}

function Chip({ label, selected, onClick, color="blue" }) {
  const colors = {
    blue:   selected ? "bg-blue-500 text-white border-blue-500 shadow-sm shadow-blue-200"       : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600",
    violet: selected ? "bg-violet-500 text-white border-violet-500 shadow-sm shadow-violet-200" : "bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-600",
  };
  return (
    <button type="button" onClick={onClick}
      className={cx("flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all", colors[color])}>
      {selected && <Check size={11}/>}
      {label}
    </button>
  );
}

function Tag({ label, onRemove, color="blue" }) {
  const c = {
    blue:   "bg-blue-50    text-blue-700   border-blue-200",
    violet: "bg-violet-50  text-violet-700 border-violet-200",
    green:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  return (
    <span className={cx("inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-md border text-[11px] font-semibold", c[color])}>
      {label}
      <button type="button" onClick={() => onRemove(label)}
        className="w-3.5 h-3.5 flex items-center justify-center rounded-full hover:bg-black/10 opacity-60 hover:opacity-100 transition-all">
        <X size={8}/>
      </button>
    </span>
  );
}

function TagInput({ tags, onAdd, onRemove, val, onChange, placeholder, color="blue" }) {
  return (
    <div>
      <div className="flex gap-2">
        <Input value={val} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();onAdd();}}}/>
        <button type="button" onClick={onAdd}
          className="w-11 h-11 flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all flex-shrink-0">
          <Plus size={15}/>
        </button>
      </div>
      {tags.length>0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {tags.map(t=><Tag key={t} label={t} onRemove={onRemove} color={color}/>)}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   STEP CONTENT  (unchanged)
══════════════════════════════════════════════════════════════════ */

function StepBasics({ f, s }) {
  return (
    <div className="space-y-5">
      <Field label="Job Title" required>
        <Input value={f.title} onChange={e=>s("title",e.target.value)} placeholder="e.g. Senior Full Stack Developer"/>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Department" required>
          <Select value={f.department} onChange={e=>s("department",e.target.value)}>
            <option value="">Select department…</option>
            {DEPARTMENTS.map(d=><option key={d}>{d}</option>)}
          </Select>
        </Field>
        <Field label="Headcount">
          <Input type="number" min="1" value={f.headcount} onChange={e=>s("headcount",e.target.value)}/>
        </Field>
      </div>
      <Field label="Job Type">
        <div className="grid grid-cols-3 gap-2 mt-0.5">
          {JOB_TYPES.map(t=>(
            <Chip key={t} label={t} selected={f.jobType===t} onClick={()=>s("jobType",t)}/>
          ))}
        </div>
      </Field>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Priority">
          <Select value={f.priority} onChange={e=>s("priority",e.target.value)}>
            {PRIORITIES.map(p=><option key={p}>{p}</option>)}
          </Select>
        </Field>
        <Field label="Start Date" optional>
          <Input type="date" value={f.targetStartDate} onChange={e=>s("targetStartDate",e.target.value)}/>
        </Field>
        <Field label="Closing Date" optional>
          <Input type="date" value={f.closingDate} onChange={e=>s("closingDate",e.target.value)}/>
        </Field>
      </div>
    </div>
  );
}

function StepLocation({ f, s }) {
  const toggle = (loc) => {
    if (loc==="Other") { s("showCustom",!f.showCustom); return; }
    const has = f.locations.includes(loc);
    s("locations", has ? f.locations.filter(l=>l!==loc) : [...f.locations, loc]);
  };
  const addCustom = () => {
    const v = f.customLocation.trim();
    if (v && !f.locations.includes(v)) s("locations",[...f.locations,v]);
    s("customLocation",""); s("showCustom",false);
  };
  return (
    <div className="space-y-5">
      <Field label="Work Mode">
        <div className="grid grid-cols-3 gap-2 mt-0.5">
          {WORK_MODES.map(m=>{
            const icons={Remote:<Globe size={13}/>,Hybrid:<Building2 size={13}/>,"On-site":<MapPin size={13}/>};
            return <Chip key={m} label={m} selected={f.workMode===m} onClick={()=>s("workMode",m)} color="violet" icon={icons[m]}/>;
          })}
        </div>
      </Field>
      <Field label="Locations">
        <div className="grid grid-cols-3 gap-2 mt-0.5">
          {PRESET_LOCS.map(loc=>{
            const isOther = loc==="Other";
            const sel = isOther ? f.showCustom : f.locations.includes(loc);
            return (
              <button key={loc} type="button" onClick={()=>toggle(loc)}
                className={cx(
                  "relative flex items-center justify-between px-3 py-2.5 rounded-lg border text-xs font-semibold text-left transition-all",
                  sel ? "bg-violet-500 text-white border-violet-500 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:bg-violet-50"
                )}>
                <span>{loc}</span>
                {sel && !isOther && <Check size={11} className="flex-shrink-0"/>}
                {isOther && <Plus size={11} className="flex-shrink-0 opacity-70"/>}
              </button>
            );
          })}
        </div>
        <AnimatePresence>
          {f.showCustom && (
            <motion.div initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} className="mt-3 flex gap-2">
              <Input value={f.customLocation} onChange={e=>s("customLocation",e.target.value)}
                placeholder="Enter custom location…" autoFocus
                onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addCustom();}}}/>
              <button type="button" onClick={addCustom}
                className="px-4 h-11 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-semibold text-sm transition-all flex-shrink-0">
                Add
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {f.locations.length>0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 p-3 bg-gray-50 rounded-lg border border-gray-100">
            {f.locations.map(l=>(
              <Tag key={l} label={l} onRemove={loc=>s("locations",f.locations.filter(x=>x!==loc))} color="violet"/>
            ))}
          </div>
        )}
      </Field>
      <Toggle label="Travel may be required" hint="Role involves occasional travel" checked={f.travelRequired||false} onChange={v=>s("travelRequired",v)}/>
    </div>
  );
}

function StepCompensation({ f, s }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Currency">
          <Select value={f.currency} onChange={e=>s("currency",e.target.value)}>
            {CURRENCIES.map(c=><option key={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Pay Period">
          <Select value={f.payPeriod} onChange={e=>s("payPeriod",e.target.value)}>
            {PAY_PERIODS.map(p=><option key={p}>{p}</option>)}
          </Select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Minimum Salary">
          <Input type="number" value={f.minSalary} onChange={e=>s("minSalary",e.target.value)} placeholder="e.g. 100000"/>
        </Field>
        <Field label="Maximum Salary">
          <Input type="number" value={f.maxSalary} onChange={e=>s("maxSalary",e.target.value)} placeholder="e.g. 150000"/>
        </Field>
      </div>
      <div className="space-y-2">
        <Toggle label="Salary Negotiable" hint="Compensation can be discussed based on experience" checked={f.salaryNegotiable} onChange={v=>s("salaryNegotiable",v)}/>
        <Toggle label="Equity / Stock Options" hint="RSUs, ESOPs, or options available" checked={f.equityOffered} onChange={v=>s("equityOffered",v)}/>
      </div>
      <AnimatePresence>
        {f.equityOffered && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} className="overflow-hidden">
            <Field label="Equity Details" optional>
              <Input value={f.equityDetails} onChange={e=>s("equityDetails",e.target.value)} placeholder="e.g. 0.1%–0.5% over 4-year vesting"/>
            </Field>
          </motion.div>
        )}
      </AnimatePresence>
      <Field label="Bonus Structure" optional>
        <Input value={f.bonusStructure} onChange={e=>s("bonusStructure",e.target.value)} placeholder="e.g. 10–15% annual performance bonus"/>
      </Field>
      <Field label="Benefits & Perks" optional>
        <Textarea rows={3} value={f.benefits} onChange={e=>s("benefits",e.target.value)} placeholder="Health insurance, 401(k), unlimited PTO, learning budget…"/>
      </Field>
    </div>
  );
}

function StepRequirements({ f, s }) {
  const addSkill = () => {
    const v = f.skillInput.trim();
    if (v && !f.skills.includes(v)) s("skills",[...f.skills,v]);
    s("skillInput","");
  };
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Experience Level" required>
          <Select value={f.experienceLevel} onChange={e=>s("experienceLevel",e.target.value)}>
            <option value="">Select level…</option>
            {EXP_LEVELS.map(l=><option key={l}>{l}</option>)}
          </Select>
        </Field>
        <Field label="Education" optional>
          <Select value={f.educationRequired} onChange={e=>s("educationRequired",e.target.value)}>
            {EDUCATION.map(e=><option key={e}>{e}</option>)}
          </Select>
        </Field>
      </div>
      <Field label="Required Skills">
        <TagInput tags={f.skills} onAdd={addSkill}
          onRemove={sk=>s("skills",f.skills.filter(x=>x!==sk))}
          val={f.skillInput} onChange={v=>s("skillInput",v)}
          placeholder="Type a skill and press Enter…"/>
      </Field>
      <Field label="Languages Required" optional>
        <Input value={f.languagesRequired} onChange={e=>s("languagesRequired",e.target.value)} placeholder="e.g. English (fluent), Spanish (basic)"/>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Certifications" optional>
          <Input value={f.certifications} onChange={e=>s("certifications",e.target.value)} placeholder="e.g. AWS Certified, PMP"/>
        </Field>
        <Field label="Visa Sponsorship" optional>
          <Select value={f.visaSponsorship} onChange={e=>s("visaSponsorship",e.target.value)}>
            <option value="">Not specified</option>
            <option>Not available</option>
            <option>Available for eligible candidates</option>
            <option>Available for all candidates</option>
          </Select>
        </Field>
      </div>
      <Toggle label="Background Check Required" hint="Candidate must pass background screening" checked={f.backgroundCheckRequired} onChange={v=>s("backgroundCheckRequired",v)}/>
    </div>
  );
}

function StepDescription({ f, s }) {
  return (
    <div className="space-y-5">
      <Field label="Role Summary" required>
        <Textarea rows={3} value={f.summary} onChange={e=>s("summary",e.target.value)} placeholder="A compelling overview of the role and its impact…"/>
      </Field>
      <Field label="Key Responsibilities" required>
        <Textarea rows={5} value={f.responsibilities} onChange={e=>s("responsibilities",e.target.value)} placeholder={"• Lead architecture decisions\n• Mentor junior engineers\n• Collaborate with product teams…"}/>
      </Field>
      <Field label="Must-Have Requirements" required>
        <Textarea rows={5} value={f.requirements} onChange={e=>s("requirements",e.target.value)} placeholder={"• 5+ years of React experience\n• Strong system design skills…"}/>
      </Field>
      <Field label="Nice to Have" optional>
        <Textarea rows={3} value={f.niceToHave} onChange={e=>s("niceToHave",e.target.value)} placeholder={"• Experience with GraphQL\n• Prior startup background…"}/>
      </Field>
    </div>
  );
}

function StepPublish({ f, s }) {
  const addBoard = () => {
    const v = f.boardInput.trim();
    if (v && !f.externalBoards.includes(v)) s("externalBoards",[...f.externalBoards,v]);
    s("boardInput","");
  };
  const salary = f.minSalary && f.maxSalary
    ? `${f.currency} ${Number(f.minSalary).toLocaleString()}–${Number(f.maxSalary).toLocaleString()} ${f.payPeriod}`
    : "Not disclosed";
  const rows = [
    ["Title",      f.title||"—"],
    ["Department", f.department||"—"],
    ["Type",       f.jobType],
    ["Mode",       f.workMode],
    ["Locations",  f.locations.length ? f.locations.slice(0,2).join(", ")+(f.locations.length>2?` +${f.locations.length-2}`:"") : "—"],
    ["Experience", f.experienceLevel||"—"],
    ["Salary",     salary],
    ["Skills",     f.skills.length ? `${f.skills.length} listed` : "—"],
  ];
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Toggle label="Post Internally" hint="Visible to your vendor network and internal team" checked={f.publishInternally} onChange={v=>s("publishInternally",v)}/>
        <Toggle label="Post Externally" hint="Visible on public job boards and career pages" checked={f.publishExternally} onChange={v=>s("publishExternally",v)}/>
      </div>
      <AnimatePresence>
        {f.publishExternally && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} className="overflow-hidden">
            <Field label="External Job Boards" optional>
              <TagInput tags={f.externalBoards} onAdd={addBoard}
                onRemove={b=>s("externalBoards",f.externalBoards.filter(x=>x!==b))}
                val={f.boardInput} onChange={v=>s("boardInput",v)}
                placeholder="e.g. LinkedIn, Indeed, Glassdoor…" color="green"/>
            </Field>
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        <p className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5">
          <Sparkles size={11} className="text-amber-400"/> Posting summary
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          {rows.map(([k,v],i)=>(
            <div key={k} className={cx("flex items-center px-4 py-2.5 gap-3", i%2===0?"bg-gray-50":"bg-white")}>
              <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider w-24 flex-shrink-0">{k}</span>
              <span className="text-sm font-semibold text-gray-800 truncate">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN MODAL
══════════════════════════════════════════════════════════════════ */

const PANELS = {
  1: StepBasics, 2: StepLocation, 3: StepCompensation,
  4: StepRequirements, 5: StepDescription, 6: StepPublish,
};

export default function CreateJobModal({ isOpen, onClose, onSubmit }) {
  const [step,       setStep]       = useState(1);
  const [form,       setForm]       = useState(INIT);
  const [dir,        setDir]        = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState(null);

  const s   = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const go  = (next) => { setDir(next > step ? 1 : -1); setStep(next); };

  const handleClose = () => {
    if (submitting) return;          // prevent closing while posting
    setStep(1); setDir(1); setForm(INIT); setError(null);
    onClose();
  };

  /* ── POST to API, then call onSubmit with the created job ─────── */
  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/jobs/", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(toApiPayload(form)),
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`Server error ${res.status}: ${detail}`);
      }
      const created = await res.json();
      if (onSubmit) onSubmit(created);   // pass the full API response up
      handleClose();
    } catch (err) {
      // API failed → still call onSubmit with local form data so the
      // parent can do an optimistic update, then show the error inline
      if (onSubmit) onSubmit(form);
      setError("Posted locally — could not reach the server.");
      // Auto-dismiss and close after 2 s
      setTimeout(() => { handleClose(); }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  const Panel   = PANELS[step];
  const current = STEPS[step - 1];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Backdrop */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}/>

          {/* Dialog */}
          <motion.div
            initial={{opacity:0, scale:0.95, y:24}}
            animate={{opacity:1, scale:1, y:0}}
            exit={{opacity:0, scale:0.95, y:24}}
            transition={{type:"spring", damping:26, stiffness:280}}
            className="relative flex w-full max-w-[860px] rounded-2xl overflow-hidden shadow-2xl"
            style={{maxHeight:"90vh"}}
          >

            {/* ── LEFT SIDEBAR ── */}
            <div className="w-[220px] flex-shrink-0 bg-[#0f172a] flex flex-col">
              <div className="px-6 pt-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Briefcase size={14} className="text-white"/>
                  </div>
                  <span className="text-sm font-extrabold text-white tracking-tight">New Requisition</span>
                </div>
                <p className="text-[11px] text-white/40 mt-1 font-medium">{step} of {STEPS.length} steps</p>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {STEPS.map(st => {
                  const Icon   = st.icon;
                  const done   = step > st.id;
                  const active = step === st.id;
                  return (
                    <button key={st.id} type="button" onClick={() => go(st.id)}
                      className={cx(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group",
                        active ? "bg-white/10 text-white" : done ? "text-white/60 hover:bg-white/5 hover:text-white" : "text-white/30 hover:bg-white/5 hover:text-white/60"
                      )}>
                      <div className={cx(
                        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                        active ? "bg-blue-500" : done ? "bg-emerald-500/20" : "bg-white/5"
                      )}>
                        {done ? <Check size={13} className="text-emerald-400"/> : <Icon size={13} className={active?"text-white":"text-current"}/>}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-bold leading-none truncate">{st.label}</p>
                        <p className={cx("text-[10px] mt-0.5 truncate", active?"text-white/50":"text-current opacity-70")}>{st.sub}</p>
                      </div>
                      {active && <div className="ml-auto w-1 h-6 bg-blue-400 rounded-full flex-shrink-0"/>}
                    </button>
                  );
                })}
              </nav>

              <div className="px-6 pb-6">
                <div className="flex justify-between text-[10px] text-white/30 font-semibold mb-1.5">
                  <span>Progress</span>
                  <span>{Math.round(((step-1)/(STEPS.length-1))*100)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    animate={{width:`${((step-1)/(STEPS.length-1))*100}%`}}
                    transition={{type:"spring", damping:20}}/>
                </div>
              </div>
            </div>

            {/* ── RIGHT CONTENT ── */}
            <div className="flex-1 flex flex-col bg-white min-w-0">
              <div className="flex items-start justify-between px-8 pt-7 pb-5 border-b border-gray-100 flex-shrink-0">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 leading-tight">{current.label}</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{current.sub}</p>
                </div>
                <button onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-all flex-shrink-0 mt-0.5">
                  <X size={15}/>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-6">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div key={step}
                    custom={dir}
                    initial={d=>({opacity:0, x: d*20})}
                    animate={{opacity:1, x:0}}
                    exit={d=>({opacity:0, x: d*-20})}
                    transition={{duration:0.2, ease:"easeInOut"}}>
                    <Panel f={form} s={s}/>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Error banner */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}}
                    className="mx-8 mb-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"/>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between flex-shrink-0 bg-gray-50/70">
                <button type="button"
                  onClick={() => step===1 ? handleClose() : go(step-1)}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-40">
                  {step===1 ? "Cancel" : "← Back"}
                </button>

                <div className="flex items-center gap-1.5">
                  {STEPS.map(st=>(
                    <button key={st.id} type="button" onClick={()=>go(st.id)}
                      className={cx("rounded-full transition-all duration-300",
                        st.id===step ? "w-5 h-2 bg-gray-800" : st.id<step ? "w-2 h-2 bg-emerald-400" : "w-2 h-2 bg-gray-300")}/>
                  ))}
                </div>

                {step < STEPS.length ? (
                  <button type="button" onClick={()=>go(step+1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 transition-all shadow-sm">
                    Continue <ArrowRight size={14}/>
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} disabled={submitting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Posting…
                      </>
                    ) : (
                      <><Sparkles size={14}/> Post Job</>
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