import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Filter, MapPin, Briefcase, Star,
  ChevronDown, FileText, Calendar, DollarSign,
  Award, X, Mail, ExternalLink, Download,
  Clock, Building2, Zap, ChevronLeft, ChevronRight,
  Plus, Send, AlertCircle
} from "lucide-react";
import EndClientSidebar from "../components/EndClientSidebar";

// ─── PRE-BOOKED SLOTS ────────────────────────────────────────────────────────
const PRE_BOOKED = {
  "1": ["2025-07-15|09:00", "2025-07-15|14:00"],
  "2": ["2025-07-16|10:00"],
  "6": ["2025-07-17|11:00", "2025-07-17|15:00"],
};

const TIME_SLOTS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

const VIDEO_PLATFORMS = [
  {
    id: "meet", label: "Google Meet", color: "#1a73e8", bg: "#e8f0fe",
    icon: (
      <svg viewBox="0 0 48 48" width="28" height="28">
        <path fill="#4CAF50" d="M30 24c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z"/>
        <path fill="#1976D2" d="M42 24c0-1.11-.09-2.19-.26-3.24L30 20.76v6.48l11.74.0C41.91 26.19 42 25.11 42 24z"/>
        <path fill="#FF3D00" d="M11.29 30.71L6 42l12-4.29-6.71-7z"/>
        <path fill="#FFC107" d="M42 24c0 9.94-8.06 18-18 18-3.49 0-6.74-1-9.47-2.71l6.18-10.72C22 29.44 23 30 24 30c3.31 0 6-2.69 6-6H42z"/>
        <path fill="#1976D2" d="M6 24C6 14.06 14.06 6 24 6c3.49 0 6.74 1 9.47 2.71l-6.18 10.72C26 18.56 25 18 24 18c-3.31 0-6 2.69-6 6H6z"/>
        <path fill="#4CAF50" d="M24 6c4.94 0 9.4 2 12.66 5.22l-7.4 7.4C27.74 17.04 25.96 16 24 16v-2c-1.96 0-3.74 1.04-5.26 2.62l-7.4-7.4C14.6 8 19.06 6 24 6z"/>
      </svg>
    )
  },
  {
    id: "zoom", label: "Zoom", color: "#2D8CFF", bg: "#e8f3ff",
    icon: (
      <svg viewBox="0 0 48 48" width="28" height="28">
        <rect width="48" height="48" rx="10" fill="#2D8CFF"/>
        <path fill="#fff" d="M8 17v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V17c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2zm24 5.5l6-5v13l-6-5v-3z"/>
      </svg>
    )
  },
  {
    id: "teams", label: "Teams", color: "#5059C9", bg: "#f0f0fa",
    icon: (
      <svg viewBox="0 0 48 48" width="28" height="28">
        <path fill="#5059C9" d="M31.5 22h5c.83 0 1.5.67 1.5 1.5v8c0 2.49-2.01 4.5-4.5 4.5S29 33.99 29 31.5v-8c0-.83.67-1.5 1.5-1.5zM35 20a3 3 0 100-6 3 3 0 000 6z"/>
        <path fill="#7B83EB" d="M27 22H9.5c-.83 0-1.5.67-1.5 1.5v10c0 4.14 3.36 7.5 7.5 7.5S23 37.64 23 33.5V24h4v-2z"/>
        <circle fill="#7B83EB" cx="18" cy="14" r="5"/>
        <path fill="#fff" fillOpacity=".1" d="M23 22v11.5c0 3.59-2.5 6.59-5.86 7.36.45.09.91.14 1.36.14 4.14 0 7.5-3.36 7.5-7.5V24h-3v-2z"/>
        <circle fill="#5059C9" cx="35" cy="17" r="3"/>
      </svg>
    )
  },
];

const STATUS_STYLES = {
  "New":          { color:"#2563eb", bg:"#dbeafe" },
  "Shortlisted":  { color:"#7c3aed", bg:"#ede9fe" },
  "Under Review": { color:"#d97706", bg:"#fef3c7" },
  "Interviewing": { color:"#059669", bg:"#d1fae5" },
  "Rejected":     { color:"#dc2626", bg:"#fee2e2" },
};

function pad(n) { return String(n).padStart(2,"0"); }
function initials(name) { return name.split(" ").map(n=>n[0]).join(""); }

// ─── INTERVIEW SCHEDULER ─────────────────────────────────────────────────────
function InterviewScheduler({ candidate, onClose, onScheduled }) {
  const today = new Date();
  const [cal, setCal] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selDate, setSelDate] = useState(null);
  const [selTime, setSelTime] = useState(null);
  const [intType, setIntType] = useState("Video Call");
  const [videoPlatform, setVideoPlatform] = useState("meet");
  const [notes, setNotes] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [extraSlots, setExtraSlots] = useState([]);
  const [step, setStep] = useState(1);

  const booked = PRE_BOOKED[candidate.id] || [];
  const daysInMonth = new Date(cal.year, cal.month+1, 0).getDate();
  const firstDay = new Date(cal.year, cal.month, 1).getDay();
  const monthName = new Date(cal.year, cal.month).toLocaleString("default",{ month:"long" });

  function isBooked(date, time) { return booked.includes(`${date}|${time}`); }
  function isPast(day) {
    const d = new Date(cal.year,cal.month,day); d.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  }
  function dateStr(day) { return `${cal.year}-${pad(cal.month+1)}-${pad(day)}`; }
  function prevMonth() { setCal(c => c.month===0?{year:c.year-1,month:11}:{...c,month:c.month-1}); }
  function nextMonth() { setCal(c => c.month===11?{year:c.year+1,month:0}:{...c,month:c.month+1}); }

  function addCustomSlot() {
    if (!customTime) return;
    setExtraSlots(s => [...new Set([...s, customTime])].sort());
    setSelTime(customTime);
    setCustomTime("");
    setShowCustom(false);
  }

  const allSlots = [...TIME_SLOTS, ...extraSlots].sort().filter((v,i,a)=>a.indexOf(v)===i);
  const fmtDate = selDate ? new Date(selDate+"T00:00").toDateString() : "";

  function handleSend() {
    onScheduled({ candidate, date:selDate, time:selTime, type:intType, platform:intType==="Video Call"?videoPlatform:null, notes });
    setStep(3);
  }

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      style={{ position:"fixed",inset:0,zIndex:50,background:"rgba(15,23,42,0.65)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
      <motion.div initial={{ scale:0.94,y:16 }} animate={{ scale:1,y:0 }} exit={{ scale:0.94,y:16 }}
        style={{ background:"#fff",borderRadius:28,width:"min(96vw,740px)",maxHeight:"90vh",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 32px 80px rgba(0,0,0,0.25)" }}>

        {/* Header */}
        <div style={{ padding:"22px 26px 0",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <div style={{ width:46,height:46,borderRadius:14,background:"#1e3a8a",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:16,flexShrink:0 }}>{initials(candidate.name)}</div>
            <div>
              <div style={{ fontWeight:800,fontSize:18,color:"#1e3a8a" }}>Schedule Interview</div>
              <div style={{ fontSize:12,color:"#64748b" }}>{candidate.name} · {candidate.title}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ width:36,height:36,borderRadius:10,border:"none",background:"#f1f5f9",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b" }}><X size={18}/></button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div style={{ padding:"16px 26px 0",display:"flex",alignItems:"center",gap:8 }}>
            {["Date & Time","Details","Confirm"].map((s,i)=>(
              <React.Fragment key={s}>
                <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                  <div style={{ width:24,height:24,borderRadius:8,background:step>i+1?"#10b981":step===i+1?"#1e40af":"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:step>=i+1?"#fff":"#94a3b8",transition:"all 0.2s" }}>{step>i+1?"✓":i+1}</div>
                  <span style={{ fontSize:11,fontWeight:700,color:step===i+1?"#1e40af":"#94a3b8" }}>{s}</span>
                </div>
                {i<2 && <div style={{ flex:1,height:1.5,background:step>i+1?"#10b981":"#e2e8f0",maxWidth:40,borderRadius:2 }}/>}
              </React.Fragment>
            ))}
          </div>
        )}

        <div style={{ flex:1,overflowY:"auto",padding:"20px 26px 26px" }}>
          <AnimatePresence mode="wait">

            {/* STEP 1: Date + Time */}
            {step===1 && (
              <motion.div key="s1" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>

                  {/* Calendar */}
                  <div style={{ background:"#f8fafc",borderRadius:20,padding:18 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                      <button onClick={prevMonth} style={{ width:30,height:30,borderRadius:8,border:"none",background:"#e2e8f0",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><ChevronLeft size={15}/></button>
                      <span style={{ fontWeight:800,fontSize:13,color:"#1e3a8a" }}>{monthName} {cal.year}</span>
                      <button onClick={nextMonth} style={{ width:30,height:30,borderRadius:8,border:"none",background:"#e2e8f0",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><ChevronRight size={15}/></button>
                    </div>
                    <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:4 }}>
                      {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=><div key={d} style={{ textAlign:"center",fontSize:10,fontWeight:700,color:"#94a3b8",padding:"3px 0" }}>{d}</div>)}
                    </div>
                    <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2 }}>
                      {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
                      {Array.from({length:daysInMonth}).map((_,i)=>{
                        const day=i+1, ds=dateStr(day), past=isPast(day), sel=selDate===ds;
                        const hasBooked=booked.some(b=>b.startsWith(ds));
                        return (
                          <button key={day} disabled={past} onClick={()=>{ setSelDate(ds); setSelTime(null); }}
                            style={{ width:"100%",aspectRatio:"1",borderRadius:8,border:"none",cursor:past?"not-allowed":"pointer",
                              background:sel?"#1e40af":"transparent",color:past?"#cbd5e1":sel?"#fff":"#1e3a8a",
                              fontWeight:sel?900:hasBooked?800:600,fontSize:12,position:"relative",transition:"all 0.15s",
                              outline:hasBooked&&!sel?"2px solid #fbbf24":"none",outlineOffset:"-2px" }}>
                            {day}
                            {hasBooked&&!sel&&<span style={{ position:"absolute",bottom:1,left:"50%",transform:"translateX(-50%)",width:3,height:3,borderRadius:"50%",background:"#f59e0b" }}/>}
                          </button>
                        );
                      })}
                    </div>
                    {selDate && <p style={{ marginTop:10,fontSize:11,color:"#3b82f6",fontWeight:700,textAlign:"center" }}>📅 {fmtDate}</p>}
                  </div>

                  {/* Time Slots */}
                  <div>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                      <span style={{ fontWeight:800,fontSize:13,color:"#1e3a8a" }}>Pick a Time Slot</span>
                      <button onClick={()=>setShowCustom(c=>!c)} style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:8,border:"1.5px dashed #3b82f6",background:"transparent",color:"#3b82f6",cursor:"pointer",fontSize:11,fontWeight:700 }}>
                        <Plus size={12}/> Custom
                      </button>
                    </div>

                    {!selDate && (
                      <div style={{ height:220,display:"flex",alignItems:"center",justifyContent:"center",color:"#94a3b8",fontSize:12,fontWeight:600,textAlign:"center",flexDirection:"column",gap:8 }}>
                        <Calendar size={32} style={{ opacity:0.3 }}/>Select a date first
                      </div>
                    )}

                    {selDate && (
                      <>
                        <AnimatePresence>
                          {showCustom && (
                            <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }} style={{ overflow:"hidden",marginBottom:10 }}>
                              <div style={{ display:"flex",gap:6 }}>
                                <input type="time" value={customTime} onChange={e=>setCustomTime(e.target.value)}
                                  style={{ flex:1,padding:"8px 12px",borderRadius:10,border:"1.5px solid #e2e8f0",fontSize:13,fontWeight:700,color:"#1e3a8a",outline:"none" }}/>
                                <button onClick={addCustomSlot} style={{ padding:"8px 16px",borderRadius:10,border:"none",background:"#1e40af",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer" }}>Add</button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:7 }}>
                          {allSlots.map(time=>{
                            const bk=isBooked(selDate,time), sel=selTime===time, isCustom=!TIME_SLOTS.includes(time);
                            return (
                              <div key={time} style={{ position:"relative" }} className="slot-wrap">
                                <button disabled={bk} onClick={()=>setSelTime(time)}
                                  style={{ width:"100%",padding:"10px 0",borderRadius:12,fontSize:13,fontWeight:700,
                                    border:sel?"none":"1.5px solid",borderColor:bk?"#e2e8f0":sel?"transparent":"#dbeafe",
                                    background:sel?"#1e40af":bk?"#f8fafc":isCustom?"#fef9ff":"#eff6ff",
                                    color:sel?"#fff":bk?"#cbd5e1":isCustom?"#7c3aed":"#1e40af",
                                    cursor:bk?"not-allowed":"pointer",transition:"all 0.15s",position:"relative",
                                    outline:isCustom&&!sel&&!bk?"1.5px dashed #a78bfa":"none" }}>
                                  {time}
                                  {isCustom&&!bk&&<span style={{ fontSize:9,marginLeft:4,opacity:0.6 }}>custom</span>}
                                  {bk&&<span style={{ position:"absolute",top:4,right:6,width:6,height:6,borderRadius:"50%",background:"#f59e0b" }}/>}
                                </button>
                                {bk&&(
                                  <div className="slot-tip" style={{ display:"none",position:"absolute",bottom:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)",background:"#1e293b",color:"#fff",borderRadius:8,padding:"7px 11px",fontSize:10,fontWeight:600,whiteSpace:"nowrap",zIndex:200,pointerEvents:"none",boxShadow:"0 4px 12px rgba(0,0,0,0.25)" }}>
                                    <AlertCircle size={10} style={{ display:"inline",marginRight:4 }}/>
                                    Already scheduled with another client
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div style={{ marginTop:20,display:"flex",justifyContent:"flex-end" }}>
                  <button disabled={!selDate||!selTime} onClick={()=>setStep(2)}
                    style={{ padding:"11px 28px",borderRadius:14,border:"none",background:selDate&&selTime?"#1e40af":"#e2e8f0",color:selDate&&selTime?"#fff":"#94a3b8",fontWeight:800,fontSize:14,cursor:selDate&&selTime?"pointer":"not-allowed",transition:"all 0.2s" }}>
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Details */}
            {step===2 && (
              <motion.div key="s2" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }}>
                <div style={{ display:"grid",gap:16 }}>

                  {/* Summary */}
                  <div style={{ background:"#eff6ff",borderRadius:14,padding:"14px 18px",display:"flex",gap:12,alignItems:"center" }}>
                    <Calendar size={18} style={{ color:"#3b82f6",flexShrink:0 }}/>
                    <div>
                      <div style={{ fontWeight:800,fontSize:14,color:"#1e3a8a" }}>{fmtDate} · {selTime}</div>
                      <div style={{ fontSize:12,color:"#64748b" }}>Interview request — awaiting candidate confirmation</div>
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label style={{ display:"block",fontSize:11,fontWeight:800,color:"#64748b",textTransform:"uppercase",letterSpacing:1,marginBottom:8 }}>Interview Type</label>
                    <div style={{ display:"flex",gap:8 }}>
                      {["Video Call","Phone Call","In-Person"].map(type=>(
                        <button key={type} onClick={()=>setIntType(type)}
                          style={{ flex:1,padding:"10px 0",borderRadius:12,border:"2px solid",borderColor:intType===type?"#1e40af":"#e2e8f0",background:intType===type?"#eff6ff":"#fff",color:intType===type?"#1e40af":"#64748b",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s" }}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Video Platform */}
                  <AnimatePresence>
                    {intType==="Video Call" && (
                      <motion.div key="vp" initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }} style={{ overflow:"hidden" }}>
                        <label style={{ display:"block",fontSize:11,fontWeight:800,color:"#64748b",textTransform:"uppercase",letterSpacing:1,marginBottom:8 }}>Video Platform</label>
                        <div style={{ display:"flex",gap:10 }}>
                          {VIDEO_PLATFORMS.map(p=>(
                            <button key={p.id} onClick={()=>setVideoPlatform(p.id)}
                              style={{ flex:1,padding:"14px 8px",borderRadius:16,border:"2px solid",borderColor:videoPlatform===p.id?p.color:"#e2e8f0",background:videoPlatform===p.id?p.bg:"#fff",cursor:"pointer",transition:"all 0.15s",display:"flex",flexDirection:"column",alignItems:"center",gap:8,boxShadow:videoPlatform===p.id?`0 4px 14px ${p.color}30`:"none" }}>
                              {p.icon}
                              <span style={{ fontSize:11,fontWeight:800,color:videoPlatform===p.id?p.color:"#64748b" }}>{p.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Notes */}
                  <div>
                    <label style={{ display:"block",fontSize:11,fontWeight:800,color:"#64748b",textTransform:"uppercase",letterSpacing:1,marginBottom:8 }}>
                      Message to Candidate <span style={{ color:"#94a3b8",fontWeight:600,textTransform:"none",fontSize:10 }}>(optional)</span>
                    </label>
                    <textarea value={notes} onChange={e=>setNotes(e.target.value)}
                      placeholder="Any instructions, joining link, or notes for the candidate..."
                      style={{ width:"100%",minHeight:90,padding:"12px 14px",borderRadius:14,border:"1.5px solid #e2e8f0",fontSize:13,color:"#1e3a8a",outline:"none",resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",fontWeight:500 }}/>
                  </div>

                  {/* Warning */}
                  <div style={{ background:"#fefce8",border:"1px solid #fde68a",borderRadius:12,padding:"12px 14px",display:"flex",gap:10,alignItems:"flex-start" }}>
                    <AlertCircle size={15} style={{ color:"#f59e0b",flexShrink:0,marginTop:1 }}/>
                    <p style={{ fontSize:12,color:"#92400e",fontWeight:600,margin:0 }}>
                      This sends an <strong>interview request</strong> to the candidate. The slot is <strong>confirmed</strong> only once they accept.
                    </p>
                  </div>
                </div>

                <div style={{ marginTop:20,display:"flex",justifyContent:"space-between" }}>
                  <button onClick={()=>setStep(1)} style={{ padding:"11px 22px",borderRadius:14,border:"1.5px solid #e2e8f0",background:"#fff",color:"#64748b",fontWeight:700,fontSize:13,cursor:"pointer" }}>← Back</button>
                  <button onClick={handleSend} style={{ display:"flex",alignItems:"center",gap:8,padding:"11px 28px",borderRadius:14,border:"none",background:"#1e40af",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer" }}>
                    <Send size={15}/> Send Request
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Sent */}
            {step===3 && (
              <motion.div key="s3" initial={{ opacity:0,scale:0.95 }} animate={{ opacity:1,scale:1 }} style={{ textAlign:"center",padding:"28px 0" }}>
                <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring",delay:0.1 }}
                  style={{ width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#1e40af,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
                  <Send size={30} style={{ color:"#fff" }}/>
                </motion.div>
                <h3 style={{ fontWeight:900,fontSize:22,color:"#1e3a8a",marginBottom:8 }}>Request Sent!</h3>
                <p style={{ color:"#64748b",fontSize:13,maxWidth:340,margin:"0 auto 6px" }}>
                  Interview request sent to <strong>{candidate.name}</strong>.
                </p>
                <p style={{ color:"#94a3b8",fontSize:12,marginBottom:24 }}>
                  Status becomes <strong style={{ color:"#10b981" }}>Confirmed</strong> once they accept, or <strong style={{ color:"#ef4444" }}>Cancelled</strong> if rejected.
                </p>
                <div style={{ background:"#f8fafc",borderRadius:16,padding:"16px 28px",display:"inline-block",marginBottom:28,textAlign:"left" }}>
                  <div style={{ fontSize:11,color:"#94a3b8",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6 }}>Pending Confirmation</div>
                  <div style={{ fontWeight:800,color:"#1e3a8a",fontSize:15 }}>{fmtDate} · {selTime}</div>
                  <div style={{ fontSize:12,color:"#64748b",marginTop:4 }}>
                    {intType}{intType==="Video Call"&&" · "+VIDEO_PLATFORMS.find(p=>p.id===videoPlatform)?.label}
                  </div>
                </div>
                <br/>
                <button onClick={onClose} style={{ padding:"11px 36px",borderRadius:14,border:"none",background:"#1e40af",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer" }}>Done</button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
      <style>{`.slot-wrap:hover .slot-tip { display: block !important; }`}</style>
    </motion.div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES["New"];
  return <span style={{ padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:800,color:s.color,background:s.bg }}>{status}</span>;
}

function InfoCard({ label, value, icon, accent="#3b82f6" }) {
  return (
    <div style={{ background:"#f8fafc",borderRadius:16,padding:"14px 16px",border:"1px solid #f1f5f9" }}>
      <div style={{ color:accent,marginBottom:7 }}>{icon}</div>
      <p style={{ fontSize:10,color:"#94a3b8",fontWeight:800,textTransform:"uppercase",letterSpacing:0.8,margin:0 }}>{label}</p>
      <p style={{ fontSize:13,fontWeight:800,color:"#1e3a8a",margin:"3px 0 0" }}>{value}</p>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function EndClientCandidatesPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState("1");
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [filters, setFilters] = useState({ jobType:"", workMode:"", minExp:"" });

  const allCandidates = [
    { id:"1",  name:"Alex Johnson",    title:"Senior Full Stack Developer", location:"San Francisco, CA", experience:7,  skills:["React","Node.js","TypeScript","AWS"],           rating:4.8, availability:"Immediate", jobType:"Full-time", workMode:"Hybrid",  expectedSalary:"$140K",   status:"Under Review", vendor:"TechRecruit Pro", email:"alex.j@example.com",   matchScore:98 },
    { id:"2",  name:"Sarah Williams",  title:"Product Manager",             location:"New York, NY",       experience:5,  skills:["Product Strategy","Agile","Data Analysis"],    rating:4.9, availability:"2 weeks",   jobType:"Full-time", workMode:"Remote",  expectedSalary:"$125K",   status:"Interviewing",  vendor:"TalentHub",       email:"sarah.w@example.com",  matchScore:94 },
    { id:"3",  name:"Emily Davis",     title:"Data Analyst",                location:"Boston, MA",         experience:3,  skills:["SQL","Python","Tableau"],                      rating:4.6, availability:"Immediate", jobType:"Contract",  workMode:"Remote",  expectedSalary:"$90K",    status:"Shortlisted",   vendor:"DataExperts",     email:"emily.d@example.com",  matchScore:88 },
    { id:"4",  name:"Michael Chen",    title:"DevOps Engineer",             location:"Seattle, WA",        experience:6,  skills:["Docker","Kubernetes","Terraform"],              rating:4.7, availability:"1 month",   jobType:"Full-time", workMode:"On-site", expectedSalary:"$155K",   status:"Under Review",  vendor:"CloudTalent",     email:"m.chen@example.com",   matchScore:92 },
    { id:"5",  name:"Jessica Lee",     title:"UX Designer",                 location:"Austin, TX",         experience:4,  skills:["Figma","Adobe XD","Prototyping"],              rating:4.8, availability:"Immediate", jobType:"Full-time", workMode:"Hybrid",  expectedSalary:"$115K",   status:"New",           vendor:"CreativePool",    email:"jess.lee@example.com", matchScore:96 },
    { id:"6",  name:"David Miller",    title:"Backend Architect",           location:"Remote",             experience:12, skills:["Go","Microservices","PostgreSQL"],             rating:5.0, availability:"3 weeks",   jobType:"Contract",  workMode:"Remote",  expectedSalary:"$110/hr", status:"Interviewing",  vendor:"NexusStaff",      email:"d.miller@example.com", matchScore:99 },
    { id:"7",  name:"Sofia Garcia",    title:"Marketing Lead",              location:"Miami, FL",          experience:8,  skills:["SEO","Growth Hacking","PPC"],                  rating:4.5, availability:"Immediate", jobType:"Full-time", workMode:"On-site", expectedSalary:"$130K",   status:"Rejected",      vendor:"MarketForce",     email:"s.garcia@example.com", matchScore:75 },
    { id:"8",  name:"James Wilson",    title:"Frontend Developer",          location:"Denver, CO",         experience:2,  skills:["JavaScript","Tailwind","Next.js"],             rating:4.3, availability:"1 week",    jobType:"Full-time", workMode:"Hybrid",  expectedSalary:"$95K",    status:"Under Review",  vendor:"DevHire",         email:"j.wilson@example.com", matchScore:82 },
    { id:"9",  name:"Rachel Adams",    title:"HR Business Partner",         location:"Chicago, IL",        experience:9,  skills:["Employee Relations","Payroll"],                rating:4.7, availability:"2 weeks",   jobType:"Full-time", workMode:"Hybrid",  expectedSalary:"$110K",   status:"Shortlisted",   vendor:"PeopleFirst",     email:"r.adams@example.com",  matchScore:91 },
    { id:"10", name:"Kevin Park",      title:"QA Automation Lead",          location:"Remote",             experience:6,  skills:["Cypress","Selenium","Java"],                   rating:4.6, availability:"Immediate", jobType:"Contract",  workMode:"Remote",  expectedSalary:"$95/hr",  status:"New",           vendor:"QualityConnect",  email:"k.park@example.com",   matchScore:89 },
  ];

  const filteredCandidates = useMemo(() => allCandidates.filter(c => {
    const q = searchTerm.toLowerCase();
    return (c.name.toLowerCase().includes(q)||c.title.toLowerCase().includes(q)||c.skills.some(s=>s.toLowerCase().includes(q)))
      && (!filters.jobType||c.jobType===filters.jobType)
      && (!filters.workMode||c.workMode===filters.workMode)
      && (!filters.minExp||c.experience>=parseInt(filters.minExp));
  }), [searchTerm, filters]);

  const activeCandidate = allCandidates.find(c => c.id === selectedCandidateId);
  const pendingForActive = scheduledInterviews.filter(s => s.candidate.id === selectedCandidateId);

  return (
    <div className="flex h-screen bg-gray-50 text-slate-950 font-sans overflow-hidden">
      <EndClientSidebar />

      <div className="flex-1 flex flex-col min-w-0">

        {/* HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center shrink-0 px-8 justify-between">
          <div>
            <h1 className="text-lg font-black text-blue-950">Candidate Pipeline</h1>
            <p className="text-xs text-gray-400 font-medium">Review and manage talent submissions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black">{filteredCandidates.length} Candidates</div>
          </div>
        </header>

        {/* SEARCH & FILTERS */}
        <div className="bg-white border-b border-gray-100 px-8 py-3 shrink-0">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
              <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search by name, title or skill..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-blue-400 transition-all"/>
            </div>
            <button onClick={()=>setShowFilters(f=>!f)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl border transition-all ${showFilters?"bg-blue-50 border-blue-200 text-blue-600":"border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
              <Filter size={15}/> Filters <ChevronDown size={13} className={`transition-transform ${showFilters?"rotate-180":""}`}/>
            </button>
          </div>
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }} style={{ overflow:"hidden" }}>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {[
                    { key:"jobType", opts:["","Full-time","Contract"], labels:["Job Type: All","Full-time","Contract"] },
                    { key:"workMode", opts:["","Remote","Hybrid","On-site"], labels:["Work Mode: All","Remote","Hybrid","On-site"] },
                    { key:"minExp", opts:["","3","5"], labels:["Experience: Any","3+ Years","5+ Years"] },
                  ].map(f=>(
                    <select key={f.key} value={filters[f.key]} onChange={e=>setFilters(p=>({...p,[f.key]:e.target.value}))}
                      className="bg-gray-50 border border-gray-200 p-2 rounded-lg text-xs font-bold text-blue-950 outline-none">
                      {f.opts.map((o,i)=><option key={o} value={o}>{f.labels[i]}</option>)}
                    </select>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex-1 flex overflow-hidden">

          {/* LEFT: Candidate List */}
          <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto flex-shrink-0">
            {filteredCandidates.map(c => {
              const isSel = selectedCandidateId === c.id;
              const hasPending = scheduledInterviews.some(s=>s.candidate.id===c.id);
              return (
                <div key={c.id} onClick={()=>setSelectedCandidateId(c.id)}
                  style={{ borderLeft:`3px solid ${isSel?"#1e40af":"transparent"}` }}
                  className={`px-4 py-3.5 cursor-pointer border-b border-gray-50 transition-all ${isSel?"bg-blue-50/60":"hover:bg-gray-50"}`}>
                  <div className="flex items-center gap-3">
                    <div style={{ width:40,height:40,borderRadius:12,background:isSel?"#1e40af":"#f1f5f9",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:isSel?"#fff":"#64748b" }}>
                      {initials(c.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span style={{ fontWeight:800,fontSize:13,color:isSel?"#1e40af":"#1e3a8a" }}>{c.name}</span>
                        <span style={{ fontSize:10,fontWeight:900,color:"#1e40af",background:"#dbeafe",padding:"2px 7px",borderRadius:6 }}>{c.matchScore}%</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5 font-medium">{c.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <StatusBadge status={c.status}/>
                        {hasPending&&<span style={{ fontSize:9,fontWeight:800,color:"#d97706",background:"#fef3c7",padding:"2px 6px",borderRadius:5 }}>● PENDING</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Detail Panel */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {activeCandidate ? (
              <motion.div key={activeCandidate.id} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.2 }} className="p-7 max-w-4xl mx-auto">

                {/* Pending Banner */}
                {pendingForActive.length>0 && (
                  <div style={{ background:"#fefce8",border:"1px solid #fde68a",borderRadius:14,padding:"12px 18px",marginBottom:20,display:"flex",gap:12,alignItems:"flex-start" }}>
                    <Clock size={16} style={{ color:"#f59e0b",flexShrink:0,marginTop:2 }}/>
                    <div className="flex-1">
                      <div style={{ fontWeight:800,fontSize:13,color:"#92400e" }}>Interview Request Pending · Awaiting Candidate Response</div>
                      {pendingForActive.map((s,i)=>(
                        <div key={i} style={{ fontSize:12,color:"#78350f",marginTop:2 }}>
                          {new Date(s.date+"T00:00").toDateString()} at {s.time} · {s.type}
                          {s.platform&&" · "+VIDEO_PLATFORMS.find(p=>p.id===s.platform)?.label}
                        </div>
                      ))}
                    </div>
                    <span style={{ fontSize:10,fontWeight:900,padding:"4px 10px",borderRadius:8,background:"#fde68a",color:"#92400e",flexShrink:0 }}>AWAITING</span>
                  </div>
                )}

                {/* Hero Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-5">
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div className="flex gap-5 items-start">
                      <div style={{ width:64,height:64,borderRadius:18,background:"#1e3a8a",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:22,fontWeight:900,flexShrink:0 }}>
                        {initials(activeCandidate.name)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-xl font-black text-blue-950">{activeCandidate.name}</h2>
                          <StatusBadge status={activeCandidate.status}/>
                          <span style={{ fontSize:11,fontWeight:900,color:"#1e40af",background:"#dbeafe",padding:"3px 10px",borderRadius:8 }}>{activeCandidate.matchScore}% match</span>
                        </div>
                        <p className="text-sm text-gray-500 font-semibold mt-1">{activeCandidate.title}</p>
                        <div className="flex items-center gap-1.5 mt-2 text-blue-500 text-xs font-bold cursor-pointer hover:underline">
                          <Building2 size={12}/>{activeCandidate.vendor}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button onClick={()=>setIsSchedulerOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-xl font-black text-sm hover:bg-blue-800 transition-all shadow-md shadow-blue-200">
                        <Calendar size={15}/> Schedule Interview
                      </button>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-100 transition-all">
                          <Mail size={12}/> Email
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-100 transition-all">
                          <Download size={12}/> Resume
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mt-5">
                    <InfoCard label="Location"  value={activeCandidate.location}       icon={<MapPin size={15}/>}     accent="#3b82f6"/>
                    <InfoCard label="Work Mode" value={activeCandidate.workMode}       icon={<Zap size={15}/>}        accent="#8b5cf6"/>
                    <InfoCard label="Expected"  value={activeCandidate.expectedSalary} icon={<DollarSign size={15}/>} accent="#10b981"/>
                    <InfoCard label="Available" value={activeCandidate.availability}   icon={<Clock size={15}/>}      accent="#f59e0b"/>
                  </div>
                </div>

                {/* Skills + Rating */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Award size={14} className="text-blue-500"/>
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Core Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeCandidate.skills.map((s,i)=>(
                        <span key={i} style={{ padding:"5px 13px",borderRadius:9,background:"#f1f5f9",border:"1px solid #e2e8f0",fontSize:12,fontWeight:700,color:"#1e3a8a" }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Star size={14} className="text-yellow-400"/>
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Rating</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span style={{ fontSize:42,fontWeight:900,color:"#1e3a8a",lineHeight:1 }}>{activeCandidate.rating}</span>
                      <div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i=>(
                            <Star key={i} size={15} style={{ color:i<=Math.floor(activeCandidate.rating)?"#fbbf24":"#e2e8f0",fill:i<=Math.floor(activeCandidate.rating)?"#fbbf24":"#e2e8f0" }}/>
                          ))}
                        </div>
                        <p className="text-[10px] text-gray-400 font-black mt-1 uppercase tracking-wide">Top 5% Talent</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extra Details */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase size={14} className="text-blue-500"/>
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Details</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label:"Experience", value:`${activeCandidate.experience} Years` },
                      { label:"Job Type",   value:activeCandidate.jobType },
                      { label:"Email",      value:activeCandidate.email },
                    ].map(d=>(
                      <div key={d.label}>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">{d.label}</p>
                        <p className="text-sm font-bold text-blue-950 break-all">{d.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resume */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-gray-400"/>
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Resume Preview</span>
                    </div>
                    <button className="text-blue-500 text-xs font-bold flex items-center gap-1 hover:underline">
                      Open <ExternalLink size={11}/>
                    </button>
                  </div>
                  <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center py-10 text-gray-400 gap-3">
                    <FileText size={44} strokeWidth={1}/>
                    <p className="text-sm font-medium">Candidate_Resume_{activeCandidate.name.replace(" ","_")}.pdf</p>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
                      <Download size={12}/> Download
                    </button>
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                <Users size={56} strokeWidth={1} className="opacity-20"/>
                <p className="text-sm font-medium">Select a candidate to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSchedulerOpen && activeCandidate && (
          <InterviewScheduler
            candidate={activeCandidate}
            onClose={()=>setIsSchedulerOpen(false)}
            onScheduled={data=>setScheduledInterviews(p=>[...p,data])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}