import { useState } from 'react';

export default function AvailabilityStep({ data, updateData }) {
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