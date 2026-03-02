// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ChevronRight, ChevronLeft, Check,
//   Star, GraduationCap, Briefcase, DollarSign,
//   Calendar, Heart, Link2, FileText, Trophy, Award, User,
//   Calendar as CalendarIcon, Lock, Shield, Target, Zap,
//   Building, Globe, Clock, MapPin, Award as AwardIcon
// } from 'lucide-react';

// import * as Progress from '@radix-ui/react-progress';

// import {
//   BasicDetailsStep,
//   SkillsStep,
//   EducationStep,
//   ExperienceStep,
//   CompensationStep,
//   AvailabilityStep,
//   JobPreferencesStep,
//   ProfessionalLinksStep,
//   ProfileSummaryStep,
//   InterviewSlotsStep,
// } from '../components/ProfileSteps';

// const steps = [
//   { id: 1, title: 'Basic Details', subtitle: 'Personal information', component: BasicDetailsStep, icon: User, color: 'from-blue-600 to-blue-400' },
//   { id: 2, title: 'Skills', subtitle: 'Your expertise & competencies', component: SkillsStep, icon: Star, color: 'from-blue-700 to-blue-500' },
//   { id: 3, title: 'Education', subtitle: 'Academic qualifications', component: EducationStep, icon: GraduationCap, color: 'from-blue-800 to-blue-600' },
//   { id: 4, title: 'Experience', subtitle: 'Professional background', component: ExperienceStep, icon: Briefcase, color: 'from-blue-900 to-blue-700' },
//   { id: 5, title: 'Compensation', subtitle: 'Salary expectations', component: CompensationStep, icon: DollarSign, color: 'from-blue-950 to-blue-800' },
//   { id: 6, title: 'Availability', subtitle: 'Start date preferences', component: AvailabilityStep, icon: Calendar, color: 'from-indigo-900 to-blue-800' },
//   { id: 7, title: 'Preferences', subtitle: 'Work environment', component: JobPreferencesStep, icon: Heart, color: 'from-indigo-950 to-blue-900' },
//   { id: 8, title: 'Links', subtitle: 'Professional profiles', component: ProfessionalLinksStep, icon: Link2, color: 'from-blue-950 to-indigo-900' },
//   { id: 9, title: 'Interview Slots', subtitle: 'Select availability', component: InterviewSlotsStep, icon: CalendarIcon, color: 'from-blue-900 to-indigo-800' },
//   { id: 10, title: 'Review', subtitle: 'Finalize profile', component: ProfileSummaryStep, icon: FileText, color: 'from-blue-950 to-blue-900' },
// ];

// export default function ProfileSetupPage() {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [profileData, setProfileData] = useState({});
//   const [direction, setDirection] = useState(0);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     const loadResumeData = () => {
//       const resumeData = sessionStorage.getItem('resumeData');
//       const pendingRegistration = localStorage.getItem('pendingRegistration');

//       let initialData = {};

//       if (resumeData) {
//         try {
//           const parsedResume = JSON.parse(resumeData);
//           console.log('Loading resume data:', parsedResume);

//           initialData = {
//             fullName: parsedResume.fullName || '',
//             email: parsedResume.email || '',
//             phone: parsedResume.phone || '',
//             location: parsedResume.location || '',
//             skills: Array.isArray(parsedResume.skills) ? parsedResume.skills : [],
//             education: Array.isArray(parsedResume.education) ? parsedResume.education.map(edu => ({
//               ...edu,
//               id: edu._id || Date.now() + Math.random() 
//             })) : [],
//             experience: Array.isArray(parsedResume.experience) ? parsedResume.experience.map(exp => ({
//               ...exp,
//               id: exp._id || Date.now() + Math.random(), 
//               current: exp.endDate?.toLowerCase() === 'present' || !exp.endDate
//             })) : [],
//             summary: parsedResume.summary || ''
//           };

//           toast.success('Resume data loaded successfully!');
//         } catch (error) {
//           console.error('Error parsing resume data:', error);
//           toast.error('Failed to load resume data');
//         }
//       }

//       if (pendingRegistration) {
//         try {
//           const parsedPending = JSON.parse(pendingRegistration);
//           initialData = {
//             ...initialData,
//             fullName: parsedPending.fullName || initialData.fullName,
//             email: parsedPending.email || initialData.email,
//           };
//         } catch (error) {
//           console.error('Error parsing pending registration:', error);
//         }
//       }

//       const savedProfile = localStorage.getItem('profileData');
//       if (savedProfile && Object.keys(initialData).length === 0) {
//         try {
//           const parsed = JSON.parse(savedProfile);
//           initialData = parsed;
//         } catch (error) {
//           console.error('Error loading saved profile:', error);
//         }
//       }

//       setProfileData(initialData);
//     };

//     loadResumeData();
//   }, []);

//   const updateData = (newData) => {
//     setProfileData(prev => {
//       const updated = { ...prev, ...newData };
//       localStorage.setItem('profileData', JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const progress = ((currentStep + 1) / steps.length) * 100;
//   const CurrentStepComponent = steps[currentStep].component;
//   const stepInfo = steps[currentStep];

//   const handleNext = async () => {
//     if (currentStep === steps.length - 1) {
//       setIsSaving(true);

//       try {
//         const token = localStorage.getItem('token');

//         if (!token) {
//           toast.error('Please login again');
//           navigate('/login');
//           return;
//         }

//         const pendingRegistration = localStorage.getItem('pendingRegistration');
//         let registrationData = {};

//         if (pendingRegistration) {
//           try {
//             registrationData = JSON.parse(pendingRegistration);
//           } catch (error) {
//             console.error('Error parsing pending registration:', error);
//           }
//         }

//         const completeUserData = {
//           ...registrationData,
//           ...profileData,

//           skills: profileData.skills || [],

//           education: profileData.education
//             ? profileData.education.map(({ id, ...rest }) => rest)
//             : [],

//           experience: profileData.experience
//             ? profileData.experience.map(({ id, ...rest }) => rest)
//             : [],
//         };


//         const response = await fetch('http://localhost:5000/api/auth/complete-registration', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify(completeUserData)
//         });

//         const result = await response.json();

//         if (!response.ok) {
//           throw new Error(result.message || 'Failed to complete registration');
//         }

//         if (result.success) {
//           sessionStorage.removeItem('resumeData');
//           localStorage.removeItem('pendingRegistration');

//           localStorage.setItem('profileData', JSON.stringify(profileData));
//           localStorage.setItem('profileCompleted', 'true');
//           localStorage.setItem('userName', profileData.fullName || registrationData.fullName);
//           localStorage.setItem('userEmail', profileData.email || registrationData.email);

//           if (result.token) {
//             localStorage.setItem('token', result.token);
//           }

//           toast.success('🎉 Profile Setup Complete!', {
//             description: 'Your profile has been successfully created!'
//           });

//           navigate('/dashboard');
//         } else {
//           throw new Error(result.message || 'Registration failed');
//         }

//       } catch (error) {
//         console.error('Error completing registration:', error);
//         toast.error(error.message || 'Failed to complete registration. Please try again.');
//       } finally {
//         setIsSaving(false);
//       }
//     } else {
//       if (currentStep === 0) {
//         if (!profileData.fullName) {
//           toast.error('Please enter your full name');
//           return;
//         }
//         if (!profileData.email) {
//           toast.error('Email is required');
//           return;
//         }
//       }

//       setDirection(1);
//       setCurrentStep(currentStep + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setDirection(-1);
//       setCurrentStep(currentStep - 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const slideVariants = {
//     enter: (dir) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
//     center: { x: 0, opacity: 1 },
//     exit: (dir) => ({ x: dir < 0 ? 1000 : -1000, opacity: 0 }),
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-x-hidden">

//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-20" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-10" />

//         {/* Grid pattern */}
//         <div className="absolute inset-0 opacity-5" style={{
//           backgroundImage: `linear-gradient(to right, #1e3a8a 1px, transparent 1px),
//                           linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)`,
//           backgroundSize: '50px 50px'
//         }} />
//       </div>

//       {/* Main Container */}
//       <div className="relative z-10">
//         {/* Header */}
//         <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-sm">
//           <div className="max-w-7xl mx-auto px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center shadow-lg">
//                   <Shield className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-blue-950 tracking-tight">Profile Setup</h1>
//                   <p className="text-blue-600 text-sm font-medium">Complete your professional profile</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-6">
//                 <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
//                   <Target className="w-4 h-4 text-blue-600" />
//                   <div className="text-right">
//                     <p className="text-xs text-blue-700 font-semibold">PROGRESS</p>
//                     <p className="text-sm font-bold text-blue-950">{Math.round(progress)}% Complete</p>
//                   </div>
//                 </div>

//                 <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-950 rounded-xl">
//                   <Zap className="w-4 h-4 text-yellow-400" />
//                   <span className="text-xs font-semibold text-white">Step {currentStep + 1}/{steps.length}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="px-6 pb-4">
//             <div className="relative">
//               {/* Background track */}
//               <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
//                 {/* Animated shimmer effect */}
//                 <motion.div
//                   className="absolute inset-0"
//                   initial={{ x: '-100%' }}
//                   animate={{ x: '100%' }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: 'linear'
//                   }}
//                 >
//                   <div className="h-full w-32 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
//                 </motion.div>

//                 {/* Progress fill */}
//                 <motion.div
//                   className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: `${progress}%` }}
//                   transition={{ duration: 0.8, ease: 'easeOut' }}
//                 />
//               </div>

//               {/* Step markers */}
//               <div className="flex justify-between mt-3">
//                 {steps.slice(0, 5).map((step, index) => {
//                   const isCompleted = index <= currentStep;
//                   const isActive = index === currentStep;

//                   return (
//                     <div key={step.id} className="relative flex flex-col items-center">
//                       <motion.div
//                         className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted
//                             ? 'bg-blue-600 border-blue-600'
//                             : isActive
//                               ? 'bg-white border-blue-600 shadow-lg shadow-blue-200'
//                               : 'bg-white border-blue-200'
//                           }`}
//                         whileHover={{ scale: 1.1 }}
//                       >
//                         {isCompleted ? (
//                           <Check className="w-4 h-4 text-white" />
//                         ) : (
//                           <step.icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-blue-400'}`} />
//                         )}
//                       </motion.div>
//                       {isActive && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -5 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className="absolute -top-8 px-3 py-1 bg-blue-950 text-white text-xs font-semibold rounded-lg whitespace-nowrap"
//                         >
//                           {step.title}
//                         </motion.div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">

//           {/* Sidebar - Steps Overview */}
//           <div className="lg:col-span-3">
//             <div className="sticky top-32">
//               <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-6">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
//                     <Lock className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-blue-950">Secure Profile</h3>
//                     <p className="text-xs text-blue-600">All data is encrypted</p>
//                   </div>
//                 </div>

//                 <div className="space-y-1 mb-8">
//                   {steps.map((step, index) => {
//                     const completed = index < currentStep;
//                     const current = index === currentStep;

//                     return (
//                       <div
//                         key={step.id}
//                         className={`p-3 rounded-xl cursor-pointer transition-all ${current
//                             ? 'bg-blue-50 border-l-4 border-blue-600'
//                             : 'hover:bg-blue-50/50'
//                           }`}
//                         onClick={() => {
//                           if (index <= currentStep) {
//                             setCurrentStep(index);
//                             window.scrollTo({ top: 0, behavior: 'smooth' });
//                           }
//                         }}
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${completed
//                               ? 'bg-green-100 text-green-600'
//                               : current
//                                 ? 'bg-blue-100 text-blue-600'
//                                 : 'bg-blue-50 text-blue-400'
//                             }`}>
//                             {completed ? (
//                               <Check className="w-4 h-4" />
//                             ) : (
//                               <step.icon className="w-4 h-4" />
//                             )}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className={`text-sm font-medium ${current ? 'text-blue-950' : 'text-blue-900'
//                               }`}>
//                               {step.title}
//                             </p>
//                             <p className="text-xs text-blue-600 mt-0.5">{step.subtitle}</p>
//                           </div>
//                           {current && (
//                             <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className="pt-6 border-t border-blue-100">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-semibold text-blue-900">Estimated Time</span>
//                     <span className="text-sm font-bold text-blue-950">8-10 min</span>
//                   </div>
//                   <div className="w-full bg-blue-100 rounded-full h-1.5">
//                     <motion.div
//                       className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
//                       initial={{ width: 0 }}
//                       animate={{ width: `${progress}%` }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Tips Card */}
//               <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-6 text-white">
//                 <div className="flex items-center gap-3 mb-4">
//                   <AwardIcon className="w-5 h-5 text-yellow-400" />
//                   <h3 className="font-bold">Pro Tip</h3>
//                 </div>
//                 <p className="text-sm text-blue-200 mb-4">
//                   Complete your profile to increase your visibility by up to 70% with recruiters.
//                 </p>
//                 <div className="flex items-center gap-2 text-xs text-blue-300">
//                   <Clock className="w-3 h-3" />
//                   <span>Most candidates complete in 8 minutes</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Form Content */}
//           <div className="lg:col-span-9">
//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={currentStep}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: 'spring', stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.2 }
//                 }}
//               >

//                 {/* Step Header */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden"
//                 >
//                   {/* Decorative elements */}
//                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
//                   <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

//                   <div className="relative z-10">
//                     <div className="flex items-start justify-between mb-6">
//                       <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
//                         <stepInfo.icon className="w-8 h-8 text-white" />
//                       </div>
//                       <div className="text-right">
//                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
//                           <span className="text-xs font-semibold">STEP {currentStep + 1}</span>
//                           <span className="text-xs opacity-80">/ {steps.length}</span>
//                         </div>
//                         <p className="text-3xl font-bold mt-2">{Math.round(progress)}%</p>
//                       </div>
//                     </div>

//                     <div className="mb-2">
//                       <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-3">
//                         <span className="text-sm font-medium">Required Section</span>
//                       </div>
//                       <h2 className="text-3xl font-bold mb-2 tracking-tight">{stepInfo.title}</h2>
//                       <p className="text-blue-200 text-lg font-medium">{stepInfo.subtitle}</p>
//                     </div>

//                     <div className="flex items-center gap-4 mt-6">
//                       <div className="flex items-center gap-2 text-blue-200 text-sm">
//                         <Clock className="w-4 h-4" />
//                         <span>Approx. 1-2 minutes</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-blue-200 text-sm">
//                         <Shield className="w-4 h-4" />
//                         <span>Secure & Private</span>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Form Card */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 mb-8 min-h-[500px]"
//                 >
//                   <div className="mb-8">
//                     <div className="flex items-center gap-3 mb-2">
//                       <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full" />
//                       <h3 className="text-xl font-bold text-blue-950">Please provide your details</h3>
//                     </div>
//                     <p className="text-blue-600">
//                       Complete this section to help us match you with the best opportunities.
//                     </p>
//                   </div>

//                   <CurrentStepComponent data={profileData} updateData={updateData} />
//                 </motion.div>

//                 {/* Navigation Buttons */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="flex justify-between items-center gap-4"
//                 >
//                   <motion.button
//                     whileHover={{ scale: 1.02, x: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handlePrevious}
//                     disabled={currentStep === 0 || isSaving}
//                     className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-blue-200 text-blue-900 rounded-xl hover:border-blue-300 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold min-w-[160px] justify-center"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                     Previous Step
//                   </motion.button>

//                   <div className="flex items-center gap-4">
//                     {currentStep < steps.length - 1 && (
//                       <button
//                         onClick={() => navigate('/dashboard')}
//                         className="px-6 py-4 text-blue-700 hover:text-blue-900 font-medium transition-colors"
//                       >
//                         Skip for now
//                       </button>
//                     )}

//                     <motion.button
//                       whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(30, 58, 138, 0.3)' }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleNext}
//                       disabled={isSaving}
//                       className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all font-semibold min-w-[200px] justify-center group"
//                     >
//                       {isSaving ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           Saving...
//                         </>
//                       ) : currentStep === steps.length - 1 ? (
//                         <>
//                           <Trophy className="w-5 h-5" />
//                           Complete Profile
//                         </>
//                       ) : (
//                         <>
//                           Continue
//                           <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                         </>
//                       )}
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}

//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, Check,
  Star, GraduationCap, Briefcase, DollarSign,
  Calendar, Heart, Link2, FileText, Trophy, Award, User,
  Calendar as CalendarIcon, Lock, Shield, Target, Zap,
  Building, Globe, Clock, MapPin, Award as AwardIcon, Plus, X
} from 'lucide-react';

import * as Progress from '@radix-ui/react-progress';

/* ===========================
   STEP 1: BASIC DETAILS
=========================== */
export function BasicDetailsStep({ data, updateData }) {
  const [formData, setFormData] = useState({
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    dateOfBirth: data.dateOfBirth || "",
    gender: data.gender || "",
    nationality: data.nationality || "",
    maritalStatus: data.maritalStatus || "",
    address: data.address || "",
    city: data.city || "",
    state: data.state || "",
    pincode: data.pincode || "",
    location: data.location || "",
  });

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold mb-2">Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold mb-2">Gender *</label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-semibold mb-2">Nationality *</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => handleChange("nationality", e.target.value)}
            placeholder="Nationality"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-semibold mb-2">Marital Status *</label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => handleChange("maritalStatus", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold mb-2">Current Location *</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="City, Country"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Address *</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Address"
            rows={3}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold mb-2">City *</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="City"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-semibold mb-2">State *</label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            placeholder="State"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-semibold mb-2">Pincode *</label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
            placeholder="Pincode"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
      </div>
    </div>
  );
}

/* ===========================
   STEP 2: SKILLS
=========================== */
export function SkillsStep({ data, updateData }) {
  // All skills from CV
  const allSkills = data.skills || [];

  // Skill categories with their options
  const skillCategories = {
    Database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'Redis', 'Elasticsearch', 'Cassandra', 'MariaDB', 'SQLite', 'Firebase'],
    Framework: ['React', 'Angular', 'Vue.js', 'Next.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', '.NET Core', 'Laravel', 'Ruby on Rails'],
    'Coding Language': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin'],
    Hosting: ['AWS', 'Azure', 'Google Cloud', 'Heroku', 'Netlify', 'Vercel', 'DigitalOcean', 'Firebase Hosting', 'GitHub Pages'],
    Tools: ['Jira', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jenkins', 'Docker', 'Kubernetes', 'VS Code', 'Postman', 'Figma', 'Slack']
  };

  // Primary skills (editable)
  const [primarySkills, setPrimarySkills] = useState(data.primarySkills || []);
  
  // State for selected category and skill
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [showSkillOptions, setShowSkillOptions] = useState(false);

  // Additional skills (editable)
  const [additionalSkills, setAdditionalSkills] = useState(data.additionalSkills || []);
  const [newSkill, setNewSkill] = useState("");

  // Add a new primary skill
  const addPrimarySkill = () => {
    if (primarySkills.length < 5) {
      setSelectedCategory('');
      setSelectedSkill('');
      setShowSkillOptions(true);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSkill('');
  };

  const handleSkillSelect = (skillName) => {
    if (primarySkills.length < 5) {
      const updated = [...primarySkills, { name: skillName, rating: 3, category: selectedCategory }];
      setPrimarySkills(updated);
      updateData({ primarySkills: updated });
      setSelectedCategory('');
      setSelectedSkill('');
      setShowSkillOptions(false);
    }
  };

  const updatePrimarySkill = (index, field, value) => {
    const updated = [...primarySkills];
    updated[index] = { ...updated[index], [field]: value };
    setPrimarySkills(updated);
    updateData({ primarySkills: updated });
  };

  const removePrimarySkill = (index) => {
    const updated = primarySkills.filter((_, i) => i !== index);
    setPrimarySkills(updated);
    updateData({ primarySkills: updated });
  };

  // Additional skills handlers
  const addAdditionalSkill = () => {
    if (!newSkill.trim()) return;
    const updated = [...additionalSkills, newSkill.trim()];
    setAdditionalSkills(updated);
    updateData({ additionalSkills: updated });
    setNewSkill("");
  };

  const removeAdditionalSkill = (index) => {
    const updated = additionalSkills.filter((_, i) => i !== index);
    setAdditionalSkills(updated);
    updateData({ additionalSkills: updated });
  };

  return (
    <div className="space-y-6">
      {/* OVERALL SKILLS FROM CV */}
      {allSkills.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-xl">
          <h4 className="font-semibold text-gray-700 mb-3">Overall Skills from CV</h4>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* PRIMARY SKILLS */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">Primary Skills (up to 5)</h4>
        <div className="space-y-3">
          {primarySkills.map((skill, index) => (
            <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl">
              <div className="flex-1">
                <div className="text-xs text-blue-600 mb-1">{skill.category}</div>
                <input
                  value={skill.name}
                  onChange={(e) => updatePrimarySkill(index, "name", e.target.value)}
                  placeholder="Skill name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((r) => (
                  <Star
                    key={r}
                    className={`w-5 h-5 cursor-pointer transition ${
                      r <= skill.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 hover:text-yellow-200"
                    }`}
                    onClick={() => updatePrimarySkill(index, "rating", r)}
                  />
                ))}
              </div>
              <button 
                onClick={() => removePrimarySkill(index)}
                className="p-1 hover:bg-red-50 rounded-full transition"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}

          {primarySkills.length < 5 && !showSkillOptions && (
            <button
              onClick={addPrimarySkill}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              <Plus size={16} /> Add Primary Skill
            </button>
          )}

          {/* Category Selection Dropdown */}
          {showSkillOptions && (
            <div className="bg-gray-50 p-4 rounded-xl border border-blue-200">
              {!selectedCategory ? (
                <>
                  <p className="text-sm font-medium text-gray-700 mb-3">Select Skill Category:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.keys(skillCategories).map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 text-sm font-medium transition-all"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-700">
                      Select {selectedCategory} Skill:
                    </p>
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      ← Back to Categories
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                    {skillCategories[selectedCategory].map((skill) => (
                      <button
                        key={skill}
                        onClick={() => handleSkillSelect(skill)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 text-sm transition-all text-left"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </>
              )}
              
              {/* Cancel button */}
              <button
                onClick={() => {
                  setShowSkillOptions(false);
                  setSelectedCategory('');
                  setSelectedSkill('');
                }}
                className="mt-3 text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ADDITIONAL SKILLS */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">Additional Skills</h4>
        <div className="flex gap-2">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyPress={(e) => e.key === 'Enter' && addAdditionalSkill()}
          />
          <button 
            onClick={addAdditionalSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {additionalSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full flex items-center gap-2 text-sm"
            >
              {skill}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500 transition"
                onClick={() => removeAdditionalSkill(index)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===========================
   STEP 3: EDUCATION
=========================== */
export function EducationStep({ data, updateData }) {
  const [educationList, setEducationList] = useState(
    data.education || [
      { degree: "", institution: "", startYear: "", endYear: "", percentage: "" },
    ]
  );

  const addEducation = () => {
    const updated = [
      ...educationList,
      { degree: "", institution: "", startYear: "", endYear: "", percentage: "" },
    ];
    setEducationList(updated);
    updateData({ education: updated });
  };

  const removeEducation = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
    updateData({ education: updated });
  };

  const updateField = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
    updateData({ education: updated });
  };

  return (
    <div className="space-y-6">
      {educationList.map((edu, index) => (
        <div
          key={index}
          className="relative bg-white shadow-sm border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          {/* Delete Button */}
          {educationList.length > 1 && (
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600"
            >
              <X size={18} />
            </button>
          )}

          {/* Degree / Institution */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Degree / Course</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateField(index, "degree", e.target.value)}
                placeholder="Enter Degree / Course"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateField(index, "institution", e.target.value)}
                placeholder="Enter Institution"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Start Year / End Year */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Start Year</label>
              <input
                type="text"
                value={edu.startYear}
                onChange={(e) => updateField(index, "startYear", e.target.value)}
                placeholder="YYYY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">End Year</label>
              <input
                type="text"
                value={edu.endYear}
                onChange={(e) => updateField(index, "endYear", e.target.value)}
                placeholder="YYYY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Percentage / GPA on new line */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Percentage / GPA</label>
            <input
              type="text"
              value={edu.percentage}
              onChange={(e) => updateField(index, "percentage", e.target.value)}
              placeholder="e.g., 85% or 3.8 GPA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      ))}

      {/* Add Education Button */}
      <button
        onClick={addEducation}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={16} /> Add Education
      </button>
    </div>
  );
}

/* ===========================
   STEP 4: EXPERIENCE
=========================== */
export function ExperienceStep({ data, updateData }) {
  const [isFresher, setIsFresher] = useState(data.isFresher || false);
  const [totalExperience, setTotalExperience] = useState(data.totalExperience || "");
  const [companies, setCompanies] = useState(
    data.experience || [
      { companyName: "", designation: "", startDate: "", endDate: "", responsibilities: "" },
    ]
  );

  const handleFresherChange = () => {
    const newFresher = !isFresher;
    setIsFresher(newFresher);
    if (newFresher) {
      setTotalExperience("");
      setCompanies([]);
      updateData({ isFresher: true, totalExperience: "", experience: [] });
    } else {
      setCompanies([{ companyName: "", designation: "", startDate: "", endDate: "", responsibilities: "" }]);
      updateData({ isFresher: false });
    }
  };

  const handleTotalExperienceChange = (value) => {
    setTotalExperience(value);
    updateData({ totalExperience: value, isFresher });
  };

  const handleCompanyChange = (index, field, value) => {
    const updated = [...companies];
    updated[index][field] = value;
    setCompanies(updated);
    updateData({ experience: updated, isFresher, totalExperience });
  };

  const addCompany = () => {
    setCompanies([
      ...companies,
      { companyName: "", designation: "", startDate: "", endDate: "", responsibilities: "" },
    ]);
  };

  const removeCompany = (index) => {
    const updated = companies.filter((_, i) => i !== index);
    setCompanies(updated);
    updateData({ experience: updated, isFresher, totalExperience });
  };

  return (
    <div className="space-y-6">
      {/* Fresher Checkbox */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
        <input
          type="checkbox"
          checked={isFresher}
          onChange={handleFresherChange}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">I am a Fresher (No work experience)</label>
      </div>

      {/* Total Experience */}
      {!isFresher && (
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Total Years of Experience *</label>
          <input
            type="number"
            step="0.1"
            value={totalExperience}
            onChange={(e) => handleTotalExperienceChange(e.target.value)}
            placeholder="e.g., 3.5"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Companies */}
      {!isFresher &&
        companies.map((company, index) => (
          <div key={index} className="space-y-2">
            <label className="text-sm font-semibold block text-gray-700">
              Previous Company {index + 1}
            </label>

            <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              {companies.length > 1 && (
                <button
                  onClick={() => removeCompany(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              )}

              {/* Company Name & Designation */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">Company Name *</label>
                  <input
                    type="text"
                    value={company.companyName}
                    onChange={(e) =>
                      handleCompanyChange(index, "companyName", e.target.value)
                    }
                    placeholder="e.g., TechCorp Inc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">Designation *</label>
                  <input
                    type="text"
                    value={company.designation}
                    onChange={(e) =>
                      handleCompanyChange(index, "designation", e.target.value)
                    }
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Start Date & End Date */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">Start Date *</label>
                  <input
                    type="date"
                    value={company.startDate}
                    onChange={(e) =>
                      handleCompanyChange(index, "startDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">End Date *</label>
                  <input
                    type="date"
                    value={company.endDate}
                    onChange={(e) =>
                      handleCompanyChange(index, "endDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Responsibilities */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Responsibilities *</label>
                <textarea
                  value={company.responsibilities}
                  onChange={(e) =>
                    handleCompanyChange(index, "responsibilities", e.target.value)
                  }
                  placeholder="Describe your key responsibilities and achievements..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        ))}

      {/* Add Another Company */}
      {!isFresher && companies.length > 0 && (
        <button
          onClick={addCompany}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Add Another Company
        </button>
      )}
    </div>
  );
}

/* ===========================
   STEP 5: COMPENSATION
=========================== */
export function CompensationStep({ data, updateData }) {
  const [compensation, setCompensation] = useState({
    currentCTC: data.currentCTC || "",
    expectedCTC: data.expectedCTC || "",
  });

  const handleChange = (field, value) => {
    const updated = { ...compensation, [field]: value };
    setCompensation(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-6">
      {/* Current CTC */}
      <div className="flex flex-col">
        <label className="block text-sm font-semibold mb-1">
          Current CTC (Annual) *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="number"
            value={compensation.currentCTC}
            onChange={(e) => handleChange("currentCTC", e.target.value)}
            placeholder="e.g., 500000"
            className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Enter amount in INR per year
        </p>
      </div>

      {/* Expected CTC */}
      <div className="flex flex-col">
        <label className="block text-sm font-semibold mb-1">
          Expected CTC (Annual) *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="number"
            value={compensation.expectedCTC}
            onChange={(e) => handleChange("expectedCTC", e.target.value)}
            placeholder="e.g., 700000"
            className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Enter amount in INR per year
        </p>
      </div>
    </div>
  );
}

/* ===========================
   STEP 6: AVAILABILITY
=========================== */
export function AvailabilityStep({ data, updateData }) {
  const [availability, setAvailability] = useState(data.availability || "");
  const [lastWorkingDate, setLastWorkingDate] = useState(
    data.lastWorkingDate || ""
  );

  const handleAvailabilityChange = (value) => {
    setAvailability(value);

    // Reset last working date if not serving notice
    if (value !== "Serving Notice") {
      setLastWorkingDate("");
      updateData({ availability: value, lastWorkingDate: "" });
    } else {
      updateData({ availability: value, lastWorkingDate });
    }
  };

  const handleLastDateChange = (value) => {
    setLastWorkingDate(value);
    updateData({ availability, lastWorkingDate: value });
  };

  return (
    <div className="space-y-6">
      {/* Availability / Notice Period */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Availability / Notice Period *
        </label>

        <select
          value={availability}
          onChange={(e) => handleAvailabilityChange(e.target.value)}
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select availability</option>
          <option value="Immediate">Immediate</option>
          <option value="15 Days">15 Days</option>
          <option value="30 Days">30 Days</option>
          <option value="60 Days">60 Days</option>
          <option value="Serving Notice">Serving Notice</option>
        </select>
      </div>

      {/* Last Working Date (shown only if Serving Notice) */}
      {availability === "Serving Notice" && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Last Working Date *
          </label>

          <input
            type="date"
            value={lastWorkingDate}
            onChange={(e) => handleLastDateChange(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-xs text-gray-500 mt-1">
            Please select your official last working day
          </p>
        </div>
      )}
    </div>
  );
}

/* ===========================
   STEP 7: INTERVIEW SLOTS
=========================== */
export function InterviewSlotsStep({ data, updateData }) {
  const [selectedSlots, setSelectedSlots] = useState(
    data.interviewSlots || []
  );

  const timeSlots = {
    morning: [
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
    ],
    afternoon: [
      "1:00 PM - 2:00 PM",
      "2:00 PM - 3:00 PM",
      "3:00 PM - 4:00 PM",
      "4:00 PM - 5:00 PM",
    ],
  };

  const toggleSlot = (slot) => {
    const updated = selectedSlots.includes(slot)
      ? selectedSlots.filter((s) => s !== slot)
      : [...selectedSlots, slot];

    setSelectedSlots(updated);
    updateData({ interviewSlots: updated });
  };

  const SlotGroup = ({ title, slots }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const selected = selectedSlots.includes(slot);

          return (
            <label
              key={slot}
              className={`flex items-center justify-center px-4 py-3 rounded-xl border cursor-pointer text-sm font-medium transition
                ${
                  selected
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleSlot(slot)}
                className="hidden"
              />
              {slot}
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <SlotGroup title="Morning Shift" slots={timeSlots.morning} />
      <SlotGroup title="Afternoon Shift" slots={timeSlots.afternoon} />

      {/* Validation Message */}
      {selectedSlots.length < 2 && selectedSlots.length > 0 && (
        <p className="text-sm text-red-500">
          Please select at least 2 interview time slots.
        </p>
      )}
      {selectedSlots.length === 0 && (
        <p className="text-sm text-gray-500">
          Select at least 2 preferred time slots for your interview
        </p>
      )}
    </div>
  );
}

/* ===========================
   STEP 8: JOB PREFERENCES
=========================== */
export function JobPreferencesStep({ data, updateData }) {
  const [preferences, setPreferences] = useState({
    jobType: data.jobType || [],
    workMode: data.workMode || [],
    preferredLocation: data.preferredLocation || "",
  });

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const workModes = ["Remote", "Hybrid", "On-site"];

  const handleMultiSelect = (field, value) => {
    const updatedArray = preferences[field].includes(value)
      ? preferences[field].filter((item) => item !== value)
      : [...preferences[field], value];

    const updated = { ...preferences, [field]: updatedArray };
    setPreferences(updated);
    updateData(updated);
  };

  const handleChange = (field, value) => {
    const updated = { ...preferences, [field]: value };
    setPreferences(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-8">
      {/* Job Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Job Type *
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobTypes.map((type) => {
            const selected = preferences.jobType.includes(type);
            return (
              <label
                key={type}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer transition
                  ${selected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}
                `}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => handleMultiSelect("jobType", type)}
                  className="w-5 h-5 accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-800">
                  {type}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Work Mode */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Work Mode *
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workModes.map((mode) => {
            const selected = preferences.workMode.includes(mode);
            return (
              <label
                key={mode}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer transition
                  ${selected
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}
                `}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => handleMultiSelect("workMode", mode)}
                  className="w-5 h-5 accent-gray-900"
                />
                <span className="text-sm font-medium text-gray-800">
                  {mode}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Preferred Locations */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Preferred Locations *
        </label>

        <input
          type="text"
          value={preferences.preferredLocation}
          onChange={(e) => handleChange("preferredLocation", e.target.value)}
          placeholder="e.g., Bangalore, Mumbai, Remote"
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="text-xs text-gray-500 mt-2">
          Separate multiple locations with commas
        </p>
      </div>
    </div>
  );
}

/* ===========================
   STEP 9: PROFESSIONAL LINKS
=========================== */
export function ProfessionalLinksStep({ data, updateData }) {
  const [links, setLinks] = useState({
    github: data.github || "",
    linkedin: data.linkedin || "",
    portfolio: data.portfolio || "",
  });

  const handleChange = (field, value) => {
    const updated = { ...links, [field]: value };
    setLinks(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">GitHub Profile</label>
        <input
          type="url"
          value={links.github}
          onChange={(e) => handleChange("github", e.target.value)}
          placeholder="https://github.com/username"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">LinkedIn Profile</label>
        <input
          type="url"
          value={links.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/username"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Portfolio Website</label>
        <input
          type="url"
          value={links.portfolio}
          onChange={(e) => handleChange("portfolio", e.target.value)}
          placeholder="https://yourportfolio.com"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}

/* ===========================
   STEP 10: PROFILE SUMMARY
=========================== */
export function ProfileSummaryStep({ data }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Details */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <User size={18} /> Basic Details
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Full Name:</span> {data.fullName || "-"}</p>
            <p><span className="text-gray-500">Email:</span> {data.email || "-"}</p>
            <p><span className="text-gray-500">Phone:</span> {data.phone || "-"}</p>
            <p><span className="text-gray-500">Date of Birth:</span> {data.dateOfBirth || "-"}</p>
            <p><span className="text-gray-500">Gender:</span> {data.gender || "-"}</p>
            <p><span className="text-gray-500">Nationality:</span> {data.nationality || "-"}</p>
            <p><span className="text-gray-500">Marital Status:</span> {data.maritalStatus || "-"}</p>
            <p><span className="text-gray-500">Location:</span> {data.location || "-"}</p>
            <p><span className="text-gray-500">Address:</span> {data.address || "-"}</p>
            <p><span className="text-gray-500">City:</span> {data.city || "-"}</p>
            <p><span className="text-gray-500">State:</span> {data.state || "-"}</p>
            <p><span className="text-gray-500">Pincode:</span> {data.pincode || "-"}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Skills</h3>
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-600 mb-2">Primary Skills:</p>
            {data.primarySkills?.length > 0 ? (
              data.primarySkills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 text-sm mb-1">
                  <span className="text-xs text-blue-600 mr-1">[{skill.category}]</span>
                  <span>{skill.name}</span>
                  <div className="flex gap-0.5 ml-auto">
                    {[1,2,3,4,5].map(r => (
                      <Star key={r} className={`w-3 h-3 ${r <= skill.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">-</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Additional Skills:</p>
            {data.additionalSkills?.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {data.additionalSkills.map((skill, i) => (
                  <span key={i} className="text-xs bg-white px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">-</p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Education</h3>
          {data.education?.length > 0 ? (
            data.education.map((edu, i) => (
              <div key={i} className="mb-3 pb-2 border-b last:border-0">
                <p className="text-sm font-medium">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.institution}</p>
                <p className="text-xs text-gray-500">{edu.startYear} - {edu.endYear} | {edu.percentage}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">-</p>
          )}
        </div>

        {/* Experience */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Experience</h3>
          {data.isFresher ? (
            <p className="text-sm text-gray-600">Fresher</p>
          ) : (
            <>
              <p className="text-sm mb-2"><span className="text-gray-500">Total Experience:</span> {data.totalExperience || "-"} years</p>
              {data.experience?.length > 0 ? (
                data.experience.map((exp, i) => (
                  <div key={i} className="mb-3 pb-2 border-b last:border-0">
                    <p className="text-sm font-medium">{exp.companyName}</p>
                    <p className="text-xs text-gray-600">{exp.designation}</p>
                    <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">-</p>
              )}
            </>
          )}
        </div>

        {/* Compensation & Availability */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Compensation & Availability</h3>
          <p className="text-sm"><span className="text-gray-500">Current CTC:</span> ₹{data.currentCTC || "-"}</p>
          <p className="text-sm"><span className="text-gray-500">Expected CTC:</span> ₹{data.expectedCTC || "-"}</p>
          <p className="text-sm"><span className="text-gray-500">Availability:</span> {data.availability || "-"}</p>
          {data.lastWorkingDate && <p className="text-sm"><span className="text-gray-500">Last Working Day:</span> {data.lastWorkingDate}</p>}
        </div>

        {/* Job Preferences */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Job Preferences</h3>
          <p className="text-sm"><span className="text-gray-500">Job Type:</span> {data.jobType?.join(", ") || "-"}</p>
          <p className="text-sm"><span className="text-gray-500">Work Mode:</span> {data.workMode?.join(", ") || "-"}</p>
          <p className="text-sm"><span className="text-gray-500">Preferred Location:</span> {data.preferredLocation || "-"}</p>
        </div>

        {/* Professional Links */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Professional Links</h3>
          <p className="text-sm"><span className="text-gray-500">GitHub:</span> {data.github ? <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.github}</a> : "-"}</p>
          <p className="text-sm"><span className="text-gray-500">LinkedIn:</span> {data.linkedin ? <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.linkedin}</a> : "-"}</p>
          <p className="text-sm"><span className="text-gray-500">Portfolio:</span> {data.portfolio ? <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.portfolio}</a> : "-"}</p>
        </div>

        {/* Interview Slots */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Selected Interview Slots</h3>
          {data.interviewSlots?.length > 0 ? (
            <ul className="list-disc list-inside text-sm">
              {data.interviewSlots.map((slot, i) => (
                <li key={i}>{slot}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">-</p>
          )}
        </div>
      </div>
    </div>
  );
}

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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadResumeData = () => {
      const resumeData = sessionStorage.getItem('resumeData');
      const pendingRegistration = localStorage.getItem('pendingRegistration');

      let initialData = {};

      if (resumeData) {
        try {
          const parsedResume = JSON.parse(resumeData);
          console.log('Loading resume data:', parsedResume);

          initialData = {
            fullName: parsedResume.fullName || '',
            email: parsedResume.email || '',
            phone: parsedResume.phone || '',
            location: parsedResume.location || '',
            skills: Array.isArray(parsedResume.skills) ? parsedResume.skills : [],
            education: Array.isArray(parsedResume.education) ? parsedResume.education.map(edu => ({
              ...edu,
              id: edu._id || Date.now() + Math.random() 
            })) : [],
            experience: Array.isArray(parsedResume.experience) ? parsedResume.experience.map(exp => ({
              ...exp,
              id: exp._id || Date.now() + Math.random(), 
              current: exp.endDate?.toLowerCase() === 'present' || !exp.endDate
            })) : [],
            summary: parsedResume.summary || ''
          };

          toast.success('Resume data loaded successfully!');
        } catch (error) {
          console.error('Error parsing resume data:', error);
          toast.error('Failed to load resume data');
        }
      }

      if (pendingRegistration) {
        try {
          const parsedPending = JSON.parse(pendingRegistration);
          initialData = {
            ...initialData,
            fullName: parsedPending.fullName || initialData.fullName,
            email: parsedPending.email || initialData.email,
          };
        } catch (error) {
          console.error('Error parsing pending registration:', error);
        }
      }

      const savedProfile = localStorage.getItem('profileData');
      if (savedProfile && Object.keys(initialData).length === 0) {
        try {
          const parsed = JSON.parse(savedProfile);
          initialData = parsed;
        } catch (error) {
          console.error('Error loading saved profile:', error);
        }
      }

      setProfileData(initialData);
    };

    loadResumeData();
  }, []);

  const updateData = (newData) => {
    setProfileData(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('profileData', JSON.stringify(updated));
      return updated;
    });
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;
  const stepInfo = steps[currentStep];

  // Back button handler
  const handleBack = () => {
    if (currentStep === 0) {
      // If on first step, navigate to dashboard
      navigate('/dashboard');
    } else {
      // Otherwise go to previous step
      setDirection(-1);
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      setIsSaving(true);

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          toast.error('Please login again');
          navigate('/login');
          return;
        }

        const pendingRegistration = localStorage.getItem('pendingRegistration');
        let registrationData = {};

        if (pendingRegistration) {
          try {
            registrationData = JSON.parse(pendingRegistration);
          } catch (error) {
            console.error('Error parsing pending registration:', error);
          }
        }

        const completeUserData = {
          ...registrationData,
          ...profileData,

          skills: profileData.skills || [],

          education: profileData.education
            ? profileData.education.map(({ id, ...rest }) => rest)
            : [],

          experience: profileData.experience
            ? profileData.experience.map(({ id, ...rest }) => rest)
            : [],
        };


        const response = await fetch('http://localhost:5000/api/auth/complete-registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(completeUserData)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to complete registration');
        }

        if (result.success) {
          sessionStorage.removeItem('resumeData');
          localStorage.removeItem('pendingRegistration');

          localStorage.setItem('profileData', JSON.stringify(profileData));
          localStorage.setItem('profileCompleted', 'true');
          localStorage.setItem('userName', profileData.fullName || registrationData.fullName);
          localStorage.setItem('userEmail', profileData.email || registrationData.email);

          if (result.token) {
            localStorage.setItem('token', result.token);
          }

          toast.success('🎉 Profile Setup Complete!', {
            description: 'Your profile has been successfully created!'
          });

          navigate('/dashboard');
        } else {
          throw new Error(result.message || 'Registration failed');
        }

      } catch (error) {
        console.error('Error completing registration:', error);
        toast.error(error.message || 'Failed to complete registration. Please try again.');
      } finally {
        setIsSaving(false);
      }
    } else {
      if (currentStep === 0) {
        if (!profileData.fullName) {
          toast.error('Please enter your full name');
          return;
        }
        if (!profileData.email) {
          toast.error('Email is required');
          return;
        }
      }

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

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
        {/* Header with Back Button */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">
                    {currentStep === 0 ? 'Dashboard' : 'Back'}
                  </span>
                </button>

                <div className="w-px h-8 bg-blue-200 mx-2" />

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
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted
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
                        className={`p-3 rounded-xl cursor-pointer transition-all ${current
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
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${completed
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
                            <p className={`text-sm font-medium ${current ? 'text-blue-950' : 'text-blue-900'
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
                    disabled={currentStep === 0 || isSaving}
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
                      disabled={isSaving}
                      className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all font-semibold min-w-[200px] justify-center group"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : currentStep === steps.length - 1 ? (
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