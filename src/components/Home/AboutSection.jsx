import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Briefcase,
  Upload,
  UserCheck,
  Layers,
  ArrowRight,
  Plus,
  Settings2
} from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-yellow-500">
              Recruit_X
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            A Complete Recruitment Ecosystem Platform integrating ATS,
            Vendor Management, Client Hiring, and Candidate Engagement
            into one unified system.
          </p>
        </motion.div>

        {/* --- Platform Narrative Section --- */}
        <div className="relative mb-20">
          {/* Decorative background blurs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] -z-10" />
          <div className="absolute top-40 -right-20 w-96 h-96 bg-orange-100/50 rounded-full blur-[100px] -z-10" />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-8"
            >
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900">Recruit_X</strong> is not just an Applicant Tracking System — it is a
                  comprehensive recruitment ecosystem designed to connect
                  Clients, Vendors, and Candidates on a single powerful platform.
                </p>
                <p className="border-l-4 border-yellow-400 pl-6 py-2 bg-yellow-50/30 rounded-r-2xl">
                  Our platform includes a fully integrated ATS module to manage
                  the complete hiring lifecycle, along with vendor bench
                  management and a dedicated candidate portal.
                </p>
                <p>
                  With <span className="text-blue-600 font-bold">10,000+ candidates</span> and 
                  <span className="text-orange-600 font-bold"> 10,000+ hiring partners</span>,
                  Recruit_X simplifies, accelerates, and optimizes recruitment
                  at scale.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900">10k+</span>
                    <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Talent Pool</span>
                </div>
                <div className="w-px h-12 bg-slate-200 hidden sm:block" />
                <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900">10k+</span>
                    <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Global Partners</span>
                </div>
              </div>
            </motion.div>

            {/* Feature List Narrative */}
            <div className="space-y-12 relative">
               {/* Vertical Line Connector extended for 4 items */}
               <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-slate-100 hidden sm:block" />

               <FeatureItem 
                  icon={<Briefcase className="w-5 h-5" />}
                  color="bg-blue-500"
                  title="Client Hiring Module"
                  desc="Post requirements, access databases, and receive direct vendor submissions."
               />
               <FeatureItem 
                  icon={<Upload className="w-5 h-5" />}
                  color="bg-orange-500"
                  title="Vendor Management"
                  desc="Bulk bench uploads and profile submission tracking with real-time status."
               />
               <FeatureItem 
                  icon={<UserCheck className="w-5 h-5" />}
                  color="bg-yellow-500"
                  title="Candidate Portal"
                  desc="Self-service profiles and live application tracking for higher engagement."
               />
               {/* Added ATS Item below Candidate Portal */}
               <FeatureItem 
                  icon={<Layers className="w-5 h-5" />}
                  color="bg-slate-800"
                  title="ATS (Applicant Tracking System)"
                  desc="End-to-end workflow automation from shortlisting to final placement."
               />
            </div>
          </div>
        </div>

        {/* --- Mission & Vision - Minimalist Split --- */}
        <div className="mt-0 grid md:grid-cols-2 gap-16 border-t border-slate-100 pt-16">
          <div className="space-y-4">
            <h4 className="text-orange-500 font-black uppercase tracking-[0.2em] text-sm">01. Our Mission</h4>
            <p className="text-2xl font-bold text-slate-900 leading-snug">
               Connect Clients, Vendors, and Candidates while enabling structured, transparent, and scalable hiring.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-blue-500 font-black uppercase tracking-[0.2em] text-sm">02. Our Vision</h4>
            <p className="text-2xl font-bold text-slate-900 leading-snug">
               Redefine recruitment technology by integrating intelligent tracking and talent discovery into one seamless platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, color, title, desc }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-6 group"
    >
      <div className={`relative z-10 w-12 h-12 shrink-0 rounded-full ${color} text-white flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          {title} 
          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-slate-400" />
        </h4>
        <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}