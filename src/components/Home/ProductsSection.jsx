import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCog, Users, Building2, Handshake, 
  BarChart3, Cpu, TrendingUp, Check, 
  ArrowRight, Shield, Activity
} from "lucide-react";

const STAKEHOLDERS = [
  {
    id: "hr",
    role: "HR & Recruiters",
    icon: <UserCog size={20} />,
    color: "from-blue-500 to-indigo-600",
    accent: "blue",
    features: ["AI Resume Scoring", "Workflow Automation", "Interview Scheduler"],
    value: "Eliminates 70% of manual administrative tasks."
  },
  {
    id: "candidate",
    role: "Candidates",
    icon: <Users size={20} />,
    color: "from-orange-400 to-red-500",
    accent: "orange",
    features: ["Live Tracking Portal", "Professional Profiles", "Auto-Match Jobs"],
    value: "Increases candidate engagement by 85%."
  },
  {
    id: "vendor",
    role: "Vendors & Partners",
    icon: <Handshake size={20} />,
    color: "from-emerald-400 to-teal-600",
    accent: "emerald",
    features: ["Bench Management", "Bulk Submissions", "Payout Tracking"],
    value: "Reduces vendor-to-client submission time by 3x."
  },
  {
    id: "c-suite",
    role: "CFO & CTO",
    icon: <Shield size={20} />,
    color: "from-slate-700 to-slate-900",
    accent: "slate",
    features: ["SOC2 Compliance", "Cost-per-hire Analytics", "REST API Access"],
    value: "Full spend visibility and enterprise-grade security."
  },
  {
    id: "sales",
    role: "Sales & AMs",
    icon: <TrendingUp size={20} />,
    color: "from-yellow-400 to-orange-500",
    accent: "yellow",
    features: ["Requirement CRM", "Commission Tracking", "Client Heatmaps"],
    value: "Aligns recruitment pipeline with revenue targets."
  }
];

export default function ProductEcosystem() {
  const [active, setActive] = useState(STAKEHOLDERS[0]);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Header Section */}
        <div className="mb-20">
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
            RecruitX360 <span className="text-slate-300">Hub</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Multi-Persona Enterprise Architecture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 min-h-[600px]">
          
          {/* LEFT: Persona Selector (Interactive Menu) */}
          <div className="lg:w-1/3 flex flex-col gap-2">
            {STAKEHOLDERS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s)}
                className={`relative group flex items-center justify-between p-6 rounded-3xl transition-all duration-300 ${
                  active.id === s.id 
                  ? "bg-slate-900 text-white shadow-2xl" 
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-2 rounded-xl ${active.id === s.id ? "bg-white/10" : "bg-white shadow-sm"}`}>
                    {s.icon}
                  </div>
                  <span className="font-black text-lg">{s.role}</span>
                </div>
                {active.id === s.id && (
                  <motion.div layoutId="arrow" className="text-white/40">
                    <ArrowRight size={20} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* RIGHT: Visual Content Area (Deep Dive) */}
          <div className="lg:w-2/3 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative"
              >
                {/* Visual Background Elements */}
                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${active.color} opacity-20 blur-[100px]`} />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Activity className="text-white/40" size={16} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Real-Time Operations</span>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                      Empowering <br />
                      <span className={`bg-gradient-to-r ${active.color} bg-clip-text text-transparent`}>
                        {active.role}
                      </span>
                    </h3>
                    
                    <p className="text-slate-400 text-xl font-medium mb-10 max-w-xl">
                      {active.value}
                    </p>

                    <div className="space-y-4">
                      {active.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white transition-colors`}>
                            <Check size={12} className="group-hover:text-slate-900" />
                          </div>
                          <span className="text-lg font-bold text-white/80">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Product Interface Mockup Element */}
                  <div className="mt-12 pt-12 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Module Security</div>
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-emerald-400" />
                        <span className="text-xs font-bold">End-to-End Encrypted</span>
                      </div>
                    </div>
                    <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-black text-sm hover:scale-105 transition-transform">
                      View Demo
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Global Architecture Footer */}
        <div className="mt-12 flex flex-wrap justify-between gap-8 p-10 border border-slate-100 rounded-[2rem] bg-slate-50/50">
           <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Platform Core</span>
              <span className="text-xl font-black text-slate-800 tracking-tight underline decoration-blue-500">Recruit_X Database</span>
           </div>
           <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">API Gateway</span>
              <span className="text-xl font-black text-slate-800 tracking-tight">Enterprise Sync</span>
           </div>
           <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Global Reach</span>
              <span className="text-xl font-black text-slate-800 tracking-tight">10k+ Live Nodes</span>
           </div>
        </div>
      </div>
    </section>
  );
}