import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
} from "lucide-react";
import EndClientSidebar from "../components/EndClientSidebar";

export default function EndClientJobsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: "",
    workMode: "",
    status: "",
  });

  const jobs = [
    {
      id: "1",
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      workMode: "Hybrid",
      experience: "5-8 years",
      salary: "$120K - $160K",
      applicants: 45,
      postedDate: "2024-12-20",
      status: "Active",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      workMode: "Remote",
      experience: "4-6 years",
      salary: "$110K - $145K",
      applicants: 32,
      postedDate: "2024-12-18",
      status: "Active",
      skills: ["Product Strategy", "Agile", "Data Analysis"],
    },
    {
      id: "3",
      title: "UX/UI Designer",
      department: "Design",
      location: "Austin, TX",
      type: "Full-time",
      workMode: "On-site",
      experience: "3-5 years",
      salary: "$90K - $120K",
      applicants: 28,
      postedDate: "2024-12-15",
      status: "Active",
      skills: ["Figma", "User Research", "Prototyping"],
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesType = !filters.jobType || job.type === filters.jobType;
    const matchesMode = !filters.workMode || job.workMode === filters.workMode;
    const matchesStatus = !filters.status || job.status === filters.status;

    return matchesSearch && matchesType && matchesMode && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-red-50/30">
      <EndClientSidebar />

      <div className="flex-1">
        {/* HEADER */}
        <div className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">Job Postings</h1>
                <p className="text-gray-600">Manage your open positions</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/end-client/jobs/new")}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold"
              >
                <Plus className="w-5 h-5" />
                Post New Job
              </motion.button>
            </div>

            {/* SEARCH + FILTER */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search jobs..."
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

            {/* FILTERS */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white border rounded-xl grid md:grid-cols-3 gap-4">
                <select
                  className="border p-2 rounded"
                  value={filters.jobType}
                  onChange={(e) =>
                    setFilters({ ...filters, jobType: e.target.value })
                  }
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>

                <select
                  className="border p-2 rounded"
                  value={filters.workMode}
                  onChange={(e) =>
                    setFilters({ ...filters, workMode: e.target.value })
                  }
                >
                  <option value="">All Modes</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>

                <select
                  className="border p-2 rounded"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
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
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => navigate(`/end-client/jobs/${job.id}`)}
              className="bg-white p-6 rounded-xl shadow cursor-pointer"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-gray-600">{job.department}</p>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex gap-1 items-center">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </span>
                    <span className="flex gap-1 items-center">
                      <Briefcase className="w-4 h-4" /> {job.type} ·{" "}
                      {job.workMode}
                    </span>
                    <span className="flex gap-1 items-center">
                      <Clock className="w-4 h-4" /> {job.experience}
                    </span>
                    <span className="flex gap-1 items-center">
                      <DollarSign className="w-4 h-4" /> {job.salary}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-orange-50 text-orange-700 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  {job.applicants}
                </div>
              </div>
            </motion.div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-20">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No jobs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
