import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  MapPin,
  Briefcase,
  Star,
  ChevronDown,
  FileText,
  Calendar,
  DollarSign,
  Award,
} from "lucide-react";
import EndClientSidebar from "../components/EndClientSidebar";

export default function EndClientCandidatesPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filters, setFilters] = useState({
    jobType: "",
    skills: "",
    location: "",
    minExperience: "",
    maxExperience: "",
    workMode: "",
  });

  const allCandidates = [
    {
      id: "1",
      name: "Alex Johnson",
      title: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      experience: 7,
      skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
      rating: 4.8,
      availability: "Immediate",
      jobType: "Full-time",
      workMode: "Hybrid",
      expectedSalary: "$140K",
      appliedFor: "Senior Full Stack Developer",
      appliedDate: "2024-12-20",
      status: "Under Review",
      vendor: "TechRecruit Pro",
    },
    {
      id: "2",
      name: "Sarah Williams",
      title: "Product Manager",
      location: "New York, NY",
      experience: 5,
      skills: ["Product Strategy", "Agile", "Data Analysis"],
      rating: 4.9,
      availability: "2 weeks",
      jobType: "Full-time",
      workMode: "Remote",
      expectedSalary: "$125K",
      appliedFor: "Product Manager",
      appliedDate: "2024-12-19",
      status: "Interview Scheduled",
      vendor: "TalentHub",
    },
    {
      id: "3",
      name: "Emily Davis",
      title: "Data Analyst",
      location: "Boston, MA",
      experience: 3,
      skills: ["SQL", "Python", "Tableau"],
      rating: 4.6,
      availability: "Immediate",
      jobType: "Contract",
      workMode: "Remote",
      expectedSalary: "$90K",
      appliedFor: "Not Applied",
      appliedDate: "-",
      status: "Available",
      vendor: "DataExperts",
    },
  ];

  const filteredCandidates = allCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesJobType =
      !filters.jobType || candidate.jobType === filters.jobType;
    const matchesWorkMode =
      !filters.workMode || candidate.workMode === filters.workMode;

    return matchesSearch && matchesJobType && matchesWorkMode;
  });

  const activeCandidate = filteredCandidates.find(
    (c) => c.id === selectedCandidate
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EndClientSidebar/>

      <div className="flex-1">
        {/* HEADER */}
        <div className="bg-white border-b px-6 py-6 sticky top-0 z-40">
          <h1 className="text-3xl font-bold mb-2">Candidates</h1>
          <p className="text-gray-600">
            Browse and filter candidates from vendors
          </p>

          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, title, skills"
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border rounded-lg"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {showFilters && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <select
                className="border p-2 rounded-lg"
                value={filters.jobType}
                onChange={(e) =>
                  setFilters({ ...filters, jobType: e.target.value })
                }
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
              </select>

              <select
                className="border p-2 rounded-lg"
                value={filters.workMode}
                onChange={(e) =>
                  setFilters({ ...filters, workMode: e.target.value })
                }
              >
                <option value="">All Work Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-3 gap-6 p-6">
          {/* LIST */}
          <div className="bg-white rounded-xl p-4 shadow">
            {filteredCandidates.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCandidate(c.id)}
                className={`p-4 rounded-lg cursor-pointer mb-2 ${
                  selectedCandidate === c.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm">{c.title}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {c.rating}
                </div>
              </div>
            ))}
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-2">
            {activeCandidate ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow space-y-6"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {activeCandidate.name}
                    </h2>
                    <p className="text-gray-600">
                      {activeCandidate.title}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(
                        `/end-client/interview/${activeCandidate.id}`
                      )
                    }
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg"
                  >
                    Schedule Interview
                  </button>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <Info label="Location" value={activeCandidate.location} icon={<MapPin />} />
                  <Info label="Experience" value={`${activeCandidate.experience} yrs`} icon={<Award />} />
                  <Info label="Availability" value={activeCandidate.availability} icon={<Calendar />} />
                  <Info label="Salary" value={activeCandidate.expectedSalary} icon={<DollarSign />} />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeCandidate.skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Resume</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <FileText className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center shadow">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  Select a candidate to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small reusable info card */
function Info({ label, value, icon }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="text-gray-400 mb-1">{icon}</div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
