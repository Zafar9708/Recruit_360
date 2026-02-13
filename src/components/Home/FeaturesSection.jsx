import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Search, 
  BarChart3, 
  PieChart, 
  ShieldCheck, 
  Globe2, 
  Cpu, 
  Workflow,
  MousePointerClick,
  Plus
} from "lucide-react";

const FEATURES = [
  {
    title: "AI-Powered Matching",
    desc: "Smart algorithms that rank the best candidates from your database and vendor submissions automatically.",
    icon: <Cpu className="w-6 h-6" />,
    color: "blue",
    category: "Intelligence"
  },
  {
    title: "Bulk Resume Parsing",
    desc: "Upload hundreds of resumes in seconds. Our system extracts skills, experience, and contact data instantly.",
    icon: <Zap className="w-6 h-6" />,
    color: "orange",
    category: "Automation"
  },
  {
    title: "Vendor Performance Analytics",
    desc: "Track which vendors provide the highest quality talent with real-time conversion and placement data.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "yellow",
    category: "Analytics"
  },
  {
    title: "Global Compliance",
    desc: "Enterprise-grade security and data privacy protocols to ensure your recruitment stays compliant worldwide.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "blue",
    category: "Security"
  },
  {
    title: "Automated Workflows",
    desc: "Set custom triggers for emails, interview invites, and status updates to keep the pipeline moving 24/7.",
    icon: <Workflow className="w-6 h-6" />,
    color: "orange",
    category: "Process"
  },
  {
    title: "1-Click Job Posting",
    desc: "Distribute your job requirements to thousands of hiring partners and vendors with a single click.",
    icon: <MousePointerClick className="w-6 h-6" />,
    color: "yellow",
    category: "Efficiency"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#fcfcfd] py-12 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-4">Core Capabilities</h4>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
              Powerful Features for <br />
              <span className="text-slate-400">Modern Recruitment.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm border-l-2 border-slate-200 pl-6">
            Everything you need to scale your hiring process from a single, centralized command center.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50">
          {FEATURES.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>

        {/* Bottom CTA Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center text-center p-12 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-200/20"
        >
          <div className="flex -space-x-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="user" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              +10k
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to optimize your hiring?</h3>
          <p className="text-slate-500 font-medium mb-8">Join 10,000+ partners already using RecruitX360.</p>
          <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all flex items-center gap-3 group">
            Get Started Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, icon, color, category }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600",
    orange: "text-orange-600 bg-orange-50 border-orange-100 group-hover:bg-orange-600",
    yellow: "text-yellow-700 bg-yellow-50 border-yellow-100 group-hover:bg-yellow-600"
  };

  return (
    <div className="group bg-white p-10 hover:bg-slate-50 transition-all duration-300 relative overflow-hidden">
      {/* Category Tag */}
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 block">
        {category}
      </span>
      
      {/* Icon Box */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-500 ${colorMap[color]} group-hover:text-white group-hover:rotate-[10deg] group-hover:scale-110`}>
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      
      <p className="text-slate-500 leading-relaxed font-medium">
        {desc}
      </p>

      {/* Decorative Corner Element */}
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Plus className="text-slate-200 w-6 h-6" />
      </div>
    </div>
  );
}

function ArrowRight({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}