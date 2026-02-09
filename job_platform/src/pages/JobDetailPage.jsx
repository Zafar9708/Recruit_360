import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Eye,
  Building,
  Award,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function JobDetailPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const userRole = localStorage.getItem('userRole') || 'vendor';

  // Mock data
  const jobData = {
    id: jobId || 'JOB-2024-001',
    title: 'Senior React Developer',
    company: 'TechNova Pvt Ltd',
    postedBy: 'TechNova HR Team',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    experience: '4-6 Years',
    location: 'Bangalore',
    salary: '₹18-22 LPA',
    postedDate: '5 days ago',
    status: 'Open',
    skills: [
      'React',
      'TypeScript',
      'Redux',
      'Tailwind CSS',
      'Node.js',
      'REST APIs',
    ],
    description:
      'We are looking for an experienced React Developer to join our dynamic team. The ideal candidate will have a strong background in building scalable web applications using modern JavaScript frameworks.',
    responsibilities: [
      'Develop and maintain high-quality React applications',
      'Collaborate with cross-functional teams to define and implement new features',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and provide constructive feedback',
      'Optimize applications for maximum performance',
    ],
    requirements: [
      '4-6 years of professional experience with React.js',
      'Strong proficiency in TypeScript and modern JavaScript (ES6+)',
      'Experience with state management libraries (Redux, MobX)',
      'Familiarity with RESTful APIs and asynchronous programming',
      'Understanding of responsive design and cross-browser compatibility',
    ],
    niceToHave: [
      'Experience with Next.js or other SSR frameworks',
      'Knowledge of GraphQL',
      'Familiarity with testing frameworks (Jest, React Testing Library)',
      'Experience with CI/CD pipelines',
    ],
    interviewProcess:
      'Initial Screening → Technical Round → Manager Round → HR Round',
    contractDuration: 'Full-time permanent position',
  };

  const appliedCandidates = [
    {
      id: 1,
      name: 'Ankit Sharma',
      role: 'MERN Stack Developer',
      experience: '5 years',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      vendor: 'CodeBench Solutions',
      status: 'Interview Scheduled',
      match: 92,
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Frontend Developer',
      experience: '4 years',
      skills: ['React', 'TypeScript', 'Redux', 'Tailwind'],
      vendor: 'TalentHub Tech',
      status: 'Under Review',
      match: 88,
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      role: 'Full Stack Developer',
      experience: '6 years',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      vendor: 'DevExperts Inc',
      status: 'Applied',
      match: 85,
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'React Developer',
      experience: '4 years',
      skills: ['React', 'Redux', 'JavaScript', 'CSS'],
      vendor: 'CodeBench Solutions',
      status: 'Shortlisted',
      match: 90,
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'interview scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'under review':
        return 'bg-yellow-100 text-yellow-700';
      case 'shortlisted':
        return 'bg-purple-100 text-purple-700';
      case 'applied':
        return 'bg-gray-100 text-gray-700';
      case 'selected':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border p-8"
            >
              <h1 className="text-3xl font-bold mb-4">
                {jobData.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info icon={Briefcase} label="Job Type" value={`${jobData.jobType} • ${jobData.workMode}`} />
                <Info icon={Award} label="Experience" value={jobData.experience} />
                <Info icon={MapPin} label="Location" value={jobData.location} />
                <Info icon={DollarSign} label="Salary" value={jobData.salary} />
              </div>
            </motion.div>

            {/* Candidates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border p-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                Applied Candidates ({appliedCandidates.length})
              </h2>

              {appliedCandidates.map((c) => (
                <div
                  key={c.id}
                  className="border p-5 rounded-xl mb-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{c.name}</h3>
                      <p className="text-sm text-gray-600">
                        {c.role} • {c.experience}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/candidate/${c.id}`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </div>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border sticky top-6">
              <h3 className="font-bold mb-4">Quick Actions</h3>

              {userRole === 'vendor' && (
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl">
                  Submit Candidate
                </button>
              )}

              {userRole === 'end-client' && (
                <button className="w-full py-3 bg-green-600 text-white rounded-xl">
                  Schedule Interview
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Info Card */
function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
      <Icon className="w-5 h-5 text-blue-600" />
      <div>
        <p className="text-xs text-gray-600">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

