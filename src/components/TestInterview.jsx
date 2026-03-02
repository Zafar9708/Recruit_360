import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Play, Clock, CheckCircle, Loader2, 
  ShieldCheck, ArrowRight, XCircle, AlertCircle, Bot
} from 'lucide-react';

const TestInterview = () => {
  // --- 1. SESSION STATE ---
  const [candidate, setCandidate] = useState(null);
  const [step, setStep] = useState('setup'); 
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(3600);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState(['> System initialized...']);
  
  // --- 2. REFS ---
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  // --- 3. START SESSION ---
  const handleStartSetup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const jd = formData.get('jd');

    setCandidate({
      id: "CAND-" + Math.random().toString(36).substr(2, 5).toUpperCase(),
      name: name,
      jd: jd
    });
    setStep('lobby');
  };

  // --- 4. FETCH AI QUESTIONS ---
  useEffect(() => {
    if (step === 'lobby' && candidate) {
      const fetchQuestions = async () => {
        setLoading(true);
        try {
          const formData = new FormData();
          formData.append('jd', candidate.jd);

          const response = await fetch('http://localhost:8000/start-interview', {
            method: 'POST',
            body: formData
          });
          const result = await response.json();

          const formatted = [
            ...result.data.objective.map(q => ({ ...q, type: 'mcq' })),
            ...result.data.subjective.map(q => ({ ...q, type: 'subjective' }))
          ];

          setQuestions(formatted);
          setTerminalOutput(prev => [...prev, `> Hello ${candidate.name}, questions ready.`]);
        } catch (err) {
          setTerminalOutput(prev => [...prev, '> ERROR: Backend connection failed.']);
        } finally {
          setLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [step, candidate]);

  // --- 5. CAMERA & RECORDING LOGIC ---
  useEffect(() => {
    if (step === 'assessment' && videoRef.current) {
      const initCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 1280, height: 720 }, 
            audio: true 
          });
          
          streamRef.current = stream;
          
          // CRITICAL: Link stream to video tag
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Force play in case of browser policy issues
            await videoRef.current.play();
          }

          const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
          
          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunksRef.current.push(e.data);
          };

          recorder.onstop = async () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            chunksRef.current = [];
            await uploadToDB(blob);
          };

          mediaRecorderRef.current = recorder;
          mediaRecorderRef.current.start();
          setTerminalOutput(prev => [...prev, `> Recording LIVE: ${candidate.name}`]);
        } catch (err) {
          setTerminalOutput(prev => [...prev, `> Camera Denied: ${err.message}`]);
          alert("Camera Permission Required!");
        }
      };

      initCamera();
    }

    // Cleanup camera when finished
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [step]);

  // --- 6. SAVE TO DATABASE (REAL DATA) ---
  const uploadToDB = async (blob) => {
    setIsUploading(true);
    setTerminalOutput(prev => [...prev, `> Saving data for ${candidate.name}...`]);
    
    const formData = new FormData();
    // These keys must match your FastAPI request.form.get() keys
    formData.append('candidate_name', candidate.name); 
    formData.append('candidate_id', candidate.id);
    formData.append('question_text', questions[currentQuestionIndex].question);
    formData.append('video', blob, `${candidate.name}_q${currentQuestionIndex}.webm`);

    try {
      const res = await fetch(`http://localhost:8000/submit-answer/${candidate.id}`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setTerminalOutput(prev => [...prev, `> Q${currentQuestionIndex + 1} Saved to MongoDB ✅`]);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          // Restart recorder for next question
          if (mediaRecorderRef.current) mediaRecorderRef.current.start();
        } else {
          setStep('completed');
        }
      }
    } catch (err) {
      setTerminalOutput(prev => [...prev, '> Error syncing to DB ❌']);
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  // --- UI RENDERING ---

  if (step === 'setup') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <form onSubmit={handleStartSetup} className="bg-white p-10 rounded-[2rem] shadow-2xl max-w-md w-full">
          <h2 className="text-3xl font-black text-blue-950 mb-8 tracking-tight">AI Interview Test</h2>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Candidate Full Name</label>
              <input required name="name" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl mt-2 focus:border-blue-500 outline-none transition-all" placeholder="Enter real name..." />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Job Context</label>
              <textarea required name="jd" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl mt-2 h-32 focus:border-blue-500 outline-none transition-all" placeholder="Paste JD here..." />
            </div>
            <button type="submit" className="w-full py-5 bg-blue-950 text-white rounded-2xl font-bold text-lg hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/20">
              Enter Interview
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b px-10 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <span className="font-black text-blue-950 uppercase text-[10px] tracking-widest">Recording Live</span>
          </div>
          <div className="h-5 w-px bg-slate-200" />
          <span className="font-bold text-slate-500">{candidate?.name}</span>
        </div>
        <button onClick={() => window.location.reload()} className="p-2 hover:bg-slate-100 rounded-full transition-all">
          <XCircle className="text-slate-300 hover:text-red-500" size={24} />
        </button>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {step === 'lobby' ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            {loading ? (
              <div className="space-y-4">
                <Loader2 className="animate-spin text-blue-600 mx-auto" size={48} />
                <p className="font-bold text-blue-950">Generating questions for {candidate.name}...</p>
              </div>
            ) : (
              <div className="max-w-md">
                <ShieldCheck size={64} className="text-blue-950 mx-auto mb-6" />
                <h1 className="text-4xl font-black text-blue-950 mb-4">Start Recording</h1>
                <p className="text-slate-500 mb-10">The camera will activate immediately. Please stay in frame for the duration of the test.</p>
                <button onClick={() => setStep('assessment')} className="w-full py-5 bg-blue-950 text-white rounded-2xl font-bold text-xl shadow-xl">
                  Open Camera & Begin
                </button>
              </div>
            )}
          </div>
        ) : step === 'completed' ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
               <CheckCircle size={48} className="text-emerald-500" />
            </div>
            <h1 className="text-4xl font-black text-blue-950 mb-2">Interview Complete</h1>
            <p className="text-slate-500">Video for <b>{candidate.name}</b> saved to MongoDB.</p>
            <button onClick={() => window.location.reload()} className="mt-10 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold">Restart System</button>
          </div>
        ) : (
          <>
            {/* Question Area */}
            <div className="flex-1 overflow-y-auto p-16 bg-slate-50">
              <div className="max-w-2xl mx-auto">
                <span className="text-blue-600 font-black text-xs uppercase tracking-tighter">Question {currentQuestionIndex + 1} of {questions.length}</span>
                <h2 className="text-3xl font-black text-blue-950 mt-4 mb-10 leading-tight">
                  {questions[currentQuestionIndex]?.question}
                </h2>

                <div className="flex items-center gap-6 mt-20 border-t border-slate-200 pt-10">
                   <div className="flex-1 bg-slate-900 p-5 rounded-2xl font-mono text-[10px] text-emerald-400 shadow-2xl">
                      {terminalOutput.slice(-2).map((line, i) => <div key={i} className="flex gap-2"><span>{'>'}</span>{line}</div>)}
                   </div>
                   <button 
                    disabled={isUploading}
                    onClick={handleNext}
                    className="px-12 py-5 bg-blue-950 text-white rounded-2xl font-bold shadow-xl disabled:opacity-50 hover:scale-105 active:scale-95 transition-all"
                   >
                    {isUploading ? <Loader2 className="animate-spin" /> : 'Submit Answer'}
                   </button>
                </div>
              </div>
            </div>

            {/* Sidebar - REAL CAMERA FEED */}
            <div className="w-[400px] bg-blue-950 p-8 flex flex-col">
              <div className="aspect-video bg-black rounded-3xl overflow-hidden relative border-4 border-blue-900 shadow-2xl">
                {/* THE ACTUAL VIDEO TAG */}
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover mirror-mode"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-2 py-1 rounded text-[8px] font-black text-white uppercase animate-pulse">
                  <Video size={10} /> Live Feed
                </div>
              </div>

              <div className="mt-8 flex-1 bg-blue-900/30 rounded-3xl p-6 border border-blue-800">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="text-blue-400" size={20} />
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">AI Intelligence</span>
                </div>
                <p className="text-xs text-blue-100 leading-relaxed opacity-70 italic">
                  "Hello {candidate.name.split(' ')[0]}, I am monitoring your gaze and speech clarity. Please speak clearly into the microphone."
                </p>
              </div>
            </div>
          </>
        )}
      </main>
      <style dangerouslySetInnerHTML={{ __html: `.mirror-mode { transform: scaleX(-1); }` }} />
    </div>
  );
};

export default TestInterview;