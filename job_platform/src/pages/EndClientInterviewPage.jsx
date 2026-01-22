import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from "framer-motion";

import { 
  Calendar, Clock, Video, MapPin, CheckCircle, Mail,
  User, Briefcase, Award, ChevronRight, Link as LinkIcon
} from 'lucide-react';

export default function EndClientInterviewPage() {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [interviewMode, setInterviewMode] = useState<'online' | 'offline' | ''>('');
  const [meetingLink, setMeetingLink] = useState('');
  const [officeLocation, setOfficeLocation] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock candidate data
  const candidate = {
    name: 'Alex Johnson',
    title: 'Senior Full Stack Developer',
    experience: '7 years',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    appliedFor: 'Senior Full Stack Developer'
  };

  // Available slots grouped by shift
  const availableSlots = {
    morning: [
      { time: '09:00 AM', available: true },
      { time: '09:30 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '10:30 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '11:30 AM', available: false },
    ],
    afternoon: [
      { time: '02:00 PM', available: true },
      { time: '02:30 PM', available: true },
      { time: '03:00 PM', available: true },
      { time: '03:30 PM', available: false },
      { time: '04:00 PM', available: true },
      { time: '04:30 PM', available: true },
      { time: '05:00 PM', available: true },
    ]
  };

  const handleScheduleInterview = () => {
    setShowConfirmation(true);
  };

  const handleSendConfirmation = () => {
    // Here you would send confirmation email
    navigate('/end-client/candidates');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-orange-50/30 to-red-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showConfirmation ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Interview</h1>
              <p className="text-gray-600">Set up an interview with the candidate</p>
            </motion.div>

            {/* Candidate Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{candidate.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                  <p className="text-gray-600">{candidate.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Applied for</p>
                  <p className="font-semibold text-gray-900">{candidate.appliedFor}</p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {candidate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-orange-50 text-orange-700 rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentStep >= step 
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        currentStep > step ? 'bg-orange-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <span className={currentStep >= 1 ? 'text-orange-600 font-semibold' : 'text-gray-500'}>
                  Select Slot
                </span>
                <span className={currentStep >= 2 ? 'text-orange-600 font-semibold' : 'text-gray-500'}>
                  Interview Mode
                </span>
                <span className={currentStep >= 3 ? 'text-orange-600 font-semibold' : 'text-gray-500'}>
                  Confirmation
                </span>
              </div>
            </div>

            {/* Step 1: Select Date & Time */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
                
                {/* Date Picker */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Interview Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Morning Slots */}
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Morning Slots (9:00 AM - 12:00 PM)
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {availableSlots.morning.map((slot, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={slot.available ? { scale: 1.05 } : {}}
                        whileTap={slot.available ? { scale: 0.95 } : {}}
                        disabled={!slot.available}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                          selectedTime === slot.time
                            ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                            : slot.available
                            ? 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Afternoon Slots */}
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Afternoon Slots (2:00 PM - 5:00 PM)
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                    {availableSlots.afternoon.map((slot, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={slot.available ? { scale: 1.05 } : {}}
                        whileTap={slot.available ? { scale: 0.95 } : {}}
                        disabled={!slot.available}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                          selectedTime === slot.time
                            ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                            : slot.available
                            ? 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Interview Mode */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Interview Mode</h2>
                
                <div className="space-y-4 mb-8">
                  {/* Online Option */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setInterviewMode('online')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      interviewMode === 'online'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-orange-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        interviewMode === 'online'
                          ? 'bg-gradient-to-r from-orange-600 to-red-600'
                          : 'bg-gray-100'
                      }`}>
                        <Video className={`w-6 h-6 ${
                          interviewMode === 'online' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">Online Interview</h3>
                        <p className="text-gray-600 mb-3">Conduct interview via Google Meet or Zoom</p>
                        {interviewMode === 'online' && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Meeting Platform
                            </label>
                            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3">
                              <option>Google Meet</option>
                              <option>Zoom</option>
                              <option>Microsoft Teams</option>
                            </select>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Meeting Link (optional - will be auto-generated)
                            </label>
                            <input
                              type="url"
                              placeholder="https://meet.google.com/..."
                              value={meetingLink}
                              onChange={(e) => setMeetingLink(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Offline Option */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setInterviewMode('offline')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      interviewMode === 'offline'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-orange-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        interviewMode === 'offline'
                          ? 'bg-gradient-to-r from-orange-600 to-red-600'
                          : 'bg-gray-100'
                      }`}>
                        <MapPin className={`w-6 h-6 ${
                          interviewMode === 'offline' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">In-Person Interview</h3>
                        <p className="text-gray-600 mb-3">Conduct interview at office location</p>
                        {interviewMode === 'offline' && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Office Address
                            </label>
                            <textarea
                              placeholder="Enter complete office address..."
                              value={officeLocation}
                              onChange={(e) => setOfficeLocation(e.target.value)}
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentStep(1)}
                    className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!interviewMode}
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Confirm</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Interview Date & Time</p>
                    <p className="font-semibold text-gray-900">
                      {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} at {selectedTime}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Interview Mode</p>
                    <p className="font-semibold text-gray-900 capitalize">{interviewMode} Interview</p>
                    {interviewMode === 'online' && (
                      <p className="text-sm text-gray-600 mt-2">
                        Platform: Google Meet
                        {meetingLink && <span className="block mt-1">Link: {meetingLink}</span>}
                      </p>
                    )}
                    {interviewMode === 'offline' && (
                      <p className="text-sm text-gray-600 mt-2">
                        Location: {officeLocation}
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Candidate</p>
                    <p className="font-semibold text-gray-900">{candidate.name}</p>
                    <p className="text-sm text-gray-600">{candidate.title}</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleScheduleInterview}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Schedule Interview
                  </motion.button>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          /* Confirmation Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Interview Scheduled Successfully!
              </h2>
              <p className="text-gray-600 mb-8">
                An email confirmation has been sent to {candidate.name} with all the interview details.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-gray-900">Email Sent To:</h3>
                </div>
                <p className="text-gray-600 mb-2">{candidate.name}</p>
                <p className="text-sm text-gray-500">candidate@example.com</p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Interview: {selectedDate && new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    Mode: {interviewMode} Interview
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendConfirmation}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg"
                >
                  Back to Candidates
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/end-client/dashboard')}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                >
                  Go to Dashboard
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
