import { useState } from 'react';
import {
  Users, Search, Upload, Download, Check, Calendar,
  MapPin, DollarSign, Award, X, FileText, CheckCircle, XCircle,
  UserCheck, UserX, Clock, Eye
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function VendorBenchlistPage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  /* ================= MOCK DATA (ONLY DATA FIXED) ================= */
  const benchCandidates = [
    {
      id: '1',
      name: 'John Smith',
      title: 'Senior Java Developer',
      skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
      experience: 8,
      location: 'San Francisco, CA',
      rate: '$95/hr',
      availability: 'Immediate',
      lastUpdated: '2024-12-20',
      status: 'Available',
      isVerified: true,
      isActive: true
    },
    {
      id: '2',
      name: 'Emily Rodriguez',
      title: 'React Developer',
      skills: ['React', 'TypeScript', 'Redux', 'Node.js'],
      experience: 5,
      location: 'Austin, TX',
      rate: '$85/hr',
      availability: '2 weeks',
      lastUpdated: '2024-12-18',
      status: 'Available',
      isVerified: false,
      isActive: true
    },
    {
      id: '3',
      name: 'Michael Chang',
      title: 'DevOps Engineer',
      skills: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
      experience: 6,
      location: 'Seattle, WA',
      rate: '$90/hr',
      availability: 'Immediate',
      lastUpdated: '2024-12-15',
      status: 'In Process',
      isVerified: true,
      isActive: false
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      title: 'Data Scientist',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      experience: 7,
      location: 'Boston, MA',
      rate: '$100/hr',
      availability: '1 month',
      lastUpdated: '2024-12-12',
      status: 'Available',
      isVerified: true,
      isActive: true
    },
    {
      id: '5',
      name: 'David Kumar',
      title: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      experience: 4,
      location: 'New York, NY',
      rate: '$80/hr',
      availability: 'Immediate',
      lastUpdated: '2024-12-10',
      status: 'Placed',
      isVerified: false,
      isActive: false
    }
  ];

  /* ================= STATS (NO CHANGE) ================= */
  const stats = {
    total: benchCandidates.length,
    verified: benchCandidates.filter(c => c.isVerified).length,
    notVerified: benchCandidates.filter(c => !c.isVerified).length,
    active: benchCandidates.filter(c => c.isActive).length,
    inactive: benchCandidates.filter(c => !c.isActive).length,
    onHold: benchCandidates.filter(c => c.status === 'In Process').length
  };

  /* ================= FIXED FILTER LOGIC ================= */
  const filteredCandidates = benchCandidates
    .filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(candidate => {
      if (activeFilter === 'verified') return candidate.isVerified;
      if (activeFilter === 'notVerified') return !candidate.isVerified;
      if (activeFilter === 'active') return candidate.isActive;
      if (activeFilter === 'inactive') return !candidate.isActive;
      if (activeFilter === 'onHold') return candidate.status === 'In Process';
      return true;
    });

  const handleFileUpload = () => {
    setUploadSuccess(true);
    setTimeout(() => {
      setShowUploadModal(false);
      setUploadSuccess(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30">
      <VendorSidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Benchlist</h1>
                <p className="text-gray-600">Manage your available candidates</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex gap-2">
                  <Download /> Export
                </button>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-6 py-3 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl flex gap-2"
                >
                  <Upload /> Upload Benchlist
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
              />
            </div>
          </div>
        </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveFilter('all')}
            className={`cursor-pointer rounded-2xl shadow-lg border p-4 transition-all ${
              activeFilter === 'all' 
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-600' 
                : 'bg-white border-gray-100 hover:shadow-xl'
            }`}
          >
            <div className="text-center">
              <Users className={`w-8 h-8 mx-auto mb-2 ${activeFilter === 'all' ? 'text-white' : 'text-blue-600'}`} />
              <p className={`text-xs mb-1 ${activeFilter === 'all' ? 'text-blue-100' : 'text-gray-600'}`}>Total</p>
              <p className={`text-2xl font-bold ${activeFilter === 'all' ? 'text-white' : 'text-gray-900'}`}>
                {stats.total}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            onClick={() => setActiveFilter('verified')}
            className={`cursor-pointer rounded-2xl shadow-lg border p-4 transition-all ${
              activeFilter === 'verified' 
                ? 'bg-gradient-to-br from-green-600 to-emerald-700 border-green-700' 
                : 'bg-white border-gray-100 hover:shadow-xl'
            }`}
          >
            <div className="text-center">
              <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${activeFilter === 'verified' ? 'text-white' : 'text-green-600'}`} />
              <p className={`text-xs mb-1 ${activeFilter === 'verified' ? 'text-green-100' : 'text-gray-600'}`}>Verified</p>
              <p className={`text-2xl font-bold ${activeFilter === 'verified' ? 'text-white' : 'text-gray-900'}`}>
                {stats.verified}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setActiveFilter('notVerified')}
            className={`cursor-pointer rounded-2xl shadow-lg border p-4 transition-all ${
              activeFilter === 'notVerified' 
                ? 'bg-gradient-to-br from-gray-600 to-gray-700 border-gray-700' 
                : 'bg-white border-gray-100 hover:shadow-xl'
            }`}
          >
            <div className="text-center">
              <XCircle className={`w-8 h-8 mx-auto mb-2 ${activeFilter === 'notVerified' ? 'text-white' : 'text-gray-600'}`} />
              <p className={`text-xs mb-1 ${activeFilter === 'notVerified' ? 'text-gray-100' : 'text-gray-600'}`}>Not Verified</p>
              <p className={`text-2xl font-bold ${activeFilter === 'notVerified' ? 'text-white' : 'text-gray-900'}`}>
                {stats.notVerified}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => setActiveFilter('active')}
            className={`cursor-pointer rounded-2xl shadow-lg border p-4 transition-all ${
              activeFilter === 'active' 
                ? 'bg-gradient-to-br from-emerald-600 to-teal-700 border-emerald-700' 
                : 'bg-white border-gray-100 hover:shadow-xl'
            }`}
          >
            <div className="text-center">
              <UserCheck className={`w-8 h-8 mx-auto mb-2 ${activeFilter === 'active' ? 'text-white' : 'text-emerald-600'}`} />
              <p className={`text-xs mb-1 ${activeFilter === 'active' ? 'text-emerald-100' : 'text-gray-600'}`}>Active</p>
              <p className={`text-2xl font-bold ${activeFilter === 'active' ? 'text-white' : 'text-gray-900'}`}>
                {stats.active}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setActiveFilter('inactive')}
            className={`cursor-pointer rounded-2xl shadow-lg border p-4 transition-all ${
              activeFilter === 'inactive' 
                ? 'bg-gradient-to-br from-red-600 to-red-700 border-red-700' 
                : 'bg-white border-gray-100 hover:shadow-xl'
            }`}
          >
            <div className="text-center">
              <UserX className={`w-8 h-8 mx-auto mb-2 ${activeFilter === 'inactive' ? 'text-white' : 'text-red-600'}`} />
              <p className={`text-xs mb-1 ${activeFilter === 'inactive' ? 'text-red-100' : 'text-gray-600'}`}>Inactive</p>
              <p className={`text-2xl font-bold ${activeFilter === 'inactive' ? 'text-white' : 'text-gray-900'}`}>
                {stats.inactive}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            onClick={() => setActiveFilter('onHold')}
            className={`cursor-pointer rounded-2xl shadow-lg border p-4 transition-all ${
              activeFilter === 'onHold' 
                ? 'bg-gradient-to-br from-orange-600 to-orange-700 border-orange-700' 
                : 'bg-white border-gray-100 hover:shadow-xl'
            }`}
          >
            <div className="text-center">
              <Clock className={`w-8 h-8 mx-auto mb-2 ${activeFilter === 'onHold' ? 'text-white' : 'text-orange-600'}`} />
              <p className={`text-xs mb-1 ${activeFilter === 'onHold' ? 'text-orange-100' : 'text-gray-600'}`}>On Hold</p>
              <p className={`text-2xl font-bold ${activeFilter === 'onHold' ? 'text-white' : 'text-gray-900'}`}>
                {stats.onHold}
              </p>
            </div>
          </motion.div>
        </div>

        

        {/* Candidates */}
         <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filteredCandidates.length} of {stats.total} candidates
            {activeFilter !== 'all' && (
              <button
                onClick={() => setActiveFilter('all')}
                className="ml-2 text-blue-600 hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-6">
          {filteredCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">
                      {candidate.name.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                      {candidate.isVerified && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </div>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        candidate.status === 'Available' ? 'bg-green-100 text-green-700' :
                        candidate.status === 'In Process' ? 'bg-orange-100 text-orange-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{candidate.title}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500 text-xs">Experience</p>
                          <p className="font-semibold text-gray-900">{candidate.experience} years</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500 text-xs">Location</p>
                          <p className="font-semibold text-gray-900">{candidate.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500 text-xs">Rate</p>
                          <p className="font-semibold text-gray-900">{candidate.rate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500 text-xs">Availability</p>
                          <p className="font-semibold text-gray-900">{candidate.availability}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {candidate.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/vendor/bench-candidate/${candidate.id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Shortlist
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:bg-red-700 transition-all"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="text-right text-sm text-gray-500 ml-4">
                  Updated {new Date(candidate.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search</p>
          </div>
        )}
      </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md">
              {!uploadSuccess ? (
                <>
                  <h3 className="text-xl font-bold mb-4">Upload Benchlist</h3>
                  <button
                    onClick={handleFileUpload}
                    className="w-full py-3 bg-green-600 text-white rounded-xl"
                  >
                    Upload
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <Check className="mx-auto text-green-600 w-12 h-12" />
                  <p className="mt-4 font-semibold">Upload Successful</p>
                </div>
              )}
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  
  );
}
