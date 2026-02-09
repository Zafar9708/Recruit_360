import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Video, Mic, MicOff, Camera, CameraOff, Monitor,
  Play, Send, Clock, CheckCircle, AlertCircle,
  User, Bot, Loader2, Code, Layout, ListChecks, Terminal,
  ShieldCheck, Save, ArrowRight, XCircle, Globe, Cpu
} from 'lucide-react';

const AIInterview = ({ candidate, onClose, sidebarWidth = 280 }) => {
  const [step, setStep] = useState('lobby'); // lobby, assessment, completed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(3600);
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState({});
  const [terminalOutput, setTerminalOutput] = useState(['> System ready...', '> Initializing test environment...']);
  const videoRef = useRef(null);

  // Assessment Data
  const questions = [
    { 
      id: 1, 
      type: 'mcq', 
      title: "Architecture Selection",
      question: "In a microservices architecture, which pattern is best suited for maintaining data consistency across services without tight coupling?", 
      options: ["Two-Phase Commit", "Saga Pattern", "Shared Database", "Monolithic Trigger"],
      correct: 1 
    },
    {
      id: 2,
      type: 'coding',
      title: "Algorithm Implementation",
      description: "Implement a function `findDuplicates(arr)` that returns all numbers appearing more than once in an array. \n\nConstraints: \n- Time Complexity: O(n) \n- Space Complexity: O(n)",
      initialCode: "function findDuplicates(arr) {\n  // Your code here\n  \n}\n\n// Test Case\nconsole.log(findDuplicates([1, 2, 3, 1, 2, 4]));"
    }
  ];

  // Global Timer & Camera Logic
  useEffect(() => {
    if (step !== 'lobby' && step !== 'completed' && timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  useEffect(() => {
    if (step !== 'lobby' && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => { videoRef.current.srcObject = stream; setIsRecording(true); })
        .catch(() => alert("Proctoring requires camera access."));
    }
  }, [step]);

  const runCode = () => {
    setTerminalOutput(prev => [...prev, '> Running test cases...', '> Output: [1, 2]', '> Test Passed: 1/1 ✅']);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // Lobby Component
  const Lobby = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white text-blue-950">
      <div className="w-24 h-24 bg-blue-950 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
        <ShieldCheck size={48} className="text-white" />
      </div>
      <h2 className="text-5xl font-black mb-4 tracking-tighter">Secure Assessment</h2>
      <p className="text-slate-500 mb-10 text-center max-w-lg text-lg">
        This is a proctored environment. Tab switching and external communication are strictly prohibited.
      </p>
      
      <div className="grid grid-cols-3 gap-6 w-full max-w-3xl mb-12">
        {[
          { icon: Camera, label: "Face Tracking Active" },
          { icon: Globe, label: "IP Monitoring" },
          { icon: Cpu, label: "Browser Locked" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <item.icon className="text-blue-600 mb-3" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => setStep('assessment')}
        className="px-12 py-5 bg-blue-950 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-blue-950/20 flex items-center gap-4"
      >
        Begin Examination <ArrowRight size={20}/>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[150] flex flex-col bg-white font-sans overflow-hidden" style={{ left: `${sidebarWidth}px` }}>
      {/* High-Contrast Header */}
      <header className="h-20 border-b border-slate-100 bg-white px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
             <span className="text-blue-950 font-black uppercase text-xs tracking-widest">Live Proctored</span>
          </div>
          <div className="h-6 w-[1px] bg-slate-200" />
          <div>
            <h1 className="text-sm font-bold text-blue-950 uppercase">{candidate.name}</h1>
            <p className="text-[10px] text-slate-400 font-medium">Session ID: #ASSESS-2026-001</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <Clock size={16} className="text-blue-600" />
            <span className="text-blue-950 font-mono font-black text-xl">{formatTime(timer)}</span>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <XCircle size={28} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {step === 'lobby' ? <Lobby /> : (
          <>
            {/* WORKSPACE AREA (White Background) */}
            <div className="flex-1 flex flex-col bg-white overflow-y-auto">
              <div className="p-12 max-w-5xl mx-auto w-full">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-950 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                    Part {currentQuestionIndex + 1}
                  </span>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    {questions[currentQuestionIndex].type === 'mcq' ? 'Theoretical Evaluation' : 'Practical Build'}
                  </span>
                </div>

                <h2 className="text-3xl font-black text-blue-950 mb-8 tracking-tight">
                  {questions[currentQuestionIndex].title}
                </h2>

                {questions[currentQuestionIndex].type === 'mcq' ? (
                  <div className="space-y-4">
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                      {questions[currentQuestionIndex].question}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {questions[currentQuestionIndex].options.map((opt, i) => (
                        <button 
                          key={i}
                          onClick={() => setAnswers({...answers, [currentQuestionIndex]: i})}
                          className={`w-full p-6 text-left rounded-2xl border-2 transition-all flex items-center gap-6 ${answers[currentQuestionIndex] === i ? 'border-blue-950 bg-blue-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-blue-200'}`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${answers[currentQuestionIndex] === i ? 'bg-blue-950 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className={`font-bold text-lg ${answers[currentQuestionIndex] === i ? 'text-blue-950' : 'text-slate-500'}`}>{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">
                      {questions[currentQuestionIndex].description}
                    </div>
                    
                    {/* Machine Coding Editor */}
                    <div className="rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-amber-400" />
                          <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Editor v1.0 — Node.js</span>
                      </div>
                      <textarea 
                        className="w-full h-80 p-8 font-mono text-sm text-blue-950 focus:outline-none bg-white leading-relaxed"
                        defaultValue={questions[currentQuestionIndex].initialCode}
                        spellCheck="false"
                      />
                      <div className="bg-slate-900 p-4 font-mono text-[11px] text-emerald-400 h-32 overflow-y-auto">
                        {terminalOutput.map((line, i) => <div key={i}>{line}</div>)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-12 flex justify-between items-center border-t border-slate-100 pt-8">
                  <p className="text-slate-400 text-xs font-medium">Progress saved automatically at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  <div className="flex gap-4">
                    {questions[currentQuestionIndex].type === 'coding' && (
                      <button onClick={runCode} className="px-6 py-3 bg-emerald-100 text-emerald-700 font-bold rounded-xl flex items-center gap-2 hover:bg-emerald-200">
                        <Play size={16} /> Run Code
                      </button>
                    )}
                    <button 
                      onClick={() => currentQuestionIndex === 1 ? setStep('completed') : setCurrentQuestionIndex(1)}
                      className="px-8 py-3 bg-blue-950 text-white font-bold rounded-xl shadow-lg shadow-blue-950/20 hover:scale-105 transition-transform"
                    >
                      {currentQuestionIndex === 1 ? 'Finish Assessment' : 'Continue to Next Part'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PROCTORING SIDEBAR (Deep Blue Background) */}
            <div className="w-80 border-l border-slate-100 bg-blue-950 flex flex-col">
              <div className="p-6">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden relative border border-blue-900 shadow-2xl">
                  <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 flex gap-2">
                     <div className="px-2 py-0.5 bg-red-600 text-[8px] font-black text-white uppercase rounded-md animate-pulse">Live Feed</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-8 space-y-10">
                <div>
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-6">AI Behavioral Analysis</h4>
                  <div className="space-y-6">
                    {[
                      { label: "Focus Persistence", val: "94%" },
                      { label: "Integrity Index", val: "99.2%" },
                      { label: "Environment Noise", val: "Low" }
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
                          <span>{stat.label}</span>
                          <span className="text-white">{stat.val}</span>
                        </div>
                        <div className="h-1 w-full bg-blue-900 rounded-full">
                          <div className="h-full bg-blue-400 rounded-full" style={{ width: stat.val.includes('%') ? stat.val : '100%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-blue-900/40 rounded-3xl border border-blue-800/50 shadow-inner">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot size={16} className="text-blue-400" />
                    <span className="text-white font-bold text-xs uppercase tracking-widest">System Note</span>
                  </div>
                  <p className="text-[11px] text-blue-200 leading-relaxed font-medium">
                    "Candidate is currently in Part 2. Focus is steady. No external devices detected in frame."
                  </p>
                </div>
              </div>

              <div className="p-8 border-t border-blue-900">
                <div className="flex items-center justify-between opacity-50">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Encrypted v2.4</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                    <div className="w-1 h-1 bg-white rounded-full animate-ping [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AIInterview;