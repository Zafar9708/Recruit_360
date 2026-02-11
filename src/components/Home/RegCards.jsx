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
    // Matching the Center Card (Purple/Indigo)
    gradient: "from-purple-500 to-indigo-600", 
    lightBg: "bg-purple-50",
    textColor: "text-purple-600",
    link: "https://ats-frontend-one.vercel.app",
    cta: "Access ATS",
  },
  {
    role: "Job Seekers",
    title: "Candidate Portal",
    desc: "Discover opportunities and manage your job applications in one place.",
    icon: <BusinessCenter sx={{ fontSize: 32 }} />,
    // Matching the "Users" floating icon (Sky Blue)
    gradient: "from-sky-400 to-blue-500",
    lightBg: "bg-sky-50",
    textColor: "text-sky-600",
    link: "/register/candidate",
    cta: "Find Jobs",
  },
  {
    role: "Companies",
    title: "Client Workspace",
    desc: "Review shortlisted candidates and track hiring progress in real time.",
    icon: <CorporateFare sx={{ fontSize: 32 }} />,
    // Matching the CTA Button & Shield icon (Orange)
    gradient: "from-orange-400 to-orange-600",
    lightBg: "bg-orange-50",
    textColor: "text-orange-600",
    link: "/login/end-client",
    cta: "Post a Job",
  },
  {
    role: "Partners",
    title: "Vendor Network",
    desc: "Submit candidates and track performance and payouts seamlessly.",
    icon: <Handshake sx={{ fontSize: 32 }} />,
    // Matching the Lightbulb icon (Yellow/Amber)
    gradient: "from-yellow-400 to-amber-500",
    lightBg: "bg-yellow-50",
    textColor: "text-amber-600",
    link: "/login/vendor",
    cta: "Partner Login",
  },
];

export default function DashboardImageCards() {
  return (
    <section className="bg-white py-24 mt-10 px-6">
      {/* Heading Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Ready to get started?
        </h2>
        <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
          Select your portal below to access your dedicated workspace and manage your recruitment workflow.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative bg-white rounded-[2rem] p-8 border border-gray-100 
                       shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]
                       transition-all duration-300 flex flex-col h-full"
          >
            {/* Icon Header - Matched to Hero Floating Icons */}
            <div className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center
                            shadow-sm transition-transform group-hover:scale-110 duration-300
                            ${card.lightBg} ${card.textColor}`}>
              {card.icon}
            </div>

            {/* Label */}
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">
              {card.role}
            </span>

            {/* Title & Desc */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow">
              {card.desc}
            </p>

            {/* Action Button - Gradient matched to Center Card */}
            <Link
              to={card.link}
              className={`w-full py-4 px-4 rounded-2xl flex items-center justify-center gap-2 
                         font-bold text-sm text-white transition-all duration-300
                         bg-gradient-to-r ${card.gradient} 
                         hover:shadow-lg active:scale-95`}
            >
              {card.cta}
              <ArrowForward sx={{ fontSize: 18 }} />
            </Link>

            {/* Floating Decorative Dot */}
            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className={`w-2 h-2 rounded-full animate-ping bg-current ${card.textColor}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Footer */}
      <div className="mt-20 text-center">
        <p className="text-[12px] text-gray-400 font-semibold uppercase tracking-widest">
          Powering recruitment for 5,000+ teams worldwide
        </p>
      </div>
    </section>
  );
}