import { useState } from 'react';

export default function JobPreferencesStep({ data, updateData }) {
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
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}
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
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}
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