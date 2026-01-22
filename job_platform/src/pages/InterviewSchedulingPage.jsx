import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Calendar as CalendarIcon, Clock, Video, MapPin, Check } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import * as RadioGroup from '@radix-ui/react-radio-group';

export default function InterviewSchedulingPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [interviewMode, setInterviewMode] = useState('online');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const companies = [
    { id: 1, name: 'TechCorp', logo: 'TC' },
    { id: 2, name: 'InnovateLabs', logo: 'IL' },
    { id: 3, name: 'DataVision', logo: 'DV' },
    { id: 4, name: 'CloudSystems', logo: 'CS' },
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime || !selectedCompany || !interviewMode) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Interview scheduled successfully!', {
      description: `You'll receive a confirmation email shortly.`,
    });

    setIsSubmitting(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule Interview</h1>
          <p className="text-gray-600">Choose your preferred interview slot</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Company Selection */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Company</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company.name)}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    selectedCompany === company.name
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-blue-600">{company.logo}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">{company.name}</p>
                  {selectedCompany === company.name && (
                    <div className="mt-2 flex justify-center">
                      <Check className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Interview Mode */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Interview Mode</h2>
            <RadioGroup.Root
              value={interviewMode}
              onValueChange={setInterviewMode}
              className="grid md:grid-cols-2 gap-4"
            >
              <RadioGroup.Item
                value="online"
                className={`p-6 border-2 rounded-xl transition-all cursor-pointer ${
                  interviewMode === 'online'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Online Interview</h3>
                    <p className="text-sm text-gray-600">Join via Google Meet or Zoom</p>
                    {interviewMode === 'online' && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm text-green-800">
                        Meeting link will be sent to your email
                      </div>
                    )}
                  </div>
                </div>
              </RadioGroup.Item>

              <RadioGroup.Item
                value="offline"
                className={`p-6 border-2 rounded-xl transition-all cursor-pointer ${
                  interviewMode === 'offline'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Offline Interview</h3>
                    <p className="text-sm text-gray-600">Visit office location</p>
                    {interviewMode === 'offline' && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                        Office address: 123 Tech Park, Bangalore
                      </div>
                    )}
                  </div>
                </div>
              </RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          {/* Date Selection */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Date</h2>
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="mx-auto"
                disabled={(date) => date < new Date()}
              />
            </div>
            {selectedDate && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <CalendarIcon className="w-4 h-4 inline mr-2" />
                  Selected: <strong>{format(selectedDate, 'MMMM dd, yyyy')}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Time Selection */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Time Slot</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedTime === time
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-200 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          {selectedDate && selectedTime && selectedCompany && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-4">Interview Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Company:</span>
                  <span className="font-medium text-gray-900">{selectedCompany}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode:</span>
                  <span className="font-medium text-gray-900 capitalize">{interviewMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-900">{format(selectedDate, 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium text-gray-900">{selectedTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSchedule}
            disabled={isSubmitting || !selectedDate || !selectedTime || !selectedCompany}
            className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? 'Scheduling...' : 'Confirm Interview Schedule'}
          </button>

          <p className="text-center text-sm text-gray-500">
            You will receive a confirmation email after scheduling
          </p>
        </div>
      </div>
    </div>
  );
}