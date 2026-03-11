import { useState } from 'react';

export default function CompensationStep({ data, updateData }) {
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