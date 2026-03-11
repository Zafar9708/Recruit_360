import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function EducationStep({ data, updateData }) {
  const [educationList, setEducationList] = useState(
    data.education || [
      { degree: "", institution: "", startYear: "", endYear: "", percentage: "" },
    ]
  );

  const addEducation = () => {
    const updated = [
      ...educationList,
      { degree: "", institution: "", startYear: "", endYear: "", percentage: "" },
    ];
    setEducationList(updated);
    updateData({ education: updated });
  };

  const removeEducation = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
    updateData({ education: updated });
  };

  const updateField = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
    updateData({ education: updated });
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