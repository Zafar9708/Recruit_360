import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Check, 
  Star, GraduationCap, Briefcase, DollarSign, 
  Calendar, Heart, Link2, FileText, Trophy, Award, User,
  Calendar as CalendarIcon, Lock, Shield, Target, Zap,
  Building, Globe, Clock, MapPin, Award as AwardIcon
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
  { id: 1, title: 'Basic Details', subtitle: 'Personal information', component: BasicDetailsStep, icon: User, color: 'from-blue-600 to-blue-400' },
  { id: 2, title: 'Skills', subtitle: 'Your expertise & competencies', component: SkillsStep, icon: Star, color: 'from-blue-700 to-blue-500' },
  { id: 3, title: 'Education', subtitle: 'Academic qualifications', component: EducationStep, icon: GraduationCap, color: 'from-blue-800 to-blue-600' },
  { id: 4, title: 'Experience', subtitle: 'Professional background', component: ExperienceStep, icon: Briefcase, color: 'from-blue-900 to-blue-700' },
  { id: 5, title: 'Compensation', subtitle: 'Salary expectations', component: CompensationStep, icon: DollarSign, color: 'from-blue-950 to-blue-800' },
  { id: 6, title: 'Availability', subtitle: 'Start date preferences', component: AvailabilityStep, icon: Calendar, color: 'from-indigo-900 to-blue-800' },
  { id: 7, title: 'Preferences', subtitle: 'Work environment', component: JobPreferencesStep, icon: Heart, color: 'from-indigo-950 to-blue-900' },
  { id: 8, title: 'Links', subtitle: 'Professional profiles', component: ProfessionalLinksStep, icon: Link2, color: 'from-blue-950 to-indigo-900' },
  { id: 9, title: 'Interview Slots', subtitle: 'Select availability', component: InterviewSlotsStep, icon: CalendarIcon, color: 'from-blue-900 to-indigo-800' },
  { id: 10, title: 'Review', subtitle: 'Finalize profile', component: ProfileSummaryStep, icon: FileText, color: 'from-blue-950 to-blue-900' },
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
      toast.success('🎉 Profile Setup Complete!', { 
        description: 'Your profile has been successfully created!' 
      });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-x-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-10" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #1e3a8a 1px, transparent 1px),
                          linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main Container */}
      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-950 tracking-tight">Profile Setup</h1>
                  <p className="text-blue-600 text-sm font-medium">Complete your professional profile</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                  <Target className="w-4 h-4 text-blue-600" />
                  <div className="text-right">
                    <p className="text-xs text-blue-700 font-semibold">PROGRESS</p>
                    <p className="text-sm font-bold text-blue-950">{Math.round(progress)}% Complete</p>
                  </div>
                </div>
                
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-950 rounded-xl">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-semibold text-white">Step {currentStep + 1}/{steps.length}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="px-6 pb-4">
            <div className="relative">
              {/* Background track */}
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                {/* Animated shimmer effect */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'linear'
                  }}
                >
                  <div className="h-full w-32 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
                </motion.div>
                
                {/* Progress fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              
              {/* Step markers */}
              <div className="flex justify-between mt-3">
                {steps.slice(0, 5).map((step, index) => {
                  const isCompleted = index <= currentStep;
                  const isActive = index === currentStep;
                  
                  return (
                    <div key={step.id} className="relative flex flex-col items-center">
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          isCompleted
                            ? 'bg-blue-600 border-blue-600'
                            : isActive
                            ? 'bg-white border-blue-600 shadow-lg shadow-blue-200'
                            : 'bg-white border-blue-200'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <step.icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-blue-400'}`} />
                        )}
                      </motion.div>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-8 px-3 py-1 bg-blue-950 text-white text-xs font-semibold rounded-lg whitespace-nowrap"
                        >
                          {step.title}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Steps Overview */}
          <div className="lg:col-span-3">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-950">Secure Profile</h3>
                    <p className="text-xs text-blue-600">All data is encrypted</p>
                  </div>
                </div>
                
                <div className="space-y-1 mb-8">
                  {steps.map((step, index) => {
                    const completed = index < currentStep;
                    const current = index === currentStep;
                    
                    return (
                      <div
                        key={step.id}
                        className={`p-3 rounded-xl cursor-pointer transition-all ${
                          current
                            ? 'bg-blue-50 border-l-4 border-blue-600'
                            : 'hover:bg-blue-50/50'
                        }`}
                        onClick={() => {
                          if (index <= currentStep) {
                            setCurrentStep(index);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            completed
                              ? 'bg-green-100 text-green-600'
                              : current
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-blue-50 text-blue-400'
                          }`}>
                            {completed ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <step.icon className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${
                              current ? 'text-blue-950' : 'text-blue-900'
                            }`}>
                              {step.title}
                            </p>
                            <p className="text-xs text-blue-600 mt-0.5">{step.subtitle}</p>
                          </div>
                          {current && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="pt-6 border-t border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-900">Estimated Time</span>
                    <span className="text-sm font-bold text-blue-950">8-10 min</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-1.5">
                    <motion.div
                      className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Tips Card */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <AwardIcon className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold">Pro Tip</h3>
                </div>
                <p className="text-sm text-blue-200 mb-4">
                  Complete your profile to increase your visibility by up to 70% with recruiters.
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-300">
                  <Clock className="w-3 h-3" />
                  <span>Most candidates complete in 8 minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                
                {/* Step Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                        <stepInfo.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                          <span className="text-xs font-semibold">STEP {currentStep + 1}</span>
                          <span className="text-xs opacity-80">/ {steps.length}</span>
                        </div>
                        <p className="text-3xl font-bold mt-2">{Math.round(progress)}%</p>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-3">
                        <span className="text-sm font-medium">Required Section</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-2 tracking-tight">{stepInfo.title}</h2>
                      <p className="text-blue-200 text-lg font-medium">{stepInfo.subtitle}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-6">
                      <div className="flex items-center gap-2 text-blue-200 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Approx. 1-2 minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-200 text-sm">
                        <Shield className="w-4 h-4" />
                        <span>Secure & Private</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 mb-8 min-h-[500px]"
                >
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full" />
                      <h3 className="text-xl font-bold text-blue-950">Please provide your details</h3>
                    </div>
                    <p className="text-blue-600">
                      Complete this section to help us match you with the best opportunities.
                    </p>
                  </div>
                  
                  <CurrentStepComponent data={profileData} updateData={updateData} />
                </motion.div>

                {/* Navigation Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-between items-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, x: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-blue-200 text-blue-900 rounded-xl hover:border-blue-300 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold min-w-[160px] justify-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous Step
                  </motion.button>

                  <div className="flex items-center gap-4">
                    {currentStep < steps.length - 1 && (
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-4 text-blue-700 hover:text-blue-900 font-medium transition-colors"
                      >
                        Skip for now
                      </button>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(30, 58, 138, 0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all font-semibold min-w-[200px] justify-center group"
                    >
                      {currentStep === steps.length - 1 ? (
                        <>
                          <Trophy className="w-5 h-5" />
                          Complete Profile
                        </>
                      ) : (
                        <>
                          Continue
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
}