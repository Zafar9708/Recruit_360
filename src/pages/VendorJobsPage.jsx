import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Clock,
  ChevronDown,
  Eye,
} from "lucide-react";
import VendorSidebar from "../components/VendorSidebar";

export default function VendorJobsPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: "",
    workMode: "",
    status: "",
  });

  /* ================= MOCK DATA ================= */

  const jobs = [
    {
      id: "1",
      title: "Senior Full Stack Developer",
      client: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      workMode: "Hybrid",
      experience: "5-8 years",
      salary: "$120K - $160K",
      submissions: 12,
      status: "Active",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
    },
    {
      id: "2",
      title: "Product Manager",
      client: "InnovateLabs",
      location: "New York, NY",
      type: "Full-time",
      workMode: "Remote",
      experience: "4-6 years",
      salary: "$110K - $145K",
      submissions: 8,
      status: "Active",
      skills: ["Product Strategy", "Agile", "Data Analysis"],
    },
    {
      id: "3",
      title: "UX/UI Designer",
      client: "CloudSystems",
      location: "Austin, TX",
      type: "Full-time",
      workMode: "On-site",
      experience: "3-5 years",
      salary: "$90K - $120K",
      submissions: 6,
      status: "Active",
      skills: ["Figma", "User Research", "Prototyping"],
    },
    {
      id: "4",
      title: "Data Analyst",
      client: "DataVision",
      location: "Boston, MA",
      type: "Contract",
      workMode: "Remote",
      experience: "2-4 years",
      salary: "$80K - $100K",
      submissions: 5,
      status: "Active",
      skills: ["SQL", "Python", "Tableau", "Excel"],
    },
    {
      id: "5",
      title: "DevOps Engineer",
      client: "TechCorp Inc.",
      location: "Seattle, WA",
      type: "Full-time",
      workMode: "Hybrid",
      experience: "4-7 years",
      salary: "$130K - $170K",
      submissions: 10,
      status: "Active",
      skills: ["Kubernetes", "Docker", "CI/CD", "Terraform"],
    },
  ];

  /* ================= FILTER LOGIC ================= */

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesType = !filters.jobType || job.type === filters.jobType;
    const matchesMode = !filters.workMode || job.workMode === filters.workMode;
    const matchesStatus = !filters.status || job.status === filters.status;

    return matchesSearch && matchesType && matchesMode && matchesStatus;
  });

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100/40 to-gray-200/30">
      <VendorSidebar />

      <div className="flex-1 text-gray-700">
        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Career Opportunities
            </h1>
            <p className="text-gray-500 mb-6">
              Available positions from clients
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 py-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 border border-gray-300 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-100"
              >
                <Filter className="text-gray-500" />
                Filters
                <ChevronDown
                  className={`transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 border border-gray-300 rounded-xl grid md:grid-cols-3 gap-4 bg-gray-50">
                <select
                  value={filters.jobType}
                  onChange={(e) =>
                    setFilters({ ...filters, jobType: e.target.value })
                  }
                  className="border border-gray-300 p-2 rounded text-gray-600"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>

                <select
                  value={filters.workMode}
                  onChange={(e) =>
                    setFilters({ ...filters, workMode: e.target.value })
                  }
                  className="border border-gray-300 p-2 rounded text-gray-600"
                >
                  <option value="">All Modes</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>

                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="border border-gray-300 p-2 rounded text-gray-600"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* JOB LIST */}
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => navigate(`/vendor/jobs/${job.id}`)}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {job.title}
              </h3>

              <p className="text-gray-500 mb-2">
                Client: {job.client}
              </p>

              <div className="flex gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  {job.type} • {job.workMode}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {job.experience}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  {job.salary}
                </span>
              </div>

              <div className="flex gap-2 flex-wrap mb-3">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-50 text-blue-400 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {job.submissions} candidates submitted
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/vendor/jobs/${job.id}`);
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <Eye />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
