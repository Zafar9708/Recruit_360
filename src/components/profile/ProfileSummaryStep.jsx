import { Star, User } from 'lucide-react';

export default function ProfileSummaryStep({ data }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Details */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <User size={18} /> Basic Details
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Full Name:</span> {data.fullName || "-"}</p>
            <p><span className="text-gray-500">Email:</span> {data.email || "-"}</p>
            <p><span className="text-gray-500">Phone:</span> {data.phone || "-"}</p>
            <p><span className="text-gray-500">Date of Birth:</span> {data.dateOfBirth || "-"}</p>
            <p><span className="text-gray-500">Gender:</span> {data.gender || "-"}</p>
            <p><span className="text-gray-500">Nationality:</span> {data.nationality || "-"}</p>
            <p><span className="text-gray-500">Marital Status:</span> {data.maritalStatus || "-"}</p>
            <p><span className="text-gray-500">Location:</span> {data.location || "-"}</p>
            <p><span className="text-gray-500">Address:</span> {data.address || "-"}</p>
            <p><span className="text-gray-500">City:</span> {data.city || "-"}</p>
            <p><span className="text-gray-500">State:</span> {data.state || "-"}</p>
            <p><span className="text-gray-500">Pincode:</span> {data.pincode || "-"}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Skills</h3>
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-600 mb-2">Primary Skills:</p>
            {data.primarySkills?.length > 0 ? (
              data.primarySkills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 text-sm mb-1">
                  <span className="text-xs text-blue-600 mr-1">[{skill.category}]</span>
                  <span>{skill.name}</span>
                  <div className="flex gap-0.5 ml-auto">
                    {[1,2,3,4,5].map(r => (
                      <Star key={r} className={`w-3 h-3 ${r <= skill.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">-</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Additional Skills:</p>
            {data.additionalSkills?.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {data.additionalSkills.map((skill, i) => (
                  <span key={i} className="text-xs bg-white px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">-</p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Education</h3>
          {data.education?.length > 0 ? (
            data.education.map((edu, i) => (
              <div key={i} className="mb-3 pb-2 border-b last:border-0">
                <p className="text-sm font-medium">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.institution}</p>
                <p className="text-xs text-gray-500">{edu.startYear} - {edu.endYear} | {edu.percentage}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">-</p>
          )}
        </div>

        {/* Experience */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Experience</h3>
          {data.isFresher ? (
            <p className="text-sm text-gray-600">Fresher</p>
          ) : (
            <>
              <p className="text-sm mb-2"><span className="text-gray-500">Total Experience:</span> {data.totalExperience || "-"} years</p>
              {data.experience?.length > 0 ? (
                data.experience.map((exp, i) => (
                  <div key={i} className="mb-3 pb-2 border-b last:border-0">
                    <p className="text-sm font-medium">{exp.companyName}</p>
                    <p className="text-xs text-gray-600">{exp.designation}</p>
                    <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">-</p>
              )}
            </>
          )}
        </div>

        {/* Compensation & Availability */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Compensation & Availability</h3>
          <p className="text-sm"><span className="text-gray-500">Current CTC:</span> ₹{data.currentCTC || "-"}</p>
          <p className="text-sm"><span className="text-gray-500">Expected CTC:</span> ₹{data.expectedCTC || "-"}</p>
          <p className="text-sm"><span className="text-gray-500">Availability:</span> {data.availability || "-"}</p>
          {data.lastWorkingDate && <p className="text-sm"><span className="text-gray-500">Last Working Day:</span> {data.lastWorkingDate}</p>}
        </div>

        {/* Job Preferences */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Job Preferences</h3>
          <p className="text-sm"><span className="text-gray-500">Job Type:</span> {data.jobType?.join(", ") || "-"}</p>
          <p className="text-sm"><span className="text-gray-500">Work Mode:</span> {data.workMode?.join(", ") || "-"}</p>
          <p className="text-sm"><span className="text-gray-500">Preferred Location:</span> {data.preferredLocation || "-"}</p>
        </div>

        {/* Professional Links */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Professional Links</h3>
          <p className="text-sm"><span className="text-gray-500">GitHub:</span> {data.github ? <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.github}</a> : "-"}</p>
          <p className="text-sm"><span className="text-gray-500">LinkedIn:</span> {data.linkedin ? <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.linkedin}</a> : "-"}</p>
          <p className="text-sm"><span className="text-gray-500">Portfolio:</span> {data.portfolio ? <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.portfolio}</a> : "-"}</p>
        </div>

        {/* Interview Slots */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">Selected Interview Slots</h3>
          {data.interviewSlots?.length > 0 ? (
            <ul className="list-disc list-inside text-sm">
              {data.interviewSlots.map((slot, i) => (
                <li key={i}>{slot}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">-</p>
          )}
        </div>
      </div>
    </div>
  );
}