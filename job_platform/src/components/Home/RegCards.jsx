import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowForward, 
  BusinessCenter, 
  PersonSearch, 
  CorporateFare, 
  Handshake 
} from "@mui/icons-material";

const cards = [
  {
    role: "Recruiters",
    title: "ATS Dashboard",
    desc: "Manage the entire hiring pipeline from job creation to offer rollout.",
    icon: <PersonSearch sx={{ fontSize: 32 }} />,
    color: "blue",
    link: "https://ats-frontend-one.vercel.app",
    cta: "Access ATS",
  },
  {
    role: "Job Seekers",
    title: "Candidate Portal",
    desc: "Discover opportunities and manage your job applications in one place.",
    icon: <BusinessCenter sx={{ fontSize: 32 }} />,
    color: "indigo",
    link: "/register/candidate",
    cta: "Find Jobs",
  },
  {
    role: "Companies",
    title: "Client Workspace",
    desc: "Review shortlisted candidates and track hiring progress in real time.",
    icon: <CorporateFare sx={{ fontSize: 32 }} />,
    color: "slate",
    link: "/login/organization",
    cta: "Post a Job",
  },
  {
    role: "Partners",
    title: "Vendor Network",
    desc: "Submit candidates and track performance and payouts seamlessly.",
    icon: <Handshake sx={{ fontSize: 32 }} />,
    color: "cyan",
    link: "/login/organization",
    cta: "Partner Login",
  },
];

export default function DashboardImageCards() {
  return (
    <section className="bg-[#f8fafc] py-20 mt-10 px-6">
      {/* Heading Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Ready to get started?
        </h2>
        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
          Select your portal below to access your dedicated workspace and manage your recruitment workflow.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-white rounded-3xl p-8 border border-slate-200 
                       shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                       hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
          >
            {/* Icon Header */}
            <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center
                            ${card.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                              card.color === 'indigo' ? 'bg-blue-50 text-indigo-600' :
                              card.color === 'slate' ? 'bg-blue-50 text-blue-600' :
                              'bg-blue-50 text-blue-600'}`}>
              {card.icon}
            </div>

            {/* Label */}
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              {card.role}
            </span>

            {/* Title & Desc */}
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              {card.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
              {card.desc}
            </p>

            {/* Action Button - The most important part */}
            <Link
              to={card.link}
              className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 
                         font-bold text-sm transition-all duration-300
                         ${card.color === 'blue' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100' : 
                           card.color === 'indigo' ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' :
                           card.color === 'blue' ? 'bg-indigo-600 text-white hover:bg-indigo-700' :
                           'bg-blue-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-100'}`}
            >
              {card.cta}
              <ArrowForward sx={{ fontSize: 18 }} />
            </Link>

            {/* Decorative element */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Footer */}
      <div className="mt-16 text-center">
        <p className="text-sm text-slate-400 font-medium uppercase tracking-tighter">
          Powering recruitment for 5,000+ teams worldwide
        </p>
      </div>
    </section>
  );
}