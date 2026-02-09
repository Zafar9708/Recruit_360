import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  Eye,
  Download,
  Mail,
  Phone,
  Building2,
  Globe,
  ExternalLink,
  Table as TableIcon,
  LayoutGrid,
  List,
  CheckCircle,
  XCircle,
  ChevronRight,
  BarChart3,
  Target,
  Clock,
  UserCheck,
  Plus,
  MoreVertical,
} from "lucide-react";
import VendorSidebar from "../components/VendorSidebar";

export default function VendorCandidatesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState("1");
  const [viewMode, setViewMode] = useState("list");
  const [activeFilter, setActiveFilter] = useState("all");
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
      skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "MongoDB", "GraphQL"],
      rating: 4.8,
      rate: "$95/hr",
      availability: "Immediate",
      workMode: "Hybrid",
      status: "Available",
      isVerified: true,
      lastUpdated: "2 days ago",
      email: "alex.j@email.com",
      phone: "+1 (555) 123-4567",
      resume: "alex_johnson_resume.pdf",
      vendor: {
        name: "TechStaff Solutions",
        rating: 4.9,
        contact: "Michael Anderson"
      }
    },
    {
      id: "2",
      name: "Sarah Williams",
      title: "Product Manager",
      location: "New York, NY",
      experience: 5,
      skills: ["Product Strategy", "Agile", "Data Analysis", "User Research", "Roadmapping"],
      rating: 4.9,
      rate: "$85/hr",
      availability: "2 weeks",
      workMode: "Remote",
      status: "Available",
      isVerified: true,
      lastUpdated: "4 days ago",
      email: "sarah.w@email.com",
      phone: "+1 (555) 987-6543",
      resume: "sarah_williams_resume.pdf",
      vendor: {
        name: "Digital Talent Inc",
        rating: 4.7,
        contact: "Jennifer Lopez"
      }
    },
    {
      id: "3",
      name: "Michael Chen",
      title: "UX/UI Designer",
      location: "Austin, TX",
      experience: 4,
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Wireframing"],
      rating: 4.7,
      rate: "$75/hr",
      availability: "1 month",
      workMode: "On-site",
      status: "Available",
      isVerified: false,
      lastUpdated: "1 week ago",
      email: "michael.c@email.com",
      phone: "+1 (555) 456-7890",
      resume: "michael_chen_resume.pdf",
      vendor: {
        name: "Creative Staffing",
        rating: 4.5,
        contact: "David Wilson"
      }
    },
    {
      id: "4",
      name: "Emma Davis",
      title: "Data Scientist",
      location: "Boston, MA",
      experience: 6,
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Visualization"],
      rating: 4.6,
      rate: "$105/hr",
      availability: "Immediate",
      workMode: "Remote",
      status: "Available",
      isVerified: true,
      lastUpdated: "3 days ago",
      email: "emma.d@email.com",
      phone: "+1 (555) 234-5678",
      resume: "emma_davis_resume.pdf",
      vendor: {
        name: "TechStaff Solutions",
        rating: 4.9,
        contact: "Michael Anderson"
      }
    },
    {
      id: "5",
      name: "Robert Kim",
      title: "DevOps Engineer",
      location: "Seattle, WA",
      experience: 8,
      skills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Terraform", "Linux"],
      rating: 4.9,
      rate: "$110/hr",
      availability: "3 weeks",
      workMode: "Hybrid",
      status: "Available",
      isVerified: true,
      lastUpdated: "5 days ago",
      email: "robert.k@email.com",
      phone: "+1 (555) 345-6789",
      resume: "robert_kim_resume.pdf",
      vendor: {
        name: "Cloud Talent Group",
        rating: 4.8,
        contact: "Sarah Johnson"
      }
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

    const matchesAvailability =
      !filters.availability ||
      candidate.availability === filters.availability;

    return matchesSearch && matchesSkills && matchesLocation && matchesAvailability;
  });

  const currentCandidate = filteredCandidates.find(
    (x) => x.id === selectedCandidate
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800';
      case 'Interviewing':
        return 'bg-blue-100 text-blue-800';
      case 'Placed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const QuickFilters = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => setActiveFilter("all")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === "all"
            ? "bg-blue-900 text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:border-blue-900"
        }`}
      >
        All Candidates
      </button>
      <button
        onClick={() => setActiveFilter("verified")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === "verified"
            ? "bg-blue-900 text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:border-blue-900"
        }`}
      >
        <CheckCircle className="w-4 h-4 inline mr-2" />
        Verified Only
      </button>
      <button
        onClick={() => setActiveFilter("immediate")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === "immediate"
            ? "bg-blue-900 text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:border-blue-900"
        }`}
      >
        <Clock className="w-4 h-4 inline mr-2" />
        Immediate Start
      </button>
      <button
        onClick={() => setActiveFilter("remote")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === "remote"
            ? "bg-blue-900 text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:border-blue-900"
        }`}
      >
        <Globe className="w-4 h-4 inline mr-2" />
        Remote Only
      </button>
    </div>
  );

  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Candidates</p>
            <p className="text-2xl font-bold text-gray-900">{filteredCandidates.length}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-900" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Average Rate</p>
            <p className="text-2xl font-bold text-gray-900">$94/hr</p>
          </div>
          <div className="p-3 bg-emerald-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-emerald-700" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Verified</p>
            <p className="text-2xl font-bold text-gray-900">4/5</p>
          </div>
          <div className="p-3 bg-amber-100 rounded-lg">
            <CheckCircle className="w-6 h-6 text-amber-700" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Immediate Start</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <Clock className="w-6 h-6 text-purple-700" />
          </div>
        </div>
      </div>
    </div>
  );

  const ListView = () => (
    <div className="space-y-3">
      {filteredCandidates.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => setSelectedCandidate(c.id)}
          className={`p-5 rounded-xl cursor-pointer transition-all duration-200 ${
            selectedCandidate === c.id
              ? "bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-900 shadow-lg"
              : "bg-white border border-gray-200 hover:border-blue-900/30 hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl flex items-center justify-center text-white font-bold text-lg uppercase">
                  {c.name.substring(0, 2)}
                </div>
                {c.isVerified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-gray-900 text-lg">{c.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-semibold text-gray-700">{c.rating}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{c.title}</p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {c.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {c.experience} years
                  </span>
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {c.rate}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {c.availability}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
              <p className="text-xs text-gray-500 mt-2">Updated {c.lastUpdated}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const TableView = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Candidate</th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Experience</th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rate</th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Availability</th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCandidates.map(c => (
              <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center text-white font-bold text-sm uppercase">
                      {c.name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        {c.isVerified && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <p className="text-sm text-gray-500">{c.title}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{c.location}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-semibold text-gray-900">{c.experience}y</span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-bold text-blue-900">{c.rate}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-600">{c.availability}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCandidate(c.id)}
                      className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-950 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const KanbanView = () => {
    const columns = [
      { id: 'Available', title: 'Available', color: 'emerald', icon: UserCheck },
      { id: 'Interviewing', title: 'Interviewing', color: 'blue', icon: Calendar },
      { id: 'Placed', title: 'Placed', color: 'purple', icon: Award }
    ];

    return (
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map(column => {
          const Icon = column.icon;
          const candidatesInColumn = filteredCandidates.filter(c => c.status === column.id);
          
          return (
            <div key={column.id} className="flex-1 min-w-[320px]">
              <div className="bg-white rounded-xl border border-gray-200">
                <div className={`flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-${column.color}-50 to-white`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${column.color}-100`}>
                      <Icon className={`w-5 h-5 text-${column.color}-700`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{column.title}</h3>
                      <p className="text-sm text-gray-500">{candidatesInColumn.length} candidates</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Plus className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  {candidatesInColumn.map(candidate => (
                    <motion.div
                      key={candidate.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedCandidate(candidate.id)}
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-900/30 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center text-white font-bold text-sm uppercase">
                            {candidate.name.substring(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                            <p className="text-sm text-gray-500">{candidate.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-900 mb-1">{candidate.rate}</div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-semibold">{candidate.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200">
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                              +{candidate.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {candidate.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {candidate.experience}y
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar />

      <div className="flex-1 overflow-y-auto">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Candidate Database</h1>
                <p className="text-blue-200">
                  Manage and discover top talent from your vendor network
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-900 bg-white hover:bg-blue-50 rounded-lg transition-colors shadow-sm">
                  <Download className="w-4 h-4" />
                  Export List
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Candidate
                </button>
              </div>
            </div>

            {/* SEARCH AND FILTERS */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search candidates by name, skills, role..."
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 rounded-xl border border-gray-300 hover:border-blue-900 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                  <ChevronDown className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-300 p-6 mb-4 shadow-lg"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Skills</label>
                    <input
                      placeholder="React, Node.js, AWS"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                      value={filters.skills}
                      onChange={(e) =>
                        setFilters({ ...filters, skills: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
                    <input
                      placeholder="City or State"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Availability</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                      value={filters.availability}
                      onChange={(e) =>
                        setFilters({ ...filters, availability: e.target.value })
                      }
                    >
                      <option value="">All Availability</option>
                      <option value="Immediate">Immediate</option>
                      <option value="2 weeks">Within 2 weeks</option>
                      <option value="1 month">Within 1 month</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => setFilters({
                      skills: "",
                      location: "",
                      minExperience: "",
                      maxExperience: "",
                      minRate: "",
                      maxRate: "",
                      availability: "",
                    })}
                    className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear All
                  </button>
                  <button className="px-5 py-2.5 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-950 transition-colors">
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <StatsCards />
          <QuickFilters />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN - CANDIDATES LIST */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Candidates</h2>
                    <p className="text-gray-600 text-sm mt-1">
                      {filteredCandidates.length} candidates found
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'list' 
                          ? 'bg-white text-blue-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                        title="List View"
                      >
                        <List className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('table')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'table' 
                          ? 'bg-white text-blue-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                        title="Table View"
                      >
                        <TableIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('kanban')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'kanban' 
                          ? 'bg-white text-blue-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                        title="Kanban View"
                      >
                        <LayoutGrid className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={viewMode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {viewMode === 'list' && <ListView />}
                    {viewMode === 'table' && <TableView />}
                    {viewMode === 'kanban' && <KanbanView />}

                    {filteredCandidates.length === 0 && (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h4>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Try adjusting your search terms or filters to find what you're looking for.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT COLUMN - CANDIDATE DETAILS */}
            <div className="space-y-6">
              {!currentCandidate ? (
                <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Candidate</h3>
                  <p className="text-gray-600">Choose a candidate from the list to view details</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCandidate.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* PROFILE CARD */}
                    <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-6 text-white">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-xl uppercase border border-white/20">
                              {currentCandidate.name.substring(0, 2)}
                            </div>
                            {currentCandidate.isVerified && (
                              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-blue-900">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold mb-1">{currentCandidate.name}</h2>
                            <p className="text-blue-200 mb-3">{currentCandidate.title}</p>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="font-semibold">{currentCandidate.rating}</span>
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm`}>
                                {currentCandidate.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <div className="flex items-center gap-3 mb-2">
                            <MapPin className="w-5 h-5 text-blue-200" />
                            <span className="text-sm font-medium">Location</span>
                          </div>
                          <p className="font-semibold">{currentCandidate.location}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <div className="flex items-center gap-3 mb-2">
                            <DollarSign className="w-5 h-5 text-blue-200" />
                            <span className="text-sm font-medium">Rate</span>
                          </div>
                          <p className="font-semibold">{currentCandidate.rate}</p>
                        </div>
                      </div>
                    </div>

                    {/* DETAILS CARD */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="font-bold text-gray-900 mb-6 text-lg">Candidate Details</h3>
                      
                      <div className="space-y-5">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Mail className="w-5 h-5 text-gray-500" />
                              <span className="text-gray-900">{currentCandidate.email}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Phone className="w-5 h-5 text-gray-500" />
                              <span className="text-gray-900">{currentCandidate.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentCandidate.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-2 bg-blue-50 text-blue-900 font-medium rounded-lg border border-blue-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Resume</h4>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                              <FileText className="w-6 h-6 text-blue-900" />
                              <div>
                                <p className="font-medium text-gray-900">{currentCandidate.resume}</p>
                                <p className="text-sm text-gray-600">Updated {currentCandidate.lastUpdated}</p>
                              </div>
                            </div>
                            <button className="p-2 hover:bg-white rounded-lg transition-colors">
                              <Download className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* VENDOR CARD */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building2 className="w-6 h-6 text-blue-900" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Vendor Information</h3>
                          <p className="text-sm text-gray-600">Candidate provided by</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-600">Vendor Company</p>
                            <p className="font-semibold text-gray-900">{currentCandidate.vendor.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                              <span className="font-semibold text-gray-900">{currentCandidate.vendor.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Contact Person</p>
                          <p className="font-semibold text-gray-900">{currentCandidate.vendor.contact}</p>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="sticky bottom-6 space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/vendor/interview/${currentCandidate.id}`)}
                        className="w-full py-4 bg-gradient-to-r from-blue-900 to-blue-950 text-white font-semibold rounded-xl hover:shadow-lg transition-all shadow-md"
                      >
                        Schedule Interview
                      </motion.button>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="py-3.5 border-2 border-blue-900 text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                          Shortlist
                        </button>
                        <button className="py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                          Save for Later
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}