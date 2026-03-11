import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Globe, Calendar,
  Lock, Save, Check, Edit3, Upload, Plus, X,
  Linkedin, Github, Twitter,
  Briefcase, Code2, FileText,
  Award, Clock, Star, Heart,
  Building2, CheckCircle, Camera, GraduationCap, Download
} from "lucide-react";
import CandidateSidebar from "../components/CandidateSidebar";
import { toast } from "sonner";

const TABS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "documents", label: "Documents" },
];

export default function CandidateProfile() {
  const [activeTab, setActiveTab] = useState("about");
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Fetch candidate data from API
  useEffect(() => {
    fetchCandidateData();
  }, []);

  const fetchCandidateData = async () => {
    try {
      setLoading(true);
      
      // First try to get from localStorage (profile setup data)
      const savedProfile = localStorage.getItem('profileData');
      const profileCompleted = localStorage.getItem('profileCompleted');
      
      if (savedProfile && profileCompleted === 'true') {
        const parsed = JSON.parse(savedProfile);
        transformAndSetData(parsed);
        setLoading(false);
        return;
      }

      // If no local data, fetch from API
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/candidate/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      transformAndSetData(data.candidate || data);
      
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
      
      // Fallback to mock data for development
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const transformAndSetData = (apiData) => {
    // Transform skills
    const transformedSkills = transformSkills(apiData.primarySkills || [], apiData.additionalSkills || []);
    setSkills(transformedSkills);

    // Transform experience
    const transformedExperience = transformExperience(apiData.experience || []);
    setExperience(transformedExperience);

    // Transform education
    const transformedEducation = transformEducation(apiData.education || []);
    setEducation(transformedEducation);

    // Transform documents
    const transformedDocuments = transformDocuments(apiData);
    setDocuments(transformedDocuments);

    // Set profile data
    const profile = {
      fullName: apiData.fullName || "Not provided",
      email: apiData.email || "Not provided",
      phone: apiData.phone || "Not provided",
      location: apiData.location || "Not provided",
      dateOfBirth: apiData.dateOfBirth || "",
      gender: apiData.gender || "",
      nationality: apiData.nationality || "",
      maritalStatus: apiData.maritalStatus || "",
      address: apiData.address || "",
      city: apiData.city || "",
      state: apiData.state || "",
      pincode: apiData.pincode || "",
      currentCTC: apiData.currentCTC || "",
      expectedCTC: apiData.expectedCTC || "",
      availability: apiData.availability || "Immediate",
      totalExperience: apiData.totalExperience || "0",
      summary: apiData.summary || "",
      jobType: apiData.jobType || [],
      workMode: apiData.workMode || [],
      preferredLocation: apiData.preferredLocation || "",
      github: apiData.github || "",
      linkedin: apiData.linkedin || "",
      portfolio: apiData.portfolio || "",
      twitter: apiData.twitter || "",
      interviewSlots: apiData.interviewSlots || [],
      isFresher: apiData.isFresher || false,
      resumeFile: apiData.resumeFile || null,
      accountCreated: apiData.createdAt ? new Date(apiData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Jan 2025",
      lastLogin: apiData.updatedAt ? new Date(apiData.updatedAt).toLocaleString() : "Feb 03, 2026 - 12:45 PM",
    };

    setProfileData(profile);
    setFormData(profile);
  };

  const transformSkills = (primarySkills, additionalSkills) => {
    const skillMap = {
      Frontend: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'HTML', 'CSS'],
      Backend: ['Node.js', 'Express.js', 'Python', 'Java', 'C#', 'PHP', 'GraphQL', 'REST API'],
      Database: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'Redis', 'Elasticsearch'],
      Cloud: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins'],
      DevOps: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'CircleCI'],
      Design: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'],
    };

    const transformed = [];

    // Add primary skills with ratings
    primarySkills.forEach(skill => {
      let category = 'Other';
      for (const [cat, skills] of Object.entries(skillMap)) {
        if (skills.some(s => s.toLowerCase().includes(skill.name.toLowerCase()))) {
          category = cat;
          break;
        }
      }
      transformed.push({
        name: skill.name,
        level: skill.rating * 20, // Convert 1-5 rating to percentage
        cat: category
      });
    });

    // Add additional skills with default level
    additionalSkills.forEach(skill => {
      let category = 'Other';
      for (const [cat, skills] of Object.entries(skillMap)) {
        if (skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
          category = cat;
          break;
        }
      }
      transformed.push({
        name: skill,
        level: 70, // Default level for additional skills
        cat: category
      });
    });

    return transformed;
  };

  const transformExperience = (expData) => {
    return expData.map((exp, index) => ({
      role: exp.designation || exp.role || "Not specified",
      company: exp.companyName || exp.company || "Not specified",
      type: exp.employmentType || "Full-time",
      period: formatDateRange(exp.startDate, exp.endDate),
      duration: calculateDuration(exp.startDate, exp.endDate),
      location: exp.location || "Not specified",
      logo: exp.companyName?.[0] || exp.company?.[0] || "C",
      bg: getCompanyColor(index),
      bullets: exp.responsibilities ? exp.responsibilities.split('\n').filter(b => b.trim()) : ["No responsibilities listed"],
      tags: exp.technologies || [],
      startDate: exp.startDate,
      endDate: exp.endDate,
    }));
  };

  const transformEducation = (eduData) => {
    return eduData.map((edu, index) => ({
      degree: edu.degree || "Not specified",
      school: edu.institution || edu.school || "Not specified",
      period: formatDateRange(edu.startYear, edu.endYear),
      grade: edu.percentage || edu.grade || "Not specified",
      logo: edu.institution?.split(' ').map(w => w[0]).join('').substring(0, 3) || "EDU",
      desc: edu.description || `${edu.degree} from ${edu.institution || edu.school}`,
      startYear: edu.startYear,
      endYear: edu.endYear,
    }));
  };

  const transformDocuments = (data) => {
    const docs = [];
    
    if (data.resumeFile) {
      docs.push({
        name: "Resume.pdf",
        size: "340 KB",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        verified: true,
        type: "resume",
        url: data.resumeFile
      });
    }

    // Add certificates if available
    if (data.certifications) {
      data.certifications.forEach((cert, index) => {
        docs.push({
          name: cert.name || `Certificate_${index + 1}.pdf`,
          size: "120 KB",
          date: cert.date || "Jan 2026",
          verified: true,
          type: "certificate"
        });
      });
    }

    return docs;
  };

  const formatDateRange = (start, end) => {
    if (!start && !end) return "Not specified";
    const startStr = start ? new Date(start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Start";
    const endStr = end ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Present";
    return `${startStr} – ${endStr}`;
  };

  const calculateDuration = (start, end) => {
    if (!start) return "0 yrs";
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const totalMonths = years * 12 + months;
    const years_display = Math.floor(totalMonths / 12);
    const months_display = totalMonths % 12;
    
    if (years_display > 0) {
      return `${years_display} yr${years_display > 1 ? 's' : ''} ${months_display > 0 ? months_display + ' mos' : ''}`;
    }
    return `${months_display} mos`;
  };

  const getCompanyColor = (index) => {
    const colors = ['bg-violet-600', 'bg-slate-900', 'bg-blue-600', 'bg-green-600', 'bg-orange-600'];
    return colors[index % colors.length];
  };

  const loadMockData = () => {
    // Mock data for development
    const mockData = {
      fullName: "Alexander Sterling",
      email: "a.sterling@techcorp.io",
      phone: "+1 (888) 000-1234",
      location: "London, Mayfair, UK",
      dateOfBirth: "1992-03-12",
      nationality: "British",
      summary: "Experienced frontend developer with 5+ years of expertise in React, TypeScript, and modern web technologies. I love building developer-first products, design systems, and performant web applications. Previously at Stripe and Vercel. Open to Staff+ roles at product-led companies.",
      currentCTC: "130000",
      expectedCTC: "160000",
      availability: "2 weeks notice",
      totalExperience: "5",
      jobType: ["Full-time", "Contract"],
      workMode: ["Remote", "Hybrid"],
      preferredLocation: "London, UK",
      linkedin: "linkedin.com/in/asterling",
      github: "github.com/asterling",
      portfolio: "asterling.dev",
      twitter: "@asterling_dev",
      primarySkills: [
        { name: "React", rating: 5, category: "Frontend" },
        { name: "TypeScript", rating: 5, category: "Frontend" },
        { name: "Next.js", rating: 4, category: "Frontend" },
        { name: "Node.js", rating: 4, category: "Backend" },
        { name: "GraphQL", rating: 3, category: "Backend" },
      ],
      additionalSkills: ["Tailwind CSS", "Jest", "Docker", "AWS", "Figma"],
      experience: [
        {
          companyName: "Stripe",
          designation: "Senior Frontend Developer",
          startDate: "2022-01-15",
          endDate: null,
          location: "San Francisco, CA (Remote)",
          responsibilities: "Led rebuild of the payments dashboard, improving load time by 40%\nManaged a team of 4 engineers; shipped 6 major features in 2023\nDrove adoption of React Query across 3 product squads",
          technologies: ["React", "TypeScript", "GraphQL", "Design Systems"]
        },
        {
          companyName: "Vercel",
          designation: "Frontend Engineer",
          startDate: "2020-03-01",
          endDate: "2021-12-31",
          location: "Remote",
          responsibilities: "Built core UI components for the deployment pipeline used by 1M+ developers\nContributed to the Vercel design system (Geist)",
          technologies: ["Next.js", "CSS-in-JS", "Storybook"]
        },
        {
          companyName: "Accenture",
          designation: "Junior Developer",
          startDate: "2018-06-01",
          endDate: "2020-02-29",
          location: "London, UK",
          responsibilities: "Worked on enterprise React applications for 3 major banking clients\nGained experience in agile delivery, sprint planning, and client demos",
          technologies: ["React", "Redux", "Jest"]
        }
      ],
      education: [
        {
          degree: "MSc Computer Science",
          institution: "University College London",
          startYear: "2016",
          endYear: "2018",
          percentage: "First Class Honours",
          description: "Specialised in Human-Computer Interaction and Distributed Systems."
        },
        {
          degree: "BSc Software Engineering",
          institution: "University of Manchester",
          startYear: "2013",
          endYear: "2016",
          percentage: "2:1 Honours",
          description: "Foundations in algorithms, data structures, and software architecture."
        }
      ],
      resumeFile: "/uploads/resume.pdf",
      certifications: [
        { name: "AWS Certified Developer", date: "2023" },
        { name: "Meta Frontend Developer", date: "2022" },
        { name: "Google UX Design", date: "2021" }
      ]
    };

    transformAndSetData(mockData);
  };

  const handleSave = async () => {
    try {
      setEditMode(false);
      
      // Update local state
      setProfileData(prev => ({ ...prev, ...formData }));
      
      // Save to localStorage
      localStorage.setItem('profileData', JSON.stringify(formData));
      
      // Here you would also save to backend
      const token = localStorage.getItem('token');
      // await fetch('http://localhost:5000/api/candidate/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(formData)
      // });
      
      setSaved(true);
      toast.success('Profile updated successfully!');
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save changes');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (field, value) => {
    const currentArray = formData[field] || [];
    const updated = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    setFormData(prev => ({ ...prev, [field]: updated }));
  };

  const calculateProfileStrength = () => {
    if (!profileData) return 0;
    let score = 0;
    const fields = [
      'fullName', 'email', 'phone', 'location', 'summary',
      'currentCTC', 'expectedCTC', 'availability'
    ];
    
    fields.forEach(field => {
      if (profileData[field] && profileData[field] !== "Not provided" && profileData[field] !== "") {
        score += 12.5; // 100/8 = 12.5 per field
      }
    });

    if (skills.length > 0) score += 12.5;
    if (experience.length > 0) score += 12.5;
    if (education.length > 0) score += 12.5;

    return Math.min(100, Math.round(score));
  };

  const profileStrength = calculateProfileStrength();

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <CandidateSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-600 font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <CandidateSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── HEADER ── */}
        <header className="h-16 lg:h-20 bg-blue-950 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-50 border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-800 rounded-lg flex items-center justify-center">
              <User className="text-white" size={14} />
            </div>
            <div>
              <h1 className="text-white text-[10px] lg:text-xs font-black uppercase tracking-widest">My Profile</h1>
              <p className="text-blue-400 text-[8px] lg:text-[9px] font-medium uppercase">Candidate Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AnimatePresence>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold"
                >
                  <Check size={11} /> Saved
                </motion.div>
              )}
            </AnimatePresence>
            <div className="hidden lg:block text-right">
              <p className="text-white text-xs font-bold">{profileData?.fullName || "Candidate"}</p>
              <p className="text-blue-400 text-[10px] uppercase">Candidate</p>
            </div>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-sm border border-blue-700">
              {profileData?.fullName?.split(' ').map(n => n[0]).join('') || 'C'}
            </div>
          </div>
        </header>

        {/* ── SCROLL AREA ── */}
        <div className="flex-1 overflow-y-auto">
          {/* ── COVER + AVATAR ── */}
          <div className="relative">
            {/* Simple solid color background */}
            <div className="h-14 lg:h-14 bg-blue-950 relative overflow-hidden" />

            {/* White card below cover */}
            <div className="bg-white border-b border-slate-200 px-4 lg:px-6">
              {/* Avatar + name row */}
              <div className="flex flex-col lg:flex-row lg:items-end gap-3 -mt-10 lg:-mt-12 pb-3">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-blue-100">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.fullName || 'Candidate')}&background=1e3a8a&color=fff&size=128&bold=true&length=2`}
                      alt={profileData?.fullName || "Candidate"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-950 hover:bg-blue-800 text-white rounded-lg border-2 border-white flex items-center justify-center transition-colors shadow">
                    <Camera size={11} />
                  </button>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                </div>

                <div className="flex-1 pt-1 lg:pt-0 lg:pb-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-blue-950 font-black text-lg lg:text-xl">{profileData?.fullName || "Candidate Name"}</h2>
                    <span className="px-2 py-0.5 bg-blue-950 text-white text-[10px] font-bold rounded-full">Premium</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full border border-green-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" /> Open to Work
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs lg:text-sm font-medium mb-1">
                    {experience[0]?.role || "Senior Developer"} · {profileData?.totalExperience || "5"}+ years
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-slate-400 text-[11px] lg:text-xs">
                    {experience[0] && (
                      <span className="flex items-center gap-1"><Building2 size={10}/> {experience[0].company}</span>
                    )}
                    <span className="flex items-center gap-1"><MapPin size={10}/> {profileData?.location?.split(',')[0] || "Location"}</span>
                    <span className="flex items-center gap-1"><Mail size={10}/> {profileData?.email || "Email"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:pb-1 shrink-0">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      editMode
                        ? "bg-slate-100 text-slate-600 border-slate-300"
                        : "bg-blue-950 text-white border-blue-950 hover:bg-blue-900"
                    }`}
                  >
                    <Edit3 size={12} /> {editMode ? "Cancel" : "Edit"}
                  </button>
                </div>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap items-center gap-2 py-3 border-t border-slate-100">
                {profileData?.linkedin && (
                  <a
                    href={`https://${profileData.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-[11px] hover:border-blue-300 hover:text-blue-700 transition-all"
                  >
                    <Linkedin size={11}/> in
                  </a>
                )}
                {profileData?.github && (
                  <a
                    href={`https://${profileData.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-[11px] hover:border-blue-300 hover:text-blue-700 transition-all"
                  >
                    <Github size={11}/> gh
                  </a>
                )}
                {profileData?.portfolio && (
                  <a
                    href={`https://${profileData.portfolio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-[11px] hover:border-blue-300 hover:text-blue-700 transition-all"
                  >
                    <Globe size={11}/> web
                  </a>
                )}
                {editMode && (
                  <button className="flex items-center gap-1 px-2 py-1 border border-dashed border-slate-300 rounded-lg text-slate-400 text-[11px] hover:border-blue-400 hover:text-blue-600 transition-colors">
                    <Plus size={10}/> Add
                  </button>
                )}
              </div>

              {/* Tabs nav */}
              <div className="flex gap-0 -mb-px overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 lg:px-4 py-2 text-[11px] lg:text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "border-blue-950 text-blue-950"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── TAB PANELS ── */}
          <div className="p-4 lg:p-8 max-w-5xl">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>

              {/* ABOUT */}
              {activeTab === "about" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-5">
                    <Section title="Professional Summary" icon={<User size={14}/>}>
                      {editMode ? (
                        <textarea 
                          rows={4} 
                          value={formData?.summary || ''}
                          onChange={(e) => handleInputChange('summary', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-blue-500 resize-none" 
                        />
                      ) : (
                        <p className="text-slate-600 text-sm leading-relaxed">{profileData?.summary || "No summary provided"}</p>
                      )}
                    </Section>

                    <Section title="Personal Details" icon={<FileText size={14}/>}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Field 
                          label="Full Name" 
                          icon={<User size={12}/>} 
                          value={profileData?.fullName} 
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          disabled={!editMode} 
                        />
                        <Field 
                          label="Email Address" 
                          icon={<Mail size={12}/>} 
                          value={profileData?.email} 
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!editMode} 
                        />
                        <Field 
                          label="Phone Number" 
                          icon={<Phone size={12}/>} 
                          value={profileData?.phone} 
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!editMode} 
                        />
                        <Field 
                          label="Location" 
                          icon={<MapPin size={12}/>} 
                          value={profileData?.location} 
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          disabled={!editMode} 
                        />
                        <Field 
                          label="Date of Birth" 
                          icon={<Calendar size={12}/>} 
                          value={profileData?.dateOfBirth} 
                          type="date"
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          disabled={!editMode} 
                        />
                        <Field 
                          label="Nationality" 
                          icon={<Globe size={12}/>} 
                          value={profileData?.nationality} 
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          disabled={!editMode} 
                        />
                      </div>
                    </Section>

                    <Section title="Job Preferences" icon={<Briefcase size={14}/>}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <Field 
                          label="Current CTC" 
                          icon={<Award size={12}/>} 
                          value={profileData?.currentCTC ? `₹${profileData.currentCTC}` : "Not specified"} 
                          onChange={(e) => handleInputChange('currentCTC', e.target.value)}
                          disabled={!editMode} 
                        />
                        <Field 
                          label="Expected CTC" 
                          icon={<Award size={12}/>} 
                          value={profileData?.expectedCTC ? `₹${profileData.expectedCTC}` : "Not specified"} 
                          onChange={(e) => handleInputChange('expectedCTC', e.target.value)}
                          disabled={!editMode} 
                        />
                        <Field 
                          label="Work Type" 
                          icon={<Building2 size={12}/>} 
                          value={profileData?.workMode?.join(' / ') || "Not specified"} 
                          onChange={(e) => handleInputChange('workMode', e.target.value.split(' / '))}
                          disabled={!editMode} 
                        />
                        <Field 
                          label="Availability" 
                          icon={<Clock size={12}/>} 
                          value={profileData?.availability || "Immediate"} 
                          onChange={(e) => handleInputChange('availability', e.target.value)}
                          disabled={!editMode} 
                        />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Preferred Industries</p>
                        <div className="flex flex-wrap gap-2">
                          {["SaaS", "Dev Tools", "Fintech", "AI/ML", "Open Source"].map(tag => (
                            <span key={tag} className={`px-3 py-1 rounded-xl text-xs font-medium border ${editMode ? "bg-blue-50 border-blue-200 text-blue-700 cursor-pointer hover:bg-blue-100" : "bg-slate-50 border-slate-200 text-slate-600"}`}>{tag}</span>
                          ))}
                          {editMode && (
                            <button className="px-3 py-1 border border-dashed border-slate-300 rounded-xl text-xs text-slate-400 hover:border-blue-400 hover:text-blue-600 flex items-center gap-1 transition-colors"><Plus size={11}/> Add</button>
                          )}
                        </div>
                      </div>
                    </Section>

                    {editMode && (
                      <div className="flex justify-end">
                        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-sm font-bold rounded-xl transition-colors">
                          <Save size={14}/> Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Sidebar cards */}
                  <div className="space-y-5">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                      <p className="text-blue-950 text-sm font-black mb-1">Profile Strength</p>
                      <div className="flex items-end gap-2 mb-3">
                        <span className="text-3xl font-black text-blue-950">{profileStrength}%</span>
                        <span className="text-green-600 text-xs font-bold mb-1">
                          {profileStrength >= 80 ? 'Excellent' : profileStrength >= 60 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${profileStrength}%` }} 
                          transition={{ duration: 1 }} 
                          className="h-full bg-blue-950 rounded-full" 
                        />
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: "Photo", done: true },
                          { label: "Summary", done: !!profileData?.summary },
                          { label: "Experience", done: experience.length > 0 },
                          { label: "Skills", done: skills.length > 0 },
                          { label: "Education", done: education.length > 0 },
                          { label: "Resume", done: !!profileData?.resumeFile }
                        ].map(item => (
                          <div key={item.label} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.done ? "bg-green-100" : "bg-slate-100"}`}>
                              {item.done ? <Check size={9} className="text-green-600"/> : <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />}
                            </div>
                            <span className={`text-xs ${item.done ? "text-slate-600" : "text-slate-400"}`}>{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-5">
                      <p className="text-blue-950 text-sm font-black mb-3">Languages</p>
                      <div className="space-y-2.5">
                        {[{ lang: "English", level: "Native" }, { lang: "French", level: "Intermediate" }, { lang: "German", level: "Basic" }].map(l => (
                          <div key={l.lang} className="flex items-center justify-between">
                            <span className="text-slate-700 text-sm">{l.lang}</span>
                            <span className="text-slate-400 text-xs font-medium">{l.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-950 rounded-2xl p-5 text-white">
                      <p className="text-sm font-black mb-3 flex items-center gap-2"><Heart size={13} className="text-blue-300"/> Interests</p>
                      <div className="flex flex-wrap gap-2">
                        {["Open Source", "Dev Tooling", "System Design", "Photography", "Running", "Chess"].map(i => (
                          <span key={i} className="px-2.5 py-1 bg-blue-900 text-blue-200 text-[11px] rounded-lg">{i}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* EXPERIENCE */}
              {activeTab === "experience" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-500 text-sm">{experience.length} companies · {profileData?.totalExperience || 0} years total experience</p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors"><Plus size={13}/> Add Experience</button>
                  </div>
                  {experience.length > 0 ? (
                    experience.map((exp, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all group">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 ${exp.bg} rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0`}>{exp.logo}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="text-blue-950 font-black text-base">{exp.role}</h3>
                                <div className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 mt-0.5">
                                  <span className="font-semibold text-slate-700">{exp.company}</span>
                                  <span className="text-slate-300">·</span><span>{exp.type}</span>
                                  <span className="text-slate-300">·</span><span>{exp.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                                  <Clock size={11}/><span>{exp.period}</span>
                                  {exp.duration && (
                                    <>
                                      <span className="text-slate-300">·</span>
                                      <span className="font-bold text-blue-600">{exp.duration}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <button className="p-2 hover:bg-slate-100 rounded-lg"><Edit3 size={13} className="text-slate-400"/></button>
                                <button className="p-2 hover:bg-red-50 rounded-lg"><X size={13} className="text-red-400"/></button>
                              </div>
                            </div>
                            <ul className="space-y-1.5 mb-4">
                              {exp.bullets.map((b, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-[7px] shrink-0" />{b}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2">
                              {exp.tags.map(tag => (
                                <span key={tag} className="px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-medium rounded-lg">{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
                      <Briefcase size={40} className="text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm">No experience added yet</p>
                      {profileData?.isFresher && (
                        <p className="text-blue-600 text-xs mt-1">Marked as fresher</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* EDUCATION */}
              {activeTab === "education" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-500 text-sm">{education.length} academic qualifications</p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors"><Plus size={13}/> Add Education</button>
                  </div>
                  {education.length > 0 ? (
                    <div className="space-y-4">
                      {education.map((edu, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                          className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all group">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-950 rounded-xl flex items-center justify-center text-white text-[10px] font-black shrink-0">{edu.logo}</div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-blue-950 font-black text-base">{edu.degree}</h3>
                                  <p className="text-slate-600 text-sm font-medium mt-0.5">{edu.school}</p>
                                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                                    <Calendar size={11}/>{edu.period}
                                    {edu.grade !== "Not specified" && (
                                      <>
                                        <span className="text-slate-300">·</span>
                                        <Award size={11} className="text-yellow-500"/>
                                        <span className="text-yellow-600 font-semibold">{edu.grade}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-2 hover:bg-slate-100 rounded-lg"><Edit3 size={13} className="text-slate-400"/></button>
                                  <button className="p-2 hover:bg-red-50 rounded-lg"><X size={13} className="text-red-400"/></button>
                                </div>
                              </div>
                              <p className="text-slate-500 text-sm mt-3">{edu.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
                      <GraduationCap size={40} className="text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm">No education added yet</p>
                    </div>
                  )}

                  {/* Certifications */}
                  {documents.filter(d => d.type === 'certificate').length > 0 && (
                    <div>
                      <h3 className="text-blue-950 font-black text-sm mb-3 flex items-center gap-2"><Award size={14} className="text-blue-600"/> Certifications</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {documents.filter(d => d.type === 'certificate').map((cert, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-200 transition-colors">
                            <div className="text-2xl">🟦</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-blue-950 text-sm font-bold truncate">{cert.name}</p>
                              <p className="text-slate-400 text-xs">{cert.date}</p>
                            </div>
                            <CheckCircle size={15} className="text-green-500 shrink-0"/>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SKILLS */}
              {activeTab === "skills" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-5">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-500 text-sm">{skills.length} technical skills</p>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors"><Plus size={13}/> Add Skill</button>
                    </div>
                    {["Frontend", "Backend", "Database", "Cloud", "DevOps", "Design", "Other"].map(cat => {
                      const catSkills = skills.filter(s => s.cat === cat);
                      if (!catSkills.length) return null;
                      return (
                        <Section key={cat} title={cat} icon={<Code2 size={14}/>}>
                          <div className="space-y-4">
                            {catSkills.map((skill, i) => (
                              <motion.div key={skill.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="group">
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-slate-700 text-sm font-semibold">{skill.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-950 text-sm font-black">{skill.level}%</span>
                                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"><X size={11} className="text-red-400"/></button>
                                  </div>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ duration: 0.8, delay: i * 0.06 }} className="h-full bg-blue-950 rounded-full" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </Section>
                      );
                    })}
                  </div>

                  <div className="space-y-5">
                    <Section title="Soft Skills" icon={<Heart size={14}/>}>
                      <div className="flex flex-wrap gap-2">
                        {["Leadership", "Mentoring", "Communication", "Problem Solving", "Agile", "Code Review", "System Design", "Technical Writing"].map(s => (
                          <span key={s} className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-default">{s}</span>
                        ))}
                      </div>
                    </Section>
                    <div className="bg-blue-950 rounded-2xl p-5 text-white">
                      <p className="text-sm font-black mb-4">Top Skills Match</p>
                      <div className="space-y-3">
                        {skills.slice(0, 3).map(skill => (
                          <div key={skill.name} className="flex items-center justify-between py-2 border-b border-blue-900 last:border-0">
                            <span className="text-blue-300 text-xs">{skill.name}</span>
                            <span className="text-green-300 text-xs font-bold">{skill.level}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DOCUMENTS */}
              {activeTab === "documents" && (
                <div className="space-y-5">
                  <p className="text-slate-500 text-sm">Resume, cover letters & supporting documents</p>
                  <div className="border-2 border-dashed border-blue-200 bg-blue-50 hover:border-blue-400 transition-colors rounded-2xl p-10 text-center cursor-pointer">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Upload size={20} className="text-blue-600"/>
                    </div>
                    <p className="text-blue-950 font-bold text-sm">Drop files here or browse</p>
                    <p className="text-slate-400 text-xs mt-1">PDF, DOC, DOCX — up to 10MB</p>
                    <button className="mt-4 px-5 py-2 bg-blue-950 text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors">Choose File</button>
                  </div>
                  <div className="space-y-3">
                    {documents.length > 0 ? (
                      documents.map((doc, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                          className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:border-blue-200 hover:shadow-sm transition-all group">
                          <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center shrink-0">
                            <FileText size={18} className="text-red-500"/>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-blue-950 font-bold text-sm truncate">{doc.name}</p>
                            <p className="text-slate-400 text-xs mt-0.5">{doc.size} · Updated {doc.date}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {doc.verified ? (
                              <span className="hidden sm:flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 text-[11px] font-bold rounded-lg border border-green-100"><CheckCircle size={10}/> Verified</span>
                            ) : (
                              <span className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-500 text-[11px] font-bold rounded-lg border border-slate-200">Uploaded</span>
                            )}
                            {doc.url && (
                              <a 
                                href={`http://localhost:5000${doc.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-blue-50 rounded-lg"
                              >
                                <Download size={13} className="text-blue-600"/>
                              </a>
                            )}
                            <button className="p-2 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><Edit3 size={13} className="text-slate-400"/></button>
                            <button className="p-2 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><X size={13} className="text-red-400"/></button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                        <FileText size={40} className="text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 text-sm">No documents uploaded yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6">
      <h3 className="text-blue-950 text-sm font-black flex items-center gap-2 mb-4">
        <span className="text-blue-500">{icon}</span>{title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, icon, value, placeholder, type = "text", disabled = false, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-slate-400 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
        <span className="text-blue-400">{icon}</span>{label}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-blue-950 text-sm outline-none focus:border-blue-500 focus:bg-white transition-colors disabled:opacity-70 disabled:cursor-default"
      />
    </div>
  );
}