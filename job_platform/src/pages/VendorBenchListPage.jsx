import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Search, Upload, Download, Check, Calendar,
  MapPin, DollarSign, Award, X, FileText
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';

export default function VendorBenchlistPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Mock data
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
      status: 'Available'
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
      status: 'Available'
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
      status: 'In Process'
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
      status: 'Available'
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
      status: 'Placed'
    }
  ];

  const filteredCandidates = benchCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
        <div className="bg-white/80 backdrop-blur-xl border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Benchlist</h1>
                <p className="text-gray-600">Manage your available candidates</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-3 border rounded-xl flex gap-2">
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
                className="w-full pl-12 py-3 border rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Candidates */}
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {filteredCandidates.map(candidate => (
            <div
              key={candidate.id}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold">{candidate.name}</h3>
                  <p className="text-gray-600">{candidate.title}</p>

                  <div className="flex gap-4 mt-4">
                    <span><Award /> {candidate.experience} yrs</span>
                    <span><MapPin /> {candidate.location}</span>
                    <span><DollarSign /> {candidate.rate}</span>
                    <span><Calendar /> {candidate.availability}</span>
                  </div>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    {candidate.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-50 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="text-sm text-gray-500">
                  Updated {new Date(candidate.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
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
