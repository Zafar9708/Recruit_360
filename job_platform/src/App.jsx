import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

/* Public Pages */
import LandingPage from "./pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import EnquiryPage from "./pages/EnquiryPage";
import LoginPage from "./pages/LoginPage";

/* Registration */
import CandidateRegistrationPage from "./pages/CandidateRegisterationPage";
import VendorRegistrationPage from "./pages/VendorRegisterationPage";
import EndClientRegistrationPage from "./pages/EndClientRegisterationPage";


/* Common */
import ProfileSetupPage from "./pages/ProfileSetupPage";
import DashboardPage from "./pages/DashboardPage";
import InterviewSchedulingPage from "./pages/InterviewSchedulingPage";

/* Admin */
import AdminDashboard from "./pages/AdminDashboard";

/* Vendor */
import VendorDashboard from "./pages/VendorDashboard";
import VendorJobsPage from "./pages/VendorJobsPage";
import VendorBenchlistPage from "./pages/VendorBenchlistPage";
import VendorCandidatesPage from "./pages/VendorCandidatesPage";
import VendorProfilePage from "./pages/VendorProfilePage";

/* End Client */
import EndClientDashboard from "./pages/EndClientDashboard";
import EndClientJobsPage from "./pages/EndClientJobsPage";
import EndClientCandidatesPage from "./pages/EndClientCandidatesPage";
import EndClientInterviewPage from "./pages/EndClientInterviewPage";
import EndClientProfilePage from "./pages/EndClientProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Registration */}
          <Route path="/register/candidate" element={<CandidateRegistrationPage />} />
          <Route path="/register/vendor" element={<VendorRegistrationPage />} />
          <Route path="/register/end-client" element={<EndClientRegistrationPage />} />
         

          {/* Common */}
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/schedule-interview" element={<InterviewSchedulingPage />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Vendor */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/jobs" element={<VendorJobsPage />} />
          <Route path="/vendor/benchlist" element={<VendorBenchlistPage />} />
          <Route path="/vendor/candidates" element={<VendorCandidatesPage />} />
          <Route path="/vendor/profile" element={<VendorProfilePage />} />
          <Route path="/vendor/interview/:candidateId" element={<EndClientInterviewPage />} />

          {/* End Client */}
          <Route path="/end-client/dashboard" element={<EndClientDashboard />} />
          <Route path="/end-client/jobs" element={<EndClientJobsPage />} />
          <Route path="/end-client/candidates" element={<EndClientCandidatesPage />} />
          <Route path="/end-client/interview/:candidateId" element={<EndClientInterviewPage />} />
          <Route path="/end-client/profile" element={<EndClientProfilePage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster position="top-center" richColors />
      </div>
    </BrowserRouter>
  );
}
