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
import VendorSidebar from "../components/VendorSidebar";

export default function VendorCandidatesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filters, setFilters] = useState({
    skills: "",
    location: "",
    minExperience: "",
    maxExperience: "",
    minRate: "",
    maxRate: "",
    availability: "",
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
      rate: "$95/hr",
      availability: "Immediate",
      workMode: "Hybrid",
      status: "Available",
    },
    {
      id: "2",
      name: "Sarah Williams",
      title: "Product Manager",
      location: "New York, NY",
      experience: 5,
      skills: ["Product Strategy", "Agile", "Data Analysis"],
      rating: 4.9,
      rate: "$85/hr",
      availability: "2 weeks",
      workMode: "Remote",
      status: "Available",
    },
    {
      id: "3",
      name: "Michael Chen",
      title: "UX/UI Designer",
      location: "Austin, TX",
      experience: 4,
      skills: ["Figma", "User Research", "Prototyping"],
      rating: 4.7,
      rate: "$75/hr",
      availability: "1 month",
      workMode: "On-site",
      status: "Available",
    },
  ];

  const filteredCandidates = allCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSkills =
      !filters.skills ||
      candidate.skills.some((s) =>
        s.toLowerCase().includes(filters.skills.toLowerCase())
      );

    const matchesLocation =
      !filters.location ||
      candidate.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesMinExp =
      !filters.minExperience ||
      candidate.experience >= Number(filters.minExperience);

    const matchesMaxExp =
      !filters.maxExperience ||
      candidate.experience <= Number(filters.maxExperience);

    const matchesAvailability =
      !filters.availability ||
      candidate.availability === filters.availability;

    return (
      matchesSearch &&
      matchesSkills &&
      matchesLocation &&
      matchesMinExp &&
      matchesMaxExp &&
      matchesAvailability
    );
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30">
      <VendorSidebar />

      <div className="flex-1">
        {/* HEADER */}
        <div className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold mb-2">All Candidates</h1>
            <p className="text-gray-600 mb-6">
              Browse and filter candidates from database
            </p>

            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search candidates..."
                  className="w-full pl-12 pr-4 py-3 border rounded-xl"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 border rounded-xl"
              >
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown
                  className={`transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 bg-white border rounded-xl grid md:grid-cols-3 gap-4">
                <input
                  placeholder="Skills"
                  className="border p-2 rounded"
                  value={filters.skills}
                  onChange={(e) =>
                    setFilters({ ...filters, skills: e.target.value })
                  }
                />
                <input
                  placeholder="Location"
                  className="border p-2 rounded"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                />
                <select
                  className="border p-2 rounded"
                  value={filters.availability}
                  onChange={(e) =>
                    setFilters({ ...filters, availability: e.target.value })
                  }
                >
                  <option value="">All Availability</option>
                  <option value="Immediate">Immediate</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
          {/* LIST */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-bold mb-4">
              Candidates ({filteredCandidates.length})
            </h3>
            <div className="space-y-3">
              {filteredCandidates.map((c) => (
                <motion.div
                  key={c.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedCandidate(c.id)}
                  className={`p-4 rounded-lg cursor-pointer ${
                    selectedCandidate === c.id
                      ? "bg-blue-50 border border-blue-300"
                      : "bg-gray-50"
                  }`}
                >
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-600">{c.title}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {c.rating} · {c.rate}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-2">
            {!selectedCandidate ? (
              <div className="bg-white p-16 rounded-xl shadow text-center">
                <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p>Select a candidate to view details</p>
              </div>
            ) : (
              (() => {
                const c = filteredCandidates.find(
                  (x) => x.id === selectedCandidate
                );
                if (!c) return null;

                return (
                  <div className="space-y-6">
                    <div className="bg-white p-8 rounded-xl shadow">
                      <h2 className="text-2xl font-bold">{c.name}</h2>
                      <p className="text-gray-600 mb-4">{c.title}</p>

                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="p-4 bg-gray-50 rounded">
                          <MapPin className="w-4 h-4 mb-1" />
                          {c.location}
                        </div>
                        <div className="p-4 bg-gray-50 rounded">
                          <Award className="w-4 h-4 mb-1" />
                          {c.experience} yrs
                        </div>
                        <div className="p-4 bg-gray-50 rounded">
                          <DollarSign className="w-4 h-4 mb-1" />
                          {c.rate}
                        </div>
                        <div className="p-4 bg-gray-50 rounded">
                          <Calendar className="w-4 h-4 mb-1" />
                          {c.availability}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                      <h3 className="font-bold mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {c.skills.map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 bg-blue-100 text-blue-500 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                      <h3 className="font-bold mb-2">Resume</h3>
                      <button className="flex gap-2 items-center px-4 py-2 bg-gray-100 rounded">
                        <FileText className="w-4 h-4" />
                        Download Resume
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() =>
                        navigate(`/vendor/interview/${c.id}`)
                      }
                      className="w-full py-3 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl"
                    >
                      Schedule Interview
                    </motion.button>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
