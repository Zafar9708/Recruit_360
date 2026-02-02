import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import VendorSidebar from "../components/VendorSidebar";

export default function VendorJobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= MOCK JOB DATA ================= */

  const job = {
    id: "1",
    title: "Senior Full Stack Developer",
    client: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    workMode: "Hybrid",
    experience: "5–8 Years",
    salary: "$120K – $160K",
    status: "Active",
   overview:
  "TechCorp Inc. is seeking an experienced and highly motivated Senior Full Stack Developer to join our growing engineering team. In this role, you will be responsible for designing, developing, and maintaining robust, scalable, and high-performance web applications that power critical business operations.\n\nYou will work closely with cross-functional teams including product managers, UX/UI designers, QA engineers, and other developers to translate business requirements into technical solutions. The ideal candidate has a strong understanding of modern frontend and backend technologies, follows best coding practices, and takes ownership of the complete development lifecycle.\n\nAs a Senior Full Stack Developer, you will also contribute to architectural decisions, mentor junior developers, participate in code reviews, and continuously improve application performance, security, and scalability. This role offers the opportunity to work on complex systems, influence technical direction, and grow your career in a collaborative and innovation-driven environment.",


    responsibilities: [
      "Design, develop, and maintain scalable full-stack applications",
      "Build reusable frontend components using React.js",
      "Develop backend services and RESTful APIs using Node.js",
      "Collaborate with product managers, designers, and QA teams",
      "Perform code reviews and mentor junior developers",
      "Ensure application performance, security, and scalability",
    ],

    requirements: [
      "5+ years of experience in full-stack development",
      "Strong proficiency in JavaScript, React.js, and Node.js",
      "Experience with REST APIs and database design",
      "Hands-on experience with cloud platforms (AWS preferred)",
      "Good understanding of CI/CD pipelines",
      "Excellent communication and problem-solving skills",
    ],

    niceToHave: [
      "Experience with TypeScript",
      "Knowledge of Docker and Kubernetes",
      "Exposure to microservices architecture",
    ],

    benefits: [
      "Competitive salary and performance bonuses",
      "Hybrid work model with flexible hours",
      "Health insurance and wellness programs",
      "Learning & development budget",
      "Career growth opportunities",
    ],
  };

  /* ================= BENCHLIST DATA ================= */

  const benchlist = [
    {
      id: "b1",
      name: "John Smith",
      role: "Full Stack Developer",
      experience: "6 Years",
      skills: ["React", "Node.js", "AWS"],
    },
    {
      id: "b2",
      name: "Emily Rodriguez",
      role: "Frontend Developer",
      experience: "4 Years",
      skills: ["React", "TypeScript", "Tailwind"],
    },
    {
      id: "b3",
      name: "Michael Chang",
      role: "Backend Developer",
      experience: "5 Years",
      skills: ["Node.js", "MongoDB", "Docker"],
    },
    {
      id: "b4",
      name:"Sarah Johnson",
      role:"Data Scientist", 
      experience:"7 years",
      skills:["Python","Machine Learning","TensorFlow","SQL"]
    },
    {

      id:"b5",
      name:"David Kumar",
      role:"Full Stack Developer",
      experience:"4 years",
      skills:["React", "Node.js","MongoDB","Express"]

    }
  ];

  /* ================= STATE ================= */

  const [selectedBench, setSelectedBench] = useState([]);
  const [applied, setApplied] = useState(false);
const [showPopup, setShowPopup] = useState(false);


  /* ================= HANDLERS ================= */

  const toggleBench = (benchId) => {
    setSelectedBench((prev) =>
      prev.includes(benchId)
        ? prev.filter((id) => id !== benchId)
        : [...prev, benchId]
    );
  };

const applyBenchToJob = () => {
  if (selectedBench.length === 0) {
    alert("Please select at least one candidate");
    return;
  }

  console.log("Applied Bench IDs:", selectedBench);

  setApplied(true);
  setShowPopup(true);

  // Future API:
  // POST /vendor/jobs/:id/apply-bench
};

  return (
    <div className="flex min-h-screen bg-gray-100">
      <VendorSidebar />

      <div className="flex-1 p-8">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-800"
        >
          <ArrowLeft /> Back to Jobs
        </button>

        {/* ================= JOB DETAILS ================= */}
        <div className="bg-white rounded-2xl p-10 shadow mb-10">
          <div className="border-b pb-6 mb-6">
            <h1 className="text-3xl font-semibold text-blue-500">
              {job.title}
            </h1>
            <p className="text-gray-500 mt-1">
              Client: {job.client}
            </p>

            <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {job.type} • {job.workMode}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {job.experience}
              </span>
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> {job.salary}
              </span>
            </div>
          </div>

          {/* OVERVIEW */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Job Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {job.overview}
            </p>
          </section>

          {/* RESPONSIBILITIES */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Key Responsibilities
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* REQUIREMENTS */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Required Skills & Experience
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* NICE TO HAVE */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Nice to Have
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              {job.niceToHave.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* BENEFITS */}
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Benefits & Perks
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              {job.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* ================= BENCHLIST ================= */}
        <div className="bg-white rounded-2xl p-10 shadow">
          <h2 className="text-2xl font-semibold mb-6 text-blue-500">
            My Benchlist
          </h2>

          <div className="space-y-4">
            {benchlist.map((bench) => (
              <label
                key={bench.id}
                className="flex items-start gap-4 border rounded-xl p-4 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedBench.includes(bench.id)}
                  onChange={() => toggleBench(bench.id)}
                  className="mt-1"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {bench.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {bench.role} • {bench.experience}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {bench.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-50 text-blue-500 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* APPLY */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Selected Candidates: {selectedBench.length}
            </p>

            <button
              onClick={applyBenchToJob}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-500"
            >
              <CheckCircle />
              Apply Selected Bench
            </button>
          </div>

          {applied && (
            <p className="text-green-600 mt-4 font-medium">
              ✅ Selected candidates have been successfully submitted
            </p>
          )}
        </div>
      </div>
      {/* SUCCESS POPUP */}
{showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
      
      <div className="flex justify-center mb-4">
        <CheckCircle className="w-14 h-14 text-green-600" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Bench Submitted Successfully
      </h2>

      <p className="text-gray-600 mb-6">
        Selected candidates have been successfully submitted for
        <span className="font-medium"> {job.title}</span>.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowPopup(false)}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        >
          OK, Got it
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
