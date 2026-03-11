import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function ExperienceStep({ data, updateData }) {
  const [isFresher, setIsFresher] = useState(data.isFresher || false);
  const [totalExperience, setTotalExperience] = useState(data.totalExperience || "");
  const [companies, setCompanies] = useState(
    data.experience || [
      { companyName: "", designation: "", startDate: "", endDate: "", responsibilities: "" },
    ]
  );

  const handleFresherChange = () => {
    const newFresher = !isFresher;
    setIsFresher(newFresher);
    if (newFresher) {
      setTotalExperience("");
      setCompanies([]);
      updateData({ isFresher: true, totalExperience: "", experience: [] });
    } else {
      setCompanies([{ companyName: "", designation: "", startDate: "", endDate: "", responsibilities: "" }]);
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
    updateData({ experience: updated, isFresher, totalExperience });
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
    updateData({ experience: updated, isFresher, totalExperience });
  };

  return (
    <div className="space-y-6">
      {/* Fresher Checkbox */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
        <input
          type="checkbox"
          checked={isFresher}
          onChange={handleFresherChange}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">I am a Fresher (No work experience)</label>
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
            <label className="text-sm font-semibold block text-gray-700">
              Previous Company {index + 1}
            </label>

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
      {!isFresher && companies.length > 0 && (
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