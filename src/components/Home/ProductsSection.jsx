import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Handshake, Users, 
  Cpu, Check, Play, Plus, 
  Search, Bell, FileText, 
  BarChart3, Settings, TrendingUp, Layout
} from "lucide-react";

const STAKEHOLDERS = [
  {
    id: "client",
    role: "Sales",
    path: "/login/end-client", // Updated Path
    icon: <Building2 size={16} />,
    gradient: "from-orange-500 to-yellow-500",
    accent: "orange-500",
    desc: "Post requirements, access databases, and receive direct vendor submissions.",
    mockup: {
      header: "Hiring Terminal",
      stats: ["12 Reqs", "45 Subs", "9 Intv"],
      items: [
        { title: "React Architect", meta: "Direct Vendor Sub", time: "2m ago" },
        { title: "Product Manager", meta: "Database Match", time: "1h ago" }
      ]
    }
  },
  {
    id: "vendor",
    role: "Recruiter",
    path: "/login/vendor", // Updated Path
    icon: <Handshake size={16} />,
    gradient: "from-yellow-400 to-orange-500",
    accent: "yellow-600",
    desc: "Bulk bench uploads and profile submission tracking with real-time status.",
    mockup: {
      header: "Vendor Sync",
      stats: ["120 Bench", "18 Subs", "92% Acc."],
      items: [
        { title: "Bench Upload", meta: "32 Profiles Added", time: "Success" },
        { title: "Client A-102", meta: "Viewed by HR", time: "Update" }
      ]
    }
  },
  {
    id: "candidate",
    role: "Candidate",
    path: "/register/candidate", // Updated Path
    icon: <Users size={16} />,
    gradient: "from-purple-500 to-indigo-600",
    accent: "purple-600",
    desc: "Self-service profiles and live application tracking for higher engagement.",
    mockup: {
      header: "Career Hub",
      stats: ["8 Apps", "4 Views", "1 Offer"],
      items: [
        { title: "Google Cloud", meta: "Round 2 Interview", time: "10 AM" },
        { title: "FinTech Inc", meta: "Application Sent", time: "Active" }
      ]
    }
  },
  {
    id: "ats",
    role: "Core ATS",
    path: "https://ats-frontend-one.vercel.app", // Updated Path
    icon: <Cpu size={16} />,
    gradient: "from-indigo-600 to-purple-500",
    accent: "indigo-600",
    desc: "End-to-end workflow automation from shortlisting to final placement.",
    mockup: {
      header: "ATS Engine",
      stats: ["85% Score", "12 Hired", "4d Fill"],
      items: [
        { title: "Workflow Bot", meta: "Email Triggered", time: "Auto" },
        { title: "Parsing Engine", meta: "50 Files Synced", time: "Live" }
      ]
    }
  }
];

export default function ProductEcosystem() {
  const [active, setActive] = useState(STAKEHOLDERS[0]);

  // Handler for navigation
  const handleLaunch = () => {
    if (active.path.startsWith('http')) {
      window.open(active.path, '_blank'); // Open external link in new tab
    } else {
      window.location.href = active.path; // Navigate internal links
    }
  };

  return (
    <section id="products" className="bg-white py-12 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Compact */}
        <div className="mb-10">
          <h2 className="text-5xl font-black text-indigo-950 tracking-tighter mb-2">
            RecruitX<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-purple-500">360</span>
          </h2>
          <p className="text-sm font-bold text-indigo-900/40 uppercase tracking-widest">Enterprise Architecture</p>
        </div>

        {/* TABS - Compact & High-End */}
        <div className="inline-flex p-1 bg-indigo-50/50 rounded-xl border border-indigo-100 mb-12 flex-wrap">
          {STAKEHOLDERS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              className={`px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                active.id === s.id ? "bg-white shadow-sm text-indigo-950" : "text-indigo-900/30 hover:text-indigo-900"
              }`}
            >
              <span className={active.id === s.id ? `text-${active.accent}` : ""}>{s.icon}</span>
              <span className="text-xs font-black whitespace-nowrap">{s.role}</span>
            </button>
          ))}
        </div>

        {/* MAIN DISPLAY */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Content Left */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className={`h-1 w-12 bg-gradient-to-r ${active.gradient}`} />
                <h3 className="text-4xl font-black text-indigo-950 tracking-tight leading-tight">
                  The <span className={`text-transparent bg-clip-text bg-gradient-to-r ${active.gradient}`}>{active.role}</span> Solution
                </h3>
                <p className="text-md font-bold text-indigo-950/60 leading-relaxed">
                  {active.desc}
                </p>
                <div className="space-y-3">
                  {["Automated Tracking", "Real-time Sync", "Direct Submissions"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check size={14} className={`text-${active.accent}`} strokeWidth={4} />
                      <span className="text-sm font-black text-indigo-950/80">{f}</span>
                    </div>
                  ))}
                </div>
                {/* Updated Button with onClick */}
                <button 
                  onClick={handleLaunch}
                  className={`mt-4 px-6 py-3 rounded-xl bg-indigo-950 text-white font-black text-xs tracking-widest flex items-center gap-2 hover:scale-105 transition-transform`}
                >
                  LAUNCH APP <Play size={10} fill="white" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* App Mockup Right with Sidebar */}
          <div className="lg:col-span-8">
            <motion.div
              key={`app-${active.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-[4px] border-indigo-950 rounded-[2rem] shadow-2xl overflow-hidden flex min-h-[420px]"
            >
              <div className="w-16 bg-indigo-950 flex flex-col items-center py-6 gap-6">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${active.gradient} flex items-center justify-center text-white`}><Layout size={16}/></div>
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/40"><BarChart3 size={16}/></div>
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/40"><FileText size={16}/></div>
                <div className="mt-auto w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20"><Settings size={16}/></div>
              </div>

              <div className="flex-1">
                <div className="p-6 border-b border-indigo-50 flex justify-between items-center bg-white">
                  <h4 className="font-black text-indigo-950 text-sm uppercase tracking-tighter">{active.mockup.header}</h4>
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center"><Search size={14} className="text-indigo-950/40"/></div>
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center relative">
                      <Bell size={14} className="text-indigo-950/40"/>
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 border-b border-indigo-50">
                  {active.mockup.stats.map((s, idx) => (
                    <div key={idx} className="p-4 text-center border-r border-indigo-50 last:border-0">
                      <p className="text-[9px] font-black text-indigo-900/30 uppercase mb-0.5">{s.split(' ')[1]}</p>
                      <p className="text-base font-black text-indigo-950">{s.split(' ')[0]}</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 space-y-3">
                  {active.mockup.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-indigo-50 bg-white">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${active.gradient} opacity-20`} />
                        <div>
                          <p className="font-black text-indigo-950 text-xs">{item.title}</p>
                          <p className="text-[9px] font-bold text-indigo-900/30 uppercase">{item.meta}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">{item.time}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-dashed border-indigo-100 flex justify-center">
                    <button className="text-[9px] font-black text-indigo-900/20 uppercase tracking-widest hover:text-indigo-950 transition-colors">+ View All Activity</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}