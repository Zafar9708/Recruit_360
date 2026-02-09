import { Check, Lightbulb, Shield, Eye, Users,  Search } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroIllustration() {
  return (
    <>
    <motion.div
      className="relative w-full h-[260px] flex justify-center items-center mt-25"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >

      {/* SVG CONNECTOR LINES */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 260"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <line x1="1" y1="130" x2="1050" y2="130" stroke="#E5E7EB" strokeWidth="2" />

        <line x1="400" y1="130" x2="200" y2="70" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="300" y1="130" x2="200" y2="190" stroke="#E5E7EB" strokeWidth="1" />

        <line x1="700" y1="130" x2="800" y2="70" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="600" y1="130" x2="800" y2="190" stroke="#E5E7EB" strokeWidth="1" />

        <line x1="200" y1="70" x2="120" y2="70" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="200" y1="190" x2="120" y2="190" stroke="#E5E7EB" strokeWidth="1" />

        <line x1="800" y1="70" x2="880" y2="70" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="800" y1="190" x2="880" y2="190" stroke="#E5E7EB" strokeWidth="1" />

        <circle cx="200" cy="70" r="5" fill="#7C3AED" />
        <circle cx="200" cy="190" r="5" fill="#7C3AED" />
        <circle cx="800" cy="70" r="5" fill="#7C3AED" />
        <circle cx="800" cy="190" r="5" fill="#7C3AED" />
      </motion.svg>

      {/* CENTER CARD */}
      <motion.div
        className="z-10 w-35 h-35 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-400 shadow-xl flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Check className="w-10 h-10 text-white" />
      </motion.div>

      {/* FLOATING ICON VARIANT */}
      {[
        { left: "320px", top: "20px", bg: "bg-yellow-400", icon: <Lightbulb className="w-8 h-8" /> },
        { left: "320px", top: "170px", bg: "bg-sky-400", icon: <Users className="w-8 h-8 text-white" /> },
        { right: "320px", top: "20px", bg: "bg-orange-500", icon: <Shield className="w-8 h-8 text-white" /> },
      ].map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.bg} w-18 h-18 rounded-xl shadow-lg flex items-center justify-center`}
          style={{ left: item.left, right: item.right, top: item.top }}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* LEFT AVATAR */}
      <motion.img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="avatar"
        className="absolute left-[175px] top-[70px] w-25 h-25 rounded-xl object-cover shadow-lg"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      {/* RIGHT AVATAR */}
      <motion.img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="avatar"
        className="absolute right-[320px] top-[170px] w-18 h-18 rounded-xl object-cover shadow-lg"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
      />

      {/* RIGHT EYE ICON */}
      <motion.div
        className="absolute right-[160px] top-[70px] w-25 h-25 rounded-xl bg-white shadow-lg flex items-center justify-center"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <Eye className="w-10  h-10 text-gray-700" />
      </motion.div>

    </motion.div>

    <div className="mt-12 text-center">
  <h1 className="text-[50px] md:text-[56px] leading-tight font-bold text-gray-900 tracking-tight">
    All-in-one Recruitment <br />
    <span className="text-gray-900">platform</span>
  </h1>

  <p className="mt-4 max-w-xl mx-auto text-base text-gray-500 leading-relaxed">
    RecruitX360 is a modern, all-in-one recruitment platform designed to
    perfectly fit your business needs
  </p>

  <button className="mt-8 px-8 py-3 rounded-2xl bg-orange-600 text-white text-sm font-medium
                     shadow-[0_10px_25px_rgba(249,115,22,0.45)]
                     hover:bg-orange-600 transition">
    Request a Demo
  </button>
</div>


</>
  );
}
