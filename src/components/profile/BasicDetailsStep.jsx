import { useState, useEffect } from 'react';

export default function BasicDetailsStep({ data, updateData }) {
  const [formData, setFormData] = useState({
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    dateOfBirth: data.dateOfBirth || "",
    gender: data.gender || "",
    nationality: data.nationality || "",
    maritalStatus: data.maritalStatus || "",
    address: data.address || "",
    city: data.city || "",
    state: data.state || "",
    pincode: data.pincode || "",
    location: data.location || "",
  });

  // ── THE FIX ──────────────────────────────────────────────────────
  // ProfileSetupPage loads resume data from sessionStorage AFTER this
  // component already mounted with empty data={}.
  // useState only runs once on mount, so fields stayed blank.
  // This useEffect re-syncs local state whenever parent data updates.
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;
    setFormData({
      fullName:      data.fullName      || "",
      email:         data.email         || "",
      phone:         data.phone         ? String(data.phone) : "",  // DB stores phone as number
      dateOfBirth:   data.dateOfBirth   || "",
      gender:        data.gender        || "",
      nationality:   data.nationality   || "",
      maritalStatus: data.maritalStatus || "",
      address:       data.address       || "",
      city:          data.city          || "",
      state:         data.state         || "",
      pincode:       data.pincode       || "",
      location:      data.location      || "",
    });
  }, [data]);
  // ─────────────────────────────────────────────────────────────────

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold mb-2">Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold mb-2">Gender *</label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-semibold mb-2">Nationality *</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => handleChange("nationality", e.target.value)}
            placeholder="Nationality"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-semibold mb-2">Marital Status *</label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => handleChange("maritalStatus", e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold mb-2">Current Location *</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="City, Country"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Address *</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Address"
            rows={3}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold mb-2">City *</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="City"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-semibold mb-2">State *</label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            placeholder="State"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-semibold mb-2">Pincode *</label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
            placeholder="Pincode"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
      </div>
    </div>
  );
}