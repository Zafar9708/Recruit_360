import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  X, Calendar, Clock, Video, 
  CheckCircle2, ChevronRight, Globe 
} from "lucide-react";

export default function InterviewScheduler({ candidate, onClose }) {
  const [step, setStep] = useState(1); // 1: Setup, 2: Success
  const [selectedDate, setSelectedDate] = useState("2026-02-10");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [platform, setPlatform] = useState("Google Meet");

  const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];
  
  const platforms = [
    { name: "Google Meet", icon: <Video size={16} /> },
    { name: "Zoom", icon: <Video size={16} /> },
    { name: "MS Teams", icon: <Video size={16} /> }
  ];

  const handleSchedule = () => {
    // In a real app, you would call your API here
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-blue-950/30 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden"
      >
        {step === 1 ? (
          <div className="p-10">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black text-blue-950 tracking-tight">Schedule Interview</h2>
                <p className="text-sm text-gray-400 font-medium mt-1 flex items-center gap-2">
                  Booking session for <span className="text-blue-600 font-bold">{candidate.name}</span>
                </p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Date Selection */}
              <section>
                <label className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-3 block px-1">1. Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-blue-950 outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
                  />
                </div>
              </section>

              {/* Platform Selection */}
              <section>
                <label className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-3 block px-1">2. Conference Platform</label>
                <div className="grid grid-cols-3 gap-3">
                  {platforms.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setPlatform(p.name)}
                      className={`py-3.5 px-2 rounded-2xl border text-[11px] font-bold transition-all flex flex-col items-center gap-2 ${
                        platform === p.name 
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
                        : "bg-white border-gray-100 text-gray-500 hover:border-blue-200 hover:bg-gray-50"
                      }`}
                    >
                      {p.icon}
                      {p.name}
                    </button>
                  ))}
                </div>
              </section>

              {/* Time Slots */}
              <section>
                <label className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-3 block px-1">3. Available Slots</label>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3.5 px-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                        selectedSlot === slot 
                        ? "bg-blue-50 border-blue-600 text-blue-600" 
                        : "bg-gray-50/50 border-transparent text-gray-500 hover:bg-gray-100/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={14} className={selectedSlot === slot ? "text-blue-600" : "text-gray-400"} />
                        {slot}
                      </div>
                      {selectedSlot === slot && <CheckCircle2 size={14} />}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Submit Action */}
            <button
              disabled={!selectedSlot}
              onClick={handleSchedule}
              className="w-full mt-10 py-4 bg-blue-950 text-white rounded-[20px] font-bold text-sm hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20"
            >
              Schedule with {platform} <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          /* Success State */
          <div className="p-16 text-center flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-8"
            >
              <CheckCircle2 size={48} strokeWidth={2.5} />
            </motion.div>
            <h2 className="text-2xl font-black text-blue-950 mb-3 tracking-tight">Interview Confirmed!</h2>
            <p className="text-sm text-gray-400 font-medium max-w-xs mx-auto mb-10 leading-relaxed">
              We've sent a <span className="text-blue-950 font-bold">{platform}</span> invite to {candidate.name} for <span className="text-blue-950 font-bold">{selectedDate}</span> at <span className="text-blue-950 font-bold">{selectedSlot}</span>.
            </p>
            <button 
              onClick={onClose}
              className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Return to Pipeline
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}