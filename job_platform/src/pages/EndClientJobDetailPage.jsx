import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  FileText,
  Users,
} from "lucide-react";

export default function EndClientJobDetailPage() {
  const { jobId } = useParams();

  /* ================= MOCK JOB ================= */
  const job = {
    id: jobId,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    workMode: "Hybrid",
    experience: "5–8 years",
    salary: "$120K - $160K",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    description: `
We are looking for a Senior Full Stack Developer to build scalable web applications.

Responsibilities:
• Design and develop scalable applications
• Collaborate with product & design teams
• Mentor junior developers

Requirements:
• 5+ years of experience
• Strong React & Node.js
• AWS experience
    `,
    jdUrl: "/sample-jd.pdf",
  };

  /* ================= MOCK BENCH ================= */
  const benchCandidates = [
    { id: "b1", name: "John Smith", skills: "React, Node.js", exp: "6 yrs" },
    { id: "b2", name: "Amit Kumar", skills: "Java, Spring", exp: "7 yrs" },
    { id: "b3", name: "Sara Lee", skills: "React, AWS", exp: "5 yrs" },
    { id: "b4", name: "Rahul Verma", skills: "Node, MongoDB", exp: "6 yrs" },
  ];

  const [selectedBench, setSelectedBench] = useState([]);

  const toggleBench = (id) => {
    setSelectedBench((prev) =>
      prev.includes(id)
        ? prev.filter((b) => b !== id)
        : [...prev, id]
    );
  };

  const applyBench = () => {
    alert(
      `Applied ${selectedBench.length} bench candidates to job ${job.title}`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
      {/* ================= LEFT ================= */}
      <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow">
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-gray-600 mb-4">{job.department}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" /> {job.type} · {job.workMode}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {job.experience}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> {job.salary}
          </span>
        </div>

        {/* Description */}
        <h3 className="font-semibold mb-2">Job Description</h3>
        <pre className="whitespace-pre-wrap text-gray-700 mb-6">
          {job.description}
        </pre>

        {/* Skills */}
        <h3 className="font-semibold mb-2">Required Skills</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {job.skills.map((s) => (
            <span
              key={s}
              className="px-3 py-1 bg-orange-50 text-orange-700 rounded text-sm"
            >
              {s}
            </span>
          ))}
        </div>

        {/* JD */}
        <h3 className="font-semibold mb-2">Job Description File</h3>
        <a
          href={job.jdUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-blue-600"
        >
          <FileText className="w-4 h-4" />
          View / Download JD
        </a>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Apply Bench Candidates
        </h3>

        <div className="space-y-3 max-h-[420px] overflow-y-auto">
          {benchCandidates.map((b) => (
            <label
              key={b.id}
              className="flex items-start gap-3 border p-3 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBench.includes(b.id)}
                onChange={() => toggleBench(b.id)}
              />
              <div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-sm text-gray-600">
                  {b.skills} · {b.exp}
                </p>
              </div>
            </label>
          ))}
        </div>

        <button
          disabled={selectedBench.length === 0}
          onClick={applyBench}
          className="w-full mt-4 py-3 bg-orange-600 text-white rounded-xl disabled:opacity-50"
        >
          Apply Selected Bench
        </button>
      </div>
    </div>
  );
}

