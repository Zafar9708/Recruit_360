import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Video, Mic, MicOff, Camera, CameraOff, Monitor,
  Play, Send, Clock, CheckCircle, AlertCircle,
  User, Bot, Loader2, Code, Layout, ListChecks, Terminal,
  ShieldCheck, Save, ArrowRight, XCircle, Globe, Cpu,
  Building2, Briefcase, Home, LogOut
} from 'lucide-react';

export default function AIInterviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get candidate data from navigation state or use default
  const candidate = location.state?.candidate || {
    name: "Jonathan Reeves",
    title: "Senior Full Stack Developer",
    jobTitle: "Senior Full Stack Developer",
    matchScore: 98,
    id: "1"
  };

  const [step, setStep] = useState('lobby'); // lobby, assessment, completed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(3600); // 60 minutes
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
        .then(stream => { 
          videoRef.current.srcObject = stream; 
          setIsRecording(true); 
        })
        .catch(() => alert("Proctoring requires camera access."));
    }
  }, [step]);

  const runCode = () => {
    setTerminalOutput(prev => [...prev, '> Running test cases...', '> Output: [1, 2]', '> Test Passed: 1/1 ✅']);
  };

  const formatTime = (s) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    // Stop camera stream
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    navigate(-1); // Go back to previous page
  };

  // Lobby Component
  const Lobby = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-blue-950">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
        <ShieldCheck size={48} className="text-white" />
      </div>
      <h2 className="text-4xl font-black mb-4 tracking-tight">AI Interview Session</h2>
      <p className="text-blue-600 mb-2 text-center max-w-lg text-lg font-medium">
        Candidate: <span className="font-bold text-blue-950">{candidate.name}</span>
      </p>
      <p className="text-blue-600 mb-2 text-center max-w-lg">
        Position: <span className="font-bold text-blue-950">{candidate.jobTitle}</span>
      </p>
      <p className="text-blue-500 text-sm mb-10 text-center max-w-lg">
        This is a proctored environment. Tab switching and external communication are strictly prohibited.
      </p>
      
      <div className="grid grid-cols-3 gap-6 w-full max-w-3xl mb-12">
        {[
          { icon: Camera, label: "Face Tracking Active", color: "bg-blue-100 text-blue-600" },
          { icon: Globe, label: "IP Monitoring", color: "bg-blue-100 text-blue-600" },
          { icon: Cpu, label: "Browser Locked", color: "bg-blue-100 text-blue-600" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
            <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-3`}>
              <item.icon className="text-blue-600" size={24} />
            </div>
            <span className="text-xs font-bold text-blue-900 text-center">{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-4 w-full max-w-md">
        <button 
          onClick={() => setStep('assessment')}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3"
        >
          <Play size={20} />
          Start AI Interview
          <ArrowRight size={20}/>
        </button>
        
        <button 
          onClick={handleClose}
          className="w-full py-3 border-2 border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all"
        >
          Return to Candidate Profile
        </button>
      </div>
    </div>
  );

  // Completed Component
  const Completed = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-gradient-to-br from-green-50 via-white to-blue-100">
      <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
        <CheckCircle size={64} className="text-white" />
      </div>
      <h2 className="text-4xl font-black text-green-900 mb-4">Interview Completed!</h2>
      <p className="text-green-700 mb-2 text-center max-w-lg">
        AI assessment has been successfully completed for
      </p>
      <p className="text-xl font-bold text-blue-950 mb-8">{candidate.name}</p>
      
      <div className="grid grid-cols-2 gap-6 w-full max-w-md mb-12">
        <div className="p-6 bg-white rounded-2xl border border-green-100 shadow-sm">
          <p className="text-sm font-semibold text-green-600 mb-2">Time Taken</p>
          <p className="text-2xl font-black text-green-900">{formatTime(3600 - timer)}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
          <p className="text-sm font-semibold text-blue-600 mb-2">Questions Answered</p>
          <p className="text-2xl font-black text-blue-900">{Object.keys(answers).length}/2</p>
        </div>
      </div>
      
      <div className="space-y-4 w-full max-w-md">
        <button 
          onClick={() => navigate(`/end-client/jobs/${location.state?.jobId}/applicants/${candidate.id}`)}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3"
        >
          View Candidate Profile
        </button>
        
        <button 
          onClick={() => navigate('/end-client/jobs')}
          className="w-full py-3 border-2 border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all"
        >
          Back to Jobs Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="h-20 border-b border-blue-100 bg-white/90 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-blue-600" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-blue-950 font-bold text-sm uppercase tracking-wider">
              {step === 'lobby' ? 'Ready' : step === 'completed' ? 'Completed' : 'Live Interview'}
            </span>
          </div>
          
          <div className="h-6 w-[1px] bg-blue-100" />
          
          <div>
            <h1 className="text-lg font-bold text-blue-950">AI Interview</h1>
            <p className="text-sm text-blue-600">Candidate: {candidate.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {step !== 'lobby' && step !== 'completed' && (
            <div className="flex items-center gap-3 px-4 py-2.5 bg-blue-50 rounded-xl border border-blue-100">
              <Clock size={16} className="text-blue-600" />
              <span className="text-blue-950 font-mono font-bold text-xl">{formatTime(timer)}</span>
            </div>
          )}
          
          <button 
            onClick={handleClose}
            className="px-4 py-2 border border-blue-200 text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition-colors"
          >
            Exit Interview
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {step === 'lobby' ? <Lobby /> : 
         step === 'completed' ? <Completed /> : (
          <>
            {/* WORKSPACE AREA */}
            <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-y-auto">
              <div className="p-8 max-w-5xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Part {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                    {questions[currentQuestionIndex].type === 'mcq' ? 'Theory Assessment' : 'Coding Challenge'}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-blue-950 mb-6 tracking-tight">
                  {questions[currentQuestionIndex].title}
                </h2>

                {questions[currentQuestionIndex].type === 'mcq' ? (
                  <div className="space-y-6">
                    <p className="text-lg text-blue-700 mb-8 leading-relaxed font-medium">
                      {questions[currentQuestionIndex].question}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {questions[currentQuestionIndex].options.map((opt, i) => (
                        <button 
                          key={i}
                          onClick={() => setAnswers({...answers, [currentQuestionIndex]: i})}
                          className={`w-full p-6 text-left rounded-xl border-2 transition-all flex items-center gap-6 ${
                            answers[currentQuestionIndex] === i 
                              ? 'border-blue-600 bg-blue-50 shadow-sm' 
                              : 'border-blue-100 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                            answers[currentQuestionIndex] === i 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className={`font-medium text-lg ${
                            answers[currentQuestionIndex] === i ? 'text-blue-950' : 'text-blue-700'
                          }`}>
                            {opt}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-6 bg-white rounded-xl border border-blue-100 text-blue-700 font-medium whitespace-pre-wrap leading-relaxed shadow-sm">
                      {questions[currentQuestionIndex].description}
                    </div>
                    
                    {/* Code Editor */}
                    <div className="rounded-xl border-2 border-blue-200 overflow-hidden shadow-sm">
                      <div className="bg-blue-50 px-4 py-3 border-b border-blue-200 flex justify-between items-center">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-amber-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <span className="text-xs font-semibold text-blue-600">JavaScript Editor</span>
                      </div>
                      <textarea 
                        className="w-full h-72 p-6 font-mono text-sm text-blue-950 focus:outline-none bg-white leading-relaxed resize-none"
                        defaultValue={questions[currentQuestionIndex].initialCode}
                        spellCheck="false"
                      />
                      <div className="bg-blue-950 p-4 font-mono text-xs text-green-400 h-32 overflow-y-auto">
                        {terminalOutput.map((line, i) => (
                          <div key={i} className="mb-1">{line}</div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={runCode}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-200"
                      >
                        <Play size={16} /> Run Code
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-12 flex justify-between items-center border-t border-blue-100 pt-8">
                  <p className="text-blue-500 text-sm font-medium">
                    Progress auto-saved at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <div className="flex gap-4">
                    {currentQuestionIndex > 0 && (
                      <button 
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                        className="px-6 py-3 border-2 border-blue-200 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        if (currentQuestionIndex === questions.length - 1) {
                          setStep('completed');
                        } else {
                          setCurrentQuestionIndex(currentQuestionIndex + 1);
                        }
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-200"
                    >
                      {currentQuestionIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PROCTORING SIDEBAR */}
            <div className="w-80 border-l border-blue-100 bg-gradient-to-b from-blue-950 to-blue-900 flex flex-col">
              <div className="p-6">
                <div className="aspect-video bg-black rounded-xl overflow-hidden relative border-2 border-blue-800 shadow-xl">
                  <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <div className="px-2 py-1 bg-red-600 text-[10px] font-bold text-white uppercase rounded animate-pulse">
                      Live Feed
                    </div>
                  </div>
                  {!isRecording && (
                    <div className="absolute inset-0 bg-blue-950/80 flex items-center justify-center">
                      <div className="text-center">
                        <CameraOff className="w-8 h-8 text-white mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">Camera Starting...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 p-6 space-y-8">
                <div>
                  <h4 className="text-sm font-bold text-blue-300 mb-4">AI Proctoring Analysis</h4>
                  <div className="space-y-4">
                    {[
                      { label: "Focus Level", value: "94%", color: "bg-blue-400" },
                      { label: "Integrity Score", value: "99%", color: "bg-green-400" },
                      { label: "Environment", value: "Secure", color: "bg-blue-400" }
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs font-medium text-blue-300 mb-2">
                          <span>{stat.label}</span>
                          <span className="text-white font-bold">{stat.value}</span>
                        </div>
                        <div className="h-2 w-full bg-blue-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${stat.color} rounded-full transition-all duration-500`}
                            style={{ 
                              width: stat.value.includes('%') 
                                ? stat.value 
                                : '100%' 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-800/40 rounded-xl border border-blue-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot size={16} className="text-blue-300" />
                    <span className="text-white font-semibold text-sm">AI System Note</span>
                  </div>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Candidate is focused on the coding challenge. No suspicious activity detected.
                  </p>
                </div>

                <div className="pt-6 border-t border-blue-800">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-xs text-blue-300 mb-1">Time Remaining</p>
                      <p className="text-xl font-bold text-white">{formatTime(timer)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-blue-300 mb-1">Questions Done</p>
                      <p className="text-xl font-bold text-white">{currentQuestionIndex + 1}/{questions.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-blue-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-400">Secure Session</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400 font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}