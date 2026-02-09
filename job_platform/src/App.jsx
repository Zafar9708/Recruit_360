
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import EnquiryPage from './pages/EnquiryPage';
import LoginPage from './pages/LoginPage';
import OrganizationLoginPage from './pages/OrganizationLoginPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard';
import EndClientDashboard from './pages/EndClientDashboard';
import InterviewSchedulingPage from './pages/InterviewSchedulingPage';
import EndClientJobsPage from './pages/EndClientJobsPage';
import EndClientInterviewPage from './pages/EndClientJobDetailPage';
import EndClientCandidatesPage from './pages/EndClientCandidatesPage';
import EndClientProfilePage from './pages/EndClientProfilePage';
import VendorJobsPage from './pages/VendorJobsPage';
import VendorBenchlistPage from './pages/VendorBenchlistPage';
import VendorJobDetailsPage from './pages/VendorJobDetailPage';
import VendorCandidatesPage from './pages/VendorCandidatesPage';
import VendorProfilePage from './pages/VendorProfilePage';
import JobDetailPage from './pages/JobDetailPage';
import CandidateDetailPage from './pages/CandidateDetailPage';
import BusinessAnalyticsPage from './pages/BusinessAnalyticsPage';
import BenchCandidateDetailPage from './pages/BenchCandidateDetailPage';
import VendorJobPostingPage from './pages/VendorJobPostingPage';
import JobPostingDetailPage from './pages/JobPostingDetailPage';
import JobCandidateDetailPage from './pages/JobCandidateDetailPage';
import RegistrationPage from './pages/CandidateRegister/Register';
import VerifyEmail from './pages/CandidateRegister/VerifyEmail';
import SkillAssessment from './pages/SkillAssessment';
import CandidateJobBoard from './pages/CandidateJobBoard'
import CandidateAllInterviews from './pages/CandidateAllInterviews'
import CandidateProfile from './pages/CandidateProfile';
import EndClientAnalytics from './pages/EndClientAnalytics'
import EndClientNotificationsPage from './pages/EndClientNotificationsPage';
import AIInterviewPage from './pages/AIInterviewPage';
import HomePage from './pages/HomePage';
import Messages from './pages/CandidateMessages';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/register/candidate" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/organization" element={<OrganizationLoginPage />} />
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/schedule-interview" element={<InterviewSchedulingPage />} />
          <Route path="/job/:jobId" element={<JobDetailPage />} />
          <Route path="/candidate/:candidateId" element={<CandidateDetailPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/jobs" element={<VendorJobsPage />} />
          <Route path="/vendor/benchlist" element={<VendorBenchlistPage />} />
          <Route
            path="/vendor/bench-candidate/:candidateId"
            element={<BenchCandidateDetailPage />}
          />
          <Route path="/vendor/candidates" element={<VendorCandidatesPage />} />
          <Route
            path="/vendor/interview/:candidateId"
            element={<EndClientInterviewPage />}
          />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/profile-setup" element={<ProfileSetupPage/>} />
          <Route path="/vendor/profile" element={<VendorProfilePage />} />
          <Route path="/vendor/job-postings" element={<VendorJobPostingPage />} />
          <Route path="/vendor/job/:jobId" element={<JobPostingDetailPage />} />
          <Route path="/vendor/jobs/:id" element={<VendorJobDetailsPage />} />
          <Route path="/vendor/job/:jobId/candidate/:candidateId" element={<JobCandidateDetailPage />} />
          <Route path="/vendor/analytics" element={<BusinessAnalyticsPage />} />
          <Route path="/end-client/dashboard" element={<EndClientDashboard />} />
          <Route path="/end-client/jobs" element={<EndClientJobsPage />} />
          <Route path="/end-client/candidates" element={<EndClientCandidatesPage />} />
          <Route path="/skills-assessment" element={<SkillAssessment />} />
          <Route path="/candidate/jobs" element={<CandidateJobBoard />} /> 
          <Route path="/candidate/interviews" element={<CandidateAllInterviews />} />
          <Route path="/candidate/profile" element={<CandidateProfile />} />
          <Route path="/end-client/analytics" element={<EndClientAnalytics />} />
          <Route path="/end-client/notifications" element={<EndClientNotificationsPage />} />
          <Route path="/ai-interview" element={<AIInterviewPage />} />
          <Route path="/candidate/messages" element={<Messages />} />


         {/*  <Route
            path="/end-client/interview/:candidateId"
            element={<EndClientInterviewPage />}
          /> */}
            <Route
            path="/end-client/interview/"
            element={<EndClientInterviewPage />}
          />
          <Route path="/end-client/profile" element={<EndClientProfilePage />} />
          <Route path="/end-client/analytics" element={<BusinessAnalyticsPage />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </div>
    </BrowserRouter>
  );
}