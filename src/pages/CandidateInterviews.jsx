import React from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  ChevronRight,
} from "lucide-react";
import CandidateSidebar from "../components/CandidateSidebar";

function CandidateInterviews() {
  const interviews = [
    {
      id: 1,
      company: "TechCorp",
      role: "Senior Developer",
      date: "Dec 22, 2025",
      time: "10:00 AM",
      duration: "60 mins",
      mode: "Online",
      status: "Confirmed",
      meetingLink: true,
      initials: "TC",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      company: "InnovateLabs",
      role: "Full Stack Engineer",
      date: "Dec 25, 2025",
      time: "2:00 PM",
      duration: "90 mins",
      mode: "Offline",
      location: "123 Tech Park, Bangalore",
      status: "Pending",
      initials: "IL",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      company: "DataVision",
      role: "Data Scientist",
      date: "Dec 28, 2025",
      time: "11:00 AM",
      duration: "45 mins",
      mode: "Online",
      status: "Confirmed",
      meetingLink: true,
      initials: "DV",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
  
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <CandidateSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Upcoming Interviews
            </h1>
            <p className="text-gray-500">
              You have {interviews.length} interviews scheduled
            </p>
          </div>

          <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Schedule New
          </button>
        </div>

        {/* Interview List */}
        <div className="space-y-6">
          {interviews.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition"
            >
              {/* Company Logo */}
             {/* Company Logo */}
<div
  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br ${item.color}`}
>
  {item.initials}
</div>


              {/* Interview Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.company}
                </h3>
                <p className="text-gray-500 mb-3">{item.role}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.time} • {item.duration}
                  </span>

                  {item.mode === "Online" ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <Video className="w-4 h-4" />
                      Online
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-orange-600">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </span>
                  )}
                </div>

                {item.mode === "Online" && item.meetingLink && (
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Join Meeting
                  </button>
                )}
              </div>

              {/* Status */}
              <div className="flex flex-col items-end gap-4">
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    item.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>

                <ChevronRight className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CandidateInterviews;