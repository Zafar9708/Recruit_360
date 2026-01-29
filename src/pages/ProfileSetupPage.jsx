import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Check, 
  Star, GraduationCap, Briefcase, DollarSign, 
  Calendar, Heart, Link2, FileText, Trophy, Award, User,
  Calendar as CalendarIcon
} from 'lucide-react';

import * as Progress from '@radix-ui/react-progress';

import {
  BasicDetailsStep,
  SkillsStep,
  EducationStep,
  ExperienceStep,
  CompensationStep,
  AvailabilityStep,
  JobPreferencesStep,
  ProfessionalLinksStep,
  ProfileSummaryStep,
  InterviewSlotsStep,
} from '../components/ProfileSteps';

const steps = [
  { id: 1, title: 'Basic Details', subtitle: 'Personal information', component: BasicDetailsStep, icon: User, color: 'from-pink-500 to-rose-500' },
  { id: 2, title: 'Skills', subtitle: 'Tell us about your expertise', component: SkillsStep, icon: Star, color: 'from-blue-500 to-cyan-500' },
  { id: 3, title: 'Education', subtitle: 'Your academic background', component: EducationStep, icon: GraduationCap, color: 'from-purple-500 to-pink-500' },
  { id: 4, title: 'Experience', subtitle: 'Your professional journey', component: ExperienceStep, icon: Briefcase, color: 'from-green-500 to-emerald-500' },
  { id: 5, title: 'Compensation', subtitle: 'Your salary expectations', component: CompensationStep, icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
  { id: 6, title: 'Availability', subtitle: 'When can you start?', component: AvailabilityStep, icon: Calendar, color: 'from-red-500 to-pink-500' },
  { id: 7, title: 'Job Preferences', subtitle: 'Your ideal work environment', component: JobPreferencesStep, icon: Heart, color: 'from-indigo-500 to-purple-500' },
  { id: 8, title: 'Professional Links', subtitle: 'Connect your profiles', component: ProfessionalLinksStep, icon: Link2, color: 'from-cyan-500 to-blue-500' },
    { id: 9, title: 'Interview Slots', subtitle: 'Choose your availability', component: InterviewSlotsStep, icon: CalendarIcon, color: 'from-orange-500 to-red-500' },
  { id: 10, title: 'Profile Summary', subtitle: 'Review your information', component: ProfileSummaryStep, icon: FileText, color: 'from-teal-500 to-green-500' },

];

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [direction, setDirection] = useState(0);

  const updateData = (newData) => setProfileData({ ...profileData, ...newData });

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;
  const stepInfo = steps[currentStep];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      localStorage.setItem('profileData', JSON.stringify(profileData));
      localStorage.setItem('profileCompleted', 'true');
      toast.success('🎉 Profile setup completed!', { description: 'Welcome to your dashboard!' });
      navigate('/dashboard');
    } else {
      setDirection(1);
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20" />
        <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Header */}
      <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
            <p className="text-sm text-gray-600 mt-1">Step {currentStep + 1} of {steps.length} • {Math.round(progress)}% Complete</p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
            <Trophy className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">{currentStep} / {steps.length} Completed</span>
          </div>
        </div>

        {/* Progress Bar */}
      <div className="relative px-6 py-4">
  {/* INNER CONTAINER — controls left/right margin */}
  <div className="relative px-10">
    
    {/* Background Line */}
    <div className="relative h-2 bg-gray-100 rounded-full">
    
        <motion.div className="absolute inset-0 overflow-hidden rounded-full">
        <motion.div
          className={`h-full w-1/3 bg-linear-to-r ${stepInfo.color} opacity-30 `}
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "linear",
          }}
        />
      </motion.div>


      {/* Active Progress */}
      <motion.div
        className={`absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r ${stepInfo.color}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Step Circles */}
      {steps.map((step, index) => {
        const left = `${(index / (steps.length - 1)) * 100}%`;
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={step.id}
            className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left }}
            onClick={() => {
              if (index <= currentStep) {
                setCurrentStep(index);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            {/* Active Label */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
              >
                {/* Pointer */}
                <div className={`w-2 h-2 rotate-45 -mb-1 bg-gradient-to-r ${step.color}`} />

                {/* Pill */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-lg bg-gradient-to-r ${step.color} whitespace-nowrap`}>
                  <step.icon className="w-3.5 h-3.5" />
                  <span>{step.title}</span>
                </div>
              </motion.div>
            )}

            {/* Circle */}
            <motion.div
              whileHover={{ scale: 1.25 }}
              animate={{ scale: isActive ? 1.3 : 1 }}
              className={`w-4 h-4 rounded-full border-2 transition-all
                ${
                  isCompleted
                    ? "bg-green-500 border-green-500"
                    : isActive
                    ? `bg-gradient-to-r ${step.color} border-transparent`
                    : "bg-white border-gray-300"
                }
              `}
            />
          </div>
        );
      })}
    </div>
  </div>
</div>


</motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-12 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="sticky top-32 space-y-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Your Progress</h3>
            {steps.map((step, index) => {
              const completed = index < currentStep;
              const current = index === currentStep;
              const StepIcon = step.icon;

              return (
                <motion.div key={step.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="relative group cursor-pointer">
                  <motion.div layout className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 ${current ? `bg-gradient-to-r ${step.color} shadow-lg text-white` : completed ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                    <motion.div layout className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${current ? 'bg-white/20' : completed ? 'bg-green-100' : 'bg-white'}`}>
                      {completed ? <Check className="w-5 h-5 text-green-600" /> : <StepIcon className={`${current ? 'text-white' : ''} w-5 h-5`} />}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{step.title}</p>
                      <p className={`text-xs mt-0.5 ${current ? 'text-white/80' : ''}`}>{step.subtitle}</p>
                    </div>
                    {current && <ChevronRight className="w-5 h-5 text-white" />}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div layout initial={{ height: 0 }} animate={{ height: completed ? '100%' : '0%' }} transition={{ duration: 0.5, ease: 'easeInOut' }} className="absolute top-full left-5 w-0.5 bg-gray-300" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentStep} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}>
              
              {/* Step Header */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`bg-gradient-to-r ${stepInfo.color} rounded-2xl p-8 mb-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <stepInfo.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-sm">Step {currentStep + 1} of {steps.length}</p>
                      <p className="text-2xl font-bold">{Math.round(progress)}%</p>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{stepInfo.title}</h2>
                  <p className="text-white/90 text-lg">{stepInfo.subtitle}</p>
                </div>
              </motion.div>

              {/* Form Card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6 min-h-[500px]">
                <CurrentStepComponent data={profileData} updateData={updateData} />
              </motion.div>

              {/* Navigation Buttons */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex justify-between items-center gap-4">
                <motion.button whileHover={{ scale: 1.05, x: -5 }} whileTap={{ scale: 0.95 }} onClick={handlePrevious} disabled={currentStep === 0} className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-medium">
                  <ChevronLeft className="w-5 h-5" /> Previous
                </motion.button>

                <motion.button whileHover={{ scale: 1.05, x: 5, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }} whileTap={{ scale: 0.95 }} onClick={handleNext} className={`flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${stepInfo.color} text-white rounded-xl shadow-lg transition-all font-semibold group`}>
                  {currentStep === steps.length - 1 ? <><Trophy className="w-5 h-5" /> Complete Profile</> : <>Continue <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Help Button */}
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-blue-500/50 transition-shadow">
        <span className="text-2xl">?</span>
      </motion.button>
    </div>
  );
}
