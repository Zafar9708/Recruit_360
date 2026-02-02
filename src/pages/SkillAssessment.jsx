import React, { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  Play,
  ChevronRight,
  BrainCircuit,
  Code,
  Database,
  Layout,
  BarChart
} from "lucide-react";
import CandidateSidebar from "../components/CandidateSidebar"; // Assuming you have this

function SkillAssessment() {
  const [activeTab, setActiveTab] = useState("browse"); // 'browse' or 'history'
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= MOCK DATA ================= */

  const stats = [
    { label: "Assessments Passed", value: "12", icon: Award, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Average Score", value: "88%", icon: BarChart, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending Tasks", value: "3", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const availableTests = [
    {
      id: 1,
      title: "React.js Advanced",
      category: "Frontend",
      level: "Expert",
      questions: 25,
      duration: "45 mins",
      icon: Code,
      tags: ["Hooks", "Redux", "Performance"],
      status: "Start"
    },
    {
      id: 2,
      title: "Node.js Backend",
      category: "Backend",
      level: "Intermediate",
      questions: 20,
      duration: "30 mins",
      icon: Database,
      tags: ["Express", "API", "Async/Await"],
      status: "Start"
    },
    {
      id: 3,
      title: "UI/UX Principles",
      category: "Design",
      level: "Beginner",
      questions: 15,
      duration: "20 mins",
      icon: Layout,
      tags: ["Figma", "Prototyping", "Color Theory"],
      status: "Start"
    },
    {
      id: 4,
      title: "Python Data Structures",
      category: "Data Science",
      level: "Intermediate",
      questions: 30,
      duration: "60 mins",
      icon: BrainCircuit,
      tags: ["Lists", "Trees", "Algorithms"],
      status: "Locked" // Example of a locked test
    },
  ];

  const pastResults = [
    {
      id: 101,
      title: "JavaScript Fundamentals",
      date: "2024-12-10",
      score: 92,
      status: "Passed",
      certificate: true,
    },
    {
      id: 102,
      title: "AWS Cloud Basics",
      date: "2024-11-20",
      score: 65,
      status: "Failed",
      certificate: false,
    },
    {
      id: 103,
      title: "SQL Mastery",
      date: "2024-11-05",
      score: 88,
      status: "Passed",
      certificate: true,
    },
  ];

  // Helper for difficulty badge color
  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-blue-100 text-blue-700";
      case "Expert": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100/40 to-gray-200/30">
      <CandidateSidebar />

      <div className="flex-1 text-gray-700">
        
        {/* HEADER SECTION */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Skill Assessment</h1>
            <p className="text-gray-500 mb-6">Validate your technical expertise and earn badges.</p>

            {/* TABS */}
            <div className="flex items-center gap-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("browse")}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === "browse" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Browse Tests
                {activeTab === "browse" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === "history" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                My Results
                {activeTab === "history" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 space-y-8">
          
          {/* STATS OVERVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <h4 className="text-2xl font-bold text-gray-800">{stat.value}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* CONTENT AREA */}
          {activeTab === "browse" ? (
            <div className="space-y-6">
              
              {/* SEARCH & FILTER */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by skill or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                  />
                </div>
                <button className="px-6 py-3 bg-white border border-gray-300 rounded-xl flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-medium">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>

              {/* TEST CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {availableTests.map((test) => (
                  <div key={test.id} className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                          <test.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {test.title}
                          </h3>
                          <p className="text-sm text-gray-500">{test.category}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(test.level)}`}>
                        {test.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {test.duration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        {test.questions} Questions
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {test.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button 
                      disabled={test.status === 'Locked'}
                      className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                      test.status === 'Locked' 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90 shadow-lg shadow-blue-500/20'
                    }`}>
                      {test.status === 'Locked' ? 'Locked' : 'Start Assessment'}
                      {test.status !== 'Locked' && <Play className="w-4 h-4 fill-current" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* HISTORY TAB */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      <th className="p-6">Assessment Name</th>
                      <th className="p-6">Date Taken</th>
                      <th className="p-6">Score</th>
                      <th className="p-6">Status</th>
                      <th className="p-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pastResults.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-6 font-medium text-gray-800">{result.title}</td>
                        <td className="p-6 text-gray-500">{new Date(result.date).toLocaleDateString()}</td>
                        <td className="p-6">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${result.score >= 70 ? 'text-emerald-600' : 'text-red-500'}`}>
                              {result.score}%
                            </span>
                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${result.score >= 70 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                                style={{ width: `${result.score}%` }} 
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                            result.status === 'Passed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {result.status === 'Passed' ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                            {result.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1 cursor-pointer">
                            View Report <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default SkillAssessment;