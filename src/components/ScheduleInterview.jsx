import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft, Calendar, Clock, Video, MessageSquare,
  ExternalLink, CheckCircle, XCircle, Plus, Trash2,
  Users, Globe, Smartphone, Monitor, Mail, Copy,
   Mic, MicOff, Camera, CameraOff, X
} from 'lucide-react';

const ScheduleInterview = ({ candidate, onClose, onBack, sidebarWidth = 280 }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [interviewType, setInterviewType] = useState('video');
  const [platform, setPlatform] = useState('zoom');
  const [duration, setDuration] = useState('30');
  const [interviewers, setInterviewers] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([
    { id: 1, date: '2024-02-20', time: '10:00', duration: '30' },
    { id: 2, date: '2024-02-20', time: '14:00', duration: '45' },
    { id: 3, date: '2024-02-21', time: '11:30', duration: '30' },
    { id: 4, date: '2024-02-21', time: '16:00', duration: '60' },
    { id: 5, date: '2024-02-22', time: '09:00', duration: '45' },
  ]);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '13:00', '13:30', '14:00', '14:30', '15:00',
    '15:30', '16:00', '16:30', '17:00'
  ];

  const handleCreateSlot = () => {
    const newSlot = {
      id: availableSlots.length + 1,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      duration: duration
    };
    setAvailableSlots([...availableSlots, newSlot]);
  };

  const handleDeleteSlot = (id) => {
    setAvailableSlots(availableSlots.filter(slot => slot.id !== id));
  };

  const handleSendInvite = () => {
    alert(`Interview invitation sent to ${candidate.name}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed inset-0 z-[140] flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50"
      style={{ left: `${sidebarWidth}px`, width: `calc(100vw - ${sidebarWidth}px)` }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Schedule Interview</h1>
            <p className="text-blue-100 text-sm">with {candidate.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-bold hover:bg-white/30 transition-colors">
            Save as Template
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Schedule Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Interview Details */}
              <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                    <Calendar className="text-white" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-blue-950">Interview Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div>
                    <label className="text-sm font-bold text-blue-700 mb-2 block">Select Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={selectedDate.toLocaleTimeString().split('T')[0]}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        className="w-full px-4 py-3 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-300 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <Calendar className="absolute right-3 top-3.5 text-blue-500" size={18} />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="text-sm font-bold text-blue-700 mb-2 block">Select Time</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-300 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-sm font-bold text-blue-700 mb-2 block">Duration</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-3 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-300 rounded-lg text-blue-950 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30"
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                    </select>
                  </div>

                  {/* Interview Type */}
                  <div>
                    <label className="text-sm font-bold text-blue-700 mb-2 block">Interview Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setInterviewType('video')}
                        className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                          interviewType === 'video' 
                            ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-inner' 
                            : 'border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <Video className={`${interviewType === 'video' ? 'text-blue-600' : 'text-blue-400'}`} size={20} />
                        <span className={`text-sm font-bold ${interviewType === 'video' ? 'text-blue-700' : 'text-blue-500'}`}>Video Call</span>
                      </button>
                      <button
                        onClick={() => setInterviewType('phone')}
                        className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                          interviewType === 'phone' 
                            ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-inner' 
                            : 'border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <Mic className={`${interviewType === 'phone' ? 'text-blue-600' : 'text-blue-400'}`} size={20} />
                        <span className={`text-sm font-bold ${interviewType === 'phone' ? 'text-blue-700' : 'text-blue-500'}`}>Phone Call</span>
                      </button>
                    </div>
                  </div>

                  {/* Platform Selection */}
                  {interviewType === 'video' && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-bold text-blue-700 mb-2 block">Video Platform</label>
                      <div className="grid grid-cols-4 gap-3">
                        <button
                          onClick={() => setPlatform('zoom')}
                          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            platform === 'zoom' 
                              ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-inner' 
                              : 'border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            platform === 'zoom' ? 'bg-blue-100' : 'bg-blue-50'
                          }`}>
                            <Video className={`${platform === 'zoom' ? 'text-blue-600' : 'text-blue-400'}`} size={20} />
                          </div>
                          <span className={`text-sm font-bold ${platform === 'zoom' ? 'text-blue-700' : 'text-blue-500'}`}>Zoom</span>
                        </button>
                        <button
                          onClick={() => setPlatform('teams')}
                          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            platform === 'teams' 
                              ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-inner' 
                              : 'border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            platform === 'teams' ? 'bg-blue-100' : 'bg-blue-50'
                          }`}>
                            <Monitor className={`${platform === 'teams' ? 'text-blue-600' : 'text-blue-400'}`} size={20} />
                          </div>
                          <span className={`text-sm font-bold ${platform === 'teams' ? 'text-blue-700' : 'text-blue-500'}`}>Teams</span>
                        </button>
                        <button
                          onClick={() => setPlatform('meet')}
                          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            platform === 'meet' 
                              ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-inner' 
                              : 'border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            platform === 'meet' ? 'bg-blue-100' : 'bg-blue-50'
                          }`}>
                            <Video className={`${platform === 'meet' ? 'text-blue-600' : 'text-blue-400'}`} size={20} />
                          </div>
                          <span className={`text-sm font-bold ${platform === 'meet' ? 'text-blue-700' : 'text-blue-500'}`}>Meet</span>
                        </button>
                        <button
                          onClick={() => setPlatform('custom')}
                          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            platform === 'custom' 
                              ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-inner' 
                              : 'border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            platform === 'custom' ? 'bg-blue-100' : 'bg-blue-50'
                          }`}>
                            <Globe className={`${platform === 'custom' ? 'text-blue-600' : 'text-blue-400'}`} size={20} />
                          </div>
                          <span className={`text-sm font-bold ${platform === 'custom' ? 'text-blue-700' : 'text-blue-500'}`}>Custom</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Available Slots */}
              <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                      <Clock className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-950">Available Time Slots</h3>
                  </div>
                  <button
                    onClick={handleCreateSlot}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg text-sm font-bold hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Plus size={16} />
                    Add New Slot
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableSlots.map(slot => (
                    <div key={slot.id} className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:border-blue-400 transition-all hover:shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-blue-500" size={14} />
                          <span className="text-sm font-bold text-blue-700">{slot.date}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="text-cyan-500" size={14} />
                          <span className="text-sm text-cyan-700">{slot.time}</span>
                        </div>
                        <span className="text-sm font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">{slot.duration} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Description */}
              <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                    <MessageSquare className="text-white" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-blue-950">Interview Description</h3>
                </div>
                <textarea
                  placeholder="Add interview agenda, topics to cover, or any specific instructions..."
                  className="w-full h-40 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-300 rounded-xl p-4 text-blue-950 text-sm placeholder-blue-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30 resize-none"
                  defaultValue={`Technical Interview with ${candidate.name}

Topics to cover:
- Backend development experience
- Python/Java proficiency
- System design concepts
- Problem-solving approach

Duration: ${duration} minutes
Platform: ${platform === 'zoom' ? 'Zoom' : platform === 'teams' ? 'Microsoft Teams' : platform === 'meet' ? 'Google Meet' : 'Custom Link'}`}
                />
              </div>
            </div>

            {/* Right Column - Preview & Actions */}
            <div className="space-y-8">
              {/* Interview Preview */}
              <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-blue-950 mb-6">Interview Preview</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-blue-950">{candidate.name}</p>
                        <p className="text-sm text-cyan-700">{candidate.experience}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-600">Date</span>
                        <span className="text-sm font-bold text-blue-950">{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-600">Time</span>
                        <span className="text-sm font-bold text-blue-950">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-600">Duration</span>
                        <span className="text-sm font-bold text-blue-950">{duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-600">Type</span>
                        <span className="text-sm font-bold text-blue-950 capitalize">{interviewType}</span>
                      </div>
                      {interviewType === 'video' && (
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-600">Platform</span>
                          <span className="text-sm font-bold text-blue-950 capitalize">{platform}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interview Link */}
                  {interviewType === 'video' && platform !== 'custom' && (
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <label className="text-sm font-bold text-blue-700 mb-2 block">Meeting Link</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={`https://${platform}.com/meeting/${Math.random().toString(36).substr(2, 9)}`}
                          className="flex-1 px-3 py-2 bg-white border border-blue-300 rounded text-sm text-blue-700"
                        />
                        <button className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded hover:from-blue-600 hover:to-cyan-700 transition-all">
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Interviewers */}
              <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                    <Users className="text-white" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-blue-950">Interviewers</h3>
                </div>
                <div className="space-y-3">
                  {interviewers.length === 0 ? (
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 text-center">
                      <Users className="mx-auto text-blue-400 mb-2" size={24} />
                      <p className="text-sm text-blue-600">No interviewers added yet</p>
                      <button className="mt-2 text-sm text-blue-600 font-bold hover:text-blue-700 transition-colors">
                        + Add Interviewers
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {interviewers.map((interviewer, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {interviewer.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-blue-700">{interviewer.name}</p>
                              <p className="text-xs text-cyan-600">{interviewer.role}</p>
                            </div>
                          </div>
                          <button className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-blue-950 mb-6">Schedule Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleSendInvite}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Send Calendar Invite
                  </button>
                  <button className="w-full py-3 bg-white border border-blue-300 text-blue-700 rounded-lg font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                    <Mail size={18} />
                    Send Email Only
                  </button>
                  <button className="w-full py-3 bg-white border border-blue-300 text-blue-700 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default ScheduleInterview;