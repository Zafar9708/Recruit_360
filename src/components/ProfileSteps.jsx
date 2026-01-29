import { useState } from "react";
import { Star, Plus, X, User, Cake, Users as UsersIcon, Users, Flag, Heart, MapPin, Home, Map, Hash } from "lucide-react";

/* ===========================
   STEP 1: BASIC DETAILS
=========================== */
export function BasicDetailsStep({ data, updateData }) {
  const [formData, setFormData] = useState({
    dateOfBirth: data.dateOfBirth || "",
    gender: data.gender || "",
    nationality: data.nationality || "",
    maritalStatus: data.maritalStatus || "",
    address: data.address || "",
    city: data.city || "",
    state: data.state || "",
    pincode: data.pincode || "",
  });

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
          <div className="relative">
            <Cake className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              className="w-full pl-11 px-4 py-3 border rounded-xl"
              required
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold mb-2">Gender *</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full pl-11 px-4 py-3 border rounded-xl"
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-semibold mb-2">Nationality *</label>
          <div className="relative">
            <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.nationality}
              onChange={(e) => handleChange("nationality", e.target.value)}
              placeholder="Nationality"
              className="w-full pl-11 px-4 py-3 border rounded-xl"
              required
            />
          </div>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-semibold mb-2">Marital Status *</label>
          <div className="relative">
            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={formData.maritalStatus}
              onChange={(e) => handleChange("maritalStatus", e.target.value)}
              className="w-full pl-11 px-4 py-3 border rounded-xl"
              required
            >
              <option value="">Select</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Address *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Address"
              rows={3}
              className="w-full pl-11 px-4 py-3 border rounded-xl"
              required
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold mb-2">City *</label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="City"
              className="w-full pl-11 px-4 py-3 border rounded-xl"
              required
            />
          </div>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-semibold mb-2">State *</label>
          <div className="relative">
            <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="State"
              className="w-full pl-11 px-4 py-3 border rounded-xl"
              required
            />
          </div>
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-semibold mb-2">Pincode *</label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
              placeholder="Pincode"
              className="w-full pl-11 px-4 py-3 border rounded-xl"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===========================
   STEP 2: SKILLS
=========================== */
export function SkillsStep({ data, updateData }) {
  // All skills from CV
  const allSkills = data.skills || ["JavaScript", "React", "Node"]; // e.g., ["JavaScript", "React", "Node", ...]

  // Primary skills (editable)
  const [primarySkills, setPrimarySkills] = useState(data.primarySkills || []);

  // Additional skills (editable)
  const [additionalSkills, setAdditionalSkills] = useState(data.additionalSkills || []);
  const [newSkill, setNewSkill] = useState("");

  // Add a new primary skill
  const addPrimarySkill = () => {
    if (primarySkills.length < 3) {
      const updated = [...primarySkills, { name: "", rating: 3 }];
      setPrimarySkills(updated);
      updateData({ primarySkills: updated });
    }
  };

  const updatePrimarySkill = (index, field, value) => {
    const updated = [...primarySkills];
    updated[index] = { ...updated[index], [field]: value };
    setPrimarySkills(updated);
    updateData({ primarySkills: updated });
  };

  const removePrimarySkill = (index) => {
    const updated = primarySkills.filter((_, i) => i !== index);
    setPrimarySkills(updated);
    updateData({ primarySkills: updated });
  };

  // Additional skills handlers
  const addAdditionalSkill = () => {
    if (!newSkill.trim()) return;
    const updated = [...additionalSkills, newSkill.trim()];
    setAdditionalSkills(updated);
    updateData({ additionalSkills: updated });
    setNewSkill("");
  };

  const removeAdditionalSkill = (index) => {
    const updated = additionalSkills.filter((_, i) => i !== index);
    setAdditionalSkills(updated);
    updateData({ additionalSkills: updated });
  };

  return (
    <div className="space-y-6">
      {/* OVERALL SKILLS FROM CV */}
      {allSkills.length > 0 && (
        <div>
          <h4 className="font-semibold">Overall Skills</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {allSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* PRIMARY SKILLS */}
      <div>
        <h4 className="font-semibold mt-4 mb-2">Primary Skills (up to 3)</h4>
        <div className="space-y-2">
          {primarySkills.map((skill, index) => (
            <div key={index} className="flex gap-4 items-center">
              <input
                value={skill.name}
                onChange={(e) => updatePrimarySkill(index, "name", e.target.value)}
                placeholder="Skill"
                className="flex-1 px-3 py-2 border rounded"
              />
              {[1, 2, 3, 4, 5].map((r) => (
                <Star
                  key={r}
                  className={`w-5 h-5 cursor-pointer ${
                    r <= skill.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => updatePrimarySkill(index, "rating", r)}
                />
              ))}
              <button onClick={() => removePrimarySkill(index)}>
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}

          {primarySkills.length < 3 && (
            <button
              onClick={addPrimarySkill}
              className="flex items-center gap-2 text-blue-600 mt-2"
            >
              <Plus size={16} /> Add Primary Skill
            </button>
          )}
        </div>
      </div>

      {/* ADDITIONAL SKILLS */}
      <div>
        <h4 className="font-semibold mt-4 mb-2">Additional Skills</h4>
        <div className="flex gap-2 mt-2">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add skill"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button onClick={addAdditionalSkill} className="text-blue-600">
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {additionalSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 rounded-full flex items-center gap-2"
            >
              {skill}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeAdditionalSkill(index)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===========================
   STEP 3: EDUCATION
=========================== */
export function EducationStep({ data, updateData }) {
  const [educationList, setEducationList] = useState(
    data.educationList || [
      { degree: "", institution: "", startYear: "", endYear: "", percentage: "" },
    ]
  );

  const addEducation = () => {
    const updated = [
      ...educationList,
      { degree: "", institution: "", startYear: "", endYear: "", percentage: "" },
    ];
    setEducationList(updated);
    updateData({ educationList: updated });
  };

  const removeEducation = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
    updateData({ educationList: updated });
  };

  const updateField = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
    updateData({ educationList: updated });
  };

  return (
    <div className="space-y-6">
      {educationList.map((edu, index) => (
        <div
          key={index}
          className="relative bg-white shadow-sm border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          {/* Delete Button */}
          {educationList.length > 1 && (
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600"
            >
              <X size={18} />
            </button>
          )}

          {/* Degree / Institution */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Degree / Course</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateField(index, "degree", e.target.value)}
                placeholder="Enter Degree / Course"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateField(index, "institution", e.target.value)}
                placeholder="Enter Institution"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Start Year / End Year */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">Start Year</label>
              <input
                type="text"
                value={edu.startYear}
                onChange={(e) => updateField(index, "startYear", e.target.value)}
                placeholder="YYYY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold">End Year</label>
              <input
                type="text"
                value={edu.endYear}
                onChange={(e) => updateField(index, "endYear", e.target.value)}
                placeholder="YYYY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Percentage / GPA on new line */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Percentage / GPA</label>
            <input
              type="text"
              value={edu.percentage}
              onChange={(e) => updateField(index, "percentage", e.target.value)}
              placeholder="e.g., 85% or 3.8 GPA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      ))}

      {/* Add Education Button */}
      <button
        onClick={addEducation}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={16} /> Add Education
      </button>
    </div>
  );
}

/* ===========================
   STEP: EXPERIENCE
=========================== */
export function ExperienceStep({ data, updateData }) {
  const [isFresher, setIsFresher] = useState(data.isFresher || false);
  const [totalExperience, setTotalExperience] = useState(data.totalExperience || "");
  const [companies, setCompanies] = useState(
    data.companies || [
      { companyName: "", designation: "", startDate: "", endDate: "", responsibilities: "" },
    ]
  );

  const handleFresherChange = () => {
    const newFresher = !isFresher;
    setIsFresher(newFresher);
    if (newFresher) {
      setTotalExperience("");
      setCompanies([]);
      updateData({ isFresher: true, totalExperience: "", companies: [] });
    } else {
      updateData({ isFresher: false });
    }
  };

  const handleTotalExperienceChange = (value) => {
    setTotalExperience(value);
    updateData({ totalExperience: value, isFresher });
  };

  const handleCompanyChange = (index, field, value) => {
    const updated = [...companies];
    updated[index][field] = value;
    setCompanies(updated);
    updateData({ companies: updated, isFresher, totalExperience });
  };

  const addCompany = () => {
    setCompanies([
      ...companies,
      { companyName: "", designation: "", startDate: "", endDate: "", responsibilities: "" },
    ]);
  };

  const removeCompany = (index) => {
    const updated = companies.filter((_, i) => i !== index);
    setCompanies(updated);
    updateData({ companies: updated, isFresher, totalExperience });
  };

  return (
    <div className="space-y-6">
      {/* Fresher Checkbox */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isFresher}
          onChange={handleFresherChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium">I am a Fresher (No work experience)</label>
      </div>

      {/* Total Experience */}
      {!isFresher && (
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Total Years of Experience *</label>
          <input
            type="number"
            step="0.1"
            value={totalExperience}
            onChange={(e) => handleTotalExperienceChange(e.target.value)}
            placeholder="e.g., 3.5"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Companies */}
      {!isFresher &&
        companies.map((company, index) => (
          <div key={index} className="space-y-2">
            {/* Previous Company Label */}
            <label className="text-sm font-semibold block">
              Previous Company {index + 1}
            </label>

            {/* Company Card */}
            <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              {companies.length > 1 && (
                <button
                  onClick={() => removeCompany(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              )}

              {/* Company Name & Designation */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">Company Name *</label>
                  <input
                    type="text"
                    value={company.companyName}
                    onChange={(e) =>
                      handleCompanyChange(index, "companyName", e.target.value)
                    }
                    placeholder="e.g., TechCorp Inc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">Designation *</label>
                  <input
                    type="text"
                    value={company.designation}
                    onChange={(e) =>
                      handleCompanyChange(index, "designation", e.target.value)
                    }
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Start Date & End Date */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">Start Date *</label>
                  <input
                    type="date"
                    value={company.startDate}
                    onChange={(e) =>
                      handleCompanyChange(index, "startDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold">End Date *</label>
                  <input
                    type="date"
                    value={company.endDate}
                    onChange={(e) =>
                      handleCompanyChange(index, "endDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Responsibilities */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Responsibilities *</label>
                <textarea
                  value={company.responsibilities}
                  onChange={(e) =>
                    handleCompanyChange(index, "responsibilities", e.target.value)
                  }
                  placeholder="Describe your key responsibilities and achievements..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        ))}

      {/* Add Another Company */}
      {!isFresher && (
        <button
          onClick={addCompany}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Add Another Company
        </button>
      )}
    </div>
  );
}

/* ===========================
   STEP: COMPENSATION
=========================== */
export function CompensationStep({ data, updateData }) {
  const [compensation, setCompensation] = useState({
    currentCTC: data.currentCTC || "",
    expectedCTC: data.expectedCTC || "",
  });

  const handleChange = (field, value) => {
    const updated = { ...compensation, [field]: value };
    setCompensation(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-6">
      {/* Current CTC */}
      <div className="flex flex-col">
        <label className="block text-sm font-semibold mb-1">
          Current CTC (Annual) *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="number"
            value={compensation.currentCTC}
            onChange={(e) => handleChange("currentCTC", e.target.value)}
            placeholder="e.g., 500000"
            className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Enter amount in INR per year
        </p>
      </div>

      {/* Expected CTC */}
      <div className="flex flex-col">
        <label className="block text-sm font-semibold mb-1">
          Expected CTC (Annual) *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="number"
            value={compensation.expectedCTC}
            onChange={(e) => handleChange("expectedCTC", e.target.value)}
            placeholder="e.g., 700000"
            className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Enter amount in INR per year
        </p>
      </div>
    </div>
  );
}

/* ===========================
   STEP: AVAILABILITY
=========================== */
export function AvailabilityStep({ data, updateData }) {
  const [availability, setAvailability] = useState(data.availability || "");
  const [lastWorkingDate, setLastWorkingDate] = useState(
    data.lastWorkingDate || ""
  );

  const handleAvailabilityChange = (value) => {
    setAvailability(value);

    // Reset last working date if not serving notice
    if (value !== "Serving Notice") {
      setLastWorkingDate("");
      updateData({ availability: value, lastWorkingDate: "" });
    } else {
      updateData({ availability: value, lastWorkingDate });
    }
  };

  const handleLastDateChange = (value) => {
    setLastWorkingDate(value);
    updateData({ availability, lastWorkingDate: value });
  };

  return (
    <div className="space-y-6">
      {/* Availability / Notice Period */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Availability / Notice Period *
        </label>

        <select
          value={availability}
          onChange={(e) => handleAvailabilityChange(e.target.value)}
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select availability</option>
          <option value="Immediate">Immediate</option>
          <option value="15 Days">15 Days</option>
          <option value="30 Days">30 Days</option>
          <option value="60 Days">60 Days</option>
          <option value="Serving Notice">Serving Notice</option>
        </select>
      </div>

      {/* Last Working Date (shown only if Serving Notice) */}
      {availability === "Serving Notice" && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Last Working Date *
          </label>

          <input
            type="date"
            value={lastWorkingDate}
            onChange={(e) => handleLastDateChange(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-xs text-gray-500 mt-1">
            Please select your official last working day
          </p>
        </div>
      )}
    </div>
  );
}

/* ===========================
   STEP 10: INTERVIEW SLOTS
=========================== */

export function InterviewSlotsStep({ data, updateData }) {
  const [selectedSlots, setSelectedSlots] = useState(
    data.interviewSlots || []
  );

  const timeSlots = {
    morning: [
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
    ],
    afternoon: [
      "1:00 PM - 2:00 PM",
      "2:00 PM - 3:00 PM",
      "3:00 PM - 4:00 PM",
      "4:00 PM - 5:00 PM",
    ],
  };

  const toggleSlot = (slot) => {
    const updated = selectedSlots.includes(slot)
      ? selectedSlots.filter((s) => s !== slot)
      : [...selectedSlots, slot];

    setSelectedSlots(updated);
    updateData({ interviewSlots: updated });
  };

  const SlotGroup = ({ title, slots }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const selected = selectedSlots.includes(slot);

          return (
            <label
              key={slot}
              className={`flex items-center justify-center px-4 py-3 rounded-xl border cursor-pointer text-sm font-medium transition
                ${
                  selected
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleSlot(slot)}
                className="hidden"
              />
              {slot}
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <SlotGroup title="Morning Shift" slots={timeSlots.morning} />
      <SlotGroup title="Afternoon Shift" slots={timeSlots.afternoon} />

      {/* Validation Message */}
      {selectedSlots.length < 2 && (
        <p className="text-sm text-red-500">
          Please select at least 2 interview time slots.
        </p>
      )}
    </div>
  );
}


/* ===========================
   STEP: JOB PREFERENCES
=========================== */
export function JobPreferencesStep({ data, updateData }) {
  const [preferences, setPreferences] = useState({
    jobType: data.jobType || [],
    workMode: data.workMode || [],
    preferredLocation: data.preferredLocation || "",
  });

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const workModes = ["Remote", "Hybrid", "On-site"];

  const handleMultiSelect = (field, value) => {
    const updatedArray = preferences[field].includes(value)
      ? preferences[field].filter((item) => item !== value)
      : [...preferences[field], value];

    const updated = { ...preferences, [field]: updatedArray };
    setPreferences(updated);
    updateData(updated);
  };

  const handleChange = (field, value) => {
    const updated = { ...preferences, [field]: value };
    setPreferences(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-8">
      {/* Job Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Job Type *
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobTypes.map((type) => {
            const selected = preferences.jobType.includes(type);
            return (
              <label
                key={type}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer transition
                  ${selected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"}
                `}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => handleMultiSelect("jobType", type)}
                  className="w-5 h-5 accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-800">
                  {type}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Work Mode */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Work Mode *
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workModes.map((mode) => {
            const selected = preferences.workMode.includes(mode);
            return (
              <label
                key={mode}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer transition
                  ${selected
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"}
                `}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => handleMultiSelect("workMode", mode)}
                  className="w-5 h-5 accent-gray-900"
                />
                <span className="text-sm font-medium text-gray-800">
                  {mode}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Preferred Locations */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Preferred Locations *
        </label>

        <input
          type="text"
          value={preferences.preferredLocation}
          onChange={(e) => handleChange("preferredLocation", e.target.value)}
          placeholder="e.g., Bangalore, Mumbai, Remote"
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="text-xs text-gray-500 mt-2">
          Separate multiple locations with commas
        </p>
      </div>
    </div>
  );
}




/* ===========================
   STEP: PROFESSIONAL LINKS
=========================== */
export function ProfessionalLinksStep({ data, updateData }) {
  const [links, setLinks] = useState({
    github: data.github || "",
    linkedin: data.linkedin || "",
  });

  const handleChange = (field, value) => {
    const updated = { ...links, [field]: value };
    setLinks(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">GitHub</label>
        <input
          type="url"
          value={links.github}
          onChange={(e) => handleChange("github", e.target.value)}
          placeholder="https://github.com/username"
          className="w-full px-4 py-3 border rounded-xl"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">LinkedIn</label>
        <input
          type="url"
          value={links.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/username"
          className="w-full px-4 py-3 border rounded-xl"
        />
      </div>
    </div>
  );
}


/* ===========================
   STEP: PROFILE SUMMARY
=========================== */
export function ProfileSummaryStep({ data }) {
  return (
    <div className="space-y-6 p-4 border rounded-xl">
      <h2 className="text-xl font-bold mb-4">Profile Summary</h2>

      {/* Basic Details */}
      <div>
        <h3 className="font-semibold">Basic Details</h3>
        <p><strong>Date of Birth:</strong> {data.dateOfBirth || "-"}</p>
        <p><strong>Gender:</strong> {data.gender || "-"}</p>
        <p><strong>Nationality:</strong> {data.nationality || "-"}</p>
        <p><strong>Marital Status:</strong> {data.maritalStatus || "-"}</p>
        <p><strong>Address:</strong> {data.address || "-"}</p>
        <p><strong>City:</strong> {data.city || "-"}</p>
        <p><strong>State:</strong> {data.state || "-"}</p>
        <p><strong>Pincode:</strong> {data.pincode || "-"}</p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-semibold">Primary Skills</h3>
        {data.primarySkills?.length > 0 ? (
          data.primarySkills.map((skill, i) => (
            <p key={i}>{skill.name} - {skill.rating}/5</p>
          ))
        ) : (
          <p>-</p>
        )}

        <h3 className="font-semibold mt-2">Additional Skills</h3>
        {data.additionalSkills?.length > 0 ? (
          data.additionalSkills.map((skill, i) => <p key={i}>{skill}</p>)
        ) : (
          <p>-</p>
        )}
      </div>

      {/* Experience */}
      <div>
        <h3 className="font-semibold">Experience</h3>
        {data.experienceList?.length > 0 ? (
          data.experienceList.map((exp, i) => (
            <p key={i}>{exp.role} at {exp.company} ({exp.years} years)</p>
          ))
        ) : (
          <p>-</p>
        )}
      </div>

      {/* Education */}
      <div>
        <h3 className="font-semibold">Education</h3>
        {data.educationList?.length > 0 ? (
          data.educationList.map((edu, i) => (
            <p key={i}>{edu.degree} from {edu.institution}</p>
          ))
        ) : (
          <p>-</p>
        )}
      </div>

      {/* Compensation & Availability */}
      <div>
        <h3 className="font-semibold">Compensation & Availability</h3>
        <p><strong>Expected Compensation:</strong> {data.compensation || "-"}</p>
        <p><strong>Availability:</strong> {data.availability || "-"}</p>
      </div>

      {/* Job Preferences */}
      <div>
        <h3 className="font-semibold">Job Preferences</h3>
        <p><strong>Preferred Location:</strong> {data.preferredLocation || "-"}</p>
        <p><strong>Preferred Job Type:</strong> {data.jobType || "-"}</p>
      </div>

      {/* Professional Links */}
      <div>
        <h3 className="font-semibold">Professional Links</h3>
        <p><strong>GitHub:</strong> {data.github || "-"}</p>
        <p><strong>LinkedIn:</strong> {data.linkedin || "-"}</p>
      </div>

      {/* Interview Slots */}
      <div>
        <h3 className="font-semibold">Selected Interview Slots</h3>
        {data.interviewSlots?.length > 0 ? (
          <ul className="list-disc ml-6">
            {data.interviewSlots.map((slot, i) => (
              <li key={i}>{slot}</li>
            ))}
          </ul>
        ) : (
          <p>-</p>
        )}
      </div>
    </div>
  );
}
