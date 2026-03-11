import { useState } from 'react';

export default function ProfessionalLinksStep({ data, updateData }) {
  const [links, setLinks] = useState({
    github: data.github || "",
    linkedin: data.linkedin || "",
    portfolio: data.portfolio || "",
  });

  const handleChange = (field, value) => {
    const updated = { ...links, [field]: value };
    setLinks(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">GitHub Profile</label>
        <input
          type="url"
          value={links.github}
          onChange={(e) => handleChange("github", e.target.value)}
          placeholder="https://github.com/username"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">LinkedIn Profile</label>
        <input
          type="url"
          value={links.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/username"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Portfolio Website</label>
        <input
          type="url"
          value={links.portfolio}
          onChange={(e) => handleChange("portfolio", e.target.value)}
          placeholder="https://yourportfolio.com"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}